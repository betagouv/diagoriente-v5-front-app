import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>
  createStyles({
    footerContainer: {
      paddingTop: 65,
      paddingBottom: 80,
      background: '#011A5E',
      display: 'flex',
      flexDirection: 'column',
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

    gridContainer: {
      marginTop: 33,
    },
    circle: {
      height: 40,
      width: 40,
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
      color: '#F3F2F4',
      fontSize: 14,
      lineHeight: '201%',
      margin: 0,
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    link: {
      alignSelf: 'flex-start',
      color: '#F3F2F4',
      fontSize: 14,
      lineHeight: '201%',
      margin: 0,
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

    marginIcons: {
      marginLeft: 11,
      marginRight: 11,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
      },
    },

    firstContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    secondContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 0,
    },

    iconContainer: {
      display: 'flex',
      alignSelf: 'flex-start',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        justifyContent: 'center',
      },
    },

    text: {
      color: '#F3F2F4',
      fontSize: 14,
    },

    textStyle: {
      textAlign: 'center',
      width: 244,
    },

    input: {
      marginTop: 12,
      marginBottom: 2,
    },

    btn: {
      backgroundColor: '#00CFFF',
      height: 50,
      width: 'max-content',
      color: '#011A5E',
      fontSize: 18,
      fontWeight: 'bold',

      '&:hover': {
        backgroundColor: '#00B2DB',
        borderRadius: 10,
      },
    },

    contact: {
      backgroundColor: '#FF0060',
      height: 50,
      width: 244,
      marginTop: 24,
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#D60051',
        borderRadius: 10,
        width: 244,
      },
    },

    width: {
      width: 170,
    },

    newsteller: {
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        justifyContent: 'center',
      },
    },

    contactContainer: {
      justifyContent: 'flex-end',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-end',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  }),
);
