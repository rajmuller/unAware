import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

import { perPage } from "../config";
import { useNumberOfItemsQuery } from "../graphql/generated/graphql";

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${({ theme }) => theme.lightGrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled="true"] {
    color: grey;
    pointer-events: none;
  }
`;

type PaginationProps = {};

const Pagination: FC<PaginationProps> = () => {
  const { query } = useRouter();
  const currentPage = parseFloat((query.page as string) || "1");

  const { data, loading } = useNumberOfItemsQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  const pages = Math.ceil(data.numberOfItems / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          unAware - Page {currentPage} of {pages}
        </title>
      </Head>

      <Link href={{ pathname: "items", query: { page: currentPage - 1 } }}>
        <a aria-disabled={currentPage <= 1}>🠬 Prev</a>
      </Link>
      <p>
        Page {currentPage} of {pages}
      </p>
      <p>{data.numberOfItems} Items Total</p>
      <Link href={{ pathname: "items", query: { page: currentPage + 1 } }}>
        <a aria-disabled={currentPage >= pages}>Next 🠮</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
