import UpdateItem from "../../components/UpdateItem";
import { withApollo } from "../../lib/withApollo";

const Sell = () => {
  return <UpdateItem />;
};

export default withApollo()(Sell);
