import { createContext } from 'react';
import { Interests } from 'requests/types';

export default createContext<{
  selectedInterest: Interests[] | null;
  setInterest:(selectedInterest: Interests[] | null) => void;
}>({
  selectedInterest: null,
  setInterest: () => {},
});
