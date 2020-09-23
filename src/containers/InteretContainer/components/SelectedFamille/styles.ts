import { makeStyles, Theme } from '@material-ui/core/styles';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

export default makeStyles<Theme, { direction: 'vertical' | 'horizontal'; hover: boolean }>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: (props) => (props.direction === 'horizontal' ? 'row' : 'column'),
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px 8px 5px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: '5px 12px 5px 0px',
    },
    cursor: 'pointer',
  },
  circle: {
    width: 67,
    height: 67,
    borderRadius: '50%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontWeight: 900,
    fontSize: 42,
    lineHeight: '42px',
    fontFamily: 'ocean',
    color: theme.palette.primary.main,
    paddingTop: 8,
  },
  text: {
    fontWeight: 'bold',
    lineHeight: '15px',
  },

  elements: {
    display: 'flex',
    flexDirection: 'column',
    width: 90,
    marginLeft: 13,
    fontSize: 12,
    color: (props) => (props.direction === 'horizontal' ? '#fff' : '#424242'),
    textAlign: (props) => (props.direction === 'horizontal' ? 'left' : 'center'),
  },
  imgWrapper: { position: 'relative' },

  closeContainer: {
    position: 'absolute',
    top: -2,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: '50%',
    zIndex: 1500,
    display: (props) => (props.hover && props.direction === 'horizontal' ? 'block' : 'none'),
  },

  imageContainer: {
    position: 'relative',
    width: 60,
    '&:hover': {
      opacity: (props) => (props.direction === 'horizontal' ? 0.7 : 1),
    },
  },
}));
