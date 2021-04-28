/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';

import { SkillType } from 'requests/types';

import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import medaille from 'assets/svg/picto_medaille.svg';
import moment from 'moment';
import Comment from '../Comment/Comment';
import useStyles from './styles';
import 'moment/locale/fr';

interface CardSkill extends SkillType {}
moment.locale('fr');

const CardSkill = ({
  comment: allComments,
  theme,
  activities,
  engagement,
  startDate,
  endDate,
  extraActivity,
}: CardSkill) => {
  const comment = allComments.filter((c) => c.status === 'accepted');
  const classes = useStyles({ recommended: comment.length !== 0 });
  const act = theme.type === 'engagement' ? engagement?.options : activities;

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
            <span className={classes.date}>
              {startDate && `${moment(startDate).format('MMMM - YYYY')}`}
              {endDate && ` / ${moment(endDate).format('MMMM - YYYY')}`}
            </span>
            {comment.length ? <img className={classes.commentIcon} src={medaille} alt="" /> : null}
          </div>
        </div>
        <ul className={classes.activityContainer}>
          {(act as any)?.map((activity: any, i: number) => (
            <li className={classes.activity} key={activity.id || i}>
              {theme.type === 'engagement' ? (
                <span style={{ fontWeight: 700 }}>
                  {activity.option.map((el: { title: string; id: string }) => el.title).join(' ')}
                </span>
              ) : (
                activity.title
              )}
            </li>
          ))}
          {extraActivity ? <li className={classes.activity}>{extraActivity}</li> : null}
          {theme.type === 'engagement' && engagement?.activity && (
            <div className={classes.activity}>{engagement?.activity}</div>
          )}
        </ul>
      </Grid>
    </Tooltip>
  );
};

export default CardSkill;
