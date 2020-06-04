import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import bluearrow from 'assets/svg/bluearrow.svg';
import darkbluearrow from 'assets/svg/darkbluearrow.svg';

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
    },

    title: {
      textAlign: 'center',
      paddingBottom: 58,
      color: '#424242',
      fontSize: 18,
      margin: 0,
    },

    echelonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      marginBottom: 100,
      alignSelf: 'flex-start',
      marginLeft: 80,
    },

    empty: {
      width: 275,
    },

    echelon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 65,
      paddingBottom: 15,
    },

    echelonTitle: {
      color: '#424242',
      fontSize: 14,
      flex: '1 1 0%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
    },

    competenceTitle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      margin: 0,
      paddingRight: 30,
      width: 245,
      color: '#424242',
      fontSize: 18,
    },

    competencesContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    competencesValues: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      paddingBottom: 10,
      paddingLeft: 30,
      '&:last-child': {
        paddingBottom: 36,
      },
    },

    arrowEchelon: {
      position: 'relative',
      display: 'flex',
      backgroundImage: `url(${bluearrow})`,
      alignItems: 'center',
      paddingRight: 65,
      width: 549,
      height: 67,
      cursor: 'pointer',
    },

    darkArrowEchelon: {
      position: 'absolute',
      backgroundImage: `url(${darkbluearrow})`,
      top: 0,
      left: 0,
      bottom: 0,
    },

    arrow: {
      paddingTop: 6,
    },

    pointContainer: {
      display: 'flex',
      flex: '1 1 0%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    point: {
      position: 'relative',
      borderRadius: '50%',
      width: 10,
      height: 10,
      background: '#00CFFF',
      cursor: 'pointer',
      '&:hover': {
        background: '#7AE6FF',
        width: 14,
        height: 14,
        border: '4px solid #00B2DB',
      },
    },

    tooltipContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },

    tooltipPointContainer: {
      display: 'flex',
      width: '100%',
      marginTop: 15,
      marginBottom: 27,
      alignItems: 'center',
      justifyContent: 'center',
    },

    tooltipPoint: {
      display: 'flex',
      background: '#00B2DB',
      borderRadius: '50%',
      width: 10,
      height: 10,
      marginRight: 12,
    },

    pointSelected: {
      background: '#FFFFFF',
      border: '4px solid #00B2DB',
      width: 18,
      height: 18,
      pointerEvents: 'none',
    },

    smallPointSelected: {
      position: 'relative',
      borderRadius: '50%',
      background: '#7AE6FF',
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
      fontWeight: 'bold',
    },

    arrowpreced: {
      marginRight: 13,
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

    contentBtn: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);
