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
}

const CardImmersion = ({ data }: IProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div className={classNames(classes.root, open && classes.height2)}>
      <div className={classes.infoImmersion}>
        <div className={classes.leftInfo}>
          <div className={classes.titleCard}>Title</div>
          <div className={classes.description}>description</div>
          <div> 6 à 9 salariés </div>
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
          <div className={classes.favorisText}>
            Ajouter à mes favoris
            <img src={Heart} alt="" width={34} height={34} className={classes.heartLogo} />
          </div>
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
                <div>RUE DE BRETAGNE 75003 PARIS-03</div>
              </div>
              <div className={classes.item}>
                <div className={classes.itemTitle}>Téléphone</div>
                <div>04 72 60 56 54</div>
                <div>78 67 67 67</div>
              </div>
              <div className={classes.item}>
                <div className={classes.itemTitle}>Mode de contact à privilégier</div>
                <div>Se présenter spontanément</div>
              </div>
            </div>
            <div className={classes.logoContainer}>
              <div className={classes.logoItem}>
                <img src={Mail} alt="" width={32} height={32} />
                <div className={classes.titleLogo}>Contacter par mail</div>
              </div>
              <div className={classes.logoItem}>
                <img src={Idea} alt="" width={32} height={32} />
                <div className={classes.titleLogo}>Conseils pour appeler</div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 203 }}>
            <Map lat={48.8566} lng={2.3522} name={data.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardImmersion;
