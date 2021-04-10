import React, { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDidMount } from 'hooks/useLifeCycle';
import { useLoginScope } from 'requests/scopeLogin';
import { User, Token } from 'requests/types';
import UserContext from 'contexts/UserContext';
import localforage from 'localforage';
import Spinner from 'components/SpinnerXp/Spinner';
import { setAuthorizationBearer } from 'requests/client';

function persistUser(data: { user: User; token: Token }) {
  const result = { ...data };
  localforage.setItem('auth', JSON.stringify(result));
}

const ScopeContainer = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const loc = useLocation();
  const query = new URLSearchParams(loc.search);
  const token = query.get('token');
  const scope = query.get('scope');
  const [loginScopeCall, setLoginState] = useLoginScope();

  useDidMount(() => {
    if (token && scope) {
      loginScopeCall({ variables: { token, scope } });
    }
  });
  useEffect(() => {
    if (setLoginState.data) {
      setAuthorizationBearer(setLoginState.data.loginScope.token.accessToken);
      persistUser(setLoginState.data.loginScope);
      setUser(setLoginState.data.loginScope.user);
      history.push('/');
    }
  });

  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: 24 }}>
        Veuillez patienter <Spinner />
      </div>
    </div>
  );
};

export default ScopeContainer;
