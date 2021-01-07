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
      paddingTop: 34,
      paddingBottom: 250,
    },

    circleContainer: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      padding: SKILL_CONTAINER_PADDING,
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
      [theme.breakpoints.down('sm')]: {
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
    },

    avatarStyle: {
      position: 'relative',
      maxHeight: '100%',
      maxWidth: '100%',
    },

    title: {
      textAlign: 'center',
    },

    activityContainer: {
      paddingBottom: 54,
    },

    activity: {
      borderRadius: 30,
      border: '1px solid #00CFFF',
      padding: 5,
      margin: 8,
      fontSize: 14,
      maxWidth: '100%',
      '&:hover': {
        backgroundColor: 'rgba(122, 230, 255, 0.2)',
      },
    },

    selected: {
      width: '100%',
    },

    selectedActivity: {
      backgroundColor: '#7AE6FF',
      color: '#424242',
      fontWeight: 'bold',
      fontSize: 14,
      '&:hover': {
        backgroundColor: '#7AE6FF',
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

    selectRoot: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      padding: '0px 50px',
      justifyContent: 'center',
    },

    selectGrid: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      alignItems: 'center',
    },

    selectContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    menuItemContainer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&:hover $deleteIcon': {
        display: 'flex',
      },
    },
    deleteIcon: {
      color: '#FF0060',
      fontSize: 23,
      cursor: 'pointer',
      display: 'none',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginBottom: 50,
    },

    rootClassName: {
      marginTop: 20,
    },

    styleSelect: {
      border: '2px solid #00CFFF',
      color: '#00B2DB',
      WebkitTextStroke: '#00B2DB',
      WebkitTextStrokeWidth: '0.1px',
    },

    borderSelect: {
      border: '1px solid #00CFFF',
    },
  }),
);
