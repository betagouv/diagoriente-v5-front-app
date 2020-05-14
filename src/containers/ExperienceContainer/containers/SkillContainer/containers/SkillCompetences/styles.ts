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
      backgroundColor: '#F3F2F4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 54,
    },

    circleContainer: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      padding: '50px 135px',
      paddingBottom: 107,
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
      [theme.breakpoints.down('md')]: {
        padding: 30,
      },
    },

    circle: {
      width: '12.5%',
      minWidth: 130,
      marginBottom: 62,
    },

    marginTitle: {
      margin: '0 15px',
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

    btnpreced: {
      color: '#6B6B6A',
      height: 50,
      marginTop: 33,
      fontSize: 14,
      textAlign: 'center',
      textDecoration: 'underline',
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

    title: {
      textAlign: 'center',
    },

    competences: {
      width: '100%',
      margin: 0,
      border: '1px solid #4D6EC5',
      padding: 10,
      fontSize: 18,
      color: '#424242',
      '&:hover': {
        backgroundColor: ' rgba(77, 110, 197, 0.2);',
      },
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

    activitySelected: {
      borderRadius: 30,
      border: '1px solid #7AE6FF',
      marginTop: 15,
      background: '#7AE6FF',
      '&:hover': {
        backgroundColor: '#7AE6FF',
      },
    },

    selected: {
      width: '100%',
    },

    activityContainer: {
      paddingBottom: 54,
    },

    selectedCompetence: {
      backgroundColor: '#4D6EC5',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#4D6EC5',
      },
    },

    contentBtn: {
      display: 'flex',
      alignItems: 'center',
    },
    margin: {
      margin: 0,
    },
  }));
