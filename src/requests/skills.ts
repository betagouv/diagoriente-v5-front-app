import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';
import { UserParcour } from './types';

export const addSkillMutation = gql`
  mutation AddSkill($theme: ID!, $activities: [ID]!, $competences: [skillCompetenceType]!) {
    addSkill(theme: $theme, activities: $activities, competences: $competences) {
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
export interface addSkillArguments {
  theme: string;
  activities: string[];
  competences: {
    _id: string;
    value: number;
  }[];
}

export const useAddSkill = (options: MutationHookOptions<{ addSkill: UserParcour }, addSkillArguments> = {}) =>
  useLocalMutation(addSkillMutation, options);
