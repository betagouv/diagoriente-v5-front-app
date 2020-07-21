import React, { useState } from 'react';
import Carousel from 'nuka-carousel';
import Avatar from 'components/common/Avatar/Avatar';
import { Families } from 'requests/types';
import Arrow from 'assets/svg/arrow';
import classNames from 'utils/classNames';
import Trait from 'assets/images/trait_violet.png';
import useStyles from './styles';

interface IProps {
  data: { title: string; data: Families[] }[];
  handleClick: (e: any) => void;
  isChecked: any;
  setIndex: (i: number) => void;
}
const Slider = ({ data, handleClick, isChecked, setIndex }: IProps) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Carousel
      dragging={false}
      renderCenterLeftControls={({ previousSlide }) => (
        <div className={classNames(currentIndex === 0 && classes.hide, classes.wrapperBtn, classes.prevWrap)}>
          <div
            onClick={() => {
              if (currentIndex !== 0) {
                previousSlide();
                setCurrentIndex(currentIndex - 1);
                setIndex(currentIndex - 1);
              }
            }}
            className={classNames(classes.containerBtn, classes.rotatedArrow)}
          >
            <Arrow width="12" height="24" color="#fff" className={classes.arrowCon} />
          </div>
          <div className={classes.titleContainerArrow}>
            <div className={classes.topTitleRightArrow}>Travailler...</div>
            <div className={classes.bottomTitleRightArrow}>{data && data[currentIndex - 1]?.title}</div>
          </div>
        </div>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <div
          className={classNames(
            currentIndex === data.length - 1 && classes.hide,
            classes.wrapperBtn,
            classes.nextWrap,
            classes.rowReverse,
          )}
        >
          <div
            onClick={() => {
              if (currentIndex !== data.length - 1) {
                nextSlide();
                setCurrentIndex(currentIndex + 1);
                setIndex(currentIndex + 1);
              }
            }}
            className={classes.containerBtn}
          >
            <Arrow width="12" height="24" color="#fff" className={classes.arrowCon} />
          </div>
          <div className={classes.titleContainerArrow}>
            <div className={classes.topTitleRightArrow}>Travailler...</div>
            <div className={classes.bottomTitleRightArrow}>{data && data[currentIndex + 1]?.title}</div>
          </div>
        </div>
      )}
      renderBottomCenterControls={null}
      className={classes.root}
    >
      {data.map((el) => (
        <div key={el.title} className={classes.item}>
          <div className={classes.avatarContainer}>
            {el.data.map((e) => {
              const { nom } = e;
              const res = nom.replace(/\//g, '');
              const selected = isChecked(e.id);
              return (
                <div key={e.id} onClick={() => handleClick(e)} className={classes.subitem}>
                  <div className={classNames(selected ? classes.selected : '')}>
                    <Avatar title={res} size={77} titleClassName={classes.marginTitle} className={classes.circle} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
