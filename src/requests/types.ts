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
