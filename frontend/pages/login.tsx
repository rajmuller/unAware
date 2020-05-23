import { FC, useState } from "react";
import { useRouter } from "next/router";

import {
  MeDocument,
  MeQuery,
  useLoginUserMutation,
} from "../graphql/generated/graphql";
import { setAccessToken } from "../utils/accessToken";
import { withApollo } from "../lib/withApollo";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginUser, { client }] = useLoginUserMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submitted");
        const res = await loginUser({
          variables: {
            email,
            password,
          },
          update: (store, { data }) => {
            if (!data) {
              return;
            }
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data.loginUser.user,
              },
            });
          },
        });
        console.log(res);

        if (res?.data) {
          setAccessToken(res.data.loginUser.accessToken);
        }

        await client?.resetStore();
        await router.push("/");
      }}
    >
      <input
        value={email}
        placeholder="email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        value={password}
        placeholder="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default withApollo()(Login);
