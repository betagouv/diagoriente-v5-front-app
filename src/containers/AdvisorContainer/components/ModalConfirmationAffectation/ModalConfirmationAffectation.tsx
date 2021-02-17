import React, { useState } from 'react';
import ModalContainer from 'components/common/Modal/ModalContainer';
import {
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  Button,
} from '@material-ui/core';
import { useEligibleStructures } from 'requests/campus2023';
import { useDidMount } from 'hooks/useLifeCycle';

interface IProps {
  affectation: any;
  onClose?: () => void;
}
const ModalConfirmationAffectation = ({ affectation, onClose }: IProps) => {
  const [advisorChoice, setAdvisorChoice] = useState<string>('choix_1');
  const [advisorDecision, setAdvisorDecision] = useState<string>('');
  const [advisorChoiceClub, setAdvisorChoiceClub] = useState<string>('');

  const [getStructuresCall, getStructuresState] = useEligibleStructures();
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
          <FormControl variant="outlined" style={{ width: '100%' }}>
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
                getStructuresState.data?.eligibleStructures.map((v: any) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
            </Select>
          </FormControl>
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
                <p style={{ fontSize: 18, margin: '10px 0px' }}>Voici les lists des club suggéré par le conseiller:</p>
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
                <p style={{ fontSize: 18, margin: '10px 0px' }}>Vous vouvez aussi changer le club:</p>
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
                <p style={{ fontSize: 18, margin: '10px 0px' }}>Voici le club que le candidat a choisi:</p>
                <div>{affectation.wc2023Affectation.recommendation.club.name}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Radio
                checked={advisorChoice === 'choix_2'}
                value="choix_2"
                onChange={() => setAdvisorChoice('choix_2')}
              />
              <div>
                <p style={{ fontSize: 18, margin: '10px 0px' }}>Vous vouvez aussi changer le club:</p>
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
    console.log('dataToSend', dataToSend);
  };
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
          <Button onClick={confirmationChoix} variant="contained" size="medium" color="primary">
            <span>Confirmer</span>
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ModalConfirmationAffectation;
