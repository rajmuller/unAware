import { FC } from "react";
import styled from "styled-components";

import { useRouter } from "next/router";
import { useItemsQuery } from "../graphql/generated/graphql";
import { perPage } from "../config";
import Item from "./Item";
import Pagination from "./Pagination";

const CenterContainer = styled.div`
  text-align: center;
`;

const ItemsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${({ theme }) => theme.maxWidth};
`;

type ItemsProps = {};

const Items: FC<ItemsProps> = () => {
  const { query } = useRouter();
  const currentPage = parseFloat((query.page as string) || "1");
  const skip = perPage * (currentPage - 1);
  const { data, loading } = useItemsQuery({
    variables: { take: perPage, skip },
  });

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return (
    <CenterContainer>
      <Pagination />
      <ItemsList>
        {data.items.map((item) => {
          return (
            <li key={item.id}>
              <Item item={item} />
            </li>
          );
        })}
      </ItemsList>
      <Pagination />
    </CenterContainer>
  );
};

export default Items;
