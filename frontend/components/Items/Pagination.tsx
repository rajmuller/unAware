import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

import { perPage } from "../../config";
import { useNumberOfItemsQuery } from "../../graphql/generated/graphql";

const Container = styled.div`
  text-align: center;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  transform: skew(-7deg);
  color: ${({ theme }) => theme.mediumGrey};

  a {
    color: black;
  }

  a[aria-disabled="true"] {
    color: ${({ theme }) => theme.lightGrey};
    pointer-events: none;
  }

  > * {
    margin: 0;
    padding: 0.5rem 1rem;
    border-right: 1px solid ${({ theme }) => theme.lightGrey};

    :last-child {
      border-right: 0;
    }
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

  const numberOfPages = Math.ceil(data.numberOfItems / perPage);

  return (
    <Container>
      <Head>
        <title>
          unAware - Page {currentPage} of {numberOfPages}
        </title>
      </Head>

      <Link href={{ pathname: "items", query: { page: currentPage - 1 } }}>
        <a aria-disabled={currentPage <= 1}>← Prev</a>
      </Link>
      <p>
        Page {currentPage} of {numberOfPages}
      </p>
      <p>{data.numberOfItems} Items Total</p>
      <Link href={{ pathname: "items", query: { page: currentPage + 1 } }}>
        <a aria-disabled={currentPage >= numberOfPages}>Next →</a>
      </Link>
    </Container>
  );
};

export default Pagination;
