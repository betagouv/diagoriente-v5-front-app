import React from 'react';
import Modal, { ModalProps } from '@material-ui/core/Modal';
import Reset from 'components/common/Rest/Rest';
import useStyles from './styles';

interface IProps extends ModalProps {
  open: boolean;
  handleClose?: () => void;
  onReset?: () => void;
  children: React.ReactElement;
  backdropColor: string;
  colorIcon: string;
  size?: number;
  height?: number;
  title?: string;
}

const ModalContainer = ({
  open,
  handleClose,
  backdropColor,
  colorIcon,
  children,
  size,
  height,
  onReset,
  title,
  ...rest
}: IProps) => {
  const classes = useStyles({ backdropColor, size, height });
  return (
    <Modal
      style={{ zIndex: 1300 }}
      open={open}
      onClose={handleClose}
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      BackdropProps={{ className: classes.backdrop }}
      {...rest}
    >
      <div className={classes.modalContainer}>
        <div className={classes.modal}>
          {handleClose && (
            <div className={classes.header}>
              {title}
              <Reset className={classes.reset} color={colorIcon} label="Fermer" onClick={onReset || handleClose} />
            </div>
          )}
          <div className={classes.modalContainerBody}>{children}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContainer;
