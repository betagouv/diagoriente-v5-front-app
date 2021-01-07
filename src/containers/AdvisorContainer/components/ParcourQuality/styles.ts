import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color?: string }>((theme) => ({
  container: {
    display: 'flex',
    padding: '5px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: (p) => p.color || theme.palette.error.main,
    marginRight: 15,
    flex: 1,
  },
  add: {
    backgroundColor: '#fff',
  },
  modalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  modalContainer: {
    minWidth: 500,
    minHeight: 500,
    maxWidth: 800,
    maxHeight: 800,
    width: '80%',
    height: '60%',
    position: 'relative',
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  modalContent: {
    flex: '1 1 0%',
    overflow: 'auto',
    flexDirection: 'column',
    display: 'flex',
  },
  reset: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 42,
    fontFamily: 'Ocean',
    color: theme.palette.secondary.main,
    lineHeight: '42px',
    flex: '1 1 0%',
    paddingRight: 40,
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: '20px 0',
  },
  radio: {
    marginTop: 10,
  },
  comment: {
    marginTop: 10,
  },
  submit: {
    width: '100%',
    marginTop: 20,
  },
}));
