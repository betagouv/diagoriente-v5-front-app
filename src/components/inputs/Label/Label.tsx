import React from 'react';

import classNames from 'utils/classNames';

import useStyles from './styles';

interface LabelProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactChild;
}

const Label = ({ children, className, ...rest }: LabelProps) => {
  const classes = useStyles();
  return (
    <div {...rest} className={classNames(classes.label, className)}>
      {children}
    </div>
  );
};

export default Label;
