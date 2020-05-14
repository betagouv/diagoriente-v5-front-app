import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { backdropColor: string }>((theme) => ({
  modalContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: (props) => `${props.backdropColor} !important`,
    opacity: 0.5,
  },
  modal: {
    backgroundColor: '#fff',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 15,
    width: '60%',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '20px 14px',
  },
}));
