import React, { useState } from 'react';
import Carousel from 'nuka-carousel';
import { Families } from 'requests/types';
import Arrow from 'assets/svg/arrow';
import classNames from 'utils/classNames';
import Img3 from 'assets/svg/tete-01.svg';
import Img2 from 'assets/svg/mains-01.svg';
import Img1 from 'assets/svg/personnes-01.svg';
import Avatar from 'components/common/Avatar/Avatar';
import useStyles from './styles';

interface IProps {
  data: { title: string; data: Families[] }[];
  handleClick: (e: any) => void;
  isChecked: any;
}
const Slider = ({ data, handleClick, isChecked }: IProps) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovred, setHovred] = useState('');

  const mouseEnter = (id: string) => {
    setHovred(id);
  };
  const mouseLeave = () => {
    setHovred('');
    
  };
  const imgs = [Img1, Img2, Img3];
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
          className={classNames(currentIndex === data.length - 1 && classes.hide, classes.wrapperBtn, classes.nextWrap)}
        >
          <div
            onClick={() => {
              if (currentIndex !== data.length - 1) {
                nextSlide();
                setCurrentIndex(currentIndex + 1);
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
      {data.map((el, i) => (
        <div key={el.title} className={classes.item}>
          <div className={classes.avatarContainer}>
            <img alt="" src={imgs[i]} width="33%" />
            {el.data.map((e) => {
              const selected = isChecked(e.id);
              const { nom } = e;
              const res = nom.replace(/\//g, '');
              return (
                <div
                  key={e.id}
                  onClick={() => handleClick(e)}
                  className={e.resources.length === 1 ? classes.subitem1 : classes.subitem}
                  onMouseEnter={() => mouseEnter(e.id)}
                  onMouseLeave={mouseLeave}
                >
                  {e.resources.length === 1 ? (
                    <div className={classNames(selected ? classes.selected : '')}>
                      <Avatar title={res} size={77} titleClassName={classes.marginTitle} className={classes.circle} />
                    </div>
                  ) : (
                    <div className={classes.imageContainer}>
                      <img
                        src={e.resources[0]}
                        alt=""
                        className={classNames(hovred === e.id || selected ? classes.selected : classes.deselected)}
                      />
                      <img
                        src={e.resources[1]}
                        alt=""
                        className={classNames(
                          classes.testImg,
                          hovred === e.id || selected ? classes.show : classes.hideImg,
                        )}
                      />
                    </div>
                  )}
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
