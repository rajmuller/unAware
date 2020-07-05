import { NextPageContext } from "next";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";
import { createHttpLink } from "apollo-link-http";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { ApolloLink } from "apollo-link";
import jwtDecode from "jwt-decode";

import { getAccessToken, setAccessToken } from "../utils/accessToken";
// import allModalResolvers from "../cache/resolvers";
import { mutations } from "../cache/resolvers/modalResolver";

export default function createApolloClient(
  initialState: NormalizedCacheObject,
  ctx: NextPageContext
) {
  const tokenRefreshMiddleware = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        return true;
      }

      try {
        const { exp } = jwtDecode(accessToken);
        if (Date.now() >= exp * 1000) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch("http://localhost:4000/refresh_token", {
        credentials: "include",
        method: "POST",
      });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken);
    },
    handleError: (err) => {
      // full control over handling token fetch Error
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    },
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const accessToken = getAccessToken();
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    }));

    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    fetch,
  });
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([tokenRefreshMiddleware, authMiddleware, httpLink]),
    cache: new InMemoryCache().restore(initialState),
    resolvers: {
      Mutation: mutations,
    },
    connectToDevTools: true,
  });
}
