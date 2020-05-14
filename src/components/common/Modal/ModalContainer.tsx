import React from 'react';
import Modal from '@material-ui/core/Modal';
import Reset from 'components/common/Rest/Rest';
import useStyles from './styles';

interface IProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactElement;
  backdropColor: string;
  colorIcon: string;
}

const ModalContainer = ({
 open, handleClose, backdropColor, colorIcon, children,
}: IProps) => {
  const classes = useStyles({ backdropColor });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      BackdropProps={{ className: classes.backdrop }}
    >
      <div className={classes.modalContainer}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <Reset color={colorIcon} label="Fermer" onClick={handleClose} />
          </div>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalContainer;
