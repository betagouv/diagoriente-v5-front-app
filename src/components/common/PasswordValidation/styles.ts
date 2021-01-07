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
    lineHeight: 1.8,
  },
  formContainer: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: 100,
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: 100,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 80,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 20,
      width: '95%',
    },
  },
  form: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  avatarsWrapper: {
    margin: '9px 0px',
  },
  avatarsContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  labelContainer: {
    textAlign: 'right',
    marginRight: 14,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      marginRight: 0,
      marginBottom: 5,
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 12,
    paddingRight: 8,
  },
  avatarCircle: {
    padding: '0px !important',
  },
  avatar: {
    width: 70,
    height: 70,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  selectedAvatar: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
  },
  btnContainer: {
    marginTop: 15,
  },
  paddingBtn: {
    paddingLeft: 30,
  },
  btn: {
    backgroundColor: theme.palette.secondary.main,
    height: 50,
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
  groupTextContainer: {
    display: 'flex',
  },
  emptyDiv: {
    width: 260,
  },
  groupText: {
    fontSize: 12,
  },
  conditionText: {
    fontSize: 14,
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
    color: theme.palette.success.main,
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
  },
  checkOption: {
    color: "#00B2DB",
    textDecoration: 'line-through',
  },
  errorCondition: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: 12,
  },
  errorTextForm: {
    color: theme.palette.error.main,
    fontSize: 12,
    paddingLeft: 10,
  },
  start: {
    color: theme.palette.success.main,
  },
  required: {
    fontSize: 14,
    textAlign: 'center',
    paddingLeft: 55,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 55,
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 50,
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 90,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 24,
      width: '95%',
    },
  },

  registerLabel: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
    fontSize: 14,
    textDecoration: 'underline',
    marginTop: 30,
    textAlign: 'center',
  },
  requiredInput: {
    color: theme.palette.success.main,
  },
}));
