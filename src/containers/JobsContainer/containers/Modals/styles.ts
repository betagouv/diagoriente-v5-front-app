import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 900,
    fontSize: 42,
    fontFamily: 'ocean',
    textTransform: 'uppercase',
  },
  contentModal: {
    padding: 45,
  },
  TextTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textAccessibility: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
    fontSize: 18,
  },
  offreContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  offreConatinerItems: {
    background: '#F3F2F4',
    borderRadius: 10,
    width: '45%',
    padding: '11px 19px',
  },
  offresTitle: {
    color: theme.palette.success.main,
    fontSize: 14,
    padding: 9,
  },
  description: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  similaireJob: {
    width: '45%',
  },
  graph: {
    width: '45%',
  },
  metiersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  metierItem: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 12,
    padding: '3px 16px',
    width: 'fit-content',
    margin: 3,
    color: '#424242',
    cursor: 'pointer',
  },
}));
