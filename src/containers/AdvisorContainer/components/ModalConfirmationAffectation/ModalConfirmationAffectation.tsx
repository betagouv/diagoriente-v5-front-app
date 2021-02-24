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
import { useAllStructures, useDisponibiliteStructure } from 'requests/campus2023';
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
  const [indexStructure, setIndexStructure] = useState<number | null>(null);
  const [checkedRadio, setCheckedRadio] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [getStructuresCall, getStructuresState] = useAllStructures();
  const [getDisponibiliteCall, getDisponibiliteState] = useDisponibiliteStructure();

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
  const getCapacity = (capacity: any) => {
    return Object.keys(capacity).map((key) => {
      if (key === 'bac' && capacity.bac) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>BAC :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'bac1' && capacity.bac1) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>BAC + 1 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'bac2' && capacity.bac2) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>BAC + 2 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'bac3' && capacity.bac3) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>BAC + 3 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'bac4' && capacity.bac4) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>BAC + 4 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'bac5' && capacity.bac5) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>BAC + 5 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'pasbac1' && capacity.pasbac1) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>PAS BAC + 1 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'pasbac5' && capacity.pasbac5) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>PAS BAC + 5 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'bacoubac3' && capacity.bacoubac3) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>BAC OU BAC + 3 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'bac3oubac5' && capacity.bac3oubac5) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>BAC OU BAC + 5 :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
      if (key === 'random' && capacity.random) {
        return (
          <div key={key}>
            <span style={{ color: '#4D6EC5' }}>Aléatoire :</span>
            {` ${capacity[key]}`}
          </div>
        );
      }
    });
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
            {affectation.wc2023Affectation.recommendation.club.capacity &&
              getCapacity(affectation.wc2023Affectation.recommendation.club.capacity)}
            <span style={{ color: '#4D6EC5' }}>Conseiller:</span>
            <span>{` ${affectation.wc2023Affectation.recommendation.club?.referrer[0].firstName} ${affectation.wc2023Affectation.recommendation.club?.referrer[0].lastName}`}</span>
          </div>
        </div>
      </div>
    );
  };
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
              setIndexStructure(Number(e.target.value));
              setAdvisorDecision(d);
              setCheckedRadio(false);
              setAdvisorChoice('choix_2');
            }}
            value={advisorChoice === 'choix_2' && indexStructure ? indexStructure : ''}
          >
            <option hidden aria-label="Aucun" value="" />
            {getStructuresState.data &&
              getStructuresState.data?.allStructures
                .sort(function(a, b) {
                  return a.name.localeCompare(b.name);
                })
                .map((v: any, i: number) => (
                  <option key={i} value={i}>
                    {v.name}
                  </option>
                ))}
          </Select>
          {!isEmpty(advisorDecision) && advisorDecision?.capacity && advisorChoice === 'choix_2' && (
            <div>
              Capacité:
              {advisorDecision && getCapacity(advisorDecision?.capacity)}
              <span style={{ color: '#4D6EC5' }}>Conseiller:</span>
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
      <DialogContent>
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
                      {c.capacity && getCapacity(c.capacity)}
                      <span style={{ color: '#4D6EC5' }}>Conseiller:</span>
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
      <DialogContent>
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
      confirmationAffectationCall({ userId: affectation.id, clubName: advisorDecision.id });
    }
  };
  useEffect(() => {
    if (advisorDecision && advisorDecision.id && affectation.wc2023.degree) {
      const formatedText = affectation.wc2023.formation.split(':')[0].trim();
      getDisponibiliteCall({
        variables: { idStructure: advisorDecision.id, formation: formatedText },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advisorDecision]);
  return (
    <ModalContainer
      open
      backdropColor="primary"
      colorIcon="#4D6EC5"
      handleClose={() => onClose()}
      size={77}
      title={`Confirmation d'affectation du candidat ${affectation.profile.firstName} ${affectation.profile.firstName}`}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '60%' }}>
          <div>
            {getStructuresState.loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
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
        </div>
        <div className={classes.infoUser}>
          <p className={classes.infoClub}>Information de l&apos;utilisateur:</p>
          <span>
            <span style={{ color: '#4D6EC5' }}>Email:</span>
            {` ${affectation.email}`}
          </span>
          <span>
            <span style={{ color: '#4D6EC5' }}>Formation:</span>
            {` ${affectation.wc2023.formation}`}
          </span>
          <span>
            <span style={{ color: '#4D6EC5' }}>Niveau:</span>
            {` ${affectation.wc2023.degree}`}
          </span>
          <span>
            <span style={{ color: '#4D6EC5' }}>Perimeter:</span>
            {` ${affectation.wc2023.perimeter}`}
          </span>
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
                <div className={classes.subTextInfo}>{`Disponibilité: ${getDisponibiliteState.data?.getCapacity}`}</div>
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
                    <span>NON</span>
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
