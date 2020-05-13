import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
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

export const useThemes = (options: QueryHookOptions<ThemesResponse, ThemesArguments> = {}) =>
  useLocalQuery<ThemesResponse, ThemesArguments>(themesQuery, options);

export const themeQuery = gql`
  query Theme($id: ID!) {
    theme(id: $id) {
      id
      title
      resources {
        icon
        backgroundColor
      }
      activities {
        id
        title
        description
      }
    }
  }
`;

export interface ThemeResponse {
  theme: {
    id: string;
    title: string;
    resources?: { icon: string; backgroundColor: string };
    activities: {
      id: string;
      title: string;
      description: string;
    }[];
  };
}

export interface ThemeArguments {
  id: string;
}
export const useTheme = (options: QueryHookOptions<ThemeResponse, ThemeArguments> = {}) =>
  useLocalQuery<ThemeResponse, ThemeArguments>(themeQuery, options);
