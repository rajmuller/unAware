import { useMemo } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import fetch from "isomorphic-unfetch";
import { ApolloLink } from "apollo-link";
import { getAccessToken, setAccessToken } from "../utils/accessToken";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
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

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    // @ts-ignore
    link: ApolloLink.from([tokenRefreshMiddleware, authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: any = null) {
  // eslint-disable-next-line no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
