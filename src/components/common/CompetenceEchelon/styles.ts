import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  echelonContainer: {
    display: 'flex',
    width: 192,
    flexDirection: 'column',
  },
  echelon: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(122, 230, 255, 0.2)',
    borderRadius: 20,
    padding: '7px 19px',
    width: '100%',
  },

  echelonTitle: {
    color: '#00B2DB',
    fontWeight: 'bold',
    flex: '1 1 0%',
    overflow: 'hidden',
    fontSize: 12,
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
    marginLeft: 6,
  },
  tooltip: {
    background: '#7AE6FF',
    opacity: '0.5',
  },
}));
