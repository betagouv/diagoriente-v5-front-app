import React from 'react';
import classNames from 'utils/classNames';
import Echelon from 'components/common/CompetenceEchelon/CompetenceEchelon';
import Button from 'components/actionsButton/ActionsButton';
import editIcon from 'assets/svg/editblue.svg';
import recoIcon from 'assets/svg/pmedaille.svg';
import removeIcon from 'assets/svg/delete.svg';

import { Competence } from 'requests/types';
import useStyles from './styles';

interface Props {
  className?: string;
  title: string;
  logo?: string;
  competence: { _id: Competence; value: number }[];
  id: string;
  edit?: (id: string) => void;
  remove?: (id: string) => void;
  recommendation?: (id: string) => void;
  src?: string;
  type?: string;
  icon?: string;
}

const Card = ({
 title, src, className, competence, id, edit, remove, recommendation, type, icon,
}: Props) => {
  const classes = useStyles();
  const Tab = [
    {
      text: 'Modifier',
      icon: editIcon,
      onClick: () => {
        if (edit) edit(id);
      },
    },
    {
      text: 'Supprimer',
      icon: removeIcon,
      onClick: () => {
        if (remove) remove(id);
      },
    },
    {
      text: 'Recommandation',
      icon: recoIcon,
      onClick: () => {
        if (recommendation) recommendation(id);
      },
    },
  ];

  return (
    <div className={classNames(classes.cardContainer, className)}>
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          {src && <img src={src} alt="" className={classes.image} height={65} width={65} />}
          <span className={classes.title}>{title}</span>
          {icon && <img src={icon} alt="" className={classes.icon} height={44} width={44} />}
        </div>

        {competence.map((comp) => (
          <div key={comp._id.id} className={classes.childrenCardContainer}>
            <div className={classes.childrenCard}>{comp._id.title}</div>

            <Echelon
              tooltipClassName={classes.tooltip}
              tooltipPointClassName={classes.tooltipPoint}
              echelonTitleClassName={classes.echelonTitle}
              echelonClassName={classes.echelon}
              className={classes.echelonContainerClassName}
              value={comp.value}
            />
          </div>
        ))}
      </div>
      <div className={classes.footerCardContainer}>
        {Tab.map((e) => (
          <Button key={e.text} onClick={e.onClick} text={e.text} icon={e.icon} />
        ))}
      </div>
    </div>
  );
};

export default Card;
