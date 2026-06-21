import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/ui/Layout'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import MemberDetail from './components/dashboard/MemberDetail'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App