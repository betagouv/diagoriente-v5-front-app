import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  wrapper: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
  },
  container: {
    flex: '1 0 auto',
    display: 'grid',
    gridTemplateAreas: '"title type" "icon description"  "activities activities" "verified verified"',
    gridGap: 20,
    paddingTop: 5,
  },
  title: {
    gridArea: 'title',
  },
  type: { gridArea: 'type' },
  description: { gridArea: 'description' },
  icons: { gridArea: 'icon' },
  verified: { gridArea: 'verified' },
  activities: { gridArea: 'activities' },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
});
