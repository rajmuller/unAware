import { FC } from "react";
import { GetStaticProps } from "next";

import Items, { itemsQueryVariables } from "../components/items/Items";
import { initializeApollo } from "../lib/apollo";
import {
  ItemsDocument,
  NumberOfItemsDocument,
} from "../graphql/generated/graphql";

type ItemsPageProps = {};

const ItemsPage: FC<ItemsPageProps> = () => {
  return <Items />;
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ItemsDocument,
    variables: itemsQueryVariables,
  });

  await apolloClient.query({
    query: NumberOfItemsDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
};

export default ItemsPage;
