import { createContext } from 'react';

export default createContext({
  open: false,
  setOpen: (() => {}) as (open: boolean) => void,
});
