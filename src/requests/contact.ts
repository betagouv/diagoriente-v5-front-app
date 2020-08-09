import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';

export const createContactlMutation = gql`
  mutation CreateContact($name: String!, $email: String!, $message: String!, $card: Upload) {
    createContact(name: $name, email: $email, message: $message, card: $card)
  }
`;
export interface createContactArguments {
  name: string;
  email: string;
  message: string;
  card?: Blob;
}

export const useCreateContact = (
  options: MutationHookOptions<{ createContact: string }, createContactArguments> = {},
) => useLocalMutation(createContactlMutation, options);
