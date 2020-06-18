import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { fullSelect?: boolean; open?: boolean }>((theme: Theme) => ({
  content: {
    position: 'relative',
  },
  inputWrapper: {
    display: 'flex',
    position: 'relative',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1200,
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
    top: 16,
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
  secteurContainer: {
    background: '#FFFFFF',
    border: '1px solid #C9C9C7',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 5,
    position: 'absolute',
    top: 46,
    width: 599,
    height: 448,
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px 30px',
    overflow: 'scroll',
    zIndex: 5,
  },
  itemSecteur: {
    margin: 15,
    width: 230,
    cursor: 'pointer',
    '&:hover': {
      color: '#FFA600',
    },
  },
  selected: {
    color: '#FFA600',
  },
}));
