import gql from 'graphql-tag';
import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from '../hooks/apollo';
import { User } from './types';

export const MyGroupInfoQuery = gql`
  query myGroup($page: Int, $perPage: Int, $filterFormation: String, $isRecommended: Boolean, $region: String,$search:String) {
    myGroup(
      page: $page
      perPage: $perPage
      filterFormation: $filterFormation
      isRecommended: $isRecommended
      region: $region,
      search:$search
    ) {
      perPage
      page
      count
      totalPages
      data {
        id
        profile {
          firstName
          lastName
        }
        email
        location
        wc2023 {
          formation
          quality
          comment
          degree
          perimeter
        }
        contextRegional {
          _id
          label
        }
        addressCodes {
          postCode
          cityCode
        }
        wc2023Affectation {
          status
          specialite
          advisorDecision
          finalClub {
            id
            name
          }
          finalSendMail
          staps
          desengagement
          advisorSelection {
            id
            name
            club_code
            fnv1a32_hash
            capacity {
              bac
              bac1
              bac2
              bac4
              bac3
              bac5
              pasbac1
              pasbac5
              bacoubac3
              bac3oubac5
              random
            }
            referrer {
              firstName
              lastName
              email
            }
          }
          recommendation {
            status
            club {
              name
              id
              city
              licensed_text
              fnv1a32_hash
              capacity {
                bac
                bac1
                bac2
                bac4
                bac3
                bac5
                pasbac1
                pasbac5
                bacoubac3
                bac3oubac5
                random
              }
              referrer {
                firstName
                lastName
                email
              }
            }
          }
        }
        validateCampus
      }
    }
  }
`;

export interface MyGroupInfoResponse {
  myGroup: {
    data: {
      id: string;
      profile: {
        firstName: string;
        lastName: string;
      };
      email: string;
      location: string;
      wc2023: {
        formation: string;
        quality: string;
        comment: string;
      };
      addressCodes: {
        cityCode: string;
        postCode: string;
      };
      wc2023Affectation: {
        specialite: string;
        advisorDecision: string;
        desengagement: boolean;
        staps: boolean;
        advisorSelection: {
          name: string;
          club_code: string;
        }[];
        recommendation: {
          status: string;
          club: {
            name: string;
          };
        };
        finalSendMail: boolean;
      };
      validateCampus: string;
    }[];
    page: number;
    perPage: number;
    count: number;
    totalPages: number;
  };
}

export const useMyGroup = (options: LazyQueryHookOptions<MyGroupInfoResponse> = {}) =>
  useLocalLazyQuery<MyGroupInfoResponse>(MyGroupInfoQuery, options);

export const groupesQuery = gql`
  query Groupes($codes: [String]) {
    groupes(codes: $codes) {
      data {
        code
        advisorId {
          email
          profile {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

interface GroupesParams {
  codes?: string[];
}

interface GroupesResponse {
  groupes: {
    data: { code: string; advisorId: User }[];
  };
}

export const useGroups = (options: LazyQueryHookOptions<GroupesResponse, GroupesParams> = {}) =>
  useLocalLazyQuery(groupesQuery, options);
