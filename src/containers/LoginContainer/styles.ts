import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'ocean',
    fontWeight: 900,
    fontSize: 42,
    textAlign: 'center',
    color: theme.palette.info.main,
    marginBottom: 60,
    marginTop: 40,
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
    [theme.breakpoints.down('xl')]: {
      paddingRight: 50,
    },
    [theme.breakpoints.down('lg')]: {
      paddingRight: 50,
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: 50,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 60,
    },
    [theme.breakpoints.down('xs')]: {
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

    '&:hover': {
      backgroundColor: theme.palette.info.main,
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
  groupTextContainer: {
    display: 'flex',
    width: '100%',
  },
  containerCheckbox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 14,
  },
  conditionText: {
    fontSize: 14,
    marginLeft: 8,
    width: '95%',
    cursor: 'pointer',
  },
  forgotText: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 40,
    '&:hover': {
      color: '#00CFFF',
    },
  },
  errorCondition: {
    textAlign: 'center',
    color: theme.palette.error.main,
    fontSize: 12,
    paddingLeft: 10,
  },
  registerLabel: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
    fontSize: 14,
    textDecoration: 'underline',
    '&:hover': {
      color: '#00CFFF',
    },
  },
}));
