import React, { useEffect, useState } from 'react';
import { map } from 'lodash';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Modal from '@material-ui/core/Modal/Modal';
import Card from '@material-ui/core/Card/Card';
import Fab from '@material-ui/core/Fab/Fab';
import AddCircle from '@material-ui/icons/AddCircle';
import Reset from 'components/common/Rest/Rest';
import Button from '@material-ui/core/Button/Button';

import useStyles from './styles';
import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import { useForm } from 'common/hooks/useInputs';
import { useUpdateWc2023Quality } from 'requests/user';

const qualities = {
  outstanding: { title: 'Remarquable', color: '#1baca6' },
  accepted: { title: 'Acceptée', color: '#96bc4b' },
  refused: { title: 'Refusée', color: '#b33430' },
};

interface ParcourQualityProps {
  quality?: string;
  onDone?: () => void;
  user: string;
  comment?: string;
}

const ParcourQuality = ({ quality, comment, onDone, user }: ParcourQualityProps) => {
  const [open, setOpen] = useState(false);
  const [state, actions] = useForm({
    initialValues: { quality: quality || '', comment: comment || '' },
    required: ['comment', 'quality'],
  });
  const [call, data] = useUpdateWc2023Quality();
  const { values } = state;
  const { handleChange, validateForm } = actions;
  const { title, color } = qualities[quality as keyof typeof qualities] || {};
  const classes = useStyles({ color });

  useEffect(() => {
    if (data.data && onDone) {
      onDone();
      setOpen(false);
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <span className={classes.title}>{title || 'Indéterminé'}</span>
      <Fab onClick={() => setOpen(true)} size="small" className={classes.add}>
        <AddCircle color="secondary" />
      </Fab>
      <Modal open={open} keepMounted={false}>
        <div className={classes.modalWrapper}>
          <Card className={classes.modalContainer}>
            <div className={classes.modalContent}>
              <h2 className={classes.modalTitle}>Modifier Note</h2>
              <Reset className={classes.reset} onClick={() => setOpen(false)} color="#FF0060"></Reset>

              <FormLabel component="legend">Note</FormLabel>
              <RadioGroup value={values.quality} onChange={handleChange} className={classes.radio} name="quality">
                {map(qualities, ({ color, title }, key) => {
                  return <FormControlLabel value={key} control={<Radio style={{ color: color }} />} label={title} />;
                })}
              </RadioGroup>
              <AdminTextField
                name="comment"
                className={classes.comment}
                value={values.comment}
                onChange={handleChange}
                label="Commentaire"
                multiline
                rows={4}
              />
            </div>
            <Button
              onClick={() => {
                call({ variables: { quality: values.quality, comment: values.comment, user } });
              }}
              disabled={!validateForm()}
              className={classes.submit}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default ParcourQuality;
