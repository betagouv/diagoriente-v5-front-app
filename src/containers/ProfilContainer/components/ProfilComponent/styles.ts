import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CONTAINER_PADDING } from 'containers/ExperienceContainer/Experience';

export default makeStyles((theme) =>
  createStyles({
    profilContainer: {
      position: 'relative',
      width: '100%',
      backgroundColor: '#F3F2F4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 34,
    },

    cardGridContainer: {
      padding: '0px 70px 80px 70px',
    },

    cardClassName: {
      paddingTop: 40,
    },

    title: {
      fontFamily: 'Ocean',
      fontWeight: 900,
      fontSize: '2.2em',
      lineHeight: 1,
      paddingBottom: 15,
    },

    logo: {
      height: 60,
      width: 60,
    },

    txtCarte: {
      marginTop: 15,
    },

    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },

    location: {
      marginLeft: 10,
    },

    cardGrid: {
      display: 'flex',
      width: '100%',
    },

    experienceCard: {
      alignSelf: 'flex-start',
    },

    itemContainer: {
      display: 'flex',
      justifyContent: 'center',
    },

    themeSelection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    locationContainer: {
      display: 'flex',
      alignItems: 'center',
    },

    themeTile: {
      paddingLeft: 2,
      fontSize: 14,
      flex: 1,
      color: '#424242',
      width: '100%',
      overflow: 'hidden',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
    },

    emptyDiv: {
      height: 45,
    },

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

    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },

    childrenCardClassName: {
      padding: 0,
    },

    wrapperBtn: {
      display: 'flex',
      position: 'absolute',
      width: '100%',
    },

    nextWrap: { right: 20 },
    prevWrap: { left: 5 },

    containerBtn: {
      width: 55,
      height: 55,
      backgroundColor: '#7533FF',
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

    topTitleArrow: { fontSize: 18, fontWeight: 900, color: '#3533E4' },

    bottomTitleArrow: { fontSize: 18, fontWeight: 900, color: "'#5203E4" },

    hide: {
      display: 'none',
    },

    circleContainer: {
      display: 'flex',
      justifyContent: 'center',
    },

    carouselCircle: {
      height: 14,
      width: 14,
      borderRadius: '50%',
      background: '#A275FF',
      margin: '0px 2.5px',
      marginBottom: 20,
      transition: 'all 0.4s linear',
    },

    currentCarouselCircle: {
      background: '#420FAB',
    },

    calcPaddingTop: {
      paddingTop: 'calc(30px + 1em)',
    },

    job: {
      flex: 1,

      marginLeft: 15,
      fontSize: 14,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    favoriContainer: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      marginTop: 8,
    },
  }));
