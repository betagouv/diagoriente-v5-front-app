import gql from 'graphql-tag';

import { LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery, useLocalMutation } from 'hooks/apollo';

import { UserParcour } from './types';

export const getUserParcourQuery = gql`
  {
    userParcour {
      id
      played
      completed
      families {
        id
        nom
        category
      }
      skills {
        id
        theme {
          title
          id
          type
          resources {
            icon
            backgroundColor
          }
        }
        activities {
          title
          description
          id
        }
        competences {
          _id {
            title
            rank
            id
          }
          value
        }
      }
      globalCompetences {
        id
        title
        value
        count
      }
    }
  }
`;

export interface UserParcourData {
  userParcour: UserParcour;
}

export const useGetUserParcour = (options: LazyQueryHookOptions<UserParcourData> = {}) =>
  useLocalLazyQuery(getUserParcourQuery, options);

export const updateParcours = gql`
  mutation UpdateParcous($families: [ID],$skillsAlgo: [ID],$played: Boolean,$completed: Boolean ) {
    updateParcour(families: $families, skillsAlgo: $skillsAlgo, played: $played,completed: $completed) {
      id
      played
      completed
      families {
        id
        nom
        category
      }
      skills {
        id
        theme {
          title
          id
          type
          resources {
            icon
            backgroundColor
          }
        }
        activities {
          title
          description
          id
        }
        competences {
          _id {
            title
            rank
            id
          }
          value
        }
      }
    }
  }
`;
export interface UpdateParcourArgument {
  families?: string[];
  skillsAlgo?: string[];
  played?: boolean;
  completed?: boolean;
}
export const useUpdateParcour = (
  options: MutationHookOptions<{ updateParcour: UserParcour }, UpdateParcourArgument> = {},
) => useLocalMutation(updateParcours, options);
