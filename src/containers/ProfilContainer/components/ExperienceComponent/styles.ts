import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CONTAINER_PADDING } from 'containers/ExperienceContainer/Experience';

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
      padding: CONTAINER_PADDING,
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
    },

    btnLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 40,
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
    },
  }));
