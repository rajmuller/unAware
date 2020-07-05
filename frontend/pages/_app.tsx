import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";

import { setAccessToken } from "../utils/accessToken";
import Layout from "../components/Layout";
import { useApollo } from "../lib/apollo";
import { useStore } from "../lib/redux";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(true);
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      credentials: "include",
      method: "POST",
    }).then(async (res) => {
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
