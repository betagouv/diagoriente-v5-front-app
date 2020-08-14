import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  part: {
    padding: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    width: '47%',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  title: {
    position: 'relative',
    lineHeight: 1,
    fontSize: 42,
    top: 2,
    color: '#D60051',
    fontFamily: 'Ocean',
    textTransform: 'uppercase',
  },
  subTitle: {
    color: '#D60051',
    fontSize: 12,
  },
  competences: { marginTop: 25 },
  competenceTitle: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 'bold',
  },
  competencesPart: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
  },
  competenceNiveau: {
    fontSize: 10,
    width: '100%',
    lineHeight: '13px',
    marginTop: 10,
  },
  emptyCompetences: {
    fontSize: 18,
    lineHeight: '29px',
    marginTop: 17,
  },
  emptyCompetencesBold: {
    fontWeight: 'bold',
  },
});
