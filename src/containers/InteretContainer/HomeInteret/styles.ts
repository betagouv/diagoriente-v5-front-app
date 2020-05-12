import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 80,
  },
  content: {
    maxWidth: 1080,
  },
  subTitleContainer: {
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: '#424242',
  },
  avatarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 60,
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn: {
    backgroundColor: theme.palette.secondary.main,
    height: 50,
    width: 'max-content',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 10,
    },
  },
  btnLabel: {
    color: '#fff',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
}));
