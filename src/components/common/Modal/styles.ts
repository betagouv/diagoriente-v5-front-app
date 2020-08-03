import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { backdropColor: string; size?: number }>((theme) => ({
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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 15,
    width: (props) => `${props.size ? props.size : 60}%`,
    height: '80%',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '20px 14px',
  },
  modalContainerBody: {
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    height: '80%',
    flex: 1,
  },
}));
