import React from 'react';
import Loupe from 'assets/svg/loupe';
import Button from 'components/button/Button';
import AutoComplete from '../Autocomplete/AutoCompleteJob';
import useStyles from './styles';

interface IProps {
  filteredArray: any;
  onChangeImmersion: any;
  onSelectImmersion: any;
  selectedImmersion: any;
  openImmersion: any;
  onChangeLocation: any;
  onSelect: any;
  selectedLocation: any;
  listLocation: any;
  LogoLocation: any;
  openLocation: any;
  onClickImmersion: any;
}

const ImmersionForm = ({
  filteredArray,
  onChangeImmersion,
  onSelectImmersion,
  selectedImmersion,
  openImmersion,
  onChangeLocation,
  onSelect,
  selectedLocation,
  listLocation,
  LogoLocation,
  openLocation,
  onClickImmersion,
}: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.immersion}>
      <div className={classes.logoContainer}>
        <Loupe color="#FFA600" width="42" height="42" />
      </div>
      <div className={classes.titleImersion}>Trouver une immersion ou une formation</div>
      <div>Je recherche :</div>
      <div className={classes.autocompleteContainer}>
        <AutoComplete
          options={filteredArray}
          onChange={onChangeImmersion}
          onSelectText={onSelectImmersion}
          value={selectedImmersion}
          name="search"
          placeholder="Immersion"
          className={classes.containerAutoComp}
          open={openImmersion}
          type="immersion"
        />
      </div>
      <div className={classes.autocompleteContainer}>
        <AutoComplete
          onChange={onChangeLocation}
          onSelectText={onSelect}
          value={selectedLocation}
          name="location"
          placeholder="paris"
          options={listLocation ? listLocation?.location : []}
          icon={LogoLocation}
          type="location"
          open={openLocation}
        />
      </div>

      <div className={classes.btnImersionContainer}>
        <Button className={classes.btnImersion} onClick={onClickImmersion}>
          <div className={classes.btnLabel}>Chercher</div>
        </Button>
      </div>
    </div>
  );
};

export default ImmersionForm;
