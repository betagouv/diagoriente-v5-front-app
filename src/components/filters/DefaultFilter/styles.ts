import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    height: 44,
  },
  label: {
    transform: 'translate(14px, 14px) scale(1)',
  },
  filter: {
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 22,
    color: theme.palette.primary.main,
    paddingLeft: 4,
    paddingRight: 8,
  },
  inputsContainer: {
    paddingBottom: 24,
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 5,
  },
  button: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
}));
