import UpdateItem from "../../components/Items/UpdateItem";
import { withApollo } from "../../lib/withApollo";

const UpdateItemPage = () => {
  return <UpdateItem />;
};

export default withApollo()(UpdateItemPage);
