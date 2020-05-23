import { FC } from "react";

import Items from "../components/Items";
import { withApollo } from "../lib/withApollo";

type itemsProps = {};

const items: FC<itemsProps> = () => {
  return <Items />;
};

export default withApollo()(items);
