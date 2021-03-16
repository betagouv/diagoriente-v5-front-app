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

    header: {
      height: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    themeContainer: {
      position: 'relative',
      backgroundColor: '#F3F2F4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 34,
      height: 600,
    },

    title: {
      textAlign: 'center',
      color: '#424242',
      fontSize: 18,
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
    date: {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      marginTop: 15,
    },

    text: {
      marginRight: 10,
      color: '#5A6170',
      fontWeight: 'bold',
      fontSize: 16,
    },

    dateContainer: {
      marginTop: 35,
    },
    selectContainer: {
      background: '#FFFFFF',
      border: '1px solid #D1D5DE',
      borderRadius: '5px',
      width: 73,
      height: 39,
      marginLeft: 20,
    },
  }),
);
