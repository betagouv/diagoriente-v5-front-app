import React from 'react';
import Loupe from 'assets/svg/loupe';
import Button from 'components/button/Button';
import { Jobs } from 'requests/types';
import ClassNames from 'utils/classNames';
import AutoComplete from '../Autocomplete/AutoCompleteJob';
import CheckBox from '../checkBox/ChexBox';

import useStyles from './styles';

interface IProps {
  filteredArray?: Jobs[];
  onChangeImmersion: (e: React.ChangeEvent) => void;
  onSelectImmersion: (e?: any) => void;
  selectedImmersion?: string;
  openImmersion: boolean;
  onChangeLocation: (e: React.ChangeEvent) => void;
  onSelect: (e?: string) => void;
  onChangeTypeApi?: (e: { label: string }) => void;
  selectedLocation: string;
  listLocation?: { label: string; coordinates: string[] }[];
  LogoLocation: string;
  openLocation: boolean;
  onClickImmersion: () => void;
  setOpenLocation?: (open: boolean) => void;
  errorLocation?: boolean;
  typeApi?: string;
  setCoordinates?: (e: any) => void;
  setInsee?: (e: number) => void;
  updated?: boolean;
  disableFirstInput?: boolean;
  coordinates: number[];
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
  setOpenLocation,
  onChangeTypeApi,
  typeApi,
  errorLocation,
  setCoordinates,
  setInsee,
  disableFirstInput,
  updated,
  coordinates,
}: IProps) => {
  const classes = useStyles();
  const typeFilter = [
    {
      label: 'formation',
    },
    {
      label: 'entreprise',
    },
  ];

  return (
    <div className={classes.immersion}>
      <div className={classes.logoContainer}>
        <Loupe color="#FFA600" width="42" height="42" />
      </div>
      {updated ? (
        <div className={classes.titleImersion}>
          {`Trouver une ${typeApi === 'entreprise' ? 'immersion' : 'formation'}`}
        </div>
      ) : (
        <div className={classes.titleImersion}>Trouver une immersion ou une formation</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {onChangeTypeApi &&
          !updated &&
          typeFilter.map((el) => (
            <div>
              <CheckBox key={el.label} label={el.label} value={typeApi} onClick={() => onChangeTypeApi(el)} />
            </div>
          ))}
      </div>

      <div className={updated ? classes.extraMargin : ''}>Je recherche :</div>
      <div className={ClassNames(classes.autocompleteContainer, updated && classes.extraMargin)}>
        <AutoComplete
          options={filteredArray}
          onChange={onChangeImmersion}
          onSelectText={onSelectImmersion}
          value={selectedImmersion}
          name="search"
          placeholder="Ex: plomberie"
          className={classes.containerAutoComp}
          open={openImmersion}
          type="immersion"
          disable={disableFirstInput}
        />
      </div>
      <div className={classes.autocompleteContainer}>
        <AutoComplete
          onChange={onChangeLocation}
          onSelectText={onSelect}
          value={selectedLocation}
          name="location"
          placeholder="paris"
          options={listLocation}
          icon={LogoLocation}
          type="location"
          open={openLocation}
          error={Boolean(errorLocation && !(selectedLocation && coordinates[0] && coordinates[1]))}
          setOpen={setOpenLocation}
          setCoordinates={setCoordinates}
          setInsee={setInsee}
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
