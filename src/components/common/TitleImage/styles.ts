import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color: string; size?: number; font?: string; width?: number }>(() => ({
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
  position: {
    position: 'absolute',
  },
}));
