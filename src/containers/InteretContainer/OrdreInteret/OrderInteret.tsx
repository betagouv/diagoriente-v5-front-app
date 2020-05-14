import React, { useState, useContext } from 'react';
import RestLogo from 'components/common/Rest/Rest';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from 'components/button/Button';
import Avatar from 'components/common/Avatar/Avatar';
import InterestLogo from 'assets/svg/interest.svg';
import { Interests } from 'requests/types';
import Arrow from 'assets/svg/arrow';
import classNames from 'utils/classNames';
import interestContext from 'contexts/InterestSelected';
import InterestContainer from '../components/InterestContainer/InterestContainer';
import FamileSelected from '../components/SelectedFamille/SelectedFamille';

import useStyles from './styles';

const OrderInteret = () => {
  const { selectedInterest } = useContext(interestContext);
  const classes = useStyles();
  const [orderedArray, setOrderedArray] = useState([] as Interests[]);
  const heights = [230, 210, 190, 170, 154];
  const renderPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = orderedArray.length + 1; i <= (selectedInterest?.length || []); i += 1) {
      array.push(<InterestContainer index={i} key={i} height={heights[i - 1]} />);
    }
    return array;
  };
  const isChecked = (id?: string): boolean => !!orderedArray.find((elem) => elem.id === id);
  const handelClick = (item: any) => {
    let copySelected: Interests[] = [...orderedArray];
    if (isChecked(item.id)) {
      copySelected = orderedArray.filter((ele) => ele.id !== item?.id);
    } else if (orderedArray.length < 5) {
      copySelected.push(item);
    }

    setOrderedArray(copySelected);
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <Avatar size={50} className={classes.logoConatienr} avatarCircleBackground="#DDCCFF">
              <img src={InterestLogo} alt="interest" />
            </Avatar>
            <div className={classes.title}>Mes CENTRES D&lsquo;INTERET</div>
          </div>
          <RestLogo color="#420FAB" label="Annuler" />
        </div>
        <div className={classes.wrapper}>
          <div className={classes.subTitle}>
            <Typography>Bravo ! Tu as sélectionné tes 5 centres d&lsquo;intérêts.</Typography>
            <Typography>Maintenant choisis celui qui est le plus important pour toi :</Typography>
          </div>
          <div className={classes.listSelected}>
            {selectedInterest?.map((ele, index) => (
              <div className={classNames(classes.item, isChecked(ele.id) && classes.disable)} key={ele.id}>
                <FamileSelected famille={ele} index={index} handleClick={() => handelClick(ele)} direction="vertical" />
              </div>
            ))}
          </div>
          <div className={classes.orderSelected}>
            {orderedArray.map((el, i) => (
              <InterestContainer index={i + 1} key={el.id} height={heights[i]} full famille={el} />
            ))}
            {renderPlaceholder()}
          </div>
          <div className={classes.btnContainer}>
            <Link to="/interet/result">
              <Button className={classes.btn}>
                <div className={classes.contentBtn}>
                  <div className={classes.btnLabel}>Suivant</div>
                  <Arrow color="#fff" width="12" height="12" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInteret;
