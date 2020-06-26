import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';
import { parcourResult } from 'requests/parcours';
import { UserParcour } from './types';

export const addSkillMutation = gql`
  mutation AddSkill($theme: ID!, $activities: [ID]!, $competences: [skillCompetenceType]!) {
    addSkill(theme: $theme, activities: $activities, competences: $competences) {
      ${parcourResult}
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

export const deleteSkillMutation = gql`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      ${parcourResult}
    }
  }
`;

export const useDeleteSkill = (options: MutationHookOptions<{ deleteSkill: UserParcour }, { id: string }> = {}) =>
  useLocalMutation(deleteSkillMutation, options);

export interface updateSkillArguments {
  id: string;
  activities: string[];
  competences: {
    _id: string;
    value: number;
  }[];
}

export const updateSkillMutation = gql`
  mutation UpdateSkill($id: ID!, $activities: [ID], $competences: [skillCompetenceType]) {
    updateSkill(id: $id, activities: $activities, competences: $competences) {
      ${parcourResult}
    }
  }
`;

export const useUpdateSkill = (options: MutationHookOptions<{ updateSkill: UserParcour }, updateSkillArguments> = {}) =>
  useLocalMutation(updateSkillMutation, options);
