import React, { useState, useContext, useEffect } from 'react';
import RestLogo from 'components/common/Rest/Rest';
import { Redirect, Link, RouteComponentProps } from 'react-router-dom';
import Avatar from 'components/common/Avatar/Avatar';
import InterestLogo from 'assets/svg/interest.svg';
import { Families } from 'requests/types';
import { useUpdateParcour } from 'requests/parcours';
import classNames from 'utils/classNames';
import { decodeUri } from 'utils/url';
import interestContext from 'contexts/InterestSelected';
import ParcourContext from 'contexts/ParcourContext';
import NextButton from 'components/nextButton/nextButton';
import InterestContainer from '../../components/InterestContainer/InterestContainer';
import FamileSelected from '../../components/SelectedFamille/SelectedFamille';
import useStyles from './styles';

const OrderInteret = ({ history, location }: RouteComponentProps) => {
  const [updateCall, updateState] = useUpdateParcour();
  const [error, setError] = useState('');
  const { selectedInterest } = useContext(interestContext);
  const { setParcours } = useContext(ParcourContext);
  const classes = useStyles();
  const [orderedArray, setOrderedArray] = useState([] as Families[]);

  const heights = [226, 216, 206, 196, 186];

  const renderPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = orderedArray.length + 1; i <= (selectedInterest?.length || 0); i += 1) {
      array.push(<InterestContainer index={i} key={i} height={heights[i - 1]} />);
    }
    return array;
  };
  const isChecked = (id?: string): boolean => !!orderedArray.find((elem) => elem.id === id);

  const handelClick = (item?: Families) => {
    let copySelected: Families[] = [...orderedArray];
    if (isChecked(item?.id)) {
      copySelected = orderedArray.filter((ele) => ele.id !== item?.id);
    } else if (orderedArray.length < 5 && item) {
      copySelected.push(item);
    }

    setOrderedArray(copySelected);
  };
  useEffect(() => {
    if (orderedArray.length === selectedInterest?.length || orderedArray.length === 0) {
      setError('');
    }
  }, [selectedInterest, orderedArray]);

  useEffect(() => {
    if (updateState.data && !updateState.error) {
      setParcours(updateState.data.updateParcour);
      const { profil } = decodeUri(location.search);
      history.push(profil ? '/profile/interest' : '/interet/result');
    }
    // eslint-disable-next-line
  }, [updateState.data, updateState.error]);

  if (!selectedInterest) return <Redirect to="/interet/parcours" />;
  const onUpdate = () => {
    const dataToSend = orderedArray.map((el) => el.id) || selectedInterest;
    if (orderedArray.length === selectedInterest.length) {
      updateCall({ variables: { families: dataToSend } });
    } else {
      setError("Merci de compléter l'ordre du(es) centre(s) d‘intérêt(s) sélectionné(s)");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <Avatar size={50} className={classes.logoConatienr} avatarCircleBackground="#DDCCFF">
              <img src={InterestLogo} alt="interest" />
            </Avatar>
            <div className={classes.title}>Mes CENTRES D&lsquo;INTÉRÊT</div>
          </div>
          <Link to="/interet">
            <RestLogo color="#420FAB" label="Annuler" />
          </Link>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.subTitle}>
            <div>Bravo ! Tu as sélectionné tes 5 familles d&lsquo;intérêts.</div>
            <div>Maintenant classe-les par ordre d’importance pour toi :</div>
          </div>
          <div className={classes.listSelected}>
            {selectedInterest?.map((ele, index) => (
              <div className={classNames(classes.item, isChecked(ele.id) && classes.disable)} key={ele.id}>
                <FamileSelected
                  famille={ele}
                  index={index}
                  handleClick={() => handelClick(ele)}
                  direction="vertical"
                  type="ordre"
                />
              </div>
            ))}
          </div>
          <div className={classes.orderSelected}>
            {orderedArray.map((el, i) => (
              <InterestContainer
                index={i + 1}
                key={el.id}
                height={heights[i]}
                full
                famille={el}
                handleClick={handelClick}
              />
            ))}
            {renderPlaceholder()}
          </div>
          <div className={classes.errorContainer}>
            <div className={classes.text}>{error}</div>
          </div>
          <div className={classes.btnContainer}>
            <NextButton
              fetching={updateState.loading}
              onClick={onUpdate}
              className={classes.btn}
              classNameTitle={classes.btnLabel}
              ArrowColor="#fff"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInteret;
