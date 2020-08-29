import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Theme as RequestTheme } from 'requests/types';

export default makeStyles<Theme, { theme?: Omit<RequestTheme, 'activities'> | null }>((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'fixed',
      bottom: 0,
      width: 318,
      background: theme.palette.background.default,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 10,
      borderRadius: '0px 15px 0px 0px',
      flexDirection: 'column',
      transition: 'all 250ms cubic-bezier(0.4, 0, 1, 1) 0ms',
      boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
    },

    container: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      paddingLeft: 42,
      paddingRight: 21,
      cursor: 'pointer',
    },

    menuIconClosed: {
      transform: 'rotate(180deg)',
    },
    menuIcon: {
      transition: 'all 300ms linear',
    },
    titleSelection: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#FFFFFF',
    },

    childrenSelection: {
      background: '#FFFFFF',
      overflow: 'auto',
      maxHeight: 'calc(100vh - 120px)',
    },

    header: {
      height: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },

    btnLabel: {
      color: '#223A7A',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
      marginRight: 10,
    },

    avatarStyle: {
      position: 'relative',
      maxHeight: '100%',
      maxWidth: '100%',
    },

    activityContainer: {
      paddingBottom: 54,
    },

    activitySelected: {
      marginTop: 15,
      width: '100%',
      textAlign: 'left',
      fontSize: 14,
      '&:hover': {
        backgroundColor: '#7AE6FF',
      },
      '&:disabled': {
        border: 'none',
        color: '#00B2DB',
        padding: 0,
        fontWeight: 'bold',
      },
    },

    selected: {
      width: '100%',
    },

    selectedActivity: {
      backgroundColor: '#7AE6FF',
      '&:hover': {
        backgroundColor: '#7AE6FF',
      },
    },

    themeRoot: {
      padding: (props) => (props.theme ? '0 40px' : 0),
    },

    activityTitleSelection: {
      color: '#424242',
      fontSize: 14,
      paddingTop: 31,
      margin: 0,
    },

    themeSelection: {
      display: 'flex',
      paddingTop: 31,
      alignItems: 'center',
    },

    themeTile: {
      paddingLeft: 2,
      fontSize: 14,
      flex: 1,
      color: '#424242',
    },

    emptyChildren: {
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 45,
      paddingRight: 25,
      color: '#424242',
      fontSize: 14,
    },

    themeAvatar: {
      paddingRight: 2,
      alignItems: 'flex-start',
    },
    circleClassName: {
      padding: 0,
      background: 'transparent',
    },
    dot: {
      textAlign: 'left',
      listStyle: 'inside',
      fontSize: 16,
      margin: 0,
    },
    boldText: {
      fontWeight: 'bold',
    },
    blob: {
      background: 'rgba(255, 255,255, 0.5)',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      height: 26,
      width: 26,
    },
    badgeText: {
      color: theme.palette.background.default,
      fontWeight: 'bold',
      lineHeight: '17px',
    },

    squareContainerClassName: {
      height: 90,
      width: 90,
    },

    animation: {
      boxShadow: '0 0 0 0 rgba(255, 255,255, 1)',
      transform: 'scale(1)',
      animationName: '$pulse',
      animationDuration: '1500ms',
    },
    '@keyframes pulse': {
      from: {
        transform: 'scale(1.5)',
        boxShadow: '0 0 0 0 rgba(255, 255,255, 0.7)',
        width: 0,
        height: 0,
      },
      to: {
        transform: 'scale(1)',
        boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)',
        width: 40,
        height: 40,
      },
    },
  }));
