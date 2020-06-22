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

export const jobQuery = gql`
  query Job($id: ID!) {
    job(id: $id) {
      id
      title
      description
      accessibility
      competences {
        _id {
          id
          title
        }
        weight
      }
      interests {
        _id {
          nom
          id
        }
        __typename
      }
    }
  }
`;

export interface JobResponse {
  job: {
    id: string;
    title: string;
    description: string;
    accessibility: string;
    competences: { _id: { id: string; title: string }; weight: number }[];
    interests: { _id: { nom: string; id: string }; __typename: string }[];
  };
}
export const useJob = (options: LazyQueryHookOptions<JobResponse> = {}) =>
  useLocalLazyQuery<JobResponse>(jobQuery, options);
