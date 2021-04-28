import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  container: {
    width: '100%',
    height: `100%`,
    display: 'flex',
    justifyContent: 'center',
    flex: '1 1 0%',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  titleTopContainer: { display: 'flex', justifyContent: 'center', flex: 1, fontFamily: 'Ocean' },
  topTitle: {
    fontSize: 35,
    fontWeight: 900,
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    margin: '0px 5px',
  },
  bottomTitle: {
    fontSize: 35,
    fontWeight: 900,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    margin: '0px 5px',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 35,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center !important',
    },
  },
  linkContainer: {
    width: 'auto',
    paddingRight: 20,
  },
  wrapper: {
    width: '100%',
    position: 'relative',
    flex: '1 1 0%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0px 40px',
    backgroundColor: '#E5E5E5',
  },
  maxWidth: {
    maxWidth: 1080,
    position: 'relative',
    flex: '1 1 0%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  loadingContainer: {
    width: '100%',
    height: 'calc(100vh - 166px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  circleContainer: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    flex: '1 1 0%',
    padding: '0px 0px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 30,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 30,
    },
  },
  footer: {
    height: 90,
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.25)',
    padding: '10px 60px 10px 10px',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
      overflow: 'overlay',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
    },
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    lineHeight: '22px',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 10,
  },
  footerContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'overlay',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
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
    marginRight: 10,
  },
  textModal: {
    padding: '20px 0px',
    textAlign: 'center',
  },
  titleContainerModal: {
    fontWeight: 'bold',
    fontSize: 42,
    fontFamily: 'ocean',
    color: theme.palette.secondary.main,
    textAlign: 'center',
    marginBottom: 20,
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    width: '80%',
  },
  imgContainerWarning: {
    width: '100%',
    height: '100%',
  },
}));
