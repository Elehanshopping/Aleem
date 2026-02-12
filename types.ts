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
  status: 'official' | 'pending';
  official_result: {
    publish_now: boolean;
    winner: string | null;
    party: string | null;
    vote_margin: string | null;
    turnout: string | null;
    total_votes_cast: number | null;
    candidates: {
      name: string | null;
      party: string | null;
      votes: number | null;
    }[];
    verification: {
      level: 'VERIFIED_OFFICIAL' | 'PENDING';
      confidence: string;
      verified_by: string;
      ecs_proof_url: string | null;
      ecs_proof_type: 'page' | 'pdf' | 'excel' | 'gazette' | null;
      last_verified: string;
    };
  };
  polling_centers_verified: {
    center_name: string | null;
    center_code: string | null;
    candidates: { name: string, votes: number }[];
    total_votes_cast: number | null;
    publish_now: boolean;
    verification: {
      level: string;
      confidence: string;
      ecs_proof_url: string;
    };
  }[];
  pending_items: {
    source_type: string;
    source_url: string;
    reason: string;
    extracted_summary: string;
  }[];
  ingestion_summary: {
    received: number;
    rejected_spam_or_invalid: number;
    accepted_pending: number;
    accepted_verified_official: number;
  };
  integrity: {
    ecs_final_authority: boolean;
    auto_publish_only_verified: boolean;
    media_never_official: boolean;
    no_hallucination: boolean;
  };
}

export interface IntegrityCheck {
  ecs_priority_enforced: boolean;
  media_marked_provisional: boolean;
  no_hallucination: boolean;
  missing_data: string[];
}