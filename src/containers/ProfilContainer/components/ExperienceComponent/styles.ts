import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SKILL_CONTAINER_PADDING } from 'utils/generic';

export default makeStyles(() =>
  createStyles({
    profilContainer: {
      position: 'relative',
      width: '100%',
      backgroundColor: '#F3F2F4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 34,
      flex: 1,
      padding: SKILL_CONTAINER_PADDING,
    },

    cardGridContainer: {
      width: '100%',
      paddingTop: 57,
    },

    cardClassName: {
      paddingTop: 50,
    },

    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 45,
      width: '100%',
      justifyContent: 'space-between',
    },
    spinner: {
      flex: '1 1 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontFamily: 'Ocean',
      fontWeight: 900,
      fontSize: '2.2em',
      lineHeight: 1,
      paddingTop: 9,
    },

    logo: {
      height: 60,
      width: 60,
    },

    cardGrid: {
      display: 'flex',
      width: '100%',
    },

    themeContainer: {
      display: 'flex',
    },
    itemContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    themeSelection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    themeTile: {
      paddingLeft: 2,
      fontSize: 14,
      flex: 1,
      color: '#424242',
      width: '100%',
      overflow: 'hidden',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      textOverflow: 'ellipsis',
    },

    emptyDiv: {
      height: 45,
    },

    empty: {
      width: 160,
    },

    competenceTitle: {
      fontSize: 14,
      fontWeight: 18,
    },

    text: {
      fontSize: 18,
    },

    btn: {
      backgroundColor: '#011A5E',
      '&:hover': {
        backgroundColor: '#223A7A',
      },
    },

    textButton: {
      color: '#fff',
      fontSize: 18,
      width: 262,
    },

    btnLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 40,
      maxWidth: '100%',
      background: 'transparent',
    },

    link: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(77, 110, 197, 0.1)',
      margin: 16,
      borderRadius: 10,
      flex: 1,
      maxWidth: 'calc(33.333333% - 32px)',
      /*  [theme.breakpoints.down(1265)]: {
        maxWidth: '100%',
        background: 'transparent',
      }, */
    },

    popupContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      flex: '1 1 0%',
      justifyContent: 'space-between',
    },

    popupDescription: {
      textAlign: 'center',
      color: '#424242',
    },

    incluse: {
      backgroundColor: '#FF0060',
      color: '#fff',
      fontSize: 18,
      marginTop: 25,
      '&:hover': {
        backgroundColor: '#D60051',
      },
    },

    linkHome: {
      color: '#00B2DB',
      fontSize: 14,
      fontWeight: 'bold',
      textDecoration: 'none',
      marginTop: 14,
      '&:hover': {
        backgroundColor: 'transparent',
        color: '#00CFFF',
      },
    },
  }));
