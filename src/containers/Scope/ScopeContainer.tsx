import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDidMount } from 'hooks/useLifeCycle';
import { useLoginScope } from 'requests/scopeLogin';
import userContext from 'contexts/UserContext';
import Spinner from 'components/SpinnerXp/Spinner';
import useAuth from 'hooks/useAuth';
import localforage from 'localforage';
import { setAuthorizationBearer } from 'requests/client';

const ScopeContainer = () => {
  const history = useHistory();
  const { user, setUser } = useContext(userContext);
  const loc = useLocation();
  const query = new URLSearchParams(loc.search);
  const token = query.get('token');
  const scope = query.get('scope');
  const [loginScopeCall, setLoginState] = useAuth(useLoginScope);

  useDidMount(() => {
    if (token && scope) {
      loginScopeCall({ variables: { token, scope } });
    }
  });
  if (setLoginState.data && user) {
    if (user.id !== setLoginState.data.loginScope.user.id) {
      setAuthorizationBearer(setLoginState.data.loginScope.token.accessToken);
      setUser(setLoginState.data.loginScope.user);
      localforage.setItem('auth', JSON.stringify(setLoginState.data.loginScope));
    } else {
      history.push('/');
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: 24 }}>
        Veuillez patienter <Spinner />
      </div>
    </div>
  );
};

export default ScopeContainer;
