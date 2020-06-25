import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';

export const addFavoris = gql`
  mutation CreateFavorite($interested: Boolean!, $job: String!) {
    createFavorite(interested: $interested, job: $job) {
      interested
      job
      id
    }
  }
`;
export const useAddFavoris = (options: MutationHookOptions = {}) => useLocalMutation(addFavoris, options);
