import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SKILL_CONTAINER_PADDING } from 'utils/generic';

export default makeStyles((theme) =>
  createStyles({
    InfoContainer: {
      display: 'flex',
      padding: SKILL_CONTAINER_PADDING,
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 34,
      flex: 1,
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

    empty: {
      width: 160,
    },
    btn: {
      backgroundColor: '#FF0060',
      marginTop: 66,
      '&:hover': {
        backgroundColor: '#D60051',
      },
    },

    textButton: {
      color: '#fff',
      fontSize: 18,
    },

    userInfo: {
      fontSize: 14,
      flex: '1 1 auto',
    },

    cancelText: {
      color: '#D60051',
      fontWeight: 'bold',
      WebkitTextStroke: '0.2px',
      fontSize: 14,
      cursor: 'pointer',
      marginTop: 22,
    },

    location: {
      display: 'flex',
      alignItems: 'center',
    },

    locationlogo: {
      marginRight: 10,
    },

    baseClassName: {
      margin: 0,
    },

    infoClassName: {
      color: '#6B6B6A',
    },

    emptyDiv: {
      width: 196,
    },

    infoRowContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    paddingClassName: {
      padding: '13px 0px 13px 0px ',
    },

    passwordRoot: {
      display: 'flex',
      width: '100%',
      paddingBottom: 13,
    },

    passwordContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    avatarsContainer: {
      width: 350,
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },

    avatar: {
      width: 70,
      height: 70,
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
      },
    },

    selectedAvatar: {
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '50%',
    },

    alignItems: {
      alignItems: 'flex-start',
    },

    editIcon: {
      marginLeft: 19,
    },

    childrenClassName: {
      margin: '3px 20px 3px 5px',
      width: 'auto',
    },
  }));
