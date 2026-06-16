import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Members from './pages/Members'
import MemberDetail from './pages/MemberDetail'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App