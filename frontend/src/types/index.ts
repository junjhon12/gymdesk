export type MemberStatus = 'active' | 'inactive';
export type MembershipType = 'monthly' | 'annual';

export interface Member {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  membership_type: MembershipType;
  status: MemberStatus;
  join_date: string;
  expiry_date?: string;
  last_payment_date?: string;
  created_at: string;
  updated_at: string;
}

export interface MemberCreate {
  full_name: string;
  email: string;
  phone?: string;
  membership_type: MembershipType;
  status: MemberStatus;
  join_date: string;
  expiry_date?: string;
  last_payment_date?: string;
}

export interface MemberUpdate {
  full_name?: string;
  email?: string;
  phone?: string;
  membership_type?: MembershipType;
  status?: MemberStatus;
  join_date?: string;
  expiry_date?: string;
  last_payment_date?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}