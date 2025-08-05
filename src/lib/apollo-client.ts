import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://[::1]:8080/graphql",
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
    graphQLErrors.forEach(({ message, path, extensions }) => {
      console.error(`[GraphQL error]: ${message}`, { path });

      // Check if extensions exists and has a code property
      const code = extensions?.code;

      if (!code) return;

      // Convert path array to string for checking login operations
      const pathString = path?.join(".") || "";
      const isLoginOperation = pathString.includes("login");

      if (
        !isLoginOperation &&
        (code === "UNAUTHORIZED" || code === "UNAUTHENTICATED")
      ) {
        localStorage.removeItem("token");
        // Consider using React Router's navigate instead of window.location
        window.location.href = "/login";
      }

      if (code === "FORBIDDEN") {
        window.location.href = "/";
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
