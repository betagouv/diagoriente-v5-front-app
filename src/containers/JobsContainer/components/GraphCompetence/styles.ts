import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { select: string }>((theme: Theme) => ({
  root: {
    border: '1px solid #C9C9C7',
    boxSizing: 'border-box',
    borderRadius: 15,
    height: 786,
    marginTop: 40,
    marginBottom: 40,
  },
  header: {
    display: 'flex',
    width: '100%',
    height: 74,
  },
  titleJobCompetence: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#DB8F00',
    width: '50%',
    borderRadius: '15px 0px 0px 0px',
    backgroundColor: (props) => (props.select === 'jobCompetence' ? '#F3F2F4' : '#fff'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  titleParcoursCompetence: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#00B2DB',
    backgroundColor: (props) => (props.select === 'parcoursCompetence' ? '#F3F2F4' : '#fff'),
    borderRadius: '0px 15px 0px 0px',
    cursor: 'pointer',
  },
}));
