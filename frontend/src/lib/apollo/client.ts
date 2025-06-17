// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const apolloClient = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
//   credentials: 'include',
// });

// export default apolloClient;


// apolloClient.ts
import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toast } from 'sonner'; // same as your React Query usage
import { parseApiError } from '@/shared/utils'; // reuse your utility

const errorLink = onError(({ graphQLErrors, networkError, }) => {
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
  uri: '/graphql',
  credentials: 'include',
});

const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
