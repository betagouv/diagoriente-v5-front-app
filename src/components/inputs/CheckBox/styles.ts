import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color?: string }>(() => ({
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
      '&:checked': {
        '& ~ $checkmark': {
          backgroundColor: '#4D6EC5',
          border: 0,
          '&:after': {
            display: 'none',
          },
        },
      },
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
    '&:hover': {
      '& input': {
        '& ~ $checkmark': {
          backgroundColor: '#fff',
        },
      },
    },
  },

  checkmark: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 19,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    border: '1px solid #C9C9C7',
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
