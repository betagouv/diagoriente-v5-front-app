/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable arrow-body-style */

/* eslint-disable class-methods-use-this */
import React from 'react';
import useStyles from './styles';

const PagingDots = ({ slideCount, slidesToScroll, goToSlide, currentSlide }: any) => {
  const classes = useStyles();
  const getIndexes = (count: number, inc: number) => {
    const arr = [];
    for (let i = 0; i < count; i += inc) {
      arr.push(i);
    }
    return arr;
  };

  const getButtonStyles = (active: any) => {
    return {
      border: 0,
      backgroundColor: active ? '#DB8F00' : '#FFD382',
      cursor: 'pointer',
      padding: 10,
      width: 15,
      height: 15,
      margin: '0px 5px',
      borderRadius: '50%',
      outline: 0,
    };
  };
  const indexes = getIndexes(slideCount, slidesToScroll);
  return (
    <ul style={{ position: 'relative', margin: 0, padding: 0 }}>
      {indexes.map((index) => {
        return (
          <li className={classes.dotsContainer} key={index}>
            <button style={getButtonStyles(currentSlide === index)} onClick={() => goToSlide(index)} />
          </li>
        );
      })}
    </ul>
  );
};
export default PagingDots;
