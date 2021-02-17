import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { size: number; avatarCircleBackground?: string }>(() => ({
  circle: {
    height: (props) => props.size,
    width: (props) => props.size,
    borderRadius: '50%',
    backgroundColor: (props) => (props.avatarCircleBackground ? props.avatarCircleBackground : '#C9C9C7'),
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    whiteSpace: 'pre-wrap',
    fontSize: 12,
  },

  checked: {
    marginLeft: 10,
  },
}));
