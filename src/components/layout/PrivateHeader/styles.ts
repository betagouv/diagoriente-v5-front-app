import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const HEADER_HEIGHT = 46;
export default makeStyles<Theme, { isCampus?: boolean }>((theme: Theme) =>
  createStyles({
    appBar: {
      height: HEADER_HEIGHT,
      background: (props) => props.isCampus ? '#19194b' : theme.palette.background.default,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 1400,
    },

    toolbarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 'auto !important',
    },

    flexCenter: {
      display: 'flex',
      alignItems: 'center',
    },

    logoContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    imageDimentions: {
      width: (props) => props.isCampus ? 376 : 161,
      height: (props) => props.isCampus ? 31 : 44,
    },
    menuIcon: {
      marginRight: 8,
      cursor: 'pointer',
    },

    typography: {
      marginRight: 10,
      fontSize: 14,
      alignItems: 'center',
      color: '#ffff',
      fontWeight: 'bold',
    },
    logoLink: {
      display: 'flex',
      alignItems: 'center',
    },
  }));
