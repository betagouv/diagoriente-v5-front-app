import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ClearMessageContext from 'contexts/messageContext';

import NotFoundPage from 'components/layout/NotFoundPage';
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
  const [clearMessage, setClearMessage] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <ClearMessageContext.Provider value={{ clearMessage, setClearMessage }}>
        <Switch>
          <Route protected exact path="/jobs" component={JobsContainer} />
          <Route protected path="/:id" component={ImmersionContainer} />
          <Route protected path="/immersion/:id" component={ImmersionContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </ClearMessageContext.Provider>
    </ThemeProvider>
  );
};

export default Jobs;
