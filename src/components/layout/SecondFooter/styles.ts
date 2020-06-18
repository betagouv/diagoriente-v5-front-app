import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>
  createStyles({
    footerContainer: {
      paddingTop: 45,
      paddingBottom: 25,
      background: '#FFFFFF',
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

    textTop: {
      alignSelf: 'flex-start',
      fontSize: 12,
      lineHeight: '19px',
      margin: 0,
    },

    iconContainer: {
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  }));
