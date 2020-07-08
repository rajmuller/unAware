import { createClient } from "urql";
import fetch from "isomorphic-unfetch";

export const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  fetch,
});
