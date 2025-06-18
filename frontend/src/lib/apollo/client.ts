import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "sonner"; // same as your React Query usage
import { parseApiError } from "@/shared/utils"; // reuse your utility

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      toast.error(parseApiError(err));
    });
  }

  if (networkError) {
    toast.error(parseApiError(networkError));
  }
});

const httpLink = new HttpLink({
  uri: "/graphql",
  credentials: "include",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        listEmployees: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
});

export default apolloClient;
