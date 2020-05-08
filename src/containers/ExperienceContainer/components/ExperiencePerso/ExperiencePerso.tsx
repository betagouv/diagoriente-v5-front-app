import React from 'react';
import Title from 'components/common/Title/TitleImage';
import Avatar from 'components/common/Avatar/Avatar';

import blueline from 'assets/svg/blueline.svg';
import { useThemes } from 'requests/themes';
import Typography from '@material-ui/core/Typography/Typography';
import useStyles from './styles';

const ExperiencePerso = () => {
  const classes = useStyles();
  const { data } = useThemes({ variables: { type: 'personal' } });
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>MES EXPERIENCES PERSONNELLES</h1>
      <div className={classes.themeContainer}>
        <Title title="1" image={blueline} color="#223A7A" height="80px" />
        <Typography>
          Choisis un
          <strong> thème :</strong>
        </Typography>
        <div className={classes.circleContainer}>
          {data?.themes.data.map((e) => {
           return <Avatar key={e.id} title={e.title} size={55} marginTop="15px" marginBottom="15px" className={classes.circle} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default ExperiencePerso;
