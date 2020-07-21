import React from 'react';
import Modal from '@material-ui/core/Modal';
import picto from 'assets/svg/picto.svg';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface IProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactElement;
  iconClassName?: string;
}

const ModalContainer = ({
 open, handleClose, children, iconClassName,
}: IProps) => {
  const classes = useStyles();
  return (
    <Modal
      BackdropProps={{ className: classes.backdrop }}
      open={open}
      onClose={handleClose}
      disablePortal
      disableEnforceFocus
      disableAutoFocus
    >
      <div className={classes.modalContainer}>
        <div className={classes.modal}>
          <img src={picto} alt="" onClick={handleClose} className={classNames(classes.picto, iconClassName)} />
          <div className={classes.header}>{children}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContainer;
