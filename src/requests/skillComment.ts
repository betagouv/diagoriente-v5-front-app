import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';
import { Skill } from './types';

export const addSkillCommentlMutation = gql`
  mutation AddSkillComment($firstName: String!, $lastName: String!, $email: String!, $text: String!, $id: ID!) {
    addSkillComment(firstName: $firstName, lastName: $lastName, email: $email, text: $text, id: $id) {
      id
      played
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
export interface addSkillCommentArguments {
  firstName: string;
  lastName: string;
  email: string;
  text: string;
  id: string;
}

export const useAddSkillComment = (
  options: MutationHookOptions<{ addSkillComment: Skill }, addSkillCommentArguments> = {},
) => useLocalMutation(addSkillCommentlMutation, options);
