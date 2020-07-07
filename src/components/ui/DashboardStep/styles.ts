import { makeStyles, Theme } from '@material-ui/core/styles';

const transition = 'all 225ms ease-out';

function getAvatarSize(props: { state?: 'closed' | 'initial' | 'open' }) {
  if (props.state === 'closed') {
    return '7vw';
  }
  if (props.state === 'open') {
    return '14vw';
  }

  return '20vw';
}

export default makeStyles<Theme, { background?: string; state?: 'closed' | 'initial' | 'open' }>(() => ({
  container: {
    flex: (props) => (props.state === 'open' ? '3 3 0%' : '1 1 0%'),
    backgroundColor: (props) => props.background,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '7vh',
    paddingLeft: (props) => (props.state === 'closed' ? 0 : '4vw'),
    paddingRight: (props) => (props.state === 'closed' ? 0 : '4vw'),
    paddingBottom: '7vh',
    cursor: 'pointer',
    transition,
  },
  title: {
    color: '#FFFFFF',
    fontSize: (props) => (props.state === 'closed' ? '2.2vw' : '3.8vw'),
    fontFamily: 'Ocean',
    position: 'relative',
    transition,
  },
  avatarContainer: {
    width: getAvatarSize,
    paddingTop: getAvatarSize,
    position: 'relative',
    marginTop: (props) => (props.state === 'open' ? '4.5vh' : '8vh'),
    marginBottom: (props) => (props.state === 'open' ? '4.5vh' : '8vh'),
    transition,
  },
  avatar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: '50%',
    //backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  initialChildren: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.2ms linear',
    transitionDelay: (props) => (props.state === 'initial' ? '225ms' : '0ms'),
    transform: (props) => `scale(${props.state === 'initial' ? 1 : 0})`,
    height: (props) => (props.state === 'initial' ? 'auto' : 0),
  },
  openChildren: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.2ms linear',
    transitionDelay: (props) => (props.state !== 'open' ? '0ms' : '225ms'),
    transform: (props) => `scale(${props.state === 'open' ? 1 : 0})`,
    height: (props) => (props.state === 'open' ? 'auto' : 0),
    cursor: 'default',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
}));
