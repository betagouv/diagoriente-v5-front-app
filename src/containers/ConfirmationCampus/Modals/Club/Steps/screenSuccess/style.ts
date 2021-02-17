import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 320,
    width: '100%',
  },
  content: {
    marginTop: 30,
    fontSize: 28,
    paddingTop: 40,
  },
  btn: {
    marginTop: 40,
    backgroundColor: '#fe3708',
    width: '200px',
    height: 44,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fe3708',
    },
  },
  infoClub: {
    padding: 20,
    width: '100%',
    border: '1px solid #c2c2c2',
    borderRadius: 10,
  },
  rowInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subLabel: {
    fontSize: 14,
  },
  textLabels: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bolder',
    marginBottom: 10,
  },
  bodyContent: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 30,
  },
}));
