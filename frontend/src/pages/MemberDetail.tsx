import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Member, MemberUpdate } from '../types/index'
import { membersApi } from '../services/api'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

function MemberDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [member, setMember]   = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [form, setForm]       = useState<MemberUpdate>({})

  useEffect(() => {
    const loadMember = async () => {
      try {
        setLoading(true)
        const data = await membersApi.getOne(Number(id))
        setMember(data)
        setForm(data)
      } catch {
        setError('Member not found')
      } finally {
        setLoading(false)
      }
    }
    loadMember()
  }, [id])

  const handleSave = async () => {
    if (!member) return
    try {
      setSaving(true)
      const updated = await membersApi.update(member.id, form)
      setMember(updated)
      setEditing(false)
    } catch {
      setError('Failed to update member')
    } finally {
      setSaving(false)
    }
  }

  const handleDeactivate = async () => {
    if (!member) return
    if (!confirm(`Deactivate ${member.full_name}?`)) return
    try {
      await membersApi.deactivate(member.id)
      navigate('/members')
    } catch {
      setError('Failed to deactivate member')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // --- Render states ---

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400 animate-pulse">Loading member...</p>
    </div>
  )

  if (error || !member) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <p className="text-red-400">{error ?? 'Member not found'}</p>
      <Button onClick={() => navigate('/members')}>Back to Members</Button>
    </div>
  )

  const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  const labelClass = "block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider"
  const valueClass = "text-white text-sm mt-1"

  return (
    <div className="max-w-3xl">

      {/* Back button */}
      <button
        onClick={() => navigate('/members')}
        className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors"
      >
        ← Back to Members
      </button>

      {/* Profile header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{member.full_name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge status={member.status} />
              <span className="text-gray-500 text-sm capitalize">
                {member.membership_type} plan
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {editing ? (
              <>
                <Button variant="secondary" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={() => setEditing(true)}>
                  Edit
                </Button>
                {member.status === 'active' && (
                  <Button variant="danger" onClick={handleDeactivate}>
                    Deactivate
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Member info grid */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
          Member Information
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* Full Name */}
          <div>
            <label className={labelClass}>Full Name</label>
            {editing ? (
              <input name="full_name" value={form.full_name ?? ''} onChange={handleChange} className={inputClass} />
            ) : (
              <p className={valueClass}>{member.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email</label>
            {editing ? (
              <input name="email" type="email" value={form.email ?? ''} onChange={handleChange} className={inputClass} />
            ) : (
              <p className={valueClass}>{member.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>Phone</label>
            {editing ? (
              <input name="phone" value={form.phone ?? ''} onChange={handleChange} className={inputClass} />
            ) : (
              <p className={valueClass}>{member.phone ?? '—'}</p>
            )}
          </div>

          {/* Membership Type */}
          <div>
            <label className={labelClass}>Membership Type</label>
            {editing ? (
              <select name="membership_type" value={form.membership_type ?? ''} onChange={handleChange} className={inputClass}>
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </select>
            ) : (
              <p className={valueClass + ' capitalize'}>{member.membership_type}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>Status</label>
            {editing ? (
              <select name="status" value={form.status ?? ''} onChange={handleChange} className={inputClass}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            ) : (
              <p className={valueClass + ' capitalize'}>{member.status}</p>
            )}
          </div>

          {/* Join Date */}
          <div>
            <label className={labelClass}>Join Date</label>
            {editing ? (
              <input name="join_date" type="date" value={form.join_date ?? ''} onChange={handleChange} className={inputClass} />
            ) : (
              <p className={valueClass}>{member.join_date}</p>
            )}
          </div>

          {/* Last Payment Date */}
          <div>
            <label className={labelClass}>Last Payment Date</label>
            {editing ? (
              <input name="last_payment_date" type="date" value={form.last_payment_date ?? ''} onChange={handleChange} className={inputClass} />
            ) : (
              <p className={valueClass}>{member.last_payment_date ?? '—'}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className={labelClass}>Expiry Date</label>
            {editing ? (
              <input name="expiry_date" type="date" value={form.expiry_date ?? ''} onChange={handleChange} className={inputClass} />
            ) : (
              <p className={valueClass}>{member.expiry_date ?? '—'}</p>
            )}
          </div>

        </div>

        {/* Metadata */}
        <div className="border-t border-gray-800 mt-6 pt-6 grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Member Since</label>
            <p className={valueClass}>{new Date(member.created_at).toLocaleDateString()}</p>
          </div>
          <div>
            <label className={labelClass}>Last Updated</label>
            <p className={valueClass}>{new Date(member.updated_at).toLocaleDateString()}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MemberDetail