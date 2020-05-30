import CreateItem from "../components/CreateItem";
import { withApollo } from "../lib/withApollo";

const Sell = () => {
  return <CreateItem />;
};

export default withApollo()(Sell);
