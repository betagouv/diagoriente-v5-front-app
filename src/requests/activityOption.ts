import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';
import { Activity } from './types';

export const addActivityOptionMutation = gql`
  mutation addActivityOption($option: String!, $id: ID!) {
    addActivityOption(option: $option, id: $id) {
      id
      title
      description
    }
  }
`;
export interface addActivityOptionArguments {
  option: string;
  id: string;
}

export const useAddActivityOption = (
  options: MutationHookOptions<{ addActivityOption: Activity }, addActivityOptionArguments> = {},
) => useLocalMutation(addActivityOptionMutation, options);
