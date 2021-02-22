import React, { useState, useEffect } from 'react';
import ModalContainer from 'components/common/Modal/ModalContainer';
import {
  CircularProgress,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  Button,
} from '@material-ui/core';
import { useAllStructures } from 'requests/campus2023';
import { useDidMount } from 'hooks/useLifeCycle';

interface IProps {
  affectation: any;
  onClose: () => void;
  confirmationAffectationCall: (e: { userId: string; clubName: string }) => void;
  confirmationAffectationData: any;
}
const ModalConfirmationAffectation = ({
  affectation,
  confirmationAffectationData,
  onClose,
  confirmationAffectationCall,
}: IProps) => {
  // advisor_affectation or advisorRegional_affectation
  const [advisorChoice, setAdvisorChoice] = useState<string>('choix_1');
  // advisor_affectation or user_affectation
  const [advisorDecision, setAdvisorDecision] = useState<string>('');
  const [checkedRadio, setCheckedRadio] = useState<boolean>(true);

  const [open, setOpen] = useState<boolean>(false);
  const [getStructuresCall, getStructuresState] = useAllStructures();

  useDidMount(() => {
    getStructuresCall();
    if (affectation.wc2023Affectation.recommendation.club && affectation.wc2023Affectation.recommendation.status === "ACCEPTED") {
      setAdvisorDecision(affectation.wc2023Affectation.recommendation.club.name);
    }
  });
  const handleChangeAdvisorDecision = (e: any) => {
    setAdvisorChoice('choix_3')
    setAdvisorDecision(e.currentTarget.value);
    setCheckedRadio(true);
  };
  const handleChangeUserDecision = (e: string) => {
    setAdvisorDecision(e);
  };

  const renderUserClubReco = () => {
    return <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Radio
        checked={advisorChoice === 'choix_1'}
        value="choix_1"
        onChange={() => {
          setAdvisorChoice('choix_1');
          handleChangeUserDecision(affectation.wc2023Affectation.recommendation.club.name);
        }}
      />
      <div>
        <p style={{ fontSize: 18, margin: '10px 0px', color: '#3f51b5' }}>
          Club qui souhaite engager le jeune :
        </p>
        <div>{`Nom: ${affectation.wc2023Affectation.recommendation.club.name}`}</div>
        <div>{`Adresse: ${affectation.wc2023Affectation.recommendation.club.city}`}</div>
        <div>{`Info: ${affectation.wc2023Affectation.recommendation.club.licensed_text}`}</div>
        <div>{`Responsable: ${affectation.wc2023Affectation.recommendation.club.referrer[0].firstName} ${affectation.wc2023Affectation.recommendation.club.referrer[0].lastName}`}</div>
      </div>
    </div>
  };

  const renderClubListSelection = () => {
    return (
      <div>
        {getStructuresState.loading ? (
          <CircularProgress />
        ) : (
          <FormControl variant="outlined" style={{ width: '70%' }}>
            <InputLabel id="label-choix-1">Liste des structures</InputLabel>
            <Select
              native
              labelId="label-choix-1"
              label="Liste des clubs"
              onChange={(e: any) => {
                setAdvisorDecision(e.currentTarget.value);
                setCheckedRadio(false);
                setAdvisorChoice('choix_2');
              }}
              value={checkedRadio || advisorChoice === 'choix_1' ? '' : advisorDecision}
            >
              <option hidden aria-label="Aucun" value="" />
              {getStructuresState.data &&
                getStructuresState.data?.allStructures.sort().map((v: any) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        )}
      </div>
    );
  };
  const renderCampusManualSelection = () => {
    return <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Radio
        checked={advisorChoice === 'choix_2'}
        value="choix_2"
        onChange={() => { setAdvisorChoice('choix_2'); setAdvisorDecision(""); }}
      />
      <div>
        <p style={{ fontSize: 18, margin: '10px 0px', color: '#3f51b5' }}>Choisir manuellement la structure :</p>
        {renderClubListSelection()}
      </div>
    </div>
  };
  const renderAdvisorSelection = () => {
    return (
      <DialogContent style={{ margin: '20px 0px' }}>
        <FormControl variant="outlined">
          <RadioGroup>
            {renderUserClubReco()}
            {affectation.wc2023Affectation.advisorSelection.map((c: { name: string }) => {
              return (
                <FormControlLabel
                  key={c.name}
                  control={<Radio />}
                  checked={advisorChoice === "choix_3" && advisorDecision === c.name}
                  label={<><strong style={{ color: "#3f51b5" }}>Suggestion du conseiller Pôle Emploi :</strong> {c.name}</>}
                  value={c.name}
                  onChange={handleChangeAdvisorDecision}
                />
              );
            })}
            {renderCampusManualSelection()}
          </RadioGroup>
        </FormControl>
      </DialogContent>
    );
  };
  const renderUserSelection = () => {
    return (
      <DialogContent style={{ margin: '20px 0px' }}>
        <FormControl variant="outlined">
          <RadioGroup>
            {affectation.wc2023Affectation.recommendation && affectation.wc2023Affectation.recommendation.status === 'ACCEPTED' && renderUserClubReco()}
            {renderCampusManualSelection()}
          </RadioGroup>
        </FormControl>
      </DialogContent>
    );
  };

  const renderDefault = () => {
    return <>{affectation.wc2023Affectation.recommendation && affectation.wc2023Affectation.recommendation.status === 'ACCEPTED' && renderUserClubReco()}{renderCampusManualSelection()}</>
  };

  const renderData = (decision: string) => {
    switch (decision) {
      case 'ADVISOR_SELECTION': {
        return renderAdvisorSelection();
      }
      case 'USER_CLUB': {
        return renderUserSelection();
      }
      case 'NO_SELECTION':
      default: {
        return renderDefault();
      }
    }
  };
  const confirmationChoix = () => {
    confirmationAffectationCall({ userId: affectation.id, clubName: advisorDecision });
  };

  return (
    <ModalContainer
      open
      backdropColor="primary"
      colorIcon="#4D6EC5"
      handleClose={() => onClose()}
      title={`Confirmation d'affectation du candidat ${affectation.profile.firstName} ${affectation.profile.firstName}`}
    >
      <div>
        <div>{renderData(affectation.wc2023Affectation.advisorDecision)}</div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0px' }}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            size="medium"
            color="primary"
            disabled={!getStructuresState.data || advisorDecision === ''}
          >
            <span>Confirmer</span>
          </Button>
        </div>
        {open && (
          <ModalContainer
            open
            backdropColor="primary"
            colorIcon="#4D6EC5"
            handleClose={() => setOpen(false)}
            title="Attention !"
          >
            <div style={{ height: 407 }}>
              <div style={{ marginTop: 120, marginBottom: 20 }}>
                <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                  Êtes-vous sûr de vouloir affecter ce jeune à cette structure ?
                </div>
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
                  Cette confirmation est définitive
                </div>
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 0px', width: '50%' }}>
                  <Button
                    onClick={confirmationChoix}
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ width: 200 }}
                  >
                    <span>OUI</span>
                  </Button>
                  <Button
                    onClick={() => setOpen(false)}
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ width: 200 }}
                  >
                    <span>Non</span>
                  </Button>
                </div>
              </div>
            </div>
          </ModalContainer>
        )}
      </div>
    </ModalContainer>
  );
};

export default ModalConfirmationAffectation;
