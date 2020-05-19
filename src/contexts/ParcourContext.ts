import { createContext } from 'react';
import { UserParcour } from 'requests/types';

export default createContext<{ parcours: UserParcour | null; setParcours:(parcours: UserParcour) => void }>({
  parcours: null,
  setParcours: () => {},
});
