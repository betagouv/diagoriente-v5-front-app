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
    width: (props) => props.width || 320,
    height: 'auto',
  },
  title: {
    fontWeight: 900,
    fontSize: (props) => (props.size ? props.size : 62),
    fontFamily: (props) => (props.font ? props.font : 'Ocean'),
    textTransform: 'uppercase',
    color: (props) => (props.color ? props.color : theme.palette.primary.main),
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      fontSize: (props) => (props.size ? props.size : 50),
    },
  },
}));
