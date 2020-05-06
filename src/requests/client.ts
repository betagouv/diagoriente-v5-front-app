import ApolloClient, { ApolloError } from 'apollo-boost';

let token = '';

export function setAuthorizationBearer(nextToken: string) {
  token = nextToken;
}

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

export function handleApolloError(error: ApolloError | null | undefined) {
  if (!error) return '';
  return error.graphQLErrors[0].message;
}
