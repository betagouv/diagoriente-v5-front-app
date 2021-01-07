import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<
  Theme,
  { direction: 'vertical' | 'horizontal'; size?: number; marginTop?: number; footer?: boolean; full?: boolean }
>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: (props) => (props.direction === 'horizontal' ? 'row' : 'column'),
    alignItems: 'center',
    margin: (props) => (props.direction === 'horizontal' ? '5px 36px 5px 0px' : 0),
    width: (props) => (props.direction === 'vertical' ? '100%' : 'auto'),
    marginTop: (props) => props.marginTop,
  },
  circle: {
    width: (props) => props.size || 77,
    height: (props) => props.size || 77,
    borderRadius: '50%',
    border: `2px dashed ${theme.palette.primary.main}`,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: (props) => (props.footer ? '#A275FF' : '#fff'),
    opacity: (props) => (props.footer ? 0.3 : 0.5),
    marginBottom: (props) => (props.direction === 'horizontal' ? 0 : 10),
  },
  number: {
    color: theme.palette.primary.main,
    fontSize: 40,
    fontWeight: 900,
    fontFamily: 'ocean',
  },
  elements: {
    display: 'flex',
    flexDirection: 'column',
  },
  bigElement: {
    width: 54,
    height: 11,
    opacity: 0.2,
    backgroundColor: (props) => (props.footer ? '#A275FF' : '#fff'),
    margin: 2,
  },
  smallElement: {
    width: 41,
    height: 11,
    opacity: 0.2,
    margin: 2,
    backgroundColor: (props) => (props.footer ? '#A275FF' : '#fff'),
  },
  textFamille: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  imageContainer: {
    position: 'relative',
    width: 60,
  },
  testImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    left: 0,
  },
}));
