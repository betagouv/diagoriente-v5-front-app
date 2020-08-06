import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';
import DrawerContext from 'contexts/DrawerContext';

import { encodeUri } from 'utils/url';
import { Route as BaseRoute, Redirect, RouteProps as BaseRouteProps } from 'react-router-dom';
import PublicHeader from 'components/layout/PublicHeader/PublicHeader';
import PrivateHeader, { Props as PrivateHeaderProps } from 'components/layout/PrivateHeader/PrivateHeader';

import PublicDrawer from 'components/layout/PublicDrawer/PublicDrawer';
import PrivateDrawer from 'components/layout/PrivateDrawer/PrivateDrawer';

import SecondFooter from 'components/layout/SecondFooter/SecondFooter';
import Footer from 'components/layout/Footer/Footer';

import classNames from 'utils/classNames';

import NotFoundPage from 'components/layout/NotFoundPage';
import useStyles from './styles';

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  footer?: boolean;
  header?: boolean;
  privateHeaderProps?: Partial<PrivateHeaderProps>;
  authorizedRole?: 'user' | 'admin';
}

// u can add extra props to customise/add headers/footers/sidebars...

const Route = ({
  protected: protectedProp,
  footer,
  header,
  privateHeaderProps,
  authorizedRole,
  ...rest
}: RouteProps) => {
  const [open, setOpen] = useState(false);

  const { user } = useContext(UserContext);
  const classes = useStyles({ protectedProp });

  function renderHeader(components: { public: JSX.Element; private: JSX.Element }) {
    if (!header) return null;
    return protectedProp && user ? components.private : components.public;
  }

  if (protectedProp) {
    if (!user && authorizedRole === 'user') {
      return <Redirect to={`/login${encodeUri({ from: window.location.pathname + window.location.search })}`} />;
    }
    if (user?.role === 'admin' && authorizedRole === 'user') return <Redirect to="/admin" />;
  }

  function renderRoute() {
    if ((!user || user.role === 'user') && authorizedRole === 'admin') {
      return <NotFoundPage />;
    }

    return <BaseRoute {...rest} />;
  }

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <div className={classNames(header && classes.container, classes.column)}>
        {renderHeader({ private: <PrivateHeader {...privateHeaderProps} />, public: <PublicHeader /> })}
        {renderHeader({ private: <PrivateDrawer />, public: <PublicDrawer /> })}
        <div className={classNames(classes.page, classes.column)}>{renderRoute()}</div>
        {footer && <SecondFooter />}
        {footer && <Footer />}
      </div>
    </DrawerContext.Provider>
  );
};

Route.defaultProps = {
  header: true,
  privateHeaderProps: {},
  authorizedRole: 'user',
};

export default Route;
