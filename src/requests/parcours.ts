import gql from 'graphql-tag';

import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from 'hooks/apollo';

import { UserParcour } from './types';

export const getUserParcourQuery = gql`
  {
    getUserParcour {
      id
      played
      families {
        id
        nom
      }
      skills {
        theme {
          title
          id
          type
        }
        activities {
          title
          description
          id
        }
        competences {
          _id
          value
        }
      }
    }
  }
`;

export interface UserParcourData {
  getUserParcour: UserParcour;
}

export const useGetUserParcour = (options: LazyQueryHookOptions<UserParcourData> = {}) =>
  useLocalLazyQuery(getUserParcourQuery, options);
