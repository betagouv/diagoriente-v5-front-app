import React from 'react';
import classNames from 'utils/classNames';
import useStyle from './style';

interface Props {
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const Stepper = ({ currentIndex, onNavigate }: Props) => {
  const boxArray = [
    { index: 1, strock: true },
    { index: 2, strock: true },
    { index: 3, strock: false },
  ];
  const onClickBox = (index: number) => {
    if (index < currentIndex) {
      onNavigate(index);
    }
  };

  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {boxArray.map((box) => {
          return (
            <div key={box.index} className={classes.wrapperBow}>
              <div
                className={classNames(
                  classes.box,
                  currentIndex > box.index && classes.filledBoxPrev,
                  currentIndex === box.index && classes.filledBox,
                )}
                onClick={() => onClickBox(box.index)}
              >
                <p className={classNames(classes.textStepper)}>{box.index}</p>
              </div>
              {box.strock && (
                <div className={classNames(classes.strock, currentIndex > box.index ? classes.filledStrock : '')} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
