import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 80,
    paddingTop: 60,
  },
  registerContainer: {
    maxWidth: 757,
    width: '100%',
  },
  title: {
    fontFamily: 'ocean',
    fontWeight: 900,
    fontSize: 42,
    textAlign: 'center',
    color: theme.palette.info.main,
    marginBottom: 40,
  },
  descriptionContainer: {
    width: '95%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
    },
  },
  description: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 1.8,
  },
  formContainer: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: 50,
    },
  },
  form: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',

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
  btnContainer: {
    marginTop: 15,
  },
  btn: {
    backgroundColor: '#011A5E',
    height: 50,
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
  groupTextContainer: {
    display: 'flex',
  },
  emptyDiv: {
    width: 260,
  },
  groupText: {
    fontSize: 12,
    color: '#424242',
  },
  conditionText: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 8,
    width: '95%',
    cursor: 'pointer',
  },
  containerCheckbox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 14,
  },
  conditionColorText: {
    color: '#00CFFF',
    cursor: 'pointer',
  },
  optionWrapper: {
    width: 115,
  },
  option: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  optionItem: {
    fontSize: 12,
    color: '#424242',
  },
  checkOption: {
    color: '#00CFFF',
    textDecoration: 'line-through',
  },
  errorCondition: {
    color: '#FF0060',
    fontSize: 12,
  },
}));
