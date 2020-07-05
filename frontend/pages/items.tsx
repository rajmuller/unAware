import { FC } from "react";

import Items from "../components/Items/Items";
import { withApollo } from "../lib/withApollo";

type ItemsPageProps = {};

const ItemsPage: FC<ItemsPageProps> = () => {
  return <Items />;
};

export default withApollo()(ItemsPage);
