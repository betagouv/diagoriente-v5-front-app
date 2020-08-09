import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '60% !important',
    outline: 0,
  },
  content: {
    paddingTop: 20,
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 0,
  },

  question: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 344,
    height: 145,
  },
  btnContainer: {
    display: 'flex',
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    padding: '5px 30px',
    width: 169,
    height: 50,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    margin: '5px 10px',
  },
  labelBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#011A5E',
  },
  dotsContainer: {
    listStyleType: 'none',
    display: 'inline-block',
  },
  existResponses: {
    border: '1px dotted black',
  },
}));
