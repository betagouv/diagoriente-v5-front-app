import React from 'react';
import { Switch, useLocation } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CloseIcon from 'assets/svg/close_drawer.svg';
import NotFoundPage from 'components/layout/NotFoundPage';
import logo from 'assets/svg/diagoriente_logo_01_bg_transparent 2.svg';
import open from 'assets/svg/menu_close.svg';
import JobsContainer from './containers/jobsContainer';
import JobContainer from './containers/jobContainer';
import ImmersionContainer from './containers/imersionContainer';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFA600' },
    secondary: { main: '#FFD382' },
    background: {
      default: '#FFA600',
    },
    success: { main: '#DB8F00' },
    info: { main: '#DDCCFF' },
  },
});
const Jobs = () => {
  const location = useLocation();
  const path = location.pathname.split(/[//]/)[1];
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          protected
          exact
          path="/jobs"
          component={JobsContainer}
          privateHeaderProps={
            path === 'jobs'
              ? {
                  closeLogoIcon: logo,
                  openLogoIcon: logo,
                  closeIcon: CloseIcon,
                  openIcon: open,
                }
              : {}
          }
        />
        <Route
          protected
          path="/jobs/job/:id"
          component={JobContainer}
          privateHeaderProps={
            path === 'jobs'
              ? {
                  closeLogoIcon: logo,
                  openLogoIcon: logo,
                  closeIcon: CloseIcon,
                  openIcon: open,
                }
              : {}
          }
        />
        <Route
          protected
          path="/jobs/immersion/:id"
          component={ImmersionContainer}
          privateHeaderProps={
            path === 'jobs'
              ? {
                  closeLogoIcon: logo,
                  openLogoIcon: logo,
                  closeIcon: CloseIcon,
                  openIcon: open,
                }
              : {}
          }
        />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default Jobs;
