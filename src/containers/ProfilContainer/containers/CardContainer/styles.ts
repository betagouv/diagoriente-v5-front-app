import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  container: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 70,
    paddingTop: 18,
    backgroundColor: '#E5E5E5',
  },
  header: {
    display: 'grid',
    gridTemplateAreas: `"arrow icons"
                        "title icons"`,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#D60051',
    fontFamily: 'Ocean',
    textTransform: 'uppercase',
  },
  competenceContainer: {
    display: 'flex',
    width: '100%',
    borderBottom: '1px solid #6B6B6A',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    color: 'inherit',
  },

  footerIcons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  part: {
    padding: '30px 0',
    borderBottom: '1px solid #6B6B6A',
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  boxInfo: {
    height: '269px',
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxInfoImg: {
    marginTop: 19,
    marginBottom: 24,
  },
  boxInfoDescription: {
    marginBottom: 10,
  },
  descriptionBoxInfo: {
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
  },
  linkBoxInfo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#D60051',
    lineHeight: '20px',
    marginTop: 12,
    marginBottom: 12,
  },
});
