import React, { useEffect, useState } from 'react';

import usePdf from 'hooks/usePdf';

import { encodeUri } from 'utils/url';
import Paper from '@material-ui/core/Paper/Paper';
import carte from 'assets/svg/carte.svg';
import useParcourSkills from 'hooks/useParcourSkills';
import Arrow from '../../components/Arrow/Arrow';
import CardHeader from './components/CardHeader/CardHeader';
import CardIcons from './components/CardIcons/CardIcons';
import CardCompetence from './components/CardCompetence/CardCompetence';
import CardSkills from './components/CardSkills/CardSkills';

import useStyles from './styles';

const CardContainer = () => {
  const classes = useStyles();
  const skillsState = useParcourSkills();
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPrint, setLoadingPrint] = useState(false);

  const [element, createPdf, pdf] = usePdf();

  const skills = skillsState.data?.skills.data || [];
  console.log('skills', skills);
  const onClickIcon = (i: string) => {
    setType(i);
    if (i === 'print') setLoadingPrint(true);
    if (i === 'download') setLoading(true);
    createPdf();
  };
  const icons = (
    <CardIcons onDownload={onClickIcon} onPrint={onClickIcon} fetching={loading} fetchingPrint={loadingPrint} />
  );

  useEffect(() => {
    if (pdf) {
      if (type === 'download') {
        pdf.save('competences.pdf');
        setLoading(false);
        setType('');
      } else if (type === 'print') {
        pdf.autoPrint();
        pdf.output('dataurlnewwindow');
        setLoadingPrint(false);
        setType('');
      }
    }
  }, [pdf, type]);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Arrow />
        <div className={classes.headerTitle}>
          <img className={classes.headerImage} src={carte} alt="" />
          <span className={classes.title}>CARTE DE COMPÉTENCES</span>
        </div>
        {icons}
      </div>
      <Paper className={classes.card}>
        <CardHeader />
        <div className={classes.competenceContainer}>
          <CardCompetence
            title="COMPÉTENCES TRANSVERSALES"
            description="En relation avec les expériences personnelles et professionnelles"
            type="tranversale"
          />
          {skills.filter((s) => s.theme.type === 'engagement').length !== 0 && (
            <CardCompetence
              title="COMPÉTENCES D’ENGAGEMENT"
              description="En relation avec les expériences d’engagement (Service civique, Service National Universel...)"
              type="engagement"
            />
          )}
        </div>
        <CardSkills
          skills={skills.filter((skill) => skill.theme && skill.theme.type === 'personal')}
          title="Expériences personnelles"
          emptyMessage="Tu n’as pas encore renseigné d'expérience personnelle"
          emptyButton="J’ajoute une expérience perso"
          path={`/experience/theme${encodeUri({ redirect: '/profile/card' })}`}
        />
        <CardSkills
          skills={skills.filter((skill) => skill.theme && skill.theme.type === 'professional')}
          title="Expériences professionnelles"
          emptyMessage="Tu n’as pas encore renseigné d'expérience professionnelle"
          emptyButton="J’ajoute une expérience pro"
          path={`/experience/theme-pro${encodeUri({ redirect: '/profile/card', type: 'professional' })}`}
        />
        <CardSkills
          skills={skills.filter((skill) => skill.theme && skill.theme.type === 'engagement')}
          title="Expériences D’ENGAGEMENT"
          emptyMessage="Tu n’as pas encore renseigné d'expérience d'engagement"
          emptyButton="J’ajoute une expérience d'engagement"
          path={`/experience/theme?type=engagement${encodeUri({ redirect: '/profile/card', type: 'engagement' })}`}
        />
      </Paper>
      <div className={classes.footerIcons}>{icons}</div>
      {element}
    </div>
  );
};

export default CardContainer;
