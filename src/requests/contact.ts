import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';

export const createContactlMutation = gql`
  mutation CreateContact($name: String!, $email: String!, $message: String!) {
    createContact(name: $name, email: $email, message: $message)
  }
`;
export interface createContactArguments {
  name: string;
  email: string;
  message: string;
}

export const useCreateContact = (
  options: MutationHookOptions<{ createContact: string }, createContactArguments> = {},
) => useLocalMutation(createContactlMutation, options);
