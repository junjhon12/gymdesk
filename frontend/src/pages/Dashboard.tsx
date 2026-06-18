import ChatBox from '../components/chat/ChatBox'

function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to GymDesk</p>
      </div>

      {/* Chat takes up remaining space */}
      <div className="flex-1 min-h-0" style={{ height: '600px' }}>
        <ChatBox />
      </div>
    </div>
  )
}

export default Dashboard