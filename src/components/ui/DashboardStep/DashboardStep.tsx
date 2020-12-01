import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';
import Button from 'components/button/Button';
import ModalContainer from 'components/common/Modal/ModalContainer';
import CampusForm from 'components/Modals/ModalCampus2023';

import useStyles from './styles';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  background?: string;
  title: string;
  initialChildren?: React.ReactChild;
  openChildren?: React.ReactChild;
  state?: 'closed' | 'initial' | 'open';
  image?: string;
  titleBackground?: string;
  showValidate?: boolean;
}

const DashboardStep = ({
  title,
  background,
  initialChildren,
  openChildren,
  state,
  image,
  titleBackground,
  ...other
}: Props) => {
  const { user } = useContext(UserContext);
  const isCampus = user?.isCampus;
  const classes = useStyles({ background, state });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div {...other} className={classes.container}>
        {isCampus && !user?.validateCampus && state !== 'open' && <div className={classes.disableClass} />}
        <div className={classes.styleBtn}>
          {isCampus && !user?.validateCampus && state === 'open' && (
            <Button className={classes.btnValidate} onClick={() => setShowModal(true)}>
              Je valide ma candidature
            </Button>
          )}
        </div>
        <div className={classes.title}>
          {title}
          {titleBackground && <img src={titleBackground} alt="" className={classes.titleBackground} />}
        </div>
        <div className={classes.avatarContainer}>
          <div className={classes.avatar}>{image && <img className={classes.image} alt="" src={image} />}</div>
        </div>
        <div className={classes.initialChildren}>{initialChildren}</div>
        <div onClick={(e) => e.stopPropagation()} className={classes.openChildren}>
          {openChildren}
        </div>
      </div>
      <ModalContainer
        open={showModal}
        handleClose={() => setShowModal(false)}
        backdropColor="#011A5E"
        colorIcon="rgb(255, 77, 0)"
        size={90}
      >
        <div>
          <div>
            <CampusForm handleClose={() => setShowModal(false)} />
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default DashboardStep;
