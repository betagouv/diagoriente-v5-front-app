import React from 'react';
import classNames from 'utils/classNames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import useStyles from './styles';

export type IVariant = 'success' | 'warning' | 'error' | 'info';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export interface Props {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
}

function MySnackbarContentWrapper(props: Props) {
  const classes = useStyles();

  const {
 className, message, onClose, variant, ...other
} = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      message={(
        <span className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message ? message[0].toUpperCase() + message.slice(1) : ''}
        </span>
      )}
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

interface PrimaryProps {
  variant: IVariant;
  open: boolean;
  handleClose?: () => void;
  message: string;
}
export default function CustomizedSnackbars(props: PrimaryProps) {
  const {
 variant, open, handleClose, message,
} = props;
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Fade}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      className={classes.snackContainer}
    >
      <MySnackbarContentWrapper onClose={handleClose} variant={variant} message={message} />
    </Snackbar>
  );
}
