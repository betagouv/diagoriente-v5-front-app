import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 'calc(100vh - 113px)',
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'ocean',
    fontWeight: 900,
    fontSize: 42,
    textAlign: 'center',
    color: theme.palette.info.main,
    marginBottom: 60,
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
  },
  loginContainer: {
    maxWidth: 757,
    width: '100%',
  },
  container: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
      width: '95%',
    },
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: 12,
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn: {
    backgroundColor: theme.palette.secondary.main,
    height: 50,
    width: 'max-content',
    padding: '0px 25px',
    '&:hover': {
      backgroundColor: '#223A7A',
      borderRadius: 10,
    },
  },
  btnLabel: {
    color: '#fff',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  emptyDiv: {
    width: 260,
  },
}));
