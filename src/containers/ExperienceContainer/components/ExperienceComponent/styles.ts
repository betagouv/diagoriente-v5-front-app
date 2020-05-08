import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
      paddingTop: 104,
      paddingBottom: 155,
    },

    textColor: {
      color: theme.palette.background.default,
    },

    root: {
      display: 'flex',
      width: 600,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 60,
    },

    square: {
      height: 200,
      width: 200,
      borderRadius: '50%',
      backgroundColor: '#C9C9C7',
    },

    circleContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    btnpro: {
      backgroundColor: '#011A5E',
      height: 50,

      '&:hover': {
        backgroundColor: '#223A7A',
        borderRadius: 10,
      },
    },

    btnperso: {
      backgroundColor: '#00CFFF',
      height: 50,
      '&:hover': {
        backgroundColor: '#00B2DB ',
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
    },

    help: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 22,
    },
  }));
