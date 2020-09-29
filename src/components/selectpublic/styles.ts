import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>(() => ({
  selectWrapper: {
    height: '40px',
    position: 'relative',
  },
  selectContainer: {
    width: 162,
    backgroundColor: '#223a7a',
    height: 40,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-evenly',
    marginLeft: 20,
    position: 'relative',
  },
  textSelect: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
  },

  link: {
    color: '#424242',
  },
  optionsSelect: {
    position: 'absolute',
    top: 45,
    right: -3,
    width: 156,
    borderRadius: 5,
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
  },
  item: {
    padding: '5px 0px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  rotatedArrowContainer: {
    transform: 'rotate(180deg)',
  },
}));
