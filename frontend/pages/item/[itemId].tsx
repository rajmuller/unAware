import { FC } from "react";

import { withApollo } from "../../lib/withApollo";
import SingleItem from "../../components/SingleItem";

type ItemPageProps = {};

const ItemPage: FC<ItemPageProps> = () => {
  return <SingleItem />;
};

export default withApollo()(ItemPage);
