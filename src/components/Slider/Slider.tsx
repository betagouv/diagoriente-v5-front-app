import React, { useRef, useState } from 'react';
import Flicking from '@egjs/react-flicking';
import { ChangeEvent } from '@egjs/flicking';
import classNames from 'utils/classNames';
import useStyles from './styles';

const a = [
  {
    text:
      'Une jeune m’a répondu qu’elle avait1 découvert des compétences qu’elle ne soupçonnait pas avoir, elle a adoré !',
    user: {
      firstName: 'Valérie 1',
      lastName: 'K',
    },
  },
  {
    text:
      'Une jeune m’a répondu qu’elle avait2 découvert des compétences qu’elle ne soupçonnait pas avoir, elle a adoré !',
    user: {
      firstName: 'Valérie 2',
      lastName: 'K',
    },
  },
  {
    text:
      'Une jeune m’a répondu qu’elle avait3 découvert des compétences qu’elle ne soupçonnait pas avoir, elle a adoré !',
    user: {
      firstName: 'Valérie 3',
      lastName: 'K',
    },
  },
  {
    text:
      'Une jeune m’a répondu qu’elle avait4 découvert des compétences qu’elle ne soupçonnait pas avoir, elle a adoré !',
    user: {
      firstName: 'Valérie 4',
      lastName: 'K',
    },
  },
];

const Slider = () => {
  const classes = useStyles();
  const slider = useRef(null);
  const [currentItem, setCurentItem] = useState(0);

  const goToNext = () => {
    if (slider.current) {
      (slider.current as any)?.next();
    }
  };
  const goToPrevious = () => {
    if (slider.current) {
      (slider.current as any)?.prev();
    }
  };
  return (
    <div className={classes.sliderContainer}>
      <div className={classes.content}>
        <div onClick={goToPrevious} className={classes.prevArrow}>
          {'<'}
        </div>

        <div className={classes.sliderWrapper}>
          <Flicking
            ref={slider}
            onChange={(e: ChangeEvent) => {
              setCurentItem(e.index);
            }}
            gap={40}
            circular
            duration={100}
          >
            {a.map((el, i: number) => {
              return (
                <div key={el.user.firstName} className={classes.item}>
                  test
                </div>
              );
            })}
          </Flicking>
        </div>

        <div onClick={goToNext} className="next_arrow">
          {'>'}
        </div>
      </div>
    </div>
  );
};
export default Slider;
