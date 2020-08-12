import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SKILL_CONTAINER_PADDING } from 'utils/generic';

export default makeStyles(() =>
  createStyles({
    InteretContainer: {
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

    interestCardContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginTop: 70,
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

    interestGrid: {
      display: 'flex',
    },

    text: {
      fontSize: 18,
    },

    rootClassName: {
      padding: 10,
      justifyContent: 'center',
      height: 142,
    },

    containerClassName: {
      background: 'rgba(162, 117, 255, 0.2)',
      opacity: 'inherit',
    },

    hideReset: {
      display: 'none',
    },

    circleClassName: {
      border: 'none',
      backgroundColor: '#A275FF',
      opacity: '0.6px',
    },

    textFamille: {
      color: '#420FAB',
    },

    btn: {
      backgroundColor: '#7533FF',
      marginTop: 96,
      '&:hover': {
        backgroundColor: '#420FAB',
      },
    },

    textButton: {
      color: '#fff',
      fontSize: 18,
    },

    empty: {
      width: 160,
    },
  }));
