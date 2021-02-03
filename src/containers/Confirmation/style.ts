import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { isCampus?: boolean }>((theme) => ({
  root: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 40,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: 'ocean',
    fontWeight: 900,
    fontSize: 56,
    textAlign: 'center',
    color: (props) => (props.isCampus ? '#ff4d00' : theme.palette.info.main),
    marginBottom: (props) => (props.isCampus ? 10 : 40),
    marginTop: 30,
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
    marginTop: 0,
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
  forms: {
    marginTop: 30,
    justifySelf: 'center',
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
  selectAutoComplete: {
    display: ' flex',
    alignItems: 'center',
    marginTop: '15px',
    marginBottom: 9,
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
  formDate: {
    margin: '10px 0px 16px 0px',
  },
}));
