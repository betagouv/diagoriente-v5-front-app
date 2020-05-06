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

import useStyles from './styles';

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  header: boolean;
  sidebar?: boolean;
}

// u can add extra props to customise/add headers/footers/sidebars...

const Route = ({
 protected: protectedProp, header, sidebar, ...rest
}: RouteProps) => {
  const [open, setOpen] = useState(false);

  const { user } = useContext(UserContext);
  const classes = useStyles();

  if (!user && protectedProp) {
    return <Redirect to={`/login${encodeUri({ from: window.location.pathname + window.location.search })}`} />;
  }

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <div className={classes.container}>
        {protectedProp ? <PrivateHeader /> : <PublicHeader />}
        {protectedProp ? <PrivateDrawer /> : <PublicDrawer />}
        <div>
          <BaseRoute {...rest} />
        </div>
        <Footer />
      </div>
    </DrawerContext.Provider>
  );
};

Route.defaultProps = {
  header: true,
};

export default Route;
