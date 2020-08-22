import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  wrapper: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
  },
  container: {
    flex: '1 0 auto',
    display: 'grid',
    gridTemplateAreas: '"title" "question" "parent" "verified"',
    gridGap: 20,
    paddingTop: 5,
  },
  title: {
    gridArea: 'title',
  },
  question: { gridArea: 'question' },
  verified: { gridArea: 'verified' },
  parent: {
    gridArea: 'parent',
  },
  parentContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto 24px 24px',
    gridTemplateAreas: '"input delete add"',
    gridGap: '0 15px',
    alignItems: 'center',
  },
  parentInput: { gridArea: 'input' },
  parentAdd: {
    gridArea: 'add',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    marginBottom: 20,
  },
  parentDelete: {
    gridArea: 'delete',
    color: theme.palette.error.main,
    cursor: 'pointer',
    marginBottom: 20,
  },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
}));
