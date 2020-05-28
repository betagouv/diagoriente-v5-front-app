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
  resources?: { icon: string; backgroundColor: string };
  activities: {
    id: string;
    title: string;
    description: string;
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
  families: { id: string; nom: string }[];
  skills: {
    theme: { title: string; type: string; id: string; resources?: { icon: string; backgroundColor: string } };
    activities: { id: string; title: string; description: string };
    competences: { _id: string; value: number };
  }[];
}
