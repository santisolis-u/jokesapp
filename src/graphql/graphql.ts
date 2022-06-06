import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://icanhazdadjoke.com/graphql',
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
