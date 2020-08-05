import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CONTAINER_PADDING } from 'containers/ExperienceContainer/Experience';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    selectContainer: {
      width: 'auto',
      background: '#fff',
      borderRadius: '5px',
      '& fieldset': {
        borderColor: '#D1D5DE',
        background: 'transparent',
        '&:focus-within': {
          borderColor: '#00CFFF !important',
          background: 'transparent',
        },
        '&:hover': {
          borderColor: '#00CFFF !important',
          background: 'transparent',
        },
      },
    },
    day: {
      width: '74px !important',
    },
    month: {
      width: '128px !important',
      textTransform:'capitalize'
    },
    year: {
      width: '93px !important',
    },
  }),
);
