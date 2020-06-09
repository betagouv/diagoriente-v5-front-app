import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
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

    title: {
      fontWeight: 900,
      fontSize: 42,
      fontFamily: 'Ocean',
      color: '#223A7A',
    },

    marginTitle: {
      margin: '0 15px',
    },
  }));
