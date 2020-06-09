import UpdateItem from "../../components/UpdateItem";
import { withApollo } from "../../lib/withApollo";

const UpdateItemPage = () => {
  return <UpdateItem />;
};

export default withApollo()(UpdateItemPage);
