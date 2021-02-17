import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  root: {
    width: '100% !important',
    outline: 0,
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
    height: 'calc(100vh - 139px)',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
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
    flexWrap: 'wrap',
    padding: '0px 143px',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  circle: {
    width: '100%',
  },
  subitem: {
    minWidth: 170,
    padding: '10px 3px',
    width: '29%',
    cursor: 'pointer',
  },
  subitem1: {
    minWidth: 170,
    padding: '10px 3px',
    width: '25%',
    cursor: 'pointer',
  },
  selected: {
    opacity: 1,
    position: 'relative',
  },
  deselected: {
    opacity: 0.5,
  },
  wrapperBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  nextWrap: { right: 4 },
  prevWrap: { left: 3 },
  containerBtn: {
    width: 44,
    height: 44,
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
  titleContainerArrow: { margin: '5px 10px' },
  topTitleLeftArrow: {
    fontSize: 22,
    fontWeight: 900,
    color: theme.palette.secondary.main,
    textAlign: 'left',
    fontFamily: 'ocean',
    lineHeight: '26px',
    textTransform: 'uppercase',
  },
  topTitleRightArrow: {
    fontSize: 22,
    fontWeight: 900,
    color: theme.palette.secondary.main,
    textAlign: 'left',
    fontFamily: 'ocean',
    lineHeight: '26px',
    textTransform: 'uppercase',
  },
  bottomTitleLeftArrow: {
    fontSize: 22,
    fontWeight: 900,
    color: theme.palette.primary.main,
    textAlign: 'left',
    fontFamily: 'ocean',
    lineHeight: '26px',
    textTransform: 'uppercase',
  },
  bottomTitleRightArrow: {
    fontSize: 22,
    fontWeight: 900,
    color: theme.palette.primary.main,
    textAlign: 'left',
    fontFamily: 'ocean',
    lineHeight: '26px',
    textTransform: 'uppercase',
  },

  hide: {
    display: 'none',
  },
  arrowCon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  testImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    left: 0,
  },
  imageContainer: {
    position: 'relative',
  },
  show: {
    opacity: 1,
  },
  hideImg: {
    opacity: 0,
  },
}));
