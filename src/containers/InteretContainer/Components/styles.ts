import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color: string }>(() => ({
  container: {
    width: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 'auto',
  },
  image: {},
  titleContainer: {
    position: 'absolute',
    top: 70,
  },
  title: {
    fontWeight: 900,
    fontSize: 62,
    fontFamily: 'Ocean',
    color: (props) => props.color,
  },
}));
