import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const HEADER_HEIGHT = 135;
export const HEADER_SMALL_HEIGHT = 47;

export default makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: HEADER_HEIGHT,

      background: theme.palette.background.default,
      display: 'flex',
      justifyContent: 'center',
      overflow: 'visible',
      [theme.breakpoints.down('md')]: {
        height: HEADER_SMALL_HEIGHT,
      },
    },

    toolbarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: 180,
      paddingRight: 180,
      minHeight: 'auto !important',
      [theme.breakpoints.down('sm')]: {
        paddingRight: 20,
        paddingLeft: 20,
        justifyContent: 'flex-start',
      },
      [theme.breakpoints.down('md')]: {
        paddingRight: 40,
        paddingLeft: 40,
        justifyContent: 'center',
      },
    },

    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        width: '100%',
      },
    },

    typography: {
      marginRight: 10,
      fontSize: 14,
    },
    beta: {
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
      [theme.breakpoints.down('md')]: {},
    },

    logoLink: {
      display: 'flex',
      alignItems: 'center',
    },

    smallbeta: {
      marginLeft: 20,
      marginRight: 30,
    },

    logoIcon: {
      height: 66,
      [theme.breakpoints.down('md')]: {
        height: 45,
      },
    },
  }));
