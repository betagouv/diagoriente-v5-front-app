import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { height: number; full?: boolean }>((theme) => ({
  root: {
    marginRight: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  index: {
    fontFamily: 'ocean',
    fontSize: 50,
    color: theme.palette.primary.main,
  },
  container: {
    width: 110,
    backgroundColor: (props) => (props.full ? '#cbb3fa' : 'rgba(162, 117, 255,0.1)'),
    border: (props) => (props.full ? `4px solid #9b80cf` : 'none'),
    borderRadius: 10,
    height: (props) => props.height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding:'0px 3px'
  },
  resetLogo: {
    position: 'absolute',
    top: -12,
    right: -12,
  },
}));
