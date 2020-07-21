import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalQuery } from 'hooks/apollo';
import { parcourResult } from 'requests/parcours';
import { UserParcour, PublicSkill } from './types';

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

export const getSkillQuery = gql`
  query PublicSkill($token: String!) {
    publicSkill(token: $token) {
      id
      user {
        id
        firstName
        lastName
      }
      theme {
        id
        title
      }
      competences {
        _id {
          id
          niveau {
            title
            sub_title
          }
          title
        }
        value
      }
      comment {
        status
        id
        email
        lastName
        firstName
      }
    }
  }
`;

export const useGetSkill = (options: QueryHookOptions<{ publicSkill: PublicSkill }, { token: string }>) =>
  useLocalQuery(getSkillQuery, options);
