import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '60% !important',
    outline: 0,
  },
  content: {
    height: 275,
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
    height: 148,
  },
  btnContainer: {
    display: 'flex',
    paddingTop: 20,
    paddingBottom: 25,
  },
  btnTrue: {
    backgroundColor: '#4d6dc6',
    padding: '5px 30px',
    width: 169,
    height: 50,
    '&:hover': {
      backgroundColor: '#4d6dc6',
    },
    margin: '5px 10px',
  },
  btnFalse: {
    backgroundColor: '#d60050',
    padding: '5px 30px',
    width: 169,
    height: 50,
    '&:hover': {
      backgroundColor: '#d60050',
    },
    margin: '5px 10px',
  },
  labelBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  dotsContainer: {
    listStyleType: 'none',
    display: 'inline-block',
  },
  existResponses: {
    border: '1px dotted black',
  },
}));
