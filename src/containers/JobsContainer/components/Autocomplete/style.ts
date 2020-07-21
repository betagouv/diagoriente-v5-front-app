import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { error: boolean }>((theme: Theme) => ({
  root: {
    height: 35,
    position: 'relative',
    width: 222,
  },
  inputBase: {
    height: 35,
    background: '#FFFFFF',
    width: 228,
  },
  inputRoot: {
    width: 185,
  },
  containerAutoComp: {
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 4,
    },
    '& .MuiInputBase-root': {
      height: 35,
      width: 300,
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
          color: '#C9C9C7',
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
  optionsContainer: {
    width: 222,
    background: '#FFFFFF',
    border: '1px solid #C9C9C7',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 5,
    position: 'absolute',
    padding: 9,
    top: 37,
    zIndex: 1500,
    maxHeight: 300,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
  },
  item: {
    cursor: 'pointer',
    margin: '5px 0px',
    textAlign: 'left',
  },
  itemWrapper: {
    width: '100%',
    paddingLeft: 12,
  },
}));
