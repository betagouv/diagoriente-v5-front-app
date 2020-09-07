import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { left?: number; top?: number; width?: number | string }>((theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginRight: 20,
    },
    selectContainer: {
      position: 'relative',
      fontFamily: 'Andika New Basic !important',
      WebkitTextStroke: '#424242',
      WebkitTextStrokeWidth: '0.1px',
      width: 'auto',
      overflow: 'hidden',
      borderRadius: 30,
      fontWeight: 'bold',
      border: '1px solid #D1D5DE',

      '& fieldset': {
        display: 'none',
      },
    },

    padding: {
      paddingLeft: 15,
      paddingRight: 84,
    },

    selected: {
      background: 'transparent',
    },
    img: {
      cursor: 'pointer',
    },

    menu: {
      top: (props) => props.top,
      left: (props) => props.left,
      width: (props) => props.width,
      overflow: 'auto',
      maxHeight: 200,
      flex: 1,
      borderRadius: 20,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
      border: '1px solid #C9C9C7',
    },

    menuItem: {
      borderBottom: '0.5px solid rgba(201, 201, 199, 0.5) ',
      margin: '0px 15px',
      paddingTop: 5,
      paddingBottom: 10,
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: 'transparent !important',
      whiteSpace: 'pre-wrap',

      '&:hover': {
        color: '#00B2DB',
        background: 'transparent',
      },
    },

    menuItemChild: {
      borderBottom: 'none',
      paddingTop: 0,
      paddingBottom: 0,
      margin: 0,
      position: 'relative',
    },
    lastChildBorder: {
      borderBottom: 'none !important',
    },

    menuItemBackground: {
      background: 'rgba(122, 230, 255,0.2)',
    },

    menuItemDisabled: {
      display: 'none',
    },

    addContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      fontWeight: 'bold',
      background: 'transparent',
      padding: 15,
    },

    addContainerInput: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      fontWeight: 'bold',
      padding: '15px',
    },

    add: {
      color: '#00B2DB',
      fontSize: 16,
      fontWeight: 'bold',
      paddingRight: 10,
      position: 'relative',
      bottom: 3,
    },

    select: { padding: 10 },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },

    input: {
      padding: 0,
      height: 35,
      paddingLeft: 10,
      backgroundColor: '#fff',
    },

    inputRoot: {
      flex: '1 1 0',
      marginRight: 10,
      overflow: 'hidden',
    },

    test: {
      position: 'absolute',
      top: 50,
      backgroundColor: 'red',
    },

    arrowDate: {
      position: 'absolute',
      backgroundColor: '#00CFFF',
      width: 35,
      top: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },

    circle: {
      background: 'transparent',
      position: 'absolute',
      right: 7.5,
      top: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 30,
      borderRadius: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      pointerEvent: 'none',
    },

    darkcircle: {
      background: '#7AE6FF',
    },

    paddingBottom: {
      paddingBottom: 0,
    },

    rootBackground: {
      backgroundColor: 'transparent !important',
      border: 'none !important',
    },

    backgroundRow: {
      // backgroundColor: 'rgba(122, 230, 255, 0.2) !important',
      color: '#00B2DB',
      WebkitTextStroke: '#00B2DB',
      WebkitTextStrokeWidth: '0.1px',
    },

    disabledClassName: {
      fontWeight: 'bold',
      background: 'red !important',
    },
  }),
);
