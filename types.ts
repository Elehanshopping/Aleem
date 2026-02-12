
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
  image?: string;
}

export interface FrameOption {
  id: string;
  name: string;
  color: string;
  accent: string;
}

export interface VerificationSource {
  name: string;
  type: string;
  confidence: 'high' | 'medium' | 'low';
  ref?: string;
}

export interface ConstituencyVerification {
  constituency: string;
  status: 'official' | 'provisional' | 'pending';
  winner: string | null;
  party: string | null;
  vote_margin: string | null;
  turnout: string | null;
  candidates: {
    name: string | null;
    party: string | null;
    votes: number | null;
    source: 'ECS' | 'Media';
    confidence: 'high' | 'low';
  }[];
  sources: VerificationSource[];
  last_verified: string;
  notes: string;
}

export interface NationalVerification {
  status: 'official' | 'partial' | 'provisional';
  total_seats: number;
  seats_declared_official: number | null;
  party_results: {
    party_name: string | null;
    seats_won: number | null;
    source: 'ECS' | 'Media';
    confidence: 'high' | 'low';
  }[];
  turnout: string | null;
  official_last_update: string;
  sources: VerificationSource[];
  notes: string;
}

export interface IntegrityCheck {
  ecs_priority_enforced: boolean;
  media_marked_provisional: boolean;
  no_hallucination: boolean;
  missing_data: string[];
}

export interface ConflictReport {
  conflict_type: "seat_count" | "turnout" | "winner" | "violence" | "other";
  authoritative_now: "ECS" | "unclear";
  publish_recommendation_bn: string;
  what_not_to_say: string[];
  next_check: string;
}
