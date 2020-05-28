import gql from 'graphql-tag';

import { LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery, useLocalMutation } from 'hooks/apollo';

import { UserParcour } from './types';

export const getUserParcourQuery = gql`
  {
    getUserParcour {
      id
      played
      completed
      families {
        id
        nom
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

export const updateFamiliesParcours = gql`
  mutation UpdateFamiliesParcous($families: [ID]!) {
    updateParcour(families: $families) {
      families {
        id
        nom
      }
    }
  }
`;
export interface UpdateData {
  families: string[];
}
export interface UpdateFamiliesArgument {
  families: string[];
}
export const useUpdateFamiliesParcour = (
  options: MutationHookOptions<{ updateParcour: UpdateData }, UpdateFamiliesArgument> = {},
) => useLocalMutation(updateFamiliesParcours, options);

export const updateSkillsParcours = gql`
  mutation UpdateSkillsParcous($skillsAlgo: [ID]!) {
    updateParcour(skillsAlgo: $skillsAlgo) {
      skillsAlgo {
        id
      }
    }
  }
`;
export interface UpdateSkillsData {
  skillsAlgo: string[];
}
export interface UpdateSkillsArgument {
  skillsAlgo: string[];
}
export const useUpdateSkillsParcour = (
  options: MutationHookOptions<{ updateParcour: UpdateSkillsData }, UpdateSkillsArgument> = {},
) => useLocalMutation(updateSkillsParcours, options);

export const updatePlayParcours = gql`
  mutation UpdatePlayParcous($played: Boolean!) {
    updateParcour(played: $played) {
      played
    }
  }
`;
export interface UpdatePlayData {
  played: boolean;
}
export const useUpdatePlayParcour = (options: MutationHookOptions<{ updateParcour: UpdatePlayData }> = {}) =>
  useLocalMutation(updatePlayParcours, options);
