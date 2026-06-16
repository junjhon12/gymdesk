import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Member, MemberCreate } from '../types'
import { membersApi } from '../services/api'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import AddMemberModal from '../components/members/AddMemberModal'

function Members() {
  const navigate = useNavigate()

  // 1. State
  const [members, setMembers]     = useState<Member[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  // 2. fetchMembers defined FIRST
  const fetchMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await membersApi.getAll()
      setMembers(data)
    } catch {
      setError('Failed to load members. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  // 3. useEffect AFTER
  useEffect(() => {
    const loadMembers = async () => {
      await fetchMembers()
    }
    loadMembers()
  }, [])

  // 4. Other handlers after
  const handleAddMember = async (data: MemberCreate) => {
    const newMember = await membersApi.create(data)
    setMembers(prev => [...prev, newMember])
    setShowModal(false)
  }

  // --- Render states ---

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400 animate-pulse">Loading members...</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <p className="text-red-400">{error}</p>
      <Button onClick={fetchMembers}>Retry</Button>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Members</h1>
          <p className="text-gray-400 mt-1">{members.length} total members</p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Add Member</Button>
      </div>

      {/* Empty state */}
      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4 border border-dashed border-gray-800 rounded-xl">
          <p className="text-gray-500">No members yet</p>
          <Button onClick={() => setShowModal(true)}>Add your first member</Button>
        </div>
      ) : (
        /* Members table */
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-left">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium">Last Payment</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  onClick={() => navigate(`/members/${member.id}`)}
                  className="border-b border-gray-800/50 hover:bg-gray-800/50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {member.full_name}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{member.email}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">
                    {member.membership_type}
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={member.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-400">{member.join_date}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {member.last_payment_date ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Member Modal */}
      {showModal && (
        <AddMemberModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddMember}
        />
      )}
    </div>
  )
}

export default Members