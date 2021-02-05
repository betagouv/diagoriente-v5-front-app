import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color?: string; checked?: boolean; border?: string }>(() => ({
  container: {
    display: 'block',
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    width: 19,
    height: 20,
    borderRadius: 5,
    '& input': {
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
      height: 0,
      width: 0,
    },

    '& $checkmark': {
      '&:after': {
        left: '6px',
        top: '2px',
        width: '5px',
        height: '10px',
        transform: 'rotate(45deg)',
      },
    },
  },

  checkmark: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 19,
    height: 20,
    backgroundColor: (props) => (props.checked ? props.color : '#fff'),
    borderRadius: 5,
    border: (props) => (props.border ? `1px solid ${props.border}` : '1px solid #C9C9C7'),
    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'none',
    },
  },
  icon: {
    position: 'absolute',
    top: 6,
    left: 2,
    width: 15,
    height: 10,
  },
}));
