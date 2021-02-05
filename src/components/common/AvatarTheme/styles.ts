import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { size: number; avatarCircleBackground?: string }>(() => ({
  circle: {
    backgroundColor: (props) => (
      props.avatarCircleBackground ? 'rgba(122, 230, 255, 0.2)' : props.avatarCircleBackground),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 133,
    height: 'auto',
    borderRadius: 10,
    paddingBottom: 5,
  },

  squareContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
  },

  title: {
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
  },
  titleSize: {
    fontSize: 12,
  },
  checked: {
    marginLeft: 10,
  },
}));
