import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  root: {
    width: '100% !important',
    [theme.breakpoints.down('xs')]: {
      height: 'max-content !important',
    },
  },
  sliderContainer: {
    width: '100%',
  },
  content: {
    display: 'flex',
  },
  sliderWrapper: {
    width: '100%',
  },
  item: {
    width: '100%',
    height: '100%',
    outline: 'none',
  },
  titleContainer: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  traitLogo: {
    position: 'absolute',
    top: -16,
    left: -22,
    zIndex: 3,
  },
  topTitle: {
    fontWeight: 900,
    fontSize: 24,
    color: theme.palette.secondary.main,
  },
  bottomTitle: {
    fontWeight: 900,
    fontSize: 24,
    color: theme.palette.primary.main,
    position: 'relative',
    zIndex: 5,
  },
  descLogo: {
    position: 'relative',
    height: 80,
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: '0px 150px',
  },
  circle: {
    width: '100%',
  },
  subitem: {
    minWidth: 170,
    padding: '10px 3px',
    width: '25%',
  },
  selected: {
    opacity: 0.5,
  },
  wrapperBtn: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    alignItems:'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  nextWrap: { right: 4 },
  prevWrap: { left: 3 },
  containerBtn: {
    width: 55,
    height: 55,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    borderStyle: 'hidden',
    paddingLeft: 5,
    '&:active': {
      borderStyle: 'hidden',
    },
  },
  rotatedArrow: {
    transform: 'rotate(180deg)',
  },
  titleContainerArrow: { margin: '0px 10px', width: 124 },
  topTitleLeftArrow: { fontSize: 18, fontWeight: 900, color: theme.palette.secondary.main, textAlign: 'left' },
  topTitleRightArrow: { fontSize: 18, fontWeight: 900, color: theme.palette.secondary.main, textAlign: 'left' },
  bottomTitleLeftArrow: { fontSize: 18, fontWeight: 900, color: theme.palette.primary.main, textAlign: 'left' },
  bottomTitleRightArrow: { fontSize: 18, fontWeight: 900, color: theme.palette.primary.main, textAlign: 'left' },

  hide: {
    display: 'none',
  },
  arrowCon: {
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
