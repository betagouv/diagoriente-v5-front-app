export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
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
}
export interface Competence {
  id: string;
  title: string;
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
