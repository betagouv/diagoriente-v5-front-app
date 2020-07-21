import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';

export const addSkillCommentlMutation = gql`
  mutation AddSkillComment($firstName: String!, $lastName: String!, $email: String!, $text: String!, $id: ID!) {
    addSkillComment(firstName: $firstName, lastName: $lastName, email: $email, text: $text, id: $id) {
      id
    }
  }
`;
export interface addSkillCommentArguments {
  firstName: string;
  lastName: string;
  email: string;
  text: string;
  id: string;
}

export const useAddSkillComment = (
  options: MutationHookOptions<{ addSkillComment: { id: string } }, addSkillCommentArguments> = {},
) => useLocalMutation(addSkillCommentlMutation, options);

export const updateSkillComment = gql`
  mutation UpdateSkillComment($id: ID!, $commentText: String!, $status: String!, $location: String) {
    updateSkillComment(id: $id, commentText: $commentText, status: $status, location: $location) {
      id
    }
  }
`;

export interface updateSkillCommentArguments {
  commentText: string;
  status: 'accepted' | 'refused';
  location: string;
  id: string;
}

export const useUpdateSkillComment = (
  options: MutationHookOptions<{ addSkillComment: { id: string } }, updateSkillCommentArguments> = {},
) => useLocalMutation(updateSkillComment, options);
