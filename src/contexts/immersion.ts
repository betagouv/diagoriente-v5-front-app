import { createContext } from 'react';
import { Company } from 'requests/types';

export default createContext<{
  companies: Company[] | null;
  setCompanies:(companies: Company[] | null) => void;
}>({
  companies: null,
  setCompanies: () => {},
});
