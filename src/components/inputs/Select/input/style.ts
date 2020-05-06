import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0px 0px 0px',
  },
  wrapperInput: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  'MuiFormControl-root': {
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 4,
    },
    '& .MuiInputBase-root': {
      height: 35,
      width: 229,
      background: '#FFFFFF',
      border: '1px solid #C9C9C7',
      borderRadius: 5,
      margin: '9px 0px',
      overflow: 'hidden',
      '& .MuiInputBase-input': {
        '&::placeholder': {
          color: '#C9C9C7',
          fontSize: 14,
        },
        '& .MuiOutlinedInput-input': {
          paddingLeft: '5px',
        },
      },
      '& .MuiOutlinedInput-input:-webkit-autofill': {
        padding: '7px 0px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 0,
      },
      '&:hover': {
        borderColor: '#6B6B6A',
        borderRadius: 5,
      },
      '&:active': {
        borderColor: '#6B6B6A',
        borderRadius: 5,
      },
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: 5,
      marginLeft: 5,
    },
  },
  autoFill: {
    '&:-webkit-autofill-selected': {
      backgroundColor: 'white !important',
    },
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    height: '100%',
    width: 260,
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
  },
  subTitle: {
    fontSize: 12,
    marginRight: 14,
  },
  descriptionPassword: {
    fontSize: 12,
    color: '#424242',
  },

  error: {
    '& .MuiInputBase-root': {
      borderColor: '#FF0060',
    },
  },
  validation: {
    '& .MuiInputBase-root': {
      borderColor: '#00CFFF',
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
    color: '#FF0060',
  },
}));
