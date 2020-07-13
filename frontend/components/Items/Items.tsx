import { FC } from "react";
import styled from "styled-components";
import { NetworkStatus } from "@apollo/client";

import {
  useItemsQuery,
  useNumberOfItemsQuery,
} from "../../graphql/generated/graphql";
import { perPage } from "../../config";
import Item from "../Item";

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

export const itemsQueryVariables = {
  skip: 0,
  take: perPage,
};

type ItemsProps = {};

const Items: FC<ItemsProps> = () => {
  const {
    data,
    loading: loadingItems,
    networkStatus,
    fetchMore,
    error,
  } = useItemsQuery({
    variables: itemsQueryVariables,
    notifyOnNetworkStatusChange: true,
  });
  const {
    data: numOfItemsData,
    loading: loadingNumOfItems,
  } = useNumberOfItemsQuery();

  const loading = loadingItems || loadingNumOfItems;
  const loadingMoreItems = networkStatus === NetworkStatus.fetchMore;

  const loadMoreItems = () => {
    fetchMore({
      variables: {
        skip: data?.items.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return {
          ...previousResult, // Append the new posts results to the old one
          items: [...previousResult.items, ...fetchMoreResult.items],
        };
      },
    });
  };

  if (loading && !loadingMoreItems) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>ERROR... {error}</div>;
  }

  const areMoreItems = data!.items.length < numOfItemsData!.numberOfItems;

  return (
    <CenterContainer>
      <ItemsList>
        {data!.items.map((item) => {
          return (
            <Item key={item.id} item={item}>
              {item.title}
            </Item>
          );
        })}
      </ItemsList>
      {areMoreItems && (
        <button
          type="button"
          onClick={loadMoreItems}
          disabled={loadingMoreItems}
        >
          {loadingMoreItems ? "Loading..." : "Show More"}
        </button>
      )}
    </CenterContainer>
  );
};

export default Items;
