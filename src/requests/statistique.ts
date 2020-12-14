import gql from 'graphql-tag';

import { QueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';

import { Stat } from './types';

export const CreateStat = gql`
  mutation AddStat($userId: ID!, $nbrCard: [cardItemInput]!, $nbrSearch: [searchItemInput]!) {
    createStat(userId: $userId, nbrCard: $nbrCard, nbrSearch: $nbrSearch) {
      id
      nbrCard {
        jobId
      }
      nbrSearch {
        type
        jobId
      }
    }
  }
`;

interface AddStatParams {
  userId: string;
  nbrCard: { date: Date; jobId: string }[];
  nbrSearch: { date: Date; jobId: string; type: string }[];
}

export const useAddStat = (options?: MutationHookOptions<{ createStat: Stat }, AddStatParams>) =>
  useLocalMutation(CreateStat, options);

export const UpdateStat = gql`
  mutation UpdateStats($userId: ID!, $type: String, $jobId: ID!) {
    updateStat(userId: $userId, type: $type, jobId: $jobId) {
      id
      nbrCard {
        jobId
      }
      nbrSearch {
        type
        jobId
      }
    }
  }
`;

interface UpdateStatParams {
  type?: string;
  jobId: string;
  userId: string;
}
export const useUpdarStat = (options?: MutationHookOptions<{ updateStat: Stat }, UpdateStatParams>) =>
  useLocalMutation(UpdateStat, options);
