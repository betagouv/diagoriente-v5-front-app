import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';
import DrawerContext from 'contexts/DrawerContext';

import { encodeUri } from 'utils/url';
import { Route as BaseRoute, Redirect, RouteProps as BaseRouteProps } from 'react-router-dom';
import PublicHeader from 'components/layout/PublicHeader/PublicHeader';
import PrivateHeader from 'components/layout/PrivateHeader/PrivateHeader';

import PublicDrawer from 'components/layout/PublicDrawer/PublicDrawer';
import PrivateDrawer from 'components/layout/PrivateDrawer/PrivateDrawer';

import Footer from 'components/layout/Footer/Footer';

import classNames from 'utils/classNames';

import useStyles from './styles';

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  sidebar?: boolean;
  footer?: boolean;
  header?: boolean;
}

// u can add extra props to customise/add headers/footers/sidebars...

const Route = ({
 protected: protectedProp, footer, sidebar, header, ...rest
}: RouteProps) => {
  const [open, setOpen] = useState(false);

  const { user } = useContext(UserContext);
  const classes = useStyles({ protectedProp });

  if (!user && protectedProp) {
    return <Redirect to={`/login${encodeUri({ from: window.location.pathname + window.location.search })}`} />;
  }

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <div className={classNames(classes.container, classes.column)}>
        {header && protectedProp ? <PrivateHeader /> : <PublicHeader />}
        {header && protectedProp ? <PrivateDrawer /> : <PublicDrawer />}
        <div className={classNames(classes.page, classes.column)}>
          <BaseRoute {...rest} />
        </div>
        {footer && <Footer />}
      </div>
    </DrawerContext.Provider>
  );
};

Route.defaultProps = {
  header: true,
};

export default Route;
