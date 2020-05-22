import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>(() => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  logoContainer: {
    width: 56,
    height: 57,
    marginRight: 20,
  },
  title: {
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 900,
    color: '#424242',
  },
}));
