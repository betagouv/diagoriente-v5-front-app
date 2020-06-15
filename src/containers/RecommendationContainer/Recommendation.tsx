import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'components/layout/NotFoundPage';
import FirstRecommendation from './components/FirstRecommendation/FirstRecommendation';
import SecondRecommendation from './components/SecondRecommendation/SecondRecommendation';
import DoneRecommendation from './components/DoneRecommendation/DoneRecommendation';

const skill = {
  id: '5ed8f73199310d09cd6f1d4e',
  theme: {
    title: 'Entretien de locaux et de surfaces',
    id: '5c49d8c6991d115f7f4a6a11',
    type: 'professional',
    resources: { icon: null, backgroundColor: '#fff' },
    date: ' 23.07.19 - 30.08.19',
  },
  activities: [
    {
      title: 'Baliser les zones glissantes',
      description:
        'Je fais des tâches variées sur tablettes, smartphones, PC : créer des fichiers, déplacer des dossiers, installer une application...',
      id: '5c4ec16e43a97a5765a846f4',
    },
    {
      title: 'Utiliser le numérique',
      description:
        'Je fais des tâches variées sur tablettes, smartphones, PC : créer des fichiers, déplacer des dossiers, installer une application...',
      id: '5c4ec16e43a97a5765a846f6',
    },
    {
      title: 'Prendre en compte les codes sociaux',
      description:
        'Je fais des tâches variées sur tablettes, smartphones, PC : créer des fichiers, déplacer des dossiers, installer une application...',
      id: '5c4ec16e43a97a5765a846f8',
    },
  ],
  competences: [
    {
      id: '5c48919e310d6b50407b846b',
      title: 'Organiser son activité',
      value: 1,
      niveau: 'Jorganise des activités pour les autres : amis, familles, entrainement de sport..',
    },
    {
      id: '5c48919e310d6b50407b846a',
      title: 'Utiliser le numérique',
      value: 3,
      niveau:
        'Je fais des tâches variées sur tablettes, smartphones, PC : créer des fichiers, déplacer des dossiers, installer une application..',
    },
    {
      id: '5c48919e310d6b50407b846c',
      title: 'Prendre en compte ﻿les codes sociaux',
      value: 4,
      niveau:
        'Je mets en place une manière de fonctionner par ex : au sein d’un groupe de sport, dans un camp, au travail...',
    },
  ],
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#7AE6FF' },
    secondary: { main: '#00CFFF' },
    info: { main: '#011A5E' },
    background: {
      default: '#00B2DB',
    },
  },
});

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/recommendation" render={(props) => <FirstRecommendation {...props} skill={skill} />} />
        <Route exact path="/recommendation/complete" component={SecondRecommendation} />
        <Route exact path="/recommendation/location/done" component={DoneRecommendation} />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default Recommendation;
