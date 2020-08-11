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
      backgroundColor: '#F3F2F4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 34,
    },

    circleContainer: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      padding: SKILL_CONTAINER_PADDING,
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
      [theme.breakpoints.down('md')]: {
        padding: 50,
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

    btnpreced: {
      color: '#6B6B6A',
      height: 50,
      marginTop: 33,
      fontSize: 14,
      textAlign: 'center',
      textDecoration: 'underline',
      fontWeight: 'bold',
    },

    arrowpreced: {
      marginRight: 13,
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
      backgroundColor: '#E5E5E5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    avatarStyle: {
      position: 'relative',
      maxHeight: '100%',
      maxWidth: '100%',
    },

    title: {
      color: '#424242',
      textAlign: 'center',
      fontSize: 14,
    },

    competences: {
      width: '100%',
      margin: 0,
      border: '1px solid #4D6EC5',
      padding: 10,
      fontSize: 18,
      color: '#424242',
      '&:hover': {
        backgroundColor: ' rgba(77, 110, 197, 0.2)',
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

    selected: {
      width: '100%',
    },

    activityContainer: {
      paddingBottom: 54,
    },

    selectedCompetence: {
      backgroundColor: '#4D6EC5',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#4D6EC5',
      },
    },

    tooltip: {
      background: '#4D6EC5',
    },

    margin: {
      margin: 0,
    },

    incluse: {
      backgroundColor: '#FF0060',
      color: '#fff',
      fontSize: 18,
      '&:hover': {
        backgroundColor: '#D60051',
      },
    },
    popupContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      flex: '1 1 0%',
      justifyContent: 'space-between',
    },
    iconClassName: {
      marginBottom: 31,
    },
    popupDescription: {
      textAlign: 'center',
    },
  }));
