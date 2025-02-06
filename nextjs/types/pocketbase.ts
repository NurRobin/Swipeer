export interface BaseRecord {
    id: string;
    created: string;
    updated: string;
}

export interface SuperUser extends BaseRecord {
    password: string;
    tokenKey: string;
    email: string;
    emailVisibility: boolean;
    verified: boolean;
}

export interface User extends BaseRecord {
    password: string;
    tokenKey: string;
    email: string;
    emailVisibility: boolean;
    verified: boolean;
    display_name: string;
}

export interface AuthOrigin extends BaseRecord {
    collectionRef: string;
    recordRef: string;
    fingerprint: string;
}

export interface ExternalAuth extends BaseRecord {
    collectionRef: string;
    recordRef: string;
    provider: string;
    providerId: string;
}

export interface MFA extends BaseRecord {
    collectionRef: string;
    recordRef: string;
    method: string;
}

export interface OTP extends BaseRecord {
    collectionRef: string;
    recordRef: string;
    password: string;
    sentTo?: string;
}

export interface GroupMember extends BaseRecord {
    user_id: string;
    group_id: string;
    role?: "admin" | "contributer";
    joined_at: string;
}

export interface Group extends BaseRecord {
    created_by: string;
    name: string;
    description?: string;
}

export interface InviteLink extends BaseRecord {
    group_id: string;
    created_by: string;
    max_uses?: number;
    uses?: number;
    infinite?: boolean;
}

export interface Survey extends BaseRecord {
    created_by: string;
    created_in: string;
    type: "majority" | "score" | "consensus";
    title: string;
    description?: string;
    start_at: string;
    end_at: string;
}

export interface Vote extends BaseRecord {
    user_id: string;
    survey_id: string;
    pro?: boolean;
    voted_at: string;
}
