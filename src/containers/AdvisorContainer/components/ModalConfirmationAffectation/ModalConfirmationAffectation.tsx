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
  // advisorRegional_affectation
  const [advisorChoiceClub, setAdvisorChoiceClub] = useState<string>('');

  const [open, setOpen] = useState<boolean>(false);
  const [getStructuresCall, getStructuresState] = useAllStructures();

  useDidMount(() => {
    getStructuresCall();
    if (affectation.wc2023Affectation.recommendation.club) {
      setAdvisorDecision(affectation.wc2023Affectation.recommendation.club.name);
    }
  });
  const handleChangeAdvisorDecision = (e: any) => {
    setAdvisorDecision(e.currentTarget.value);
  };
  const handleChangeUserDecision = (e: string) => {
    setAdvisorDecision(e);
  };
  const renderSelection = () => {
    return (
      <DialogContent style={{ margin: '20px 0px' }}>
        <div>
          {getStructuresState.loading ? (
            <CircularProgress />
          ) : (
            <FormControl variant="outlined" style={{ width: '70%' }}>
              <InputLabel id="label-choix-1">List des clubs</InputLabel>
              <Select
                native
                labelId="label-choix-1"
                label="List des clubs"
                onChange={(e: any) => setAdvisorChoiceClub(e.currentTarget.value)}
                value={advisorChoiceClub}
                disabled={advisorChoice !== 'choix_2'}
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
      </DialogContent>
    );
  };
  const renderAdvisorSelection = () => {
    return (
      <DialogContent style={{ margin: '20px 0px' }}>
        <FormControl variant="outlined">
          <RadioGroup>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Radio
                checked={advisorChoice === 'choix_1'}
                value="choix_1"
                onChange={() => setAdvisorChoice('choix_1')}
              />
              <RadioGroup>
                <p style={{ fontSize: 18, margin: '10px 0px', color: '#3f51b5' }}>
                  Voici les lists des club suggéré par le conseiller:
                </p>
                {affectation.wc2023Affectation.advisorSelection.map((c: { name: string }) => {
                  return (
                    <FormControlLabel
                      key={c.name}
                      control={<Radio />}
                      checked={advisorDecision === c.name}
                      label={c.name}
                      value={c.name}
                      onChange={handleChangeAdvisorDecision}
                    />
                  );
                })}
              </RadioGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Radio
                checked={advisorChoice === 'choix_2'}
                value="choix_2"
                onChange={() => setAdvisorChoice('choix_2')}
              />
              <div>
                <p style={{ fontSize: 18, margin: '10px 0px', color: '#3f51b5' }}>Vous pouvez aussi changer le club:</p>
                {renderSelection()}
              </div>
            </div>
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
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
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
                  Voici le club que le candidat a choisi:
                </p>
                <div>{`Nom: ${affectation.wc2023Affectation.recommendation.club.name}`}</div>
                <div>{`Adresse: ${affectation.wc2023Affectation.recommendation.club.city}`}</div>
                <div>{`Info: ${affectation.wc2023Affectation.recommendation.club.licensed_text}`}</div>
                <div>{`Responsable: ${affectation.wc2023Affectation.recommendation.club.referrer[0].firstName} ${affectation.wc2023Affectation.recommendation.club.referrer[0].lastName}`}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Radio
                checked={advisorChoice === 'choix_2'}
                value="choix_2"
                onChange={() => setAdvisorChoice('choix_2')}
              />
              <div>
                <p style={{ fontSize: 18, margin: '10px 0px', color: '#3f51b5' }}>Vous pouvez aussi changer le club:</p>
                {renderSelection()}
              </div>
            </div>
          </RadioGroup>
        </FormControl>
      </DialogContent>
    );
  };
  const renderData = (decision: string) => {
    switch (decision) {
      case 'ADVISOR_SELECTION': {
        return renderAdvisorSelection();
      }
      case 'USER_CLUB': {
        return renderUserSelection();
      }
      case 'NO_SELECTION': {
        return renderSelection();
      }
      default: {
        return 'd';
      }
    }
  };
  const confirmationChoix = () => {
    const dataToSend = advisorChoice === 'choix_1' ? advisorDecision : advisorChoiceClub;
    confirmationAffectationCall({ userId: affectation.id, clubName: dataToSend });
  };
  useEffect(() => {
    if (confirmationAffectationData) {
      setOpen(false);
      onClose();
    }
  }, [confirmationAffectationData, onClose]);
  return (
    <ModalContainer
      open
      backdropColor="primary"
      colorIcon="#4D6EC5"
      handleClose={() => onClose?.call(null)}
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
            disabled={!getStructuresState.data}
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
                  Êtes vous sur de vouloir affecter ce jeune à cette structure ?
                </div>
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
                  Cette confirmation est définitive?
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
