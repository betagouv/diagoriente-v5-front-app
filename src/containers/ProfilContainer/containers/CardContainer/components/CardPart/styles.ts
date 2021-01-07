import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  part: {
    padding: '30px 0',
    borderBottom: '1px solid #6B6B6A',
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  title: {
    position: 'relative',
    lineHeight: 1,
    fontSize: 42,
    top: 2,
    color: '#D60051',
    fontFamily: 'Ocean',
    textTransform: 'uppercase',
  },
});
