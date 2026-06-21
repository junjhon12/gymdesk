import { useState } from 'react'
import type { MemberCreate } from '../../types'
import Button from '../ui/Button'

interface AddMemberModalProps {
  onClose: () => void
  onSubmit: (data: MemberCreate) => Promise<void>
}

function AddMemberModal({ onClose, onSubmit }: AddMemberModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const [form, setForm] = useState<MemberCreate>({
    full_name:       '',
    email:           '',
    phone:           '',
    membership_type: 'monthly',
    status:          'active',
    join_date:       new Date().toISOString().split('T')[0],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async () => {
    // Basic validation
    if (!form.full_name || !form.email || !form.join_date) {
      setError('Name, email and join date are required')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await onSubmit(form)
    } catch {
      setError('Failed to add member. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Reusable input style
  const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  const labelClass = "block text-sm font-medium text-gray-400 mb-1.5"

  return (
    /* Backdrop */
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      {/* Modal */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md">

        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Add New Member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 space-y-4">

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Jane Smith"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="555-1234"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Membership Type *</label>
            <select
              name="membership_type"
              value={form.membership_type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Join Date *</label>
            <input
              name="join_date"
              type="date"
              value={form.join_date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Last Payment Date</label>
            <input
              name="last_payment_date"
              type="date"
              value={form.last_payment_date ?? ''}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Adding...' : 'Add Member'}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default AddMemberModal