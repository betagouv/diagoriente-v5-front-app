import React from 'react';
import Button from 'components/button/Button';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

interface IProps {
  title: string;
  logo?: string;
  subTitle: string;
  color: string;
  colorText: string;
  link: string;
  played: boolean | undefined;
  openModal: (state: boolean) => void;
}

const Box = ({
  title, logo, subTitle, color, link, colorText, played, openModal,
}: IProps) => {
  const history = useHistory();
  const classes = useStyles({ color, colorText });
  const onNavigate = () => {
    if (link === '/experience' && played === false) {
      openModal(true);
    } else {
      history.push(link);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="" width="100%" height="100%" />
      </div>
      <div className={classes.titleBox}>{title}</div>
      <div className={classes.subTitleBox}>{subTitle}</div>

      <Button className={classes.btn} onClick={onNavigate}>
        <span className={classes.btnLabel}>C&rsquo;est parti</span>
      </Button>
    </div>
  );
};

export default Box;
