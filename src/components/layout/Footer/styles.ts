import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>
  createStyles({
    footerContainer: {
      paddingTop: 80,
      paddingBottom: 80,
      background: '#011A5E',
      display: 'flex',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      paddingLeft: 180,
      paddingRight: 180,
      [theme.breakpoints.down('md')]: {
        paddingRight: 30,
        paddingLeft: 30,
      },
      [theme.breakpoints.down('sm')]: {
        paddingRight: 40,
        paddingLeft: 40,
        flexDirection: 'column',
        fontSize: 12,
      },
      [theme.breakpoints.down('xs')]: {
        paddingRight: 20,
        paddingLeft: 20,
      },
    },

    leftSection: {
      flex: '1 1 auto',
      paddingRight: 20,
      color: '#ffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
      },
    },

    rightSection: {
      flex: '1 0 auto',
      paddingLeft: 20,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingLeft: 0,
        marginTop: 20,
        flexWrap: 'wrap',
      },
    },

    footer: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'flex-start',
      fontSize: 14,
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'space-between',
        width: '100%',
      },
    },

    efp: {
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
        marginLeft: 10,
      },
    },
    square: {
      padding: 10,
      background: '#ffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
      },
    },

    circleDot: {
      height: 6,
      width: 6,
    },

    circle: {
      height: 31,
      width: 31,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    circleLinkedin: {
      backgroundColor: '#4D6EC5',
    },

    circleTwitter: {
      backgroundColor: '#00CFFF',
    },

    textTop: {
      alignSelf: 'flex-start',
    },

    textBottom: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 14,
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        marginRight: 10,
        fontSize: 12,
      },
    },

    text: {
      margin: '0 30px',
      color: 'rgba(255,255,255,0.7)',
      [theme.breakpoints.down('sm')]: {
        margin: 10,
        fontSize: 12,
      },
    },

    marginIcons: {
      marginRight: 16,
      marginLeft: 30,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
      },
    },
  }));
