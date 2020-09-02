import { useContext, useEffect } from 'react';
import { MutationHookOptions, MutationTuple } from '@apollo/react-hooks';
import localforage from 'localforage';

import { setAuthorizationBearer } from 'requests/client';
import { useGetUserParcour } from 'requests/parcours';
import { User, Token } from 'requests/types';
import { graphQLResult } from 'utils/graphql';

import ParcourContext from 'contexts/ParcourContext';
import UserContext from 'contexts/UserContext';

function useAuth<Arguments, Result extends { [key: string]: { user: User; token: Token } }>(
  fn: (options?: MutationHookOptions<Result, Arguments>) => MutationTuple<Result, Arguments>,
  stayConnected: boolean = true,
): MutationTuple<Result, Arguments> {
  const { setParcours } = useContext(ParcourContext);
  const { setUser } = useContext(UserContext);
  const [call, state] = fn();
  const [parcourCall, parcourState] = useGetUserParcour();

  function persistUser(data: { user: User; token: Token }) {
    const result = { ...data };
    if (!stayConnected) {
      delete result.token.refreshToken;
    }
    localforage.setItem('auth', JSON.stringify(result));
  }

  useEffect(() => {
    if (state.data) {
      const result = graphQLResult(state.data);
      setAuthorizationBearer(result.token.accessToken);
      persistUser(result);
      if (result.user.role === 'user') parcourCall();
      else setUser(result.user);
    }
    // eslint-disable-next-line
  }, [state.data]);

  useEffect(() => {
    if (parcourState.data && state.data) {
      const result = graphQLResult(state.data);
      setParcours(parcourState.data.userParcour);
      setUser(result.user);
    }
    // eslint-disable-next-line
  }, [parcourState.data]);

  return [call, { ...state, error: state.error || parcourState.error }];
}

export default useAuth;
