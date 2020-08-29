import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '100vh',
  },
  frameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '92%',
    paddingBottom: 12,
    paddingTop: 35,

  },
  frameOverlayContainer: {
    width: '80%',
    height: '100%',
    borderRadius: 10,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  frame: {
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    marginTop: 10,

    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  btn: {
    backgroundColor: '#00CFFF',
    '&:hover': {
      backgroundColor: '#00CFFF',
    },
  },

  btnLabel: {
    color: '#223A7A',
    fontWeight: 'bold',
    fontSize: 18,
  },
}));
