import { createContext } from 'react';

export default createContext<{
  clearMessage: boolean;
  setClearMessage: React.Dispatch<React.SetStateAction<boolean>>
}>({
  clearMessage: false,
  setClearMessage: () => {},
});
