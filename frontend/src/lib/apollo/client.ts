import { ApolloClient, InMemoryCache, from, HttpLink, type DefaultOptions } from "@apollo/client";
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

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions
});

export default apolloClient;
