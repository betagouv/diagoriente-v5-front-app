import { useContext, useEffect } from 'react';
import { MutationHookOptions, MutationTuple } from '@apollo/react-hooks';
import localforage from 'localforage';

import { setAuthorizationBearer } from 'requests/client';
import { useGetUserParcour } from 'requests/parcours';
import { User, Token } from 'requests/types';

import ParcourContext from 'contexts/ParcourContext';
import UserContext from 'contexts/UserContext';

function extractAuth(data: { [key: string]: { user: User; token: Token } }) {
  const keys = Object.keys(data);
  return data[keys[0]];
}

function useAuth<Arguments, Result extends { [key: string]: { user: User; token: Token } }>(
  fn: (options?: MutationHookOptions<Result, Arguments>) => MutationTuple<Result, Arguments>,
  stayConnected: boolean = true,
): MutationTuple<Result, Arguments> {
  const { setParcours } = useContext(ParcourContext);
  const { setUser } = useContext(UserContext);
  const [call, state] = fn();
  const [parcourCall, parcourState] = useGetUserParcour();

  useEffect(() => {
    if (state.data) {
      const result = extractAuth(state.data);
      setAuthorizationBearer(result.token.accessToken);
      parcourCall();
    }
    // eslint-disable-next-line
  }, [state.data]);

  useEffect(() => {
    if (parcourState.data && state.data) {
      setParcours(parcourState.data.userParcour);
      const result = extractAuth(state.data);
      if (!stayConnected) {
        delete result.token.refreshToken;
      }
      localforage.setItem('auth', JSON.stringify(result));
      setUser(result.user);
    }
    // eslint-disable-next-line
  }, [parcourState.data]);

  return [call, { ...state, error: state.error || parcourState.error }];
}

export default useAuth;
