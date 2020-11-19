import React, { useState } from 'react';
import Button from 'components/button/Button';
import Car from 'assets/svg/car.svg';
import LogoApprentissage from 'assets/svg/picto_apprentissage.svg';
import Heart from 'assets/svg/picto_add_favoris.svg';
import orangeMessage from 'assets/svg/orange_message.svg';
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
  typeApiImmersion?: string;
  lng: number;
  lat: number;
}

const CardImmersion = ({ data, onClickContact, onClickConseil, showMap, typeApiImmersion, lng, lat }: IProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toRad = (Value: number) => {
    return (Value * Math.PI) / 180;
  };
  const calcCrow = (Vlat1: number, lon1: number, Vlat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = toRad(Vlat2 - Vlat1);
    const dLon = toRad(lon2 - lon1);
    const lat1 = toRad(Vlat1);
    const lat2 = toRad(Vlat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(0);
  };
  return (
    <div className={classNames(classes.root, open && classes.height2)}>
      <div className={classes.infoImmersion}>
        <div className={classes.leftInfo}>
          <div className={classes.WrapperTitle}>
            {typeApiImmersion !== 'entreprise' && <img src={LogoApprentissage} alt="logo" />}
            <div className={classes.titleCard}>{data.name || data.title}</div>
          </div>

          <div className={classes.description}>{data.naf_text || data.longTitle}</div>
          <div>{data.headcount_text}</div>
          {data.place && <div>Addresse: {data.place.fullAddress}</div>}
          {data.diplomaLevel && (
            <div>
              {' '}
              <strong>Niveau d'acces: </strong> {data.diplomaLevel}
            </div>
          )}
          {data.company && (
            <div>
              <strong>Entreprise:</strong> {data.company.name}
            </div>
          )}
          {data.contact && (
            <div>
              <strong>Contact:</strong> {data.contact.email}
            </div>
          )}
          <div className={classes.icons}>
            <div className={classes.logoItemDescription}>
              <img src={Location} alt="" />
              <div className={classes.textLogo}>
                {typeApiImmersion !== 'entreprise' &&
                  calcCrow(data?.place?.latitude, data?.place?.longitude, lat, lng)}
                {typeApiImmersion === 'entreprise' && calcCrow(data.lat, data.lon, lat, lng)}
                {' Km '}
                de ton lieu de recherche
              </div>
            </div>
            {typeApiImmersion === 'entreprise' ? (
              <div className={classes.logoItemDescription}>
                <img src={Car} alt="" />
                <div className={classes.textLogo}>4 min en voiture</div>
              </div>
            ) : (
              <div className={classes.logoItem} onClick={onClickContact}>
                <img src={orangeMessage} alt="" width={25} height={25} />
                <div className={classes.titleLogo}>Contacter par mail</div>
              </div>
            )}
          </div>
        </div>
        <div className={classes.rightInfo}>
          {/* <div className={classes.favorisText}>
            Ajouter à mes favoris
            <img src={Heart} alt="" width={34} height={34} className={classes.heartLogo} />
          </div>*/}

          {!open && typeApiImmersion === 'entreprise' && (
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
