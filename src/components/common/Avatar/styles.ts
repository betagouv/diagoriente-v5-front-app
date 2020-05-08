import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { size: number }>(() => ({
  square: {
    height: (props) => props.size,
    width: (props) => props.size,
    borderRadius: '50%',
    backgroundColor: '#C9C9C7',
  },

  squareContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: (props) => props.size + 10,
  },

  title: {
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
