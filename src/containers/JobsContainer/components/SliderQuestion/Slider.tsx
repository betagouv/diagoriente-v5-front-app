import React, { forwardRef, Ref } from 'react';
import Carousel from 'nuka-carousel';
import Button from 'components/button/Button';
import classNames from 'utils/classNames';
import Dots from './Dots';
import TopControl from './TopControl';
import useStyles from './styles';

interface IProps {
  questions: { id: string; label: string }[] | undefined;
  setCurrentIndex: (index: number) => void;
  onClick: (rep: {
    response: boolean;
    questionId: string;
    isNew: string | undefined;
    responseId: string | undefined;
  }) => void;
  list: { id: string; response: boolean; questionJobId: string }[] | undefined;
  ref: any;
}
const Slider = forwardRef(({ questions, setCurrentIndex, onClick, list }: IProps, ref: Ref<any>) => {
  const classes = useStyles();
  const isExist = (id: string) => {
    let exist;
    const res = list?.find((el) => el.questionJobId === id);
    if (res?.questionJobId === id) {
      exist = res.response.toString();
    }
    return { idResponse: res?.id, response: exist };
  };

  return (
    <Carousel
      ref={ref}
      dragging={false}
      renderCenterLeftControls={null}
      renderCenterRightControls={null}
      renderBottomCenterControls={(props) => <Dots {...props} />}
      renderTopCenterControls={(props) => <TopControl {...props} setCurrentIndex={setCurrentIndex} />}
      className={classes.root}
    >
      {questions?.map((el) => {
        const t = isExist(el.id);
        return (
          <div key={el.id} className={classes.content}>
            <div className={classes.question}>{el.label}</div>
            <div className={classes.btnContainer}>
              <Button
                className={classNames(classes.btnTrue, t.response === 'true' && classes.existResponses)}
                onClick={() =>
                  onClick({
                    response: true,
                    questionId: el.id,
                    isNew: t.response,
                    responseId: t.idResponse,
                  })
                }
              >
                <div className={classes.labelBtn}>OUI</div>
              </Button>
              <Button
                className={classNames(classes.btnFalse, t.response === 'false' && classes.existResponses)}
                onClick={() =>
                  onClick({
                    response: false,
                    questionId: el.id,
                    isNew: t.response,
                    responseId: t.idResponse,
                  })
                }
              >
                <div className={classes.labelBtn}>NON</div>
              </Button>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
});

export default Slider;
