import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>({
  wrapper: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
  },
  container: {
    flex: '1 0 auto',
    display: 'grid',
    gridTemplateAreas: '"title title" "icon description"',
    gridGap: 20,
    paddingTop: 5,
  },
  title: {
    gridArea: 'title',
  },
  description: { gridArea: 'description' },
  icons: { gridArea: 'icon' },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
  textAuto: {
    fontSize: 18,
    marginBottom: 9,
  },
  autoCompleteContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputClass: {
    height: 60,
  },
  styleMap: {
    height: '500px !important',
    width: '70% !important',
  },
  mapWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});
