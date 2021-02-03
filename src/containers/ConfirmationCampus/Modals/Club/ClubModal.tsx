import React, { useState } from 'react';
import ScreenIntro from './Steps/screenIntro/ScreenIntro';
import ScreenInfo from './Steps/screenInfo/ScreenInfo';
import ScreenSuccess from './Steps/screenSuccess/ScreenSuccess';
import Stepper from './Stepper/Stepper';
import useStyles from './style';

interface Props {
  onClose: () => void;
  setMessage: (text: string) => void;
  setSubMessage: (text: string) => void;
  addRecoCampusCall: () => void;
  addRecoCampusState: any;
}

const ClubModal = ({ onClose, setMessage, setSubMessage, addRecoCampusCall, addRecoCampusState }: Props) => {
  const classes = useStyles();
  const [index, setIndex] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedItem, setSelectedItem] = useState({} as any);
  const [text, setText] = useState('');

  const onNavigate = (i: number) => {
    setIndex(i);
  };
  const onClickAnswer = (answer: string) => {
    onNavigate(2);
    setSelectedAnswer(answer);
  };
  const renderStep = () => {
    switch (index) {
      case 1:
        return <ScreenIntro onClickAnswer={onClickAnswer} />;
      case 2:
        return (
          <ScreenInfo
            selectedAnswer={selectedAnswer}
            onNavigate={onNavigate}
            setMessage={setMessage}
            setSubMessage={setSubMessage}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            onClose={onClose}
            setText={setText}
            text={text}
          />
        );
      case 3:
        return (
          <ScreenSuccess
            onClose={onClose}
            selectedItem={selectedItem}
            setMessage={setMessage}
            setSubMessage={setSubMessage}
            addRecoCampusCall={addRecoCampusCall}
            addRecoCampusState={addRecoCampusState}
          />
        );
      default:
        return <ScreenIntro onClickAnswer={onClickAnswer} />;
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Stepper currentIndex={index} onNavigate={onNavigate} />
      </div>
      <div className={classes.content}>{renderStep()}</div>
    </div>
  );
};

export default ClubModal;
