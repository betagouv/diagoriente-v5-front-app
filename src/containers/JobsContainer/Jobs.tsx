import React, {
 useEffect, useState, useMemo, useContext,
} from 'react';
import { Switch, useLocation } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useJobs } from 'requests/jobs';
import { useDidMount } from 'hooks/useLifeCycle';
import { useAccessibility } from 'requests/accessibility';
import { useTypeJob } from 'requests/environment';
import { useSecteurs } from 'requests/themes';
import { useLocation as locationcall } from 'requests/location';
import ParcoursContext from 'contexts/ParcourContext';

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
  const { parcours } = useContext(ParcoursContext);

  const [domaine, setDomaine] = useState<string[] | undefined>([]);
  const [search, setSearch] = useState<string | undefined>('');
  const [environments, setJob] = useState<string[] | undefined>([]);
  const [accessibility, setAccessibility] = useState<string[] | undefined>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const variables: { search?: string; niveau?: string[]; environments?: string[]; secteur?: string[] } = {};
  if (accessibility?.length !== 0) variables.niveau = accessibility;
  if (environments?.length !== 0) variables.environments = environments;
  if (domaine?.length !== 0) variables.secteur = domaine;
  if (domaine) variables.search = search;
  const [loadJobs, { data, loading, refetch }] = useJobs({ variables, fetchPolicy: 'network-only' });
  const [accessibilityCall, { data: listAccData }] = useAccessibility();
  const [typeCall, { data: listTypeData }] = useTypeJob();
  const [secteurCall, { data: listSecteurData }] = useSecteurs({ variables: { type: 'secteur' } });
  const [locationCall, { data: listLocation }] = locationcall({ variables: { search: selectedLocation } });
  const jobs = useMemo(() => data?.myJobs || [], [data]);
  useDidMount(() => {
    loadJobs();
    accessibilityCall();
    typeCall();
    secteurCall();
  });

  useEffect(() => {
    if (parcours?.completed) {
      const fn = data ? refetch : loadJobs;
      fn();
    }
    // eslint-disable-next-line
  }, [parcours]);
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          protected
          render={() => (
            <JobsContainer
              jobs={jobs}
              domaine={domaine}
              search={search}
              environments={environments}
              accessibility={accessibility}
              loading={loading}
              setDomaine={setDomaine}
              setSearch={setSearch}
              setJob={setJob}
              setAccessibility={setAccessibility}
              listAccData={listAccData?.accessibilities.data}
              listTypeData={listTypeData?.environments.data}
              listSecteurData={listSecteurData?.themes.data}
            />
          )}
          exact
          path="/jobs"
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
          render={(props) => (
            <JobContainer
              {...props}
              jobs={jobs}
              locationCall={locationCall}
              listLocation={listLocation?.location}
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
            />
          )}
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
          render={(props) => (
            <ImmersionContainer
              {...props}
              jobs={jobs}
              locationCall={locationCall}
              listLocation={listLocation?.location}
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
            />
          )}
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
