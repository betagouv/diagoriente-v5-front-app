import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { fullSelect?: boolean; open?: boolean }>((theme: Theme) => ({
  content: {
    position: 'relative',
  },
  inputWrapper: {
    display: 'flex',
    position: 'relative',
  },
  inputContainer: {
    height: 35,
    width: 235,
    border: (props) => `1px solid  ${props.open ? theme.palette.success.main : '#C9C9C7'}`,
    borderRadius: 5,
    margin: '9px 0px',
    background: '#fff',
    paddingLeft: (props) => (props.fullSelect ? 30 : 5),
    outline: 0,
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 14,
    '&:focus-within': {
      borderColor: theme.palette.success.main,
    },
    '&::placeholder': {
      color: (props) => (props.open ? theme.palette.success.main : '#424242'),
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
  logoContainer: {
    position: 'absolute',
    right: 12,
    top: 14,
    backgroundColor: '#fff',
  },
  menu: {
    position: 'absolute',
    left: 9,
    top: 13,
    zIndex: 3,
  },

  rotatedBase: {
    transform: 'rotate(90deg)',
    transition: '0.5s ease',
    cursor: 'pointer',
  },
  rotated: {
    transform: 'rotate(270deg)',
    transition: '0.5s ease',
    cursor: 'pointer',
  },
}));
