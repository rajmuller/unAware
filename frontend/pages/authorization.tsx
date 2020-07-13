import { FC } from "react";
import { useIsLoggedInQuery } from "../graphql/generated/graphql";

const Authorization: FC = () => {
  const { data, loading, error } = useIsLoggedInQuery({
    fetchPolicy: "network-only",
  });

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>worked</h1>
      <p>{data?.isLoggedIn}</p>
    </div>
  );
};

export default Authorization;
