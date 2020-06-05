import { createContext } from 'react';
import { Families } from 'requests/types';

export default createContext<{
  selectedInterest: Families[] | null;
  setInterest:(selectedInterest: Families[] | null) => void;
}>({
  selectedInterest: null,
  setInterest: () => {},
});
