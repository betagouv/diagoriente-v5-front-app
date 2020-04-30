import React, { useContext } from 'react';
import UserContext from 'contexts/UserContext';
import { encodeUri } from 'utils/url';

import { Route as BaseRoute, Redirect, RouteProps as BaseRouteProps } from 'react-router-dom';
import Header from 'components/layout/Header/Header';

import useStyles from './styles';

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  header: boolean;
}

// u can add extra props to customise/add headers/footers/sidebars...
const Route = ({ protected: protectedProp, header, ...rest }: RouteProps) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  if (!user && protectedProp) {
    return <Redirect to={`/login${encodeUri({ from: window.location.pathname + window.location.search })}`} />;
  }

  return (
    <div className={classes.container}>
      {header && <Header />}
      <div>
        <BaseRoute {...rest} />
      </div>
    </div>
  );
};

Route.defaultProps = {
  header: true,
};

export default Route;
