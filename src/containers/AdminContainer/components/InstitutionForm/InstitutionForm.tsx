import React, { useEffect, useState } from 'react';
import * as Leaflet from 'leaflet';
import { useForm } from 'hooks/useInputs';
import { useAddresses } from 'requests/institution';
import { Institution } from 'requests/types';

import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import AutoComplete from 'containers/JobsContainer/components/Autocomplete/AutoCompleteJob';
import Button from '@material-ui/core/Button/Button';
import Map from 'components/Map/Map';

import useStyles from './styles';

interface InstitutionFormValues {
  label: string;
  nom: string;
  longitude: number;
  latitude: number;
}

interface InstitutionFormProps {
  onSubmit: (values: InstitutionFormValues) => void;
  institution: Institution;
}

const InstitutionForm = ({ onSubmit, institution }: InstitutionFormProps) => {
  const [openLocation, setOpen] = useState(false);
  const [filtredArray, setFiltredArray] = useState<{ label: string; value: number[] }[]>([]);
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const [state, actions] = useForm({
    initialValues: {
      nom: '',
      label: '',
      longitude: 0,
      latitude: 0,
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;
  const [addresseCall, { data }] = useAddresses({ variables: { search: values.label } });
  const classes = useStyles();
  useEffect(() => {
    if (institution) {
      setValues({
        nom: institution.nom,
        label: institution.label,
        longitude: institution.longitude,
        latitude: institution.latitude,
      });
      setCoordinates([institution.longitude, institution.latitude]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institution]);

  useEffect(() => {
    if (data) {
      const r = data.addresses.features.map((address) => ({
        label: address.place_name,
        value: address.geometry.coordinates,
      }));
      setFiltredArray(r);
    }
  }, [data]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dataForm = {
      nom: values.nom,
      label: values.label,
      longitude: coordinates[0],
      latitude: coordinates[1],
    };
    onSubmit(dataForm);
  }
  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValues({ label: value });
    setOpen(true);
    addresseCall();
  };
  const onSelect = (e: any | undefined) => {
    if (e) {
      setValues({ label: e.label, longitude: e.value.value[0], latitude: e.value.value[1] });
      setCoordinates([e.value.value[0], e.value.value[1]]);
      setOpen(false);
    }
  };
  const onGetPos = (e: Leaflet.LeafletMouseEvent) => {
    setCoordinates([Number(e.latlng.lng.toFixed(3)), Number(e.latlng.lat.toFixed(3))]);
    setValues({ longitude: Number(e.latlng.lng.toFixed(3)), latitude: Number(e.latlng.lng.toFixed(3)) });
  };
  return (
    <form onSubmit={handleSubmit} className={classes.wrapper}>
      <AdminTextField
        name="nom"
        value={values.nom}
        onChange={handleChange}
        label="Nom de l'institution"
        color="primary"
        className={classes.title}
      />
      <div className={classes.textAuto}>Adresse </div>
      <AutoComplete
        onChange={onChangeLocation}
        onSelectText={onSelect}
        value={values.label}
        name="location"
        className={classes.inputClass}
        placeholder="paris"
        options={filtredArray}
        type="location_admin"
        open={openLocation}
        setOpen={setOpen}
        isfull
      />
      <div className={classes.mapWrapper}>
        <Map className={classes.styleMap} lat={coordinates[1]} lng={coordinates[0]} handleClick={onGetPos} />
      </div>
      <Button type="submit" className={classes.button} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default InstitutionForm;
