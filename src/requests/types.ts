export interface User {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  played: boolean;
  isActive: boolean;
  logo: string;
  location: string;
}

export interface Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}
export interface Interests {
  id: string;
  nom: string;
  rank: string;
}
export interface Families {
  id: string;
  nom: string;
  category: string;
}

export interface Theme {
  id: string;
  title: string;
  type: string;
  resources?: { icon: string; backgroundColor: string };
  activities: {
    id: string;
    title: string;
    description: string;
  }[];
  tooltips: {
    competenceId: string;
    tooltip: string;
  }[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
}
export interface Competence {
  id: string;
  title: string;
  niveau: {
    title: string;
    sub_title: string;
  }[];
}
export interface CompetenceValues {
  id: string;
  value: number;
}
export interface Selection {
  id: string;
  title: string;
  icon: string;
  background: string;
}
export interface Location {
  label: string;
}

export interface UserParcour {
  id: string;
  played: boolean;
  completed: boolean;
  families: { id: string; nom: string; category: string }[];
  skills: {
    id: string;
    theme: { title: string; type: string; id: string; resources?: { icon: string; backgroundColor: string } };
    activities: { id: string; title: string; description: string }[];
    competences: { _id: Competence; value: number }[];
  }[];
  globalCompetences: {
    id: string;
    title: string;
    value: number;
    count: number;
  }[];
}

export interface Skill {
  id: string;
  parcourId: string;
  type: string;

  theme: {
    id: string;
    title: string;
    type: string;
    verified: string;
    resources?: { icon: string; color: string; backgroundColor: string };
    tooltips: { competenceId: string; tooltip: string }[];
  };
  activities: {
    id: string;
    title: string;
    type: string;
    description: string;
    interests: string[];
    verified: boolean;
  }[];
  competences: { _id: string; value: number }[];
  comment: { firstName: string; lastName: string; email: string; text: string; status: string }[];
}
export interface Jobs {
  id: string;
  title: string;
  description: string;
  search: string;
  link: string;
  salaire: string;
  accessibility: string;
  rome_codes: string;
  secteur: string[];
  niveau: string[];
  interests: { _id: string; weight: number }[];
  competences: { _id: string; weight: number }[];
  formations: string[];
  environments: string[];
  questionJobs: { _id: string; label: string }[];
}
