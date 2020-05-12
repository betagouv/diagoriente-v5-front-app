import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color: string; size?: number; font?: string; width?: number }>((theme) => ({
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
  image: {
    width: (props) => (props.width || 320),
    height: 'auto',
  },
  titleContainer: {
    position: 'absolute',
  },
  title: {
    fontWeight: 900,
    fontSize: (props) => (props.size ? props.size : 62),
    fontFamily: (props) => (props.size ? props.font : 'Ocean'),
    color: (props) => props.color,
    [theme.breakpoints.down('xs')]: {
      fontSize: (props) => (props.size ? props.size : 50),
    },
  },
}));
