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
export interface Interests {
  id: string;
  nom: string;
  rank: number;
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
