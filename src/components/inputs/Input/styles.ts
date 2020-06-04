import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { error: boolean }>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px 0px 0px 0px',
    width: '100%',
  },
  wrapperInput: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  inputBase: {
    height: 35,
    width: 229,
    borderRadius: 5,
    margin: '9px 0px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    '& fieldset': {
      border: (props) => `1px solid ${props.error ? theme.palette.error.main : '#C9C9C7 !important'}`,
      borderWidth: 1,
    },
    '&:hover:not(:focus-within) fieldset': {
      borderColor: (props) => (props.error ? theme.palette.error.main : '#6B6B6A !important'),
    },
    '&:focus-within fieldset': {
      borderColor: (props) => (props.error ? theme.palette.error.main : '#00CFFF !important'),
    },
  },
  adornedStart: { paddingLeft: 4 },
  adornedPositionStart: {
    marginRight: 5,
    marginLeft: 5,
  },
  input: {
    flex: '1 1 0%',
    fontSize: 14,
    padding: 0,
    '&::placeholder': {
      color: '#C9C9C7 !important',
      fontSize: 14,
    },
    '&:-webkit-autofill': {
      backgroundColor: '#fff',
      color: '#424242',
      transition: 'background-color 5000s ease-in-out 0s',
    },
    '&:-webkit-autofill:focus': {
      backgroundColor: '#fff',
      color: '#424242',
      transition: 'background-color 5000s ease-in-out 0s',
    },
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    height: '100%',
    // width: 260,
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
    },
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-end',
    },
  },
  label: {
    marginRight: 14,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    marginRight: 14,
  },
  descriptionPassword: {
    fontSize: 12,
  },

  validation: {
    '& .MuiInputBase-root': {
      borderColor: theme.palette.primary.main,
    },
  },
  logo: {
    paddingLeft: 15,
  },
  locationLogo: {
    position: 'absolute',
    zIndex: 3,
    left: 8,
    top: 16,
  },
  errorCondition: {
    fontSize: 12,
    color: theme.palette.error.main,
  },
  requiredInput: {
    color: theme.palette.primary.main,
  },
  showPasswordImage: {
    cursor: 'pointer',
  },
}));
