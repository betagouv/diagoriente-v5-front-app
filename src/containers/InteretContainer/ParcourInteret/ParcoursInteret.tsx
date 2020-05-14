import React, { useState, useContext } from 'react';
import { useInterests } from 'requests/interests';
import Button from 'components/button/Button';
import { Interests } from 'requests/types';
import { Link } from 'react-router-dom';
import Avatar from 'components/common/Avatar/Avatar';
import RestLogo from 'components/common/Rest/Rest';
import TitleImage from 'components/common/TitleImage/TitleImage';
import InterestLogo from 'assets/svg/interest.svg';
import PlaceHolder from 'containers/InteretContainer/components/placeholderInterest/Placeholder';
import Trait from 'assets/images/trait_violet.png';
import Arrow from 'assets/svg/arrow';
import interestContext from 'contexts/InterestSelected';
import FamileSelected from '../components/SelectedFamille/SelectedFamille';

import useStyles from './styles';

const ParcoursInteret = () => {
  const classes = useStyles();
  const { setInterest, selectedInterest } = useContext(interestContext);
  const [selectedInterests, setSelectedInterest] = useState([] as Interests[]);
  const { data, loading } = useInterests();
  /* const familles = data?.interests.data;
    useEffect(() => {
    if (familles?.length !== 0 && prevFamily && !updatedFamille.current) {
      changeSelectedFamily(addPrevFamily(familles, prevFamily));
      updatedFamille.current = true;
    }
  }, [familles]); */
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
  /* const flitredFamille = familles?.filter((element: any) => {
    if (element.resources) {
      return element.resources.length !== 0;
    }
    return false;
  }); */
  const handleClick = (e: Interests) => {
    let copySelected: Interests[] = [...selectedInterests];
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
    let copySelected: Interests[] = [...selectedInterests];
    if (isChecked(familleSelected?.id)) {
      copySelected = selectedInterests.filter((ele) => ele.id !== familleSelected.id);
    } else if (selectedInterests.length < 5) {
      copySelected.push(familleSelected);
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
            <div className={classes.title}>Mes CENTRES D&lsquo;INTERET</div>
          </div>

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
              <div key={e.id} onClick={() => handleClick(e)}>
                <Avatar title={e.nom} size={85} titleClassName={classes.marginTitle} className={classes.circle} />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerContent}>
            {loading && renderAllPlaceholder()}
            {(selectedInterest || selectedInterests).map((el, i) => (
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
