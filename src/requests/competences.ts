import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const CompetencesQuery = gql`
  {
    competences {
      data {
        id
        title
        niveau {
          title
          sub_title
        }
      }
    }
  }
`;

export interface CompetencesResponse {
  competences: {
    data: {
      id: string;
      title: string;
      niveau: {
        title: string;
        sub_title: string;
      }[];
    }[];
  };
}

export const useCompetence = (options: QueryHookOptions<CompetencesResponse> = {}) =>
  useLocalQuery<CompetencesResponse>(CompetencesQuery, options);
