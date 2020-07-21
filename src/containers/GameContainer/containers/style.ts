import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: 'calc(100vh - 46px)',
  },
  frameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  frameOverlayContainer: {
    width: 1041,
    height: 592,
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
  btnContainer: {},
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
