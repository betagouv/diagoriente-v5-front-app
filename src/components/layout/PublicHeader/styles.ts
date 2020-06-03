import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const HEADER_HEIGHT = 135;
export default makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: HEADER_HEIGHT,
      background: theme.palette.background.default,
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
    },

    toolbarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: 180,
      paddingRight: 180,
      [theme.breakpoints.down('sm')]: {
        paddingRight: 20,
        paddingLeft: 20,
      },
      [theme.breakpoints.down('md')]: {
        paddingRight: 40,
        paddingLeft: 40,
      },
    },

    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      },
    },

    typography: {
      marginRight: 10,
      fontSize: 14,
    },
    square: {
      width: '80px',
      height: '50px',
      background: '#ffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    imageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },

    headerRoot: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },

    headerSection: {
      display: 'flex',
      padding: 0,
      margin: 0,
      paddingRight: 16,
    },

    linkContainer: {
      margin: 0,
      listStyle: 'none',
      textDecoration: 'none',
      fontSize: 14,
    },

    link: {
      textDecoration: 'none',
      color: '#F3F2F4',
      paddingLeft: 20,
    },

    betaGov: {
      marginTop: 5,
    },

    menuIcon: {
      marginRight: 8,
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
    select: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    logoLink: {
      display: 'flex',
      alignItems: 'center',
    },
  }));
