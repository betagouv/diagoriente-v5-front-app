import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    width: '50%',
    // height: 400,
  },
  info: {
    width: '70%',
    paddingTop: 20,
  },
  infoContainer: {
    border: '1px solid #c2c2C2',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  containerSpec: {
    marginTop: 20,
  },
  containerClub: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    minHeight: 320,
  },
  infoClub: {
    paddingTop: 20,
    width: '100%',
    border: '1px solid #c2c2c2',
    borderRadius: 10,
  },
  inputAuto: {
    width: '100%',
  },
  rowInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textLabels: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bolder',
  },
  subLabel: {
    fontSize: 14,
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: 40,
  },
  btn: {
    backgroundColor: '#fe3708',
    width: 200,
    height: 44,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fe3708',
    },
  },
  btnDisable: {
    backgroundColor: 'gray',
    width: 200,
    height: 44,
    color: '#fff',
    '&:hover': {
      backgroundColor: 'gray',
    },
  },
  btnText: {
    color: '#fff',
  },
  bodyContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  heightOption: {
    maxHeight: 200,
  },
}));
