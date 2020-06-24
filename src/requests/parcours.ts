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

export const updateFamiliesParcours = gql`
  mutation UpdateFamiliesParcous($families: [ID]!) {
    updateParcour(families: $families) {
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
export interface UpdateFamiliesArgument {
  families: string[];
}
export const useUpdateFamiliesParcour = (
  options: MutationHookOptions<{ updateParcour: UserParcour }, UpdateFamiliesArgument> = {},
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
export interface UpdatePlayArgument {
  played: boolean;
}
export interface UpdatePlayData {
  parcoursUpdated: UserParcour;
}
export const useUpdatePlayParcour = (
  options: MutationHookOptions<{ updateParcour: UpdatePlayData }, UpdatePlayArgument> = {},
) => useLocalMutation(updatePlayParcours, options);

export const updateCompletedParcours = gql`
  mutation UpdateCompletedParcous($completed: Boolean!) {
    updateParcour(completed: $completed) {
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
export interface UpdateCompletedArgument {
  completed: boolean;
}
export const useUpdateCompletedParcour = (
  options: MutationHookOptions<{ updateParcour: UserParcour }, UpdateCompletedArgument> = {},
) => useLocalMutation(updateCompletedParcours, options);
