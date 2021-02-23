import React, { useState } from 'react';
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
import { EligibleStructure } from 'requests/types';
import { isEmpty } from 'lodash';
import useStyles from './style';

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
  const classes = useStyles();

  // advisor_affectation or advisorRegional_affectation
  const [advisorChoice, setAdvisorChoice] = useState<string>('choix_1');
  // advisor_affectation or user_affectation

  const [advisorDecision, setAdvisorDecision] = useState<EligibleStructure | null>({} as EligibleStructure);
  const [checkedRadio, setCheckedRadio] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [getStructuresCall, getStructuresState] = useAllStructures();

  useDidMount(() => {
    getStructuresCall();
    if (
      affectation.wc2023Affectation.recommendation.club &&
      affectation.wc2023Affectation.recommendation.status === 'ACCEPTED'
    ) {
      setAdvisorDecision(affectation.wc2023Affectation.recommendation.club);
    }
  });
  const handleChangeAdvisorDecision = (e: any) => {
    const d = getStructuresState.data?.allStructures.find((f) => {
      return f.fnv1a32_hash === Number(e.target.value);
    });
    setAdvisorChoice('choix_3');
    if (d && !isEmpty(d)) {
      setAdvisorDecision(d);
    }

    setCheckedRadio(true);
  };
  const handleChangeUserDecision = (e: any) => {
    setAdvisorDecision(e);
  };

  const renderUserClubReco = () => {
    return (
      <div className={classes.userClubRecoContainer}>
        <Radio
          checked={advisorChoice === 'choix_1'}
          value="choix_1"
          onChange={() => {
            setAdvisorChoice('choix_1');
            handleChangeUserDecision(affectation.wc2023Affectation.recommendation.club.name);
          }}
        />
        <div>
          <p className={classes.infoClub}>Club qui souhaite engager le jeune :</p>
          <div>{`Nom: ${affectation.wc2023Affectation.recommendation.club.name}`}</div>
          <div>{`Adresse: ${affectation.wc2023Affectation.recommendation.club.city}`}</div>
          <div>{`Info: ${affectation.wc2023Affectation.recommendation.club.licensed_text}`}</div>
          <div>{`Responsable: ${affectation.wc2023Affectation.recommendation.club.referrer[0].firstName} ${affectation.wc2023Affectation.recommendation.club.referrer[0].lastName}`}</div>
          <div>
            Capacité:
            {Object.keys(affectation.wc2023Affectation.recommendation.club.capacity).map((key) => {
              if (key === 'bac3') {
                return <div>{`BAC + 3 : ${affectation.wc2023Affectation.recommendation.club.capacity[key]}`}</div>;
              }
              if (key === 'bac5') {
                return <div>{`BAC + 5 :${affectation.wc2023Affectation.recommendation.club.capacity[key]}`}</div>;
              }
              if (key === 'random') {
                return <div>{`Aléatoire : ${affectation.wc2023Affectation.recommendation.club.capacity[key]}`}</div>;
              }
            })}
            Conseiller:
            <span>{` ${affectation.wc2023Affectation.recommendation.club?.referrer[0].firstName} ${affectation.wc2023Affectation.recommendation.club?.referrer[0].lastName}`}</span>
          </div>
        </div>
      </div>
    );
  };
  console.log('advisorChoice', advisorChoice, 'advisorDecision', advisorDecision?.name);
  const renderClubListSelection = () => {
    return (
      <div>
        <FormControl variant="outlined" className={classes.selectContainer}>
          <InputLabel id="label-choix-1">Liste des structures</InputLabel>
          <Select
            native
            labelId="label-choix-1"
            label="Liste des clubs"
            onChange={(e) => {
              const d = getStructuresState.data?.allStructures[Number(e.target.value)] || null;
              setAdvisorDecision(d);
              setCheckedRadio(false);
              setAdvisorChoice('choix_2');
            }}
            value={advisorDecision?.name}
          >
            <option hidden aria-label="Aucun" value="" />
            {getStructuresState.data &&
              getStructuresState.data?.allStructures.map((v: any, i: number) => (
                <option key={i} value={i}>
                  {v.name}
                </option>
              ))}
          </Select>
          {!isEmpty(advisorDecision) && advisorDecision?.capacity && advisorChoice === 'choix_2' && (
            <div>
              Capacité:
              {Object.keys(advisorDecision?.capacity).map((key) => {
                if (key === 'bac3') {
                  return <div key={key}>{`BAC + 3 : ${advisorDecision?.capacity[key]}`}</div>;
                }
                if (key === 'bac5') {
                  return <div key={key}>{`BAC + 5 : ${advisorDecision?.capacity[key]}`}</div>;
                }
                if (key === 'random') {
                  return <div key={key}>{`Aléatoire : ${advisorDecision?.capacity[key]}`}</div>;
                }
              })}
              Conseiller:
              <span>{` ${advisorDecision?.referrer[0].firstName} ${advisorDecision?.referrer[0].lastName}`}</span>
            </div>
          )}
        </FormControl>
      </div>
    );
  };
  const renderCampusManualSelection = () => {
    return (
      <div className={classes.manuelSelection}>
        <Radio
          checked={advisorChoice === 'choix_2'}
          value="choix_2"
          onChange={() => {
            setAdvisorChoice('choix_2');
            setAdvisorDecision(null);
          }}
        />
        <div>
          <p className={classes.infoClub}>Choisir manuellement la structure :</p>
          {renderClubListSelection()}
        </div>
      </div>
    );
  };
  const renderAdvisorSelection = () => {
    return (
      <DialogContent className={classes.advisorSelection}>
        <FormControl variant="outlined">
          <RadioGroup>
            {affectation.wc2023Affectation.recommendation &&
              affectation.wc2023Affectation.recommendation.status === 'ACCEPTED' &&
              renderUserClubReco()}
            {affectation.wc2023Affectation.advisorSelection.map(
              (c: { name: string; referrer: any; capacity: any; club_code: string; fnv1a32_hash: number }) => {
                return (
                  <div key={c.name}>
                    <FormControlLabel
                      control={<Radio />}
                      checked={advisorChoice === 'choix_3' ? advisorDecision?.name === c.name : false}
                      label={(
                        <>
                          <strong style={{ color: '#4D6EC5' }}>Suggestion du conseiller Pôle Emploi :</strong>
                          {c.name}
                        </>
                      )}
                      value={c.fnv1a32_hash}
                      onChange={handleChangeAdvisorDecision}
                    />
                    <div>
                      Capacité:
                      {Object.keys(c.capacity).map((key) => {
                        if (key === 'bac3') {
                          return <div key={key}>{`BAC + 3 : ${c.capacity[key]}`}</div>;
                        }
                        if (key === 'bac5') {
                          return <div key={key}>{`BAC + 5 :${c.capacity[key]}`}</div>;
                        }
                        if (key === 'random') {
                          return <div key={key}>{`Aléatoire : ${c.capacity[key]}`}</div>;
                        }
                      })}
                      Conseiller:
                      <span>{` ${c?.referrer[0]?.firstName} ${c?.referrer[0].lastName}`}</span>
                    </div>
                  </div>
                );
              },
            )}
            {renderCampusManualSelection()}
          </RadioGroup>
        </FormControl>
      </DialogContent>
    );
  };
  const renderUserSelection = () => {
    return (
      <DialogContent className={classes.advisorSelection}>
        <FormControl variant="outlined">
          <RadioGroup>
            {affectation.wc2023Affectation.recommendation &&
              affectation.wc2023Affectation.recommendation.status === 'ACCEPTED' &&
              renderUserClubReco()}
            {renderCampusManualSelection()}
          </RadioGroup>
        </FormControl>
      </DialogContent>
    );
  };

  const renderDefault = () => {
    return (
      <>
        {affectation.wc2023Affectation.recommendation &&
          affectation.wc2023Affectation.recommendation.status === 'ACCEPTED' &&
          renderUserClubReco()}
        {renderCampusManualSelection()}
      </>
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
      case 'NO_SELECTION':
      default: {
        return renderDefault();
      }
    }
  };
  const confirmationChoix = () => {
    if (!isEmpty(advisorDecision) && advisorDecision) {
      confirmationAffectationCall({ userId: affectation.id, clubName: advisorDecision.name });
    }
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
        <div className={classes.infoUser}>
          <p style={{ color: '#4D6EC5' }}>Information de l&apos;utilisateur:</p>
          <span>{`Email: ${affectation.email}`}</span>
          <span>{`Formation: ${affectation.wc2023.formation}`}</span>
          <span>{`Niveau: ${affectation.wc2023.degree}`}</span>
          <span>{`perimeter: ${affectation.wc2023.perimeter}`}</span>
        </div>
        <div>
          {getStructuresState.loading ? (
            <CircularProgress />
          ) : (
            renderData(affectation.wc2023Affectation.advisorDecision)
          )}
        </div>
        <div className={classes.btnConfirmaionContainer}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            size="medium"
            color="primary"
            disabled={!getStructuresState.data || isEmpty(advisorDecision)}
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
            <div className={classes.heightModal}>
              <div className={classes.headerModal}>
                <div className={classes.text}>Êtes-vous sûr de vouloir affecter ce jeune à cette structure ?</div>
                <div className={classes.subText}>Cette confirmation est définitive</div>
              </div>
              <div className={classes.modalBtnContainer}>
                <div className={classes.btn}>
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
