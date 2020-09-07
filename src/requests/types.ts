export type UserRole = 'user' | 'admin';
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
  codeGroupe: string;
  role: UserRole;
}

export interface Question {
  id: string;
  title: string;
  parent: Question | null;
}

export interface Option {
  id: string;
  title: string;
  parent: { path: Option[] }[];
  question: Question;
  verified: boolean;
}

export interface Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface Context {
  id: string;
  title: string;
  description?: string;
  icon?: string;
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
  resources: string[];
}

export interface Theme {
  id: string;
  title: string;
  type: string;
  resources?: { icon: string; backgroundColor: string };
  description: string;
  verified: boolean;
  activities: {
    id: string;
    title: string;
    description: string;
    options: {
      value: string;
    }[];
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
  type: string;
  verified: boolean;
  interests: Interests[];
  options: { value: string; verified: boolean }[];
}

export interface Competence {
  id: string;
  title: string;
  rank: number;
  niveau: {
    title: string;
    sub_title: string;
  }[];
  type?: string;
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

export interface SkillType {
  id: string;
  theme: { title: string; type: string; id: string; resources?: { icon: string; backgroundColor: string } };
  activities: { id: string; title: string; description: string; options: { value: string }[] }[];
  competences: { _id: Competence; value: number }[];
  comment: {
    id: string;
    lastName: string;
    firstName: string;
    commentText: string;
    status: 'pending' | 'accepted' | 'refused';
    email: string;
    location: string;
  }[];
  engagement?: {
    id: string;
    startDate: string;
    endDate: string;
    activity: string;
    organization:string;
    context: {
      id: string;
      title: string;
      description: string;
      icon: string;
    };
    options: {
      option: {
        id: string;
        title: string;
      }[];
    }[];
  };
}

export interface UserParcour {
  id: string;
  played: boolean;
  playedEng: boolean;
  completed: boolean;
  families: { id: string; nom: string; category: string; resources: string[] }[];
  skills: {
    id: string;
    theme: { title: string; type: string; id: string; resources?: { icon: string; backgroundColor: string } };
  }[];

  globalCompetences: {
    id: string;
    title: string;
    value: number;
    count: number;
    type: string;
    niveau: { title: string; sub_title: string };
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
  competences: { _id: Competence; value: number }[];
  comment: { id: string; firstName: string; lastName: string; email: string; text: string; status: string }[];
}

export interface PublicSkill {
  id: string;
  theme: {
    id: string;
    title: string;
  };
  activities: {
    id: string;
    title: string;
  }[];
  competences: { _id: Competence; value: number }[];
  comment: { id: string; firstName: string; lastName: string; email: string; text: string; status: string };
  user: { id: string; firstName: string; lastName: string };
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
  interests: { _id: { nom: string; id: string }; __typename: string }[];
  competences: { _id: { id: string; title: string }; weight: number }[];
  formations: string[];
  environments: string[];
  questionJobs: { id: string; label: string }[];
  favorite?: {
    id: string;
    interested: boolean;
  };
}
export interface Favoris {
  id: string;
  user: string;
  parcour: string;
  job: string;
  interested: boolean;
}
export interface Company {
  address: string;
  alternance: string;
  boosted: boolean;
  city: string;
  contact_mode: string;
  distance: number;
  headcount_text: string;
  lat: number;
  lon: number;
  matched_rome_code: string;
  matched_rome_label: string;
  matched_rome_slug: string;
  naf: string;
  naf_text: string;
  name: string;
  pmsmp: string;
  siret: string;
  social_network: string;
  stars: number;
  url: string;
  website: string;
}
