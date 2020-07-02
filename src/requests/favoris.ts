import gql from 'graphql-tag';

import { MutationHookOptions, LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalLazyQuery } from 'hooks/apollo';

export const listFavoris = gql`
  query Favorites {
    favorites {
      data {
        id
        job
      }
    }
  }
`;
export interface FavoritesArguments {}
export interface FavoritesResponse {
  favorites: {
    data: {
      id: string;
      job: string;
    }[];
  };
}
export const useListFavoris = (options: LazyQueryHookOptions<FavoritesResponse, FavoritesArguments> = {}) =>
  useLocalLazyQuery<FavoritesResponse, FavoritesArguments>(listFavoris, options);

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

export const deleteFavoris = gql`
  mutation DeleteFavorite($id: ID!) {
    deleteFavorite(id: $id)
  }
`;
export const useDeleteFavoris = (options: MutationHookOptions = {}) => useLocalMutation(deleteFavoris, options);
