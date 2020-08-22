import React, { useEffect, useRef } from 'react';

interface IProps {
  setCurrentIndex: (i: number) => void;
}

const TopControl = ({ currentSlide, setCurrentIndex }: any) => {
  const refIndex = useRef(currentSlide);
  useEffect(() => {
    if (currentSlide !== refIndex) setCurrentIndex(currentSlide);
    // eslint-disable-next-line
  }, [currentSlide]);
  return <div />;
};

export default TopControl;
