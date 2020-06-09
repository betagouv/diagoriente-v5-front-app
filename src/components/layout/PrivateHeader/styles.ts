import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const HEADER_HEIGHT = 46;
export default makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: HEADER_HEIGHT,
      background: theme.palette.background.default,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 2000,
    },

    toolbarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    flexCenter: {
      display: 'flex',
      alignItems: 'center',
    },

    menuIcon: {
      marginRight: 8,
    },

    typography: {
      marginRight: 10,
      fontSize: 14,
      alignItems: 'center',
      color: '#ffff',
    },
  }));
