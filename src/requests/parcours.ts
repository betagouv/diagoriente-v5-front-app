import gql from 'graphql-tag';

import { LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery, useLocalMutation } from 'hooks/apollo';

import { UserParcour } from './types';

export const getUserParcourQuery = gql`
  {
    userParcour {
      id
      played
      playedEng
      completed
      accessibility {
        id
      }
      families {
        id
        nom
        category
        resources
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
          parentId
        }
      }

      globalCompetences {
        id
        count
        value
        title
        type
        niveau {
          title
          sub_title
        }
      }
    }
  }
`;

export const parcourResult = getUserParcourQuery.loc?.source.body
  .split('{')
  .slice(2)
  .join('{')
  .split('}')
  .slice(0, -2)
  .join('}');

export interface UserParcourData {
  userParcour: UserParcour;
}

export const useGetUserParcour = (options: LazyQueryHookOptions<UserParcourData> = {}) =>
  useLocalLazyQuery(getUserParcourQuery, options);

export const updateParcours = gql`
  mutation UpdateParcour(
    $families: [ID]
    $skillsAlgo: [ID]
    $played: Boolean
    $completed: Boolean
    $playedEng: Boolean
    $accessibility: ID
  ) {
    updateParcour(
      families: $families
      skillsAlgo: $skillsAlgo
      played: $played
      completed: $completed
      playedEng: $playedEng
      accessibility: $accessibility
    ) {
      ${parcourResult}
    }
  }
`;
export interface UpdateParcourArgument {
  families?: string[];
  skillsAlgo?: string[];
  played?: boolean;
  completed?: boolean;
  playedEng?: boolean;
  accessibility?: string;
}
export const useUpdateParcour = (
  options: MutationHookOptions<{ updateParcour: UserParcour }, UpdateParcourArgument> = {},
) => useLocalMutation(updateParcours, options);
