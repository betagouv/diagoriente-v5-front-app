import { useContext, useMemo, useEffect } from 'react';
import ParcourContext from 'contexts/ParcourContext';
import { useLazySkills } from 'requests/skills';

function useParcourSkills(type?: string) {
  const { parcours } = useContext(ParcourContext);
  const skills = useMemo(
    () => (!type ? parcours?.skills : parcours?.skills.filter((skill) => skill.theme?.type === type)) || [],
    [parcours, type],
  );

  const [skillsCall, skillsState] = useLazySkills({ fetchPolicy: 'network-only' });

  useEffect(() => {
    if (skills) skillsCall({ variables: { ids: skills.map((skill) => skill.id).join(',') } });
    // eslint-disable-next-line
  }, [skills]);

  return skillsState;
}

export default useParcourSkills;
