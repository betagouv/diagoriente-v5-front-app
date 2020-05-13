import { createContext } from 'react';
import { Selection } from 'requests/types';

export default createContext<{
  themeId: string;
  themeTitle: string;
  themeIcon: string;
  themeBackground: string;

  setSelection:(selection: Selection) => void;
}>({
  themeId: '',
  themeTitle: '',
  themeIcon: '',
  themeBackground: '',

  setSelection: () => {},
});
