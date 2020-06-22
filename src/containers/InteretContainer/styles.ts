import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  aide: {
    width: 51,
    height: 50,
    backgroundColor: '#C9C9C7',
    position: 'fixed',
    bottom: 20,
    right: 20,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aideText: {
    fontWeight: 900,
    fontSize: 40,
    fontFamily: 'ocean',
    color: '#FFFFFF',
    paddingTop: 5,
  },
}));
