
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl: string;
  link: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  grade?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  imageUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Programming Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Machine Learning' | 'Tools' | 'Computer Fundamentals';
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  socials: {
    linkedin?: string;
    github?: string;
    peerlist?: string;
    //twitter?: string;
  };
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
