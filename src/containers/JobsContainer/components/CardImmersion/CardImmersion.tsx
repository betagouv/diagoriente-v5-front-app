import React, { useState } from 'react';
import Button from 'components/button/Button';
import Car from 'assets/svg/car.svg';
import Heart from 'assets/svg/picto_add_favoris.svg';
import Location from 'assets/svg/location.svg';
import Mail from 'assets/svg/picto_mail.svg';
import Idea from 'assets/svg/picto_ampoule.svg';
import classNames from 'utils/classNames';
import Map from 'components/Map/Map';
import Arrow from 'assets/svg/arrow';
import useStyles from './styles';

interface IProps {
  data: any;
  onClickContact: () => void;
  onClickConseil: () => void;
  showMap?: boolean;
}

const CardImmersion = ({ data, onClickContact, onClickConseil, showMap }: IProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div className={classNames(classes.root, open && classes.height2)}>
      <div className={classes.infoImmersion}>
        <div className={classes.leftInfo}>
          <div className={classes.titleCard}>{data.name}</div>
          <div className={classes.description}>{data.naf_text}</div>
          <div>{data.headcount_text}</div>
          <div className={classes.icons}>
            <div className={classes.logoItemDescription}>
              <img src={Location} alt="" />
              <div className={classes.textLogo}>1.9 km de ton lieu de recherche</div>
            </div>
            <div className={classes.logoItemDescription}>
              <img src={Car} alt="" />
              <div className={classes.textLogo}>4 min en voiture</div>
            </div>
          </div>
        </div>
        <div className={classes.rightInfo}>
          {<div className={classes.favorisText}>
          {/*   Ajouter à mes favoris
            <img src={Heart} alt="" width={34} height={34} className={classes.heartLogo} /> */}
          </div>}
          {!open && (
            <div>
              <Button className={classes.btnContainer} onClick={() => setOpen(!open)}>
                <div className={classes.btnLabel}>+ d’infos et contact</div>
              </Button>
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className={classes.extends}>
          <div className={classes.headerInfo}>
            <div onClick={() => setOpen(false)}>
              <Arrow width="9" height="14" color="#DB8F00" className={classes.arrow} />
            </div>
            <div className={classes.infoExtended}>
              <div className={classes.item}>
                <div className={classes.itemTitle}>Adresse</div>
                <div>{data.address}</div>
              </div>
              <div className={classes.item}>
                <div className={classes.itemTitle}>Téléphone</div>
              </div>
              <div className={classes.item}>
                <div className={classes.itemTitle}>Mode de contact à privilégier</div>
                <div>{data.contact_mode}</div>
              </div>
            </div>
            <div className={classes.logoContainer}>
              <div className={classes.logoItem} onClick={onClickContact}>
                <img src={Mail} alt="" width={32} height={32} />
                <div className={classes.titleLogo}>Contacter par mail</div>
              </div>
              <div className={classes.logoItem} onClick={onClickConseil}>
                <img src={Idea} alt="" width={32} height={32} />
                <div className={classes.titleLogo}>Conseils pour appeler</div>
              </div>
            </div>
          </div>
          {showMap && (
            <div style={{ width: '100%', height: 203 }}>
              <Map lat={data.lat} lng={data.lon} name={data.title} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardImmersion;
