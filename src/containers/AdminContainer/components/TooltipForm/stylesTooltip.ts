import { makeStyles, Theme } from '@material-ui/core/styles';
export default makeStyles<Theme>({
  rowWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 32,
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
});
