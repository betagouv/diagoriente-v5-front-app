import { useContext, useMemo, useEffect } from 'react';
import ParcourContext from 'contexts/ParcourContext';
import { useLazySkills } from 'requests/skills';
import { UserParcour } from 'requests/types'


function useParcourSkills(type?: string, parcourUser?: UserParcour | undefined) {
  const { parcours } = useContext(ParcourContext);
  const selectedParcours = parcourUser ? parcourUser : parcours
  const skills = useMemo(
    () => (!type ? selectedParcours?.skills : selectedParcours?.skills.filter((skill) => skill.theme?.type === type)) || [],
    [selectedParcours, type],
  );

  const [skillsCall, skillsState] = useLazySkills({ fetchPolicy: 'network-only' });

  useEffect(() => {
    if (skills) skillsCall({ variables: { ids: skills.map((skill) => skill.id).join(',') } });
    // eslint-disable-next-line
  }, [skills]);

  return skillsState;
}

export default useParcourSkills;
