import gql from 'graphql-tag';

import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from 'hooks/apollo';
import { Jobs } from 'requests/types';

export const jobsQuery = gql`
  query myJobs($environments: [String], $niveau: [String], $secteur: [String], $accessibility: [String]) {
    myJobs(environments: $environments, niveau: $niveau, secteur: $secteur, accessibility: $accessibility) {
      id
      title
      description
      search
      link
      salaire
      accessibility
      rome_codes
      secteur {
        id
        title
      }
      niveau {
        id
      }

      formations {
        id
      }
      environments {
        id
      }
      questionJobs {
        id
      }
    }
  }
`;

export interface JobsResponse {
  myJobs: Jobs[];
}
export const useJobs = (options: LazyQueryHookOptions<JobsResponse> = {}) =>
  useLocalLazyQuery<JobsResponse>(jobsQuery, options);
