import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
container: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: '15px',
    WebkitTextStroke: '0.2px',
  },
  user: {
    color: '#7AE6FF',
    textTransform: 'capitalize',
  },
  location: {
    fontWeight: 'normal',
  },
  commentText: {
    fontSize: 12,
    marginTop: 13,
  },
});
