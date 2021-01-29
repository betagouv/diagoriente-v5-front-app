import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { decodeUri } from 'utils/url';
import { useUpdateWc2023RecoStatus, useGetPublicReco } from 'requests/campus2023';
import TitleSection from 'components/common/TitleSection/TitleSection';
import medaille from 'assets/svg/medaille.svg';
import useStyles from './style';

const RecommendationCampus = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [state, setState] = useState(false);
  const { token } = decodeUri(location.search);
  const { data } = useGetPublicReco({ variables: { token } });
  const [updateStatusCall, updateStatusState] = useUpdateWc2023RecoStatus();
  const onClickBtn = (comment: string) => {
    if (data?.publicStructure?.user.id) {
      updateStatusCall({ variables: { user: data?.publicStructure.user.id, status: comment } });
    }
  };
  const title = (
    <div>
      Bonjour
      {` ${data?.publicStructure?.club.referrer[0].firstName} ${data?.publicStructure?.club?.referrer[0].lastName},`}
    </div>
  );
  const subTitle = (
    <div>
      {`Vous pouvez renseigner ci dessous votre appréciation du travail de ${data?.publicStructure?.user?.profile.firstName} ${data?.publicStructure?.user.profile.lastName}  lorsque vous étiez son tuteur/sa tutrice`}
    </div>
  );
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };
  useEffect(() => {
    if (updateStatusState.data) {
      setState(true);
    }
  }, [updateStatusState.data]);
  const historyChange = () => {
    window.location.href = process.env.REACT_APP_PUBLIC_URL as string;
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {!state ? (
          <>
            <TitleSection image={medaille} title={title} />
            <TitleSection title={subTitle} />
            <div className={classes.btnContainer}>
              <Button onClick={() => onClickBtn('ACCEPTED')} className={classes.btn}>
                Oui
              </Button>
              <Button onClick={() => onClickBtn('REJECTED')} className={classes.btn}>
                Non
              </Button>
            </div>
          </>
        ) : (
          <div>
            {' '}
            <TitleSection title="Votre Réponse de la demande de recommendation a éte envoyer avec succée. " />
            <div className={classes.btnContainerSuccess}>
              <Button className={classes.btn} onClick={historyChange}>
                <div>Découvrir Diagoriente</div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCampus;
