import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  part: {
    padding: '30px 0',
    borderBottom: '1px solid #6B6B6A',
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  title: {
    position: 'relative',
    lineHeight: 1,
    fontSize: 42,
    top: 2,
    color: theme.palette.background.default,
    fontFamily: 'Ocean',
    textTransform: 'uppercase',
  },
  subTitle: {
    color: theme.palette.background.default,
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
    width: '50%',
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
}));
