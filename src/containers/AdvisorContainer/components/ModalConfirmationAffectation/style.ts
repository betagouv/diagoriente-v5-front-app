import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  userClubRecoContainer: { display: 'flex', alignItems: 'flex-start' },
  infoClub: { fontSize: 18, margin: '10px 0px', color: '#4D6EC5' },
  selectContainer: { width: '70%' },
  manuelSelection: { display: 'flex', alignItems: 'flex-start' },
  advisorSelection: { margin: '20px 0px' },
  infoUser: { marginTop: 18, display: 'flex', flexDirection: 'column', width: '40%' },
  btnConfirmaionContainer: { display: 'flex', justifyContent: 'center', margin: '20px 0px' },
  heightModal: { height: 407 },
  headerModal: { marginTop: 120, marginBottom: 20 },
  modalBtnContainer: { width: '100%', display: 'flex', justifyContent: 'center' },
  text: { textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  subText: { textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
  subTextInfo: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'red' },
  btn: { display: 'flex', justifyContent: 'space-around', margin: '40px 0px', width: '50%' },
  loadingContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
}));
