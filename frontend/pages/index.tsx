import { FC } from "react";
import { useMeQuery, useUsersQuery } from "../graphql/generated/graphql";
import { withApollo } from "../lib/withApollo";

const Index: FC = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "cache-and-network" });
  const { data: meData } = useMeQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div>index vagyok</div>
      <ul>
        {data.users.map((user) => {
          return (
            <li key={user.id}>
              userId: {user.id} | email: {user.email}
            </li>
          );
        })}
      </ul>
      <h1>
        {meData?.me?.id}
        <br />
        {meData?.me?.email}
      </h1>
    </>
  );
};

export default withApollo()(Index);
