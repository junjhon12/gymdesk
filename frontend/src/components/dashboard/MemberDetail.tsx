import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { membersApi } from '../../services/api';
import type { Member, MemberUpdate } from '../../types';
import Panel from './Panel';
import Avatar from '../ui/Avatar';

export default function MemberDetail() {
  const { id } = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<MemberUpdate>({});
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadMember = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await membersApi.getOne(Number(id));
        setMember(data);
        setForm(data);
      } catch (err) {
        setError('Member not found');
      } finally {
        setLoading(false);
      }
    };
    loadMember();
  }, [id]);

  // 3. Form Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!member) return;
    try {
      setSaving(true);
      const updated = await membersApi.update(member.id, form);
      setMember(updated);
      setForm(updated);
      setEditing(false); 
    } catch (err) {
      console.error("Failed to update member");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-400 p-8">Loading member profile...</div>;
  if (error || !member) return <div className="text-red-400 p-8">{error || 'Member not found'}</div>;

  return (
    <div className="h-full flex flex-col relative pb-10">
      
      <div className="mb-6">
        <Link to="/members" className="text-blue-500 hover:text-blue-400 text-sm font-medium mb-4 inline-block transition-colors">
          ← Back to Directory
        </Link>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar initials={member.full_name.split(" ").map(n => n[0]).join("")} colorHex="#3b82f6" size={64} />
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                {member.full_name}
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider -translate-y-0.5 ${
                  member.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                }`}>
                  {member.status}
                </span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">Member ID: {member.id} · Joined {member.join_date}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {editing ? (
              <>
                <button 
                  onClick={() => {
                    setEditing(false);
                    setForm(member); 
                  }} 
                  disabled={saving}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-green-900/20"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setEditing(true)} 
                  className="bg-[#0f1117] border border-gray-800 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit Profile
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
                  Check-In
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="flex flex-col gap-6">
          <Panel>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contact Information</h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Email</div>
                {editing ? (
                  <input name="email" value={form.email || ''} onChange={handleChange} className="w-full bg-[#0a0d14] border border-gray-700 rounded text-sm px-2 py-1.5 text-white focus:outline-none focus:border-blue-500" />
                ) : (
                  <div className="text-sm text-gray-200">{member.email}</div>
                )}
              </div>
              
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Phone</div>
                {editing ? (
                  <input name="phone" value={form.phone || ''} onChange={handleChange} className="w-full bg-[#0a0d14] border border-gray-700 rounded text-sm px-2 py-1.5 text-white focus:outline-none focus:border-blue-500" />
                ) : (
                  <div className="text-sm text-gray-200">{member.phone || '—'}</div>
                )}
              </div>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex gap-1 bg-[#0f1117] border border-gray-800 rounded-lg p-1 w-fit">
            {["overview", "billing", "attendance", "notes"].map(t => (
              <button 
                key={t} 
                onClick={() => setActiveTab(t)} 
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  activeTab === t ? "bg-gray-800 text-white" : "bg-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <Panel>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Membership</h2>
                <span className="text-xs text-blue-500 cursor-pointer hover:underline">Manage Plan</span>
              </div>
              <div className="p-4 rounded-xl bg-linear-to-br from-blue-900/20 to-transparent border border-blue-900/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {editing ? (
                      <select name="membership_type" value={form.membership_type || ''} onChange={handleChange} className="bg-[#0a0d14] border border-gray-700 rounded text-sm px-2 py-1.5 text-white focus:outline-none focus:border-blue-500 mt-1">
                        <option value="Day Pass">Day Pass</option>
                        <option value="Monthly Basic">Monthly Basic</option>
                        <option value="Monthly Premium">Monthly Premium</option>
                        <option value="Annual Basic">Annual Basic</option>
                        <option value="Annual Premium">Annual Premium</option>
                      </select>
                    ) : (
                      <h3 className="text-lg font-bold text-white capitalize">{member.membership_type}</h3>
                    )}
                  </div>
                  <span className="text-xs bg-blue-900/40 text-blue-400 px-2.5 py-1 rounded-md font-medium">Auto-Renew ON</span>
                </div>
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}