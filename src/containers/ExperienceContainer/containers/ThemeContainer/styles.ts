import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
      paddingBottom: 77,
    },

    themeTitle: {
      color: '#424242',
      fontSize: 18,
    },

    gridContainer: {
      padding: '50px 115px',
      [theme.breakpoints.down('md')]: {
        padding: '20px 30px',
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
    },

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

    btnperso: {
      position: 'absolute',
      backgroundColor: '#00CFFF',
      bottom: -25,
      left: '50%',
      transform: 'translate(-50%,0)',
      height: 50,
      '&:hover': {
        backgroundColor: '#00B2DB ',
        borderRadius: 10,
      },
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

    arrow: {
      paddingTop: 6,
    },

    hideLine: {
      textDecoration: 'none',
    },

    loadingContainer: {
      width: '100%',
      height: 'calc(100vh - 166px)',
      backgroundColor: '#E5E5E5',
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

    contentBtn: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);
