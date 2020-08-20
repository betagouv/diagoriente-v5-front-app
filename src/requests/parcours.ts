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
            niveau {
              title
              sub_title
            }
          }
          value
        }
        comment {
          id
          lastName
          firstName
          commentText
          status
          email
          location
        }
        engagement {
          startDate
          endDate
          options {
            option {
              id
              title
            }
          }
          context {
            id
            title
            description
            icon
          }
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
  mutation UpdateParcous($families: [ID],$skillsAlgo: [ID],$played: Boolean,$completed: Boolean ) {
    updateParcour(families: $families, skillsAlgo: $skillsAlgo, played: $played,completed: $completed) {
      ${parcourResult}
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
