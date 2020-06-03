import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { selected: string }>((theme) => ({
  root: {
    backgroundColor: (props) => (props.selected ? theme.palette.secondary.main : '#F3F2F4'),
    borderRadius: 10,
    width: 252,
    height: 237,
    margin: 9,
    padding: 20,
    cursor: 'pointer',
  },
  selectedBox: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#424242',
    textAlign: 'center',
    height: 90,
  },
  description: {
    fontSize: 14,
    color: '#424242',
    height: 70,
    overflow: 'hidden',
    width: '100%',
    marginBottom: (props) => (props.selected ? 0 : 15),
    textAlign: 'center',
  },
  accessibility: {
    width: 'max-content',
    height: 24,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 12,
    color: '#6B6B6A',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'flex-start',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  btnLabe: {
    color: '#011A5E',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerCard: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
