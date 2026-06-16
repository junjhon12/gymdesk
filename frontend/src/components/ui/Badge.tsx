interface BadgeProps {
  status: 'active' | 'inactive'
}

function Badge({ status }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      status === 'active'
        ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20'
        : 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20'
    }`}>
      {status === 'active' ? '● Active' : '● Inactive'}
    </span>
  )
}

export default Badge