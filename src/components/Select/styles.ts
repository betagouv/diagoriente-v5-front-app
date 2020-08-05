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
      '& fieldset': {
        borderColor: '#00CFFF',
        background: 'rgba(122, 230, 255, 0.2)',
        '&:focus-within': {
          borderColor: '#00CFFF !important',
          background: 'transparent',
        },
        '&:hover': {
          borderColor: '#00CFFF !important',
          background: 'transparent',
        },
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
      maxHeight: 300,
      flex: 1,
      borderRadius: 20,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
      border: '1px solid #C9C9C7',
    },

    menuItem: {
      borderBottom: '0.5px solid #C9C9C7 ',
      margin: '0px 20px',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 15,
      paddingBottom: 15,
      '&:last-child': {
        borderBottom: 'none',
        paddingTop: 0,
        paddingBottom: 0,
        margin: 0,
      },

      '&:hover': {
        color: '#00B2DB',
        background: 'transparent',
      },
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
      height: 76,
    },

    addContainerInput: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      fontWeight: 'bold',
      height: 76,
      padding: '0px 20px',
    },

    add: {
      color: '#00B2DB',
      fontSize: 18,
      fontWeight: 'bold',
      paddingRight: 10,
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
    },

    darkcircle: {
      background: '#7AE6FF',
    },

    paddingBottom: {
      paddingBottom: 0,
    },
  }),
);
