
export interface CandidateInfo {
  name: string;
  party: string;
  alliance: string;
  constituency: string;
  regions: string[];
}

export interface DeveloperInfo {
  company: string;
  ceo: string;
  phone: string;
  email?: string;
  office?: string;
}

export interface FrameOption {
  id: string;
  name: string;
  color: string;
  accent: string;
}
