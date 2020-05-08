import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const themesQuery = gql`
  query Themes($type: String) {
    themes(type: $type) {
      data {
        id
        title
        resources {
          icon
          backgroundColor
        }
      }
    }
  }
`;

export interface ThemesArguments {
  type?: 'professional' | 'personal';
}

export interface ThemesResponse {
  themes: {
    data: {
      id: string;
      title: string;
      resources?: { icon: string; backgroundColor: string };
    }[];
  };
}

export const useThemes = (options: MutationHookOptions<ThemesResponse, ThemesArguments> = {}) =>
  useLocalQuery<ThemesResponse, ThemesArguments>(themesQuery, options);
