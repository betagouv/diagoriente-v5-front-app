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
  },
  inputRoot: {
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 4,
    },
    '& .MuiInputBase-root': {
      height: 35,
      width: 229,
      background: '#FFFFFF',
      border: (props) => `1px solid ${props.error ? theme.palette.error.main : '#C9C9C7'}`,
      borderRadius: 5,
      margin: '9px 0px',
      '& .MuiOutlinedInput-input': {
        padding: '0px !important',
      },
      '&:hover:not(:focus-within)': {
        borderColor: (props) => (props.error ? theme.palette.error.main : '#6B6B6A'),
      },
      '&:focus-within': {
        borderColor: (props) => (props.error ? theme.palette.error.main : theme.palette.primary.main),
      },
      '& .MuiInputBase-input': {
        padding: 0,
        flex: '1 1 0%',
        height: 'auto',
        fontSize: 14,
        borderRadius: 5,

        '&::placeholder': {
          color: '#A9A9A9',
          fontSize: 14,
        },
        '& .MuiOutlinedInput-input': {
          padding: '0px 0px 0px 5px !important',
          backgroundColor: 'red',
        },
      },
      '& .MuiOutlinedInput-input:-webkit-autofill': {
        padding: '0px 0px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 0,
      },
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: 5,
      marginLeft: 5,
    },
    ' &:-webkit-autofill': {
      animationName: '$autofill !important',
      animationFillMode: 'both',
      animationDuration: 1,
    },
  },
  '@keyframes autofill': {
    to: {
      backgroundColor: '#fff',
    },
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    height: '100%',
    // width: 260,
    justifyContent: 'center',
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
