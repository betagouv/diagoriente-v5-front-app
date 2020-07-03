import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CompanyContext from 'contexts/immersion';
import { Company } from 'requests/types';
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
  const [companies, setCompanies] = useState<Company[] | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CompanyContext.Provider value={{ companies, setCompanies }}>
        <Switch>
          <Route protected exact path="/jobs" component={JobsContainer} />
          <Route protected path="/jobs/job/:id" component={JobContainer} />
          <Route protected path="/jobs/immersion/:id" component={ImmersionContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </CompanyContext.Provider>
    </ThemeProvider>
  );
};

export default Jobs;
