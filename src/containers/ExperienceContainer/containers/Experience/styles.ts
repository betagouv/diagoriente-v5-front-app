import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      overflow: 'auto',
      paddingTop: 110,
      position: 'relative',
      background: '#F3F2F4',
      height: '100vh',
    },
    boxInfo: {
      width: '289px',
      height: '269px',
      position: 'absolute',
      backgroundColor: 'white',
      top: 50,
      right: 50,
      borderRadius: 10,
      boxShadow: '0px 0px 5px -3px rgba(0, 0, 0, 0.75)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    boxInfoImg: {
      marginTop: 19,
      marginBottom: 24,
    },
    boxInfoDescription: {
      marginBottom: 10,
    },
    descriptionBoxInfo: {
      marginTop: 2,
      marginBottom: 2,
      textAlign: 'center',
    },
    linkBoxInfo: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      color: '#4D6EC5',
      lineHeight: '20px',
      marginTop: 12,
      marginBottom: 12,
    },
    textDescription: {
      marginTop: 30,
    },

    textColor: {
      color: theme.palette.background.default,
    },

    root: {
      display: 'flex',
      width: '70%',
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
    circleStyle: {
      width: 220,
    },
    circleStyleEng: {
      width: 240,
    },
  }),
);
