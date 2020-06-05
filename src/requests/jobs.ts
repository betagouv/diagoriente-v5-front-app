import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const jobsQuery = gql`
  {
    jobs {
      data {
        id
        title
        description
        accessibility
      }
    }
  }
`;

export interface JobsResponse {
  jobs: {
    data: {
      id: string;
      title: string;
      description: string;
      accessibility: string;
    }[];
  };
}
export const useJobs = (options: QueryHookOptions<JobsResponse> = {}) =>
  useLocalQuery<JobsResponse>(jobsQuery, options);
