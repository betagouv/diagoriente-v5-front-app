import React, { useState } from 'react';
import { useInterests } from 'requests/interests';
import Avatar from 'components/common/Avatar/Avatar';
import RestLogo from 'components/common/Rest/Rest';
import TitleImage from 'components/common/Title/TitleImage';
import Trait from 'assets/images/trait_violet.png';
import useStyles from './styles';

const ParcoursInteret = () => {
  const classes = useStyles();
  // const [selectedInterests, setSelectedInterest] = useState([]);
  const { data, loading } = useInterests();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.title}>Mes CENTRES D&lsquo;INTERET</div>
          <RestLogo color="#420FAB" label="Annuler" />
        </div>
        <div className={classes.wrapper}>
          <TitleImage
            title="Sélectionne 5 centres d’intérêts"
            color="#424242"
            height="150px"
            image={Trait}
            size={18}
            font="Andika New Basic"
            width={190}
          />
          <div className={classes.circleContainer}>
            {loading && <div className={classes.loadingContainer}>...loading</div>}
            {data?.interests.data.map((e) => (
              <Avatar
                key={e.id}
                title={e.nom}
                size={85}
                titleClassName={classes.marginTitle}
                className={classes.circle}
              />
            ))}
          </div>
        </div>
        <div className={classes.footer}>text</div>
      </div>
    </div>
  );
};

export default ParcoursInteret;
