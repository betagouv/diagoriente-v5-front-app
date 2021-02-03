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
      {`${data?.publicStructure?.user?.profile.firstName} ${data?.publicStructure?.user.profile.lastName} (${data?.publicStructure?.user.email}) vous sollicite pour que vous attestiez de votre volonté de le recruter en tant qu'apprenti. `}
    </div>
  );
  const subTitle2 = (
    <div>
      {`Vous ne devez vous engager avec le même nombre d'apprentis que celui que vous avez communiqué auprès de la direction de campus.

`}
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
            <TitleSection title={subTitle2} />

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
            <TitleSection title="Merci, votre choix à bien été enregistré. Vous serez recontacté par l'équipe Campus une fois qu'un apprenti vous aura été affecté." />
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
