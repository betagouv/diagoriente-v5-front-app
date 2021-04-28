import React, { useState, useContext, useMemo, useEffect } from 'react';
import { useFamilies } from 'requests/familles';
import Button from 'components/button/Button';
import { Families } from 'requests/types';
import ModalContainer from 'components/common/Modal/ModalContainer';
import { Link, RouteComponentProps } from 'react-router-dom';
import { groupBy } from 'lodash';
import PlaceHolder from 'containers/InteretContainer/components/placeholderInterest/Placeholder';
import Arrow from 'assets/svg/arrow';
import mainInterest from 'assets/svg/mainInterest.svg';

import interestContext from 'contexts/InterestSelected';
import parcoursContext from 'contexts/ParcourContext';
import Slider from 'components/Slider/Slider';
import logo from 'assets/svg/picto_attention.svg';
import Spinner from '../../components/SpinnerInterest/Spinner';
import FamileSelected from '../../components/SelectedFamille/SelectedFamille';

import useStyles from './styles';

const ParcoursInteret = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const { setInterest, selectedInterest } = useContext(interestContext);
  // eslint-disable-next-line
  const [openWarning, setWarning] = useState(false);
  const [open, setOpen] = useState(false);
  const handelOpen = () => setOpen(true);
  const onHandelClose = () => setOpen(false);
  const onHandelCloseWarning = () => setWarning(false);

  const { parcours } = useContext(parcoursContext);
  const [selectedInterests, setSelectedInterest] = useState(
    selectedInterest || parcours?.families || ([] as Families[]),
  );
  useEffect(() => {
    setInterest(selectedInterests);
  }, [setInterest, selectedInterests]);

  const { data, loading } = useFamilies();
  const formattedData: { title: string; data: Families[] }[] = useMemo(
    () =>
      Object.entries(groupBy(data?.families.data, 'category')).map((el) => ({
        title: el[0],
        data: el[1],
      })),
    [data],
  );

  const renderPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = selectedInterests.length + 1; i <= 5; i += 1) {
      array.push(<PlaceHolder index={i} key={i} direction="horizontal" />);
    }
    return array;
  };
  const renderAllPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = 1; i <= 5; i += 1) {
      array.push(<PlaceHolder direction="horizontal" index={i} key={i} />);
    }
    return array;
  };

  const isChecked = (id?: string): boolean => !!selectedInterests.find((elem) => elem.id === id);
  const handleClick = (e: Families) => {
    let copySelected: Families[] = [...selectedInterests];
    if (copySelected.length !== 5) {
      if (isChecked(e.id)) {
        copySelected = selectedInterests.filter((ele) => ele.id !== e?.id);
      } else if (selectedInterests.length < 5) {
        copySelected.push(e);
      }
      setInterest(copySelected);
      setSelectedInterest(copySelected);
    } else if (copySelected.length === 5) {
      if (isChecked(e.id)) {
        copySelected = selectedInterests.filter((ele) => ele.id !== e?.id);
        setInterest(copySelected);
        setSelectedInterest(copySelected);
      } else {
        handelOpen();
      }
    }
  };
  useEffect(() => {
    const test = selectedInterest?.every((interet) => interet.category === "avec d'autres personnes");
    if (selectedInterest?.length === 5 && test) setWarning(true);
  }, [selectedInterest]);

  const deleteFamille = (id: number) => {
    const familleSelected = selectedInterests[id];
    let copySelected: Families[] = [...selectedInterests];
    if (isChecked(familleSelected?.id)) {
      copySelected = selectedInterests.filter((ele) => ele.id !== familleSelected.id);
    }

    setSelectedInterest(copySelected);
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <div className={classes.circleContainer}>
            {loading ? (
              <div className={classes.loadingContainer}>
                <Spinner />
              </div>
            ) : (
              <Slider data={formattedData} handleClick={handleClick} isChecked={isChecked} />
            )}
          </div>
        </div>

        <div className={classes.footer}>
          <div className={classes.footerContent}>
            <div className={classes.descriptionContainer}>
              <div className={classes.description}>Sélectionne 5 familles </div>
              <div className={classes.description}>d’intérêt en tout :</div>
            </div>
            {loading
              ? renderAllPlaceholder()
              : selectedInterests.map((el, i) => (
                  <FamileSelected
                    key={el.id}
                    handleClick={() => deleteFamille(i)}
                    famille={el}
                    index={i}
                    direction="horizontal"
                  />
                ))}

            {!loading && renderPlaceholder()}
            {selectedInterests.length > 0 && (
              <Link to={`/interet/ordre/${location.search}`} className={classes.wrapperBtn}>
                <Button className={classes.btn}>
                  <div className={classes.contentBtn}>
                    <div className={classes.btnLabel}>Suivant</div>
                    <Arrow color="#fff" width="12" height="12" />
                  </div>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ModalContainer open={open} backdropColor="#011A5E" colorIcon="#420FAB">
        <div style={{ height: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <div>
            <img src={logo} alt="att" width={35} height={35} />
          </div>
          <div className={classes.textModal}>
            Tu as déjà choisi 5 familles d’intérêts, tu dois en supprimer si tu souhaites en ajouter de nouvelles.
          </div>
          <div>
            <Button onClick={onHandelClose} className={classes.btn}>
              <div className={classes.btnLabel}>J'ai compris !</div>
            </Button>
          </div>
        </div>
      </ModalContainer>
      <ModalContainer open={openWarning} backdropColor="#011A5E" colorIcon="#420FAB">
        <div style={{ height: "80%", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <div className={classes.titleContainerModal}>UNE PETITE MINUTE...</div>
          <div className={classes.textModal}>
            Tu as choisi tes familles d’intérêts seulement dans la 1ère partie, es-tu sûr.e d’avoir exploré toutes les
            familles d’intérêts
          </div>
          <div className={classes.imgContainer}>
            <img src={mainInterest} alt="" className={classes.imgContainerWarning}/>
          </div>
          <div>
            <Button onClick={onHandelCloseWarning} className={classes.btn}>
              <div className={classes.btnLabel}>J'ai compris !</div>
            </Button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ParcoursInteret;
