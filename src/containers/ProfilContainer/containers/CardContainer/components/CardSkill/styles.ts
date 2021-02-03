import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { recommended?: Boolean }>(() => ({
  tooltipRight: {
    left: '-10vw !important',
  },
  tooltipLeft: {
    right: '-30px !important',
  },
  skill: {
    borderRadius: 10,
    transition: 'all 133ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      backgroundColor: (props) => (props.recommended ? 'rgba(122, 230, 255, 0.2)' : 'none'),
      cursor: (props) => props.recommended && 'pointer',
    },
  },
  skillHeader: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  themeTitle: {
    flex: '1 1 0%',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: '26px',
    display: 'flex',
    alignItems: 'center',
  },
  commentIcon: {
    marginLeft: 7,
    width: 30,
    marginTop: 5,
  },
  themeIcon: {
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundSize: '100% 100%',
    position: 'absolute',
  },
  activityContainer: {
    marginTop: 9,
    marginLeft: 5,
  },
  activity: {
    fontSize: 10,
    paddingLeft: 6,
    position: 'relative',
    '&:before': {
      backgroundColor: '#424242',
      content: '""',
      height: 3,
      width: 3,
      borderRadius: 1.5,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: 0,
    },
  },
}));
