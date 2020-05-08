import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color: string }>(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageContainer: {
    height: 'auto',
  },
  image: {},
  titleContainer: {
    position: 'absolute',
  },
  title: {
    fontWeight: 900,
    fontSize: 62,
    fontFamily: 'Ocean',
    color: (props) => props.color,
  },
}));
