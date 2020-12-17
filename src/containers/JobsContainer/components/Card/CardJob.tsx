import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Dotdotdot from 'react-dotdotdot';
import Button from 'components/button/Button';
import fullHeart from 'assets/svg/fullHeart.svg';
import { useUpdateStat } from 'requests/statistique';

import useStyles from './style';

interface IProps {
  title: string;
  description: string;
  accessibility: string;
  id: string;
  favoris: any;
  user?: string;
}
const CardJob = ({
 title, description, accessibility, id, favoris, user,
}: IProps) => {
  const history = useHistory();
  const [selected, setSelected] = useState(false);
  const [updateStatCall, updateStatState] = useUpdateStat();
  const onHover = () => setSelected(true);
  const onLeave = () => setSelected(false);
  const classes = useStyles({ selected });

  const navigate = () => {
    if (user) {
      updateStatCall({ variables: { userId: user, jobId: id } });
    }
  };
  useEffect(() => {
    if (updateStatState.data) {
      history.push(`/jobs/job/${id}`);
    }
  }, [updateStatState.data]);

  return (
    <div className={classes.root} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div className={classes.title}>
        <Dotdotdot clamp={5}>{title}</Dotdotdot>
      </div>

      <div className={classes.description}>
        <Dotdotdot clamp={5}>{description}</Dotdotdot>
      </div>
      {selected && (
        <div className={classes.btnContainer}>
          <Button className={classes.btn} onClick={navigate}>
            <div className={classes.btnLabel}>En savoir plus</div>
          </Button>
        </div>
      )}
      <div className={classes.footerCard}>
        {accessibility && !selected && <div className={classes.accessibility}>{accessibility}</div>}
        {!selected && favoris && <img src={fullHeart} className={classes.heartLogo} alt="heart" />}
      </div>
    </div>
  );
};

export default CardJob;
