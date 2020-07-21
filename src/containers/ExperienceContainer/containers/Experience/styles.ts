import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
      paddingTop: 30,
      paddingBottom: 20,
    },

    textColor: {
      color: theme.palette.background.default,
    },

    root: {
      display: 'flex',
      width: 600,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
    },

    square: {
      height: 140,
      width: 140,
      borderRadius: '50%',
      backgroundColor: '#C9C9C7',
    },

    circleContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    illus: {
      width: '100%',
      height: '100%',
    },

    btnpro: {
      backgroundColor: '#4D6EC5',
      height: 50,

      '&:hover': {
        backgroundColor: '#223A7A',
        borderRadius: 10,
      },
    },

    btnperso: {
      backgroundColor: '#4D6EC5',
      height: 50,
      '&:hover': {
        backgroundColor: '#223A7A ',
        borderRadius: 10,
      },
    },

    btnLabel: {
      color: '#fff',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    },

    title: {
      textAlign: 'center',
      color: '#424242',
      fontSize: 18,
    },

    help: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 22,
    },

    marginTitle: {
      marginTop: 41,
      marginBottom: 16,
      color: '#424242',
      fontSize: 14,
    },

    hideLine: {
      textDecoration: 'none',
    },

    margin: {
      margin: '3px 20px 6px 20px',
    },
  }),
);
