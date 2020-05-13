import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'fixed',
      bottom: 0,
      width: 318,
      background: theme.palette.background.default,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 10,
      borderRadius: '0px 15px 0px 0px',
      flexDirection: 'column',
      transition: 'all 250ms cubic-bezier(0.4, 0, 1, 1) 0ms',
    },
    sidebar: {
      position: 'fixed',
      width: '100vw',
      height: 'calc(100vh - 83px)',
      top: 83,
      transform: 'translate(0, calc(-100vh - 83px))',
      transition: 'transform 250ms cubic-bezier(0.4, 0, 1, 1) 0ms',
      minHeight: 'auto',
    },

    container: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      paddingLeft: 42,
      paddingRight: 21,
    },

    menuIconClosed: {
      transform: 'rotate(180deg)',
    },
    menuIcon: {
      transition: 'all 300ms linear',
    },
    titleSelection: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#FFFFFF',
    },
    childrenSelection: {
      background: '#FFFFFF',
    },
  }));
