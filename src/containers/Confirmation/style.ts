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
    marginBottom: 40,
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  loginContainer: {
    maxWidth: 757,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
      width: '95%',
    },
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
