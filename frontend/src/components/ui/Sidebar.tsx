import { NavLink } from 'react-router-dom'

// NavLink is like <a> but React Router aware
// It automatically applies an active style when the route matches
const navItems = [
  { label: 'Dashboard', path: '/', icon: '📊' },
  { label: 'Members',   path: '/members', icon: '👥' },
]

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">

      {/* Logo / App name */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">🏋️ GymDesk</h1>
        <p className="text-xs text-gray-500 mt-1">Member Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-600">GymDesk - In Progress</p>
      </div>

    </aside>
  )
}

export default Sidebar