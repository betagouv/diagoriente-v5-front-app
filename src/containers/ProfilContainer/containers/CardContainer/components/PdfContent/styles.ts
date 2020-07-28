import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    padding: 50,
    position: 'absolute',
    top: -99999,
  },
  headerImage: {
    width: 56,
    marginRight: 25,
  },
  headerTitle: {
    gridArea: 'title',
    display: 'flex',
    alignItems: 'center',
    marginTop: 19,
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
  pdfTitle: {
    marginBottom: 13,
  },
  commentContainer: {
    marginTop: 16,
  },
  comment: {
    padding: 16,
    border: '1px solid #C9C9C7',
    borderRadius: 10,
    position: 'relative',
    width: '100%',
    marginTop: 16,
  },
  commentIcon: {
    width: 30,
    top: -13,
    right: -15,
    position: 'absolute',
  },
  themeTitle: {
    flex: '1 1 0%',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: '26px',
    display: 'flex',
    alignItems: 'center',
  },
}));
