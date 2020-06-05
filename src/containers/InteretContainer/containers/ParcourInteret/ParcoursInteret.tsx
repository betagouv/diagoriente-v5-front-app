import React, { useState, useContext, useMemo } from 'react';
import { useFamilies } from 'requests/interests';
import Button from 'components/button/Button';
import { Families } from 'requests/types';
import { Link } from 'react-router-dom';
import Avatar from 'components/common/Avatar/Avatar';
import RestLogo from 'components/common/Rest/Rest';
import InterestLogo from 'assets/svg/interest.svg';
import PlaceHolder from 'containers/InteretContainer/components/placeholderInterest/Placeholder';
import Arrow from 'assets/svg/arrow';
import interestContext from 'contexts/InterestSelected';
import parcoursContext from 'contexts/ParcourContext';
import { groupBy } from 'lodash';
import Slider from 'components/Slider/Slider';

import FamileSelected from '../../components/SelectedFamille/SelectedFamille';
import useStyles from './styles';

const ParcoursInteret = () => {
  const classes = useStyles();
  const { setInterest, selectedInterest } = useContext(interestContext);
  const { parcours } = useContext(parcoursContext);
  const [selectedInterests, setSelectedInterest] = useState(
    selectedInterest || parcours?.families || ([] as Families[]),
  );
  setInterest(selectedInterests);

  const { data, loading } = useFamilies();
  const formattedData: { title: string; data: Families[] }[] = useMemo(
    () =>
      Object.entries(groupBy(data?.families.data, 'category')).map((el) => ({
        title: el[0],
        data: el[1],
      })),
    [data],
  );
  const renderPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = selectedInterests.length + 1; i <= 5; i += 1) {
      array.push(<PlaceHolder index={i} key={i} direction="horizontal" />);
    }
    return array;
  };
  const renderAllPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = 1; i <= 5; i += 1) {
      array.push(<PlaceHolder direction="horizontal" index={i} key={i} />);
    }
    return array;
  };

  const isChecked = (id?: string): boolean => !!selectedInterests.find((elem) => elem.id === id);
  const handleClick = (e: Families) => {
    let copySelected: Families[] = [...selectedInterests];
    if (isChecked(e.id)) {
      copySelected = selectedInterests.filter((ele) => ele.id !== e?.id);
    } else if (selectedInterests.length < 5) {
      copySelected.push(e);
    }
    setInterest(copySelected);
    setSelectedInterest(copySelected);
  };
  const deleteFamille = (id: number) => {
    const familleSelected = selectedInterests[id];
    let copySelected: Families[] = [...selectedInterests];
    if (isChecked(familleSelected?.id)) {
      copySelected = selectedInterests.filter((ele) => ele.id !== familleSelected.id);
    }

    setSelectedInterest(copySelected);
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <Avatar size={60} className={classes.logoConatienr} avatarCircleBackground="#DDCCFF">
              <img src={InterestLogo} alt="interest" />
            </Avatar>
            <div className={classes.titlesWrapper}>
              {' '}
              <div className={classes.title}>MES CENTRES D&lsquo;INTERET</div>
              <div className={classes.descriptionTitle}>Sélectionne 5 centres d’intérêts :</div>
            </div>
          </div>

          <RestLogo color="#420FAB" label="Annuler" />
        </div>
        <div className={classes.wrapper}>
          <div className={classes.circleContainer}>
            {loading && <div className={classes.loadingContainer}>...loading</div>}
            <Slider data={formattedData} handleClick={handleClick} />
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerContent}>
            {loading && renderAllPlaceholder()}
            {selectedInterests.map((el, i) => (
              <FamileSelected
                key={el.id}
                handleClick={() => deleteFamille(i)}
                famille={el}
                index={i}
                direction="horizontal"
              />
            ))}
            {!loading && renderPlaceholder()}
            {selectedInterests.length > 0 && (
              <Link to="/interet/ordre" className={classes.wrapperBtn}>
                <Button className={classes.btn}>
                  <div className={classes.contentBtn}>
                    <div className={classes.btnLabel}>Suivant</div>
                    <Arrow color="#fff" width="12" height="12" />
                  </div>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcoursInteret;
