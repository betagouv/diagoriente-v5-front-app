import React, { useRef, useState } from 'react';

import classNames from 'utils/classNames';
import { readAsDataURL } from 'utils/fileReader';

import Paper from '@material-ui/core/Paper/Paper';
import Fab from '@material-ui/core/Fab/Fab';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Label from '../Label/Label';

import useStyles from './styles';

interface AdminFileUploadProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  label?: string;
  defaultImage?: string;
}

const AdminFileUpload = ({
 label, onChange, className, defaultImage, ...rest
}: AdminFileUploadProps) => {
  const classes = useStyles();
  const [image, setImage] = useState<string | null>(defaultImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  function openInput() {
    if (inputRef.current) inputRef.current.click();
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) onChange(e);
    if (e.target.files && e.target.files[0]) {
      const img = await readAsDataURL(e.target.files[0]);
      setImage(img);
    }
  }

  return (
    <div className={classNames(classes.container, className)}>
      {label && <Label>{label}</Label>}
      <Paper className={classes.paper}>
        {image ? (
          <img onError={() => setImage(null)} className={classes.image} onClick={openInput} src={image} alt="" />
        ) : (
          <Fab onClick={openInput}>
            <AddPhotoAlternateIcon color="secondary" />
          </Fab>
        )}
      </Paper>
      <input accept="image/*" {...rest} onChange={handleChange} ref={inputRef} type="file" className={classes.hidden} />
    </div>
  );
};

export default AdminFileUpload;
