import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    width: '100%',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapperBow: {
    display: 'flex',
    alignItems: 'center',
  },
  box: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#e9e9e9',
    cursor: 'pointer',
  },
  filledBox: {
    backgroundColor: '#fe3708',
  },
  filledBoxPrev: {
    backgroundColor: 'gray',
  },
  textStepper: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bolder',
  },
  strock: {
    width: 90,
    height: 2,
    border: '1px dashed #e9e9e9',
  },
  filledStrock: {
    border: '1px dashed gray',
  },
}));
