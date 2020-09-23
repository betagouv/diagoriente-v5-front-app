import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { Link, RouteComponentProps } from 'react-router-dom';
import { useCompetences } from 'requests/competences';
import { Competence, Theme } from 'requests/types';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import RestLogo from 'components/common/Rest/Rest';
import Grid from '@material-ui/core/Grid';
import NextButton from 'components/nextButton/nextButton';
import Button from 'components/button/Button';
import CancelButton from 'components/cancelButton/CancelButton';
import Spinner from 'components/SpinnerXp/Spinner';

import Child from 'components/ui/ForwardRefChild/ForwardRefChild';
import Popup from 'components/common/Popup/Popup';

import blueline from 'assets/svg/blueline.svg';

import classNames from 'utils/classNames';
import { decodeUri } from 'utils/url';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  competences: Competence[];
  setCompetences: (Competences: Competence[]) => void;
  theme: Theme | null;
  isCreate?: boolean;
}

const ExperienceCompetence = ({ match, competences, setCompetences, theme, history, isCreate, location }: Props) => {
  const classes = useStyles();
  const { data, loading } = useCompetences({ variables: theme?.type === 'engagement' ? { type: 'engagement' } : {} });
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const { redirect } = decodeUri(location.search);

  const addCompetence = (competence: Competence) => {
    if (competences.length < 4) {
      setCompetences([...competences, competence]);
    } else if (competences.length === 4) {
      setText('Tu as déjà choisi 4 compétences');
      setOpen(true);
    }
  };

  const deleteCompetence = (id: string) => {
    setCompetences(competences.filter((comp) => comp.id !== id));
  };
  const handleClose = () => {
    setOpen(false);
  }
  const onclickBtn = () => {
    if (competences.length === 0) {
      setText('Tu as déjà choisi 4 compétences');
      setOpen(true);
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title
            title={
              theme && theme.type === 'engagement' ? 'MES EXPERIENCES D’ENGAGEMENT' : 'MES EXPERIENCES PERSONNELLES'
            }
            color="#223A7A"
            size={26}
          />
          <RestLogo
            onClick={() => {
              let path = '/experience';
              if (!isCreate) path = `/profile/experience?type=${theme && theme.type}`;
              else if (redirect) path = redirect;
              history.replace(path);
            }}
            color="#4D6EC5"
            label="Annuler"
          />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="3." image={blueline} color="#223A7A" width={180} />
          <p className={classes.title}>
            En rapport avec ces activités, quelles sont
            <br />
            <strong>les compétences </strong>
            que tu mets en oeuvre ?
            <br />
            <small>(4 choix maximum) </small>
          </p>
          <Grid className={classes.circleContainer} container spacing={3}>
            {loading && (
              <div className={classes.loadingContainer}>
                {' '}
                <Spinner />
              </div>
            )}

            {data?.competences.data.map((comp, index) => {
              const selected = competences.find((e) => e.id === comp.id);
              const tooltip = theme?.tooltips.find((e) => e.competenceId === comp.id);

              return (
                <Grid key={comp.id} item xs={12} md={6}>
                  <Tooltip
                    open={!tooltip?.tooltip ? false : undefined}
                    title={<Child key={index}>{tooltip && tooltip.tooltip}</Child>}
                    arrow
                    placement="left"
                  >
                    <Button
                      childrenClassName={classes.margin}
                      className={classNames(classes.competences, selected && classes.selectedCompetence)}
                      onClick={() => (!selected ? addCompetence(comp as any) : deleteCompetence(comp.id))}
                    >
                      {comp.title}
                    </Button>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
          <Link
            to={`/experience/skill/${match.params.themeId}/competencesValues${location.search}`}
            className={classes.hideLine}
          >
            <NextButton disabled={!competences.length || competences.length > 4} />
          </Link>
        </div>

        <Link
          to={`/experience/skill/${match.params.themeId}/activities${location.search}`}
          className={classes.btnpreced}
        >
          <CancelButton />
          Précedent
        </Link>
      </div>
      <Popup open={open} handleClose={handleClose} iconClassName={classes.iconClassName}>
        <div className={classes.popupContainer}>
          <p className={classes.popupDescription}>{text}</p>
          <Button className={classes.incluse} onClick={handleClose}>
            compris
          </Button>
        </div>
      </Popup>
    </div>
  );
};
export default ExperienceCompetence;
