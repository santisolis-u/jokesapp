import {ApolloClient, InMemoryCache, gql, HttpLink} from '@apollo/client';
import fetch from 'cross-fetch';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://icanhazdadjoke.com/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});

export const FETCH_DAD_JOKE = gql`
  query {
    joke {
      id
      joke
      permalink
    }
  }
`;
