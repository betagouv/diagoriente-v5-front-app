import React from 'react';
import Carousel from 'nuka-carousel';
import Button from 'components/button/Button';
import Dots from './Dots';
import useStyles from './styles';

interface IProps {
  data: { id: string; question: string }[];
  setCurrentIndex: (index: number) => void;
}
const Slider = ({ data, setCurrentIndex }: IProps) => {
  const classes = useStyles();
  return (
    <Carousel
      dragging={false}
      renderCenterLeftControls={null}
      renderCenterRightControls={null}
      renderBottomCenterControls={(props) => <Dots {...props} />}
      renderTopCenterControls={({ currentSlide }) => {
        setCurrentIndex(currentSlide);
        return <div />;
      }}
      className={classes.root}
    >
      {data.map((el) => (
        <div className={classes.content}>
          <div className={classes.question}>{el.question}</div>
          <div className={classes.btnContainer}>
            <Button className={classes.btn}>
              <div className={classes.labelBtn}>OUI</div>
            </Button>
            <Button className={classes.btn}>
              <div className={classes.labelBtn}>NON</div>
            </Button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
