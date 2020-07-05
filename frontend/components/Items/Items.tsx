import { FC } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { useItemsQuery } from "../../graphql/generated/graphql";
import { perPage } from "../../config";
import Item from "../Item";
import Pagination from "./Pagination";

const CenterContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemsList = styled.ul`
  display: flex;
  max-width: ${({ theme }) => theme.maxWidth};
  justify-content: space-between;
  flex-wrap: wrap;

  > * {
    width: 49%;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 700px) {
    --gap: 6rem;
    margin: -var(--gap) 0 0 -5rem;
    justify-content: center;
    align-items: center;

    > * {
      margin: var(--gap) 0 0 var(--gap);
      width: calc(50% - var(--gap));
    }
  }
`;

type ItemsProps = {};

const Items: FC<ItemsProps> = () => {
  const { query } = useRouter();
  const currentPage = parseFloat((query.page as string) || "1");
  const skip = perPage * (currentPage - 1);
  const { data, loading } = useItemsQuery({
    variables: { take: perPage, skip },
    fetchPolicy: "network-only",
  });

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return (
    <CenterContainer>
      <Pagination />
      <ItemsList>
        {data.items.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </ItemsList>
      <Pagination />
    </CenterContainer>
  );
};

export default Items;
