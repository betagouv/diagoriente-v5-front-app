import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { isCampus?: boolean }>((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 'calc(100vh - 113px)',
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'ocean',
    fontWeight: 900,
    fontSize: 56,
    textAlign: 'center',
    color: (props) => (props.isCampus ? '#ff4d00' : theme.palette.info.main),
    marginBottom: (props) => (props.isCampus ? 10 : 40),
  },
  titleDesc: {
    fontWeight: 'bolder',
    fontSize: 36,
    textAlign: 'center',
    color: (props) => (props.isCampus ? '#ff4d00' : theme.palette.info.main),
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
    height: '100%'
  },
  container: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
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
    backgroundColor: '#ff4d00',
    height: 50,
    width: 'max-content',
    padding: '0px 25px',
    '&:hover': {
      backgroundColor: '#ff4d00',
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
  forms: {
    marginTop: 30,
    justifySelf: 'center',
    width: '100%',
  },
  containerAutoComp: {
    '& .MuiAutocomplete-inputRoot-228': {
      padding: 0,
    },
    width: '235px !important',
    position: 'relative',
  },
  selectwrapper: {
    display: ' flex',
    alignItems: 'center',
  },
  labelSelect: {
    fontWeight: 'bolder',
    fontSize: 16,
    color: 'black',
    marginRight: 20,
  },
  labelContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  requiredInput: {
    color: theme.palette.success.main,
  },
  textError: {
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
  },
  infoFields: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,

  },
}));
