import React from 'react';

import { UserParcour } from 'requests/types';
import { Unpacked } from 'utils/types';

import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import medaille from 'assets/svg/picto_medaille.svg';
import Comment from '../Comment/Comment';

import useStyles from './styles';

interface CardSkill extends Unpacked<UserParcour['skills']> {}

const CardSkill = ({ comment: allComments, theme, activities }: CardSkill) => {
  const comment = allComments.filter((c) => c.status === 'accepted');
  const classes = useStyles({ recommended: comment.length !== 0 });

  return (
    <Tooltip
      arrow
      placement="right"
      classes={{ tooltipPlacementRight: classes.tooltipRight, tooltipPlacementLeft: classes.tooltipLeft }}
      title={comment.length ? comment.map((c) => <Comment key={c.id} {...c} />) : ''}
    >
      <Grid className={classes.skill} item lg={4}>
        <div className={classes.skillHeader}>
          <div className={classes.themeTitle}>
            {theme.title}
            {comment.length ? <img className={classes.commentIcon} src={medaille} alt="" /> : null}
          </div>
        </div>
        <ul className={classes.activityContainer}>
          {activities.map((activity) => (
            <li className={classes.activity} key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </Grid>
    </Tooltip>
  );
};

export default CardSkill;
