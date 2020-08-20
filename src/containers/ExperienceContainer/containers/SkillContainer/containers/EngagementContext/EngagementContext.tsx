import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useContext } from 'requests/context';
import Grid from '@material-ui/core/Grid';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import NextButton from 'components/nextButton/nextButton';
import CancelButton from 'components/cancelButton/CancelButton';

import RestLogo from 'components/common/Rest/Rest';

import blueline from 'assets/svg/blueline.svg';
import Context from './components/Context/Context';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  setContext: (e: string) => void;
  contextCheck: string;
}
const EngagementContext = ({
 history, setContext, contextCheck, match, location,
}: Props) => {
  const classes = useStyles();

  const { data } = useContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setContext(e.target.checked ? id : '');
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title="MES EXPÉRIENCES D’ENGAGEMENT" color="#223A7A" size={26} />
          <RestLogo
            onClick={() => {
              const path = '/experience';
              history.replace(path);
            }}
            color="#4D6EC5"
            label="Annuler"
          />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="5." image={blueline} color="#223A7A" width={180} />
          <p className={classes.title}>
            Dans quel cadre s’est déroulée cette expérience
            <br />
            d’engagement
            {' '}
            <br />
          </p>
          <Grid container spacing={0} className={classes.contextContainer}>
            {data?.contexts.data.map((context) => (
              <Context
                title={context.title}
                checked={context.id === contextCheck}
                handleChange={(e) => handleChange(e, context.id)}
                icon={context.icon}
                key={context.id}
              />
            ))}
          </Grid>
          <Link to={`/experience/skill/${match.params.themeId}/date${location.search}`} className={classes.hideLine}>
            <NextButton />
          </Link>
        </div>

        <Link
          to={`/experience/skill/${match.params.themeId}/competencesValues${location.search}`}
          className={classes.btnpreced}
        >
          <CancelButton />
          Précedent
        </Link>
      </div>
    </div>
  );
};
export default EngagementContext;
