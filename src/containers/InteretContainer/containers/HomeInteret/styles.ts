import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 31,
    paddingBottom: 20,
    backgroundColor: '#f3f2f4',
  },
  content: {
    maxWidth: 1080,
  },
  interestContainerLogo: {
    display: 'flex',
    justifyContent: 'center',
  },
  subTitleContainer: {
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
  },
  avatarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
  },
  btn: {
    backgroundColor: theme.palette.success.main,
    height: 50,
    width: 'max-content',
    '&:hover': {
      backgroundColor: theme.palette.success.main,
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
