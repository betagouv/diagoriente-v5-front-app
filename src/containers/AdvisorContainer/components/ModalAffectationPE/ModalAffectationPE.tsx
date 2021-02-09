import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
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
import ModalContainer from 'components/common/Modal/ModalContainer';
import {
  useAddAdvisorDecision,
  useCampusRegions,
  useCandidateAffectationData,
  useEligibleStructures,
} from '../../../../requests/campus2023';
import Button from '../../../../components/button/Button';
import { useDidMount } from '../../../../hooks/useLifeCycle';
import { MyGroupInfoQuery } from '../../../../requests/groupes';

interface IProps {
  userId: string | null;
  onClose?: () => void;
}

const ModalAffectationPE: FunctionComponent<IProps> = ({ userId, onClose }) => {
  const [getStructuresCall, getStructuresState] = useEligibleStructures();
  const [getCandidateDataCall, getCandidateDataState] = useCandidateAffectationData();
  const [advisorDecision, setAdvisorDecision] = useState<string>('');
  const [advisorChoice1, setAdvisorChoice1] = useState<string>('');
  const [advisorChoice2, setAdvisorChoice2] = useState<string>('');
  const [advisorChoiceRegion, setAdvisorChoiceRegion] = useState<string>('');
  const [addDecisionCall, addDecisionState] = useAddAdvisorDecision({
    refetchQueries: [{ query: MyGroupInfoQuery }],
  });
  const [getRegionsCall, getRegionsState] = useCampusRegions();

  useDidMount(() => {
    getRegionsCall();
  });

  useEffect(() => {
    if (!userId) return;
    getStructuresCall({ variables: { userId } });
    getCandidateDataCall({ variables: { userId } });
  }, [userId]);

  const handleChangeAdvisorDecision = (e: any) => {
    setAdvisorDecision(e.currentTarget.value);
    if (e.currentTarget.value !== 'ADVISOR_SELECTION') {
      setAdvisorChoice1('');
      setAdvisorChoice2('');
    }
  };

  const canSubmitAffectationForm = useMemo(() => {
    if (!advisorDecision) return false;
    if (!advisorChoiceRegion) return false;
    return !(advisorDecision === 'ADVISOR_SELECTION' && (!advisorChoice1 || !advisorChoice2));
  }, [advisorDecision, advisorChoice1, advisorChoice2, advisorChoiceRegion]);

  const handleValidateDecision = () => {
    if (!userId) return;
    addDecisionCall({
      variables: {
        advisorDecision: advisorDecision?.toString(),
        advisorSelection:
          advisorDecision === 'ADVISOR_SELECTION' ? [advisorChoice1.toString(), advisorChoice2.toString()] : [],
        candidateId: userId,
        codeRegion: advisorChoiceRegion,
      },
    });
  };

  const hasEligibleStructures = useMemo(() => {
    if (getStructuresState.data) return getStructuresState.data.eligibleStructures.length > 0;
    return false;
  }, [getStructuresState.data]);

  useEffect(() => {
    if (onClose && addDecisionState.data && addDecisionState.data.addAdvisorDecision) onClose();
  }, [addDecisionState.data, onClose]);

  if (
    !getCandidateDataState.data ||
    !getStructuresState.data ||
    getCandidateDataState.loading ||
    getStructuresState.loading
  )
    return (
      <ModalContainer open backdropColor="primary" colorIcon="primary">
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </ModalContainer>
    );

  const candidateProfile = getCandidateDataState?.data?.user?.profile;
  const candidateWC2023 = getCandidateDataState?.data?.user?.wc2023Affectation;
  const candidateRecommendation = getCandidateDataState.data?.user?.wc2023Affectation?.recommendation;
  const candidateRecoReferrer = getCandidateDataState.data?.user?.wc2023Affectation?.recommendation?.club?.referrer;

  return (
    <ModalContainer
      open
      backdropColor="primary"
      colorIcon="#4D6EC5"
      handleClose={() => onClose?.call(null)}
      title={`Pré-affectation du candidat ${candidateProfile.firstName} ${candidateProfile.lastName}`}
    >
      <DialogContent>
        <p>Vous pouvez recommander jusqu&apos;à deux structures pour un jeune ou ne pas mettre d&apos;avis</p>
        <RadioGroup>
          <div>
            <Radio
              disabled={!candidateRecommendation.club || candidateRecommendation.status !== 'ACCEPTED'}
              checked={advisorDecision === 'USER_CLUB'}
              value="USER_CLUB"
              onChange={handleChangeAdvisorDecision}
            />
            {candidateRecommendation.club && candidateRecommendation.status === 'ACCEPTED' && (
              <>
                <span>Ce club est prêt à recruter ce jeune :</span>
                <div style={{ marginLeft: '4em' }}>
                  <strong>{candidateRecommendation.club.name}</strong>
                  <div>{`Référent : ${candidateRecoReferrer[0].lastName} ${candidateRecoReferrer[0].firstName}`}</div>
                  <div>{`Emplacement : ${candidateRecommendation.club.city}`}</div>
                </div>
              </>
            )}
            {(!candidateRecommendation.club || candidateRecommendation.status === 'REJECTED') && (
              <span>Le jeune ne dispose d&apos;aucun club prêt à le recruter</span>
            )}
            {candidateRecommendation.status === 'PENDING' && (
              <span>
                Le jeune a envoyé une demande de recommandation auprès d&apos;un club, en attente d&apos;une réponse
              </span>
            )}
          </div>
          <div>
            <Radio
              checked={advisorDecision === 'ADVISOR_SELECTION'}
              value="ADVISOR_SELECTION"
              onChange={handleChangeAdvisorDecision}
              disabled={!hasEligibleStructures}
            />
            {hasEligibleStructures ? (
              <>
                <span>Vos recommandations (les structures sont positionnées par proximité géographique) :</span>
                <div style={{ marginLeft: '4em' }}>
                  <span />
                  <div>
                    <FormControl variant="outlined">
                      <InputLabel id="label-choix-1">Choix 1</InputLabel>
                      <Select
                        native
                        labelId="label-choix-1"
                        label="Choix 1"
                        onChange={(e: any) => setAdvisorChoice1(e.currentTarget.value)}
                        value={advisorChoice1}
                        disabled={advisorDecision !== 'ADVISOR_SELECTION'}
                      >
                        <option hidden aria-label="Aucun" value="" />
                        {getStructuresState.data &&
                          getStructuresState.data.eligibleStructures.map((v: any) => (
                            <option key={v.id} value={v.id}>
                              {v.name}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                    {advisorChoice1 && (
                      <div>
                        <strong>Besoins de la structure :</strong>
                        <div>
                          {getStructuresState.data.eligibleStructures
                            .filter((v: any) => v.id === advisorChoice1)[0]
                            .expectations.map((w) => (
                              <div>
                                <span>{w.name}</span>
                                {candidateWC2023?.specialite === w.name && (
                                  <span role="img" aria-label="Oui">
                                    ✔️
                                  </span>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: '1em' }}>
                    <FormControl variant="outlined">
                      <InputLabel id="label-choix-2">Choix 2</InputLabel>
                      <Select
                        native
                        labelId="label-choix-2"
                        onChange={(e: any) => setAdvisorChoice2(e.currentTarget.value)}
                        value={advisorChoice2}
                        label="Choix 2"
                        disabled={advisorDecision !== 'ADVISOR_SELECTION'}
                      >
                        <option hidden aria-label="Aucun" value="" />
                        {getStructuresState.data &&
                          getStructuresState.data.eligibleStructures.map((v: any) => (
                            <option key={v.id} value={v.id}>
                              {v.name}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                    {advisorChoice2 && (
                      <div>
                        <strong>Besoins de la structure :</strong>
                        <div>
                          {getStructuresState.data.eligibleStructures
                            .filter((v: any) => v.id === advisorChoice2)[0]
                            .expectations.map((w) => (
                              <div>
                                <span>{w.name}</span>
                                {candidateWC2023?.specialite === w.name && (
                                  <span role="img" aria-label="Oui">
                                    ✔️
                                  </span>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>Aucune structure ne peut accueillir ce jeune</>
            )}
          </div>
          <div>
            <Radio
              checked={advisorDecision === 'NO_SELECTION'}
              value="NO_SELECTION"
              onChange={handleChangeAdvisorDecision}
            />
            <span>Je ne souhaite pas faire de recommandations</span>
          </div>
        </RadioGroup>
        <hr />
        <div>
          <p>Choisissez la région d&apos;affectation de ce jeune.</p>
          <p style={{ maxWidth: '60%' }}>
            ⚠️Vous pouvez transférer le profil du candidat vers une seule région. Si vous avez recommandé des structures
            pour ce candidat merci de transférer vers la région correspondante. Si vous ne souhaitez pas faire de
            recommandations, merci de transférer le profil du candidat vers sa région de résidence.
          </p>
          <div style={{ marginLeft: '4em' }}>
            <FormControl variant="outlined">
              <InputLabel id="label-choix-region">Région d&apos;affectation</InputLabel>
              <Select
                native
                labelId="label-choix-region"
                label="Région d'affectation"
                onChange={(e: any) => setAdvisorChoiceRegion(e.currentTarget.value)}
                value={advisorChoiceRegion}
              >
                <option hidden aria-label="Aucun" value="" />
                {getRegionsState.data.campusRegions.map((v: any) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          disabled={!canSubmitAffectationForm}
          variant="contained"
          color={canSubmitAffectationForm ? 'primary' : undefined}
          style={{ marginTop: '2em' }}
          onClick={handleValidateDecision}
        >
          Terminer
        </Button>
      </DialogContent>
    </ModalContainer>
  );
};

export default ModalAffectationPE;
