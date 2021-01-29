import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  CircularProgress,
  DialogContent,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@material-ui/core';
import { useCandidateAffectationData, useEligibleStructures } from '../../../../requests/campus2023';
import Button from '../../../../components/button/Button';

interface IProps {
  userId: string | null;
}

const ModalAffectationPE: FunctionComponent<IProps> = ({ userId }) => {
  const [getStructuresCall, getStructuresState] = useEligibleStructures();
  const [getCandidateDataCall, getCandidateDataState] = useCandidateAffectationData();
  const [advisorChoice1, setAdvisorChoice1] = useState<string>('');

  useEffect(() => {
    if (!userId) return;
    getStructuresCall({ variables: { userId } });
    getCandidateDataCall({ variables: { userId } });
  }, [userId]);

  const handleChangeAdvisorChoice = (e: any) => {
    setAdvisorChoice1(e.currentTarget.value);
  };

  if (!getStructuresState.data || getStructuresState.loading)
    return (
      <DialogContent>
        <CircularProgress />
        <span>Chargement en cours ...</span>
      </DialogContent>
    );

  const candidateRecommendation = getCandidateDataState.data?.user?.wc2023Affectation?.recommendation;
  const candidateRecoReferrer = getCandidateDataState.data?.user?.wc2023Affectation?.recommendation?.club?.referrer;

  return (
    <DialogContent>
      <Typography color="primary">PRÉ-AFFECTATION</Typography>
      <p>Vous pouvez recommander jusqu&apos;à deux structures pour un jeune ou ne pas mettre d&apos;avis</p>
      <RadioGroup>
        <div>
          <Radio
            disabled={!candidateRecommendation.club || candidateRecommendation.status === 'REJECTED'}
            checked={advisorChoice1 === 'USER_CLUB'}
            value="USER_CLUB"
            onChange={handleChangeAdvisorChoice}
          />
          {candidateRecommendation.club && candidateRecommendation.status === 'ACCEPTED' && (
            <>
              <span>Ce club est prêt à recruter ce jeune :</span>
              <div style={{ marginLeft: '4em' }}>
                <strong>{candidateRecommendation.club.name}</strong>
                <div>
                  Référent:&nbsp;
                  <strong>
                    {`${candidateRecoReferrer[0].lastName} ${candidateRecoReferrer[0].firstName}`}
                  </strong>
                </div>
                <div>
                  <strong>Emplacement :&nbsp;</strong>
                  {candidateRecommendation.club.city}
                </div>
              </div>
            </>
          )}
          {(!candidateRecommendation.club || candidateRecommendation.status === 'REJECTED') && (
            <span>Le jeune ne dispose d&apos;aucun club prêt à le recruter</span>
          )}
        </div>
        <div>
          <Radio
            checked={advisorChoice1 === 'ADVISOR_SELECTION'}
            value="ADVISOR_SELECTION"
            onChange={handleChangeAdvisorChoice}
          />
          <span>Vos recommandations :</span>
          <div style={{ marginLeft: '4em' }}>
            <div>
              <FormControl variant="outlined">
                <InputLabel id="label-choix-1">Choix 1</InputLabel>
                <Select
                  native
                  labelId="label-choix-1"
                  label="Choix 1"
                  disabled={advisorChoice1 !== 'ADVISOR_SELECTION'}
                >
                  <option hidden aria-label="Aucun" value="" />
                  {getStructuresState.data &&
                    getStructuresState.data.eligibleStructures.map((v: any) => <option value={v.id}>{v.name}</option>)}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop: '1em' }}>
              <FormControl variant="outlined">
                <InputLabel id="label-choix-2">Choix 2</InputLabel>
                <Select
                  native
                  labelId="label-choix-2"
                  value={null}
                  label="Choix 2"
                  disabled={advisorChoice1 !== 'ADVISOR_SELECTION'}
                >
                  <option hidden aria-label="Aucun" value="" />
                  {getStructuresState.data &&
                    getStructuresState.data.eligibleStructures.map((v: any) => <option value={v.id}>{v.name}</option>)}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div>
          <Radio
            checked={advisorChoice1 === 'NO_SELECTION'}
            value="NO_SELECTION"
            onChange={handleChangeAdvisorChoice}
          />
          <span>Je ne souhaite pas faire de recommandations</span>
        </div>
      </RadioGroup>
      <hr />
      <div>
        <p>
          Choisissez la région d&apos;affectation de ce jeune.
          <br />
          Cette information permettra de le rattacher au service correspondant.
        </p>
        <div style={{ marginLeft: '4em' }}>
          <FormControl variant="outlined">
            <InputLabel id="label-choix-region">Région d&apos;affectation</InputLabel>
            <Select native labelId="label-choix-region" label="Région d'affectation">
              <option hidden aria-label="Aucun" value="" />
              <option value="hdf">Hauts-de-France</option>
              <option value="idf">Ile de France</option>
              <option value="aura">Auvergne Rhône-Alpes</option>
            </Select>
          </FormControl>
        </div>
      </div>
      <Button variant="contained" color="primary" style={{ marginTop: '2em' }}>
        Terminer
      </Button>
    </DialogContent>
  );
};

export default ModalAffectationPE;
