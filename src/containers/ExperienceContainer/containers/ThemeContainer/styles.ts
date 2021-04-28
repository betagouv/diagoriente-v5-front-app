import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SKILL_CONTAINER_PADDING } from 'utils/generic';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },

    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '50px 120px',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: '40px',
      },
    },

    themeContainer: {
      position: 'relative',
      width: '100%',
      backgroundColor: '#F3F2F4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 34,
      minHeight: '76vh',
    },

    themeTitle: {
      color: '#424242',
      fontSize: 14,
    },

    gridContainer: {
      padding: SKILL_CONTAINER_PADDING,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        padding: '30px 30px',
      },
    },

    circleContainer: {
      display: 'flex',
      width: '100%',
      alignItems: 'stretch',
    },

    circle: {
      width: '100%',
      minWidth: 130,
      padding: 10,
      cursor: 'pointer',
      '&:hover': {
        background: 'rgba(122, 230, 255, 0.2)',
      },
    },
    searchContainer: {},
    boxSearch: {
      background: '#7AE6FF',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '44px 100px',
    },
    boxSearchTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: ' 26px',
    },
    inputSearchContainer: {
      marginTop: 25,
    },
    dataSearchContainer: {},
    title: {
      fontWeight: 900,
      fontSize: 42,
      fontFamily: 'Ocean',
      color: '#223A7A',
      marginTop: 50,
    },

    marginTitle: {
      margin: '0 15px',
      color: '#424242',
      fontSize: 14,
    },

    textSelected: {
      margin: '0 15px',
      fontWeight: 'bold',
      fontSize: 14,
      color: '#424242',
    },

    text: {
      fontWeight: 'normal',
    },

    header: {
      height: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },

    hideLine: {
      textDecoration: 'none',
    },

    loadingContainer: {
      width: '100%',
      height: 'calc(100vh - 166px)',
      display: 'flex',
      justifyContent: 'center',
    },

    avatarStyle: {
      position: 'relative',
      maxHeight: '100%',
      maxWidth: '100%',
    },

    themeRoot: {
      padding: '0 40px',
    },

    titleSelection: {
      color: '#424242',
      fontSize: 14,
      paddingTop: 31,
      margin: 0,
    },

    themeText: {
      fontWeight: 600,
    },

    themeSelection: {
      display: 'flex',
      paddingTop: 15,
      alignItems: 'center',
      paddingBottom: 25,
    },

    themeTile: {
      paddingLeft: 2,
      fontSize: 14,
      flex: 1,
    },

    themeAvatar: {
      paddingRight: 2,
    },

    tooltipRight: {
      left: '-50px !important',
    },
    tooltipLeft: {
      right: '-50px !important',
    },
    margin: {
      margin: '0px 20px',
    },

    dot: {
      textAlign: 'left',
      listStyle: 'inside',
      flex: 0,
      margin: 0,
    },
    selectedImg: {
      '&:not(.nohover):hover': {
        opacity: 1,
      },
    },
    errorMessage: {
      color: theme.palette.error.main,
    },
  }),
);
