import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
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
      maxHeight: '50vh',
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
      borderRadius: 30,
      border: '1px solid #7AE6FF !important',
      marginTop: 15,
      background: '#7AE6FF',
      width: '100%',
      '&:hover': {
        backgroundColor: '#7AE6FF',
      },
      '&:disabled': {
        color: 'currentColor',
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
      padding: '0 40px',
    },

    activityTitleSelection: {
      color: '#424242',
      fontSize: 14,
      paddingTop: 31,
      margin: 0,
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
      color: '#424242',
    },

    themeAvatar: {
      paddingRight: 2,
    },
  }),
);
