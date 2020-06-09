import { FC } from "react";
import styled from "styled-components";
import { useItemsQuery } from "../graphql/generated/graphql";
import Item from "./Item";

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
  const { data, loading } = useItemsQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  data.items.sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  return (
    <CenterContainer>
      <ItemsList>
        {data.items.map((item) => {
          return (
            <li key={item.id}>
              <Item item={item} />
            </li>
          );
        })}
      </ItemsList>
    </CenterContainer>
  );
};

export default Items;
