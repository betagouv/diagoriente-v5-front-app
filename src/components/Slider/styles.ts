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
    position: "absolute",
    zIndex: 5,
  },
  descLogo: {
    position: 'relative',
    width: 270,
    height: 80,
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: '0px 100px',
  },
  circle: {
    width: '100%',
  },
  subitem: {
    width: 170,
    margin: '10px 15px',
  },
  wrapperBtn: {
    display: 'flex',
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  nextWrap: { right: -25 },
  prevWrap: { left: -25 },
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
    '&:active': {
      borderStyle: 'hidden',
    },
  },
  rotatedArrow: {
    transform: 'rotate(180deg)',
  },
  titleContainerArrow: { margin: '0px 10px', width: 124 },
  topTitleArrow: { fontSize: 18, fontWeight: 900, color: theme.palette.secondary.main },
  bottomTitleArrow: { fontSize: 18, fontWeight: 900, color: theme.palette.primary.main },
  hide: {
    display: 'none',
  },
}));
