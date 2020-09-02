import React, { forwardRef, Ref } from 'react';
import { SkillType } from 'requests/types';
import { Unpacked } from 'utils/types';

import classNames from 'utils/classNames';

import useStyles from './styles';

export type CommentType = Unpacked<SkillType['comment']>;

interface Props extends CommentType {
  className?: string;
  children?: React.ReactChild;
}

const Comment = forwardRef(
  ({
 firstName, lastName, location, commentText, className, children,
}: Props, ref: Ref<HTMLDivElement>) => {
    const classes = useStyles();
    return (
      <div ref={ref} className={classNames(classes.container, className)}>
        <div className={classes.title}>
          Expérience validée par
          {' '}
          <span className={classes.user}>
            {firstName}
            {' '}
            {lastName}
          </span>
          {location && (
            <>
              <br />
              <span className={classes.location}>{location}</span>
            </>
          )}
        </div>
        <div className={classes.commentText}>{commentText}</div>
        {children}
      </div>
    );
  },
);

export default Comment;
