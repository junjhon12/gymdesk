import type { Member, MemberCreate, MemberUpdate, ChatMessage } from '../types/index'


// Single source of truth for the API base URL
// If we ever change ports or deploy, we change it here only
const BASE_URL = 'http://localhost:8000';

// ---
// Members API
// ---
export const membersApi = {

  // GET /members
  getAll: async (): Promise<Member[]> => {
    const res = await fetch(`${BASE_URL}/members`);
    if (!res.ok) throw new Error('Failed to fetch members');
    return res.json();
  },

  // GET /members/:id
  getOne: async (id: number): Promise<Member> => {
    const res = await fetch(`${BASE_URL}/members/${id}`);
    if (!res.ok) throw new Error('Failed to fetch member');
    return res.json();
  },

  // POST /members
  create: async (data: MemberCreate): Promise<Member> => {
    const res = await fetch(`${BASE_URL}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create member');
    return res.json();
  },

  // PUT /members/:id
  update: async (id: number, data: MemberUpdate): Promise<Member> => {
    const res = await fetch(`${BASE_URL}/members/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update member');
    return res.json();
  },

  // DELETE /members/:id
  deactivate: async (id: number): Promise<{ message: string }> => {
    const res = await fetch(`${BASE_URL}/members/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to deactivate member');
    return res.json();
  },

};

// ---
// Chat API
// ---
export const chatApi = {
  sendMessage: async (messages: ChatMessage[]): Promise<string> => {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })
    if (!res.ok) throw new Error('Failed to send message')
    const data = await res.json()
    return data.response
  }
}