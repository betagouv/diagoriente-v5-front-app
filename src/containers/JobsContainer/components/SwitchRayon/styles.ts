import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { checked: string }>((theme) => ({
  root: {
    width: 144,
    height: 35,
    background: '#FFFFFF',
    border: '1px solid #C9C9C7',
    borderRadius: 15,
    display: 'flex',
    marginTop: 12,
  },
  km: {
    borderRadius: '15px 0px 0px 15px',
    backgroundColor: (props) => (props.checked === 'km' ? theme.palette.secondary.main : '#FFFFFF'),
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '0.1px solid #C9C9C7',
    cursor: 'pointer',
  },
  min: {
    borderRadius: '0px 15px 15px 0px',
    backgroundColor: (props) => (props.checked === 'min' ? theme.palette.secondary.main : '#FFFFFF'),
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: '0.1px solid #C9C9C7',
    cursor: 'pointer',
  },
}));
