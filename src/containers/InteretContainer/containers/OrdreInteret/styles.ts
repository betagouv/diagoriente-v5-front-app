import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    maxWidth: 1080,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center !important',
    },
  },
  title: {
    fontSize: 42,
    color: theme.palette.primary.main,
    fontFamily: 'ocean',
    marginLeft: 24,
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center !important',
    },
  },

  wrapper: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: '100%',
    position: 'relative',
    paddingBottom: 10,
    marginBottom: 0,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  listSelected: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50,
    flexWrap: 'wrap',
  },
  item: {
    width: 140,
  },
  circle: {
    width: 77,
    height: 77,
    borderRadius: '50%',
    backgroundColor: 'red',
  },
  disable: {
    opacity: 0.5,
  },
  orderSelected: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  btn: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    color: '#fff',
  },
  contentBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapperBtn: {
    alignSelf: 'center',
  },
  btnLabel: {
    color: '#fff',
  },
  errorContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    color: '#FF0060',
  },
}));
