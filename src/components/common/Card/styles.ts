import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { background: string; color: string }>(() =>
  createStyles({
    cardContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    titleContainer: {
      display: 'flex',
      background: (props) => props.background,
      color: (props) => props.color,
      fontFamily: 'Ocean',
      fontWeight: 900,
      fontSize: 26,
      lineHeight: 1,
      maxHeight: 65,
      height: '100vh',
      borderRadius: '10px 10px 0px 0px',
      justifyContent: 'center',
      alignItems: 'center',
    },

    childrenCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      flex: 1,
      background: '#fff',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      padding: '30px 50px ',
      borderRadius: '0px 0px 10px 10px',
      justifyContent: 'center',
    },

    link: {
      textDecoration: 'none',
      color: '#fff',
    },

    titleSpacing: {
      justifyContent: 'space-between',
    },

    logo: {
      width: 45,
      marginLeft: 40,
    },
  }));
