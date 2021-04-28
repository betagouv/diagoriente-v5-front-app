import React, { useState, useEffect } from 'react';
import { useGetConfigCampus, useUpdateConfigCampus } from 'requests/campus2023';
import { useDidMount } from 'hooks/useLifeCycle';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Button from 'components/button/Button';
import useStyles from './style';

const Param = () => {
  const [configCall, configState] = useGetConfigCampus({ fetchPolicy: 'network-only' });
  const [updateConfigCall, updateConfigState] = useUpdateConfigCampus();
  const [checked, setChecked] = useState(false);
  const [checkedAffectation, setCheckedAffectation] = useState(false);

  const classes = useStyles();

  useDidMount(() => {
    configCall();
  });
  useEffect(() => {
    if (configState.data) {
      setChecked(configState.data.configs.status);
      setCheckedAffectation(configState.data.configs.statusAffectation);
    }
  }, [configState.data]);
  useEffect(() => {
    if (updateConfigState.data) {
      configCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateConfigState.data]);

  return (
    <div>
      <div className={classes.title}>Paramètre</div>
      <div>
        <p>Activez/désactivez Campus2023 club affectation Modals:</p>
        <div>
          <div className={classes.checkboxRow}>
            <CheckBox
              color="#00CFFF"
              className={classes.checkbox}
              checked={checked === true}
              label="Oui"
              onChange={() => setChecked(!checked)}
            />
            <div>Oui</div>
          </div>
          <div className={classes.checkboxRow}>
            <CheckBox
              color="#00CFFF"
              className={classes.checkbox}
              checked={checked === false}
              label="Non"
              onChange={() => setChecked(!checked)}
            />
            <div>Non</div>
          </div>
        </div>
        <p>Activez/désactivez affectation de candidature depuis Admin:</p>
        <div>
          <div className={classes.checkboxRow}>
            <CheckBox
              color="#00CFFF"
              className={classes.checkbox}
              checked={checkedAffectation === true}
              label="Oui"
              onChange={() => setCheckedAffectation(!checkedAffectation)}
            />
            <div>Oui</div>
          </div>
          <div className={classes.checkboxRow}>
            <CheckBox
              color="#00CFFF"
              className={classes.checkbox}
              checked={checkedAffectation === false}
              label="Non"
              onChange={() => setCheckedAffectation(!checkedAffectation)}
            />
            <div>Non</div>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <Button
            className={classes.btn}
            onClick={() => {
              updateConfigCall({ variables: { status: checked, statusAffectation: checkedAffectation } });
            }}
          >
            <span className={classes.btnLabel}>Enregistrer</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Param;
