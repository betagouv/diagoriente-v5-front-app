import React from 'react';
import Modal from '@material-ui/core/Modal';
import Reset from 'components/common/Rest/Rest';
import useStyles from './styles';

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const ModalContainer = ({ open, handleClose }: IProps) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={handleClose} disablePortal disableEnforceFocus disableAutoFocus>
      <div className={classes.modalContainer}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <Reset color="#420FAB" label="Annuler" />
          </div>
        </div>
        {' '}
      </div>
    </Modal>
  );
};

export default ModalContainer;
