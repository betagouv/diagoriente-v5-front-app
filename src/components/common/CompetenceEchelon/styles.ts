import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  echelonContainer: {
    display: 'flex',
    width: 193,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  echelon: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(122, 230, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    padding: '7px 19px',
  },

  echelonTitle: {
    color: '#00B2DB',
    fontWeight: 'bold',
  },

  tooltipPointContainer: {
    display: 'flex',
    marginTop: 4,
  },

  tooltipPoint: {
    display: 'flex',
    background: '#00CFFF',
    borderRadius: '50%',
    width: 10,
    height: 10,
    marginLeft: 12,
  },
  tooltip: {
    display: 'flex',
    background: '#7AE6FF',
    borderRadius: '50%',
    width: 10,
    height: 10,
    marginLeft: 12,
    opacity: '0.5',
  },
}));
