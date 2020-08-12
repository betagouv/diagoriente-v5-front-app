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
    gridTemplateAreas:
      '"title type" "description description"  "interests interests" "options options" "verified verified"',
    gridGap: 20,
    paddingTop: 5,
  },
  title: {
    gridArea: 'title',
  },
  type: { gridArea: 'type' },
  description: { gridArea: 'description' },
  verified: { gridArea: 'verified' },
  interests: { gridArea: 'interests' },
  options: { gridArea: 'options' },
  option: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  optionValue: { flex: '1 1 0', fontSize: 16, padding: 8 },
  optionVerify: { margin: '0 8px', color: theme.palette.success.main },
  optionClear: { margin: '0 8px', color: theme.palette.error.main },
  optionRemove: { marginLeft: 8, color: theme.palette.error.main },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
  optionsInput: {
    paddingRight: 80,
  },
  add: {
    right: 15,
    position: 'absolute',
    color: theme.palette.primary.main,
  },
}));
