import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://31.97.206.233/graphql",
  credentials: "include", // Keep if you still need cookies
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path, code }: any) => {
      console.error(`[GraphQL error]: ${message}`, { path });
      if (code === "UNAUTHORIZED") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      if (code === "FORBIDDEN") {
        window.location.href = "/";
      }
      if (code === "UNAUTHENTICATED") {
        window.location.href = "/login";
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]:`, networkError);
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
