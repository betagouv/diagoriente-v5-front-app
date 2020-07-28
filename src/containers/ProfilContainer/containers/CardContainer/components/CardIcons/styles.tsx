import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  headerIcons: {
    gridArea: 'icons',
    display: 'flex',
  },
  headerIcon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B6B6A',
    marginLeft: 22,
    cursor: 'pointer',
  },
  headerIconImage: {
    width: 30,
    marginRight: 11,
  },
});
