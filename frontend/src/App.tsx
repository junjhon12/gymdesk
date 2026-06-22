import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/ui/Layout'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import MemberDetail from './components/dashboard/MemberDetail'
import Finance from './pages/Finance'
import Operations from './pages/Operations'
import Staff from './pages/Staff'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberDetail />} />
          <Route path="/Finance" element={<Finance />}/>
          <Route path="/Operations" element={<Operations/>}/>
          <Route path="/Staff" element={<Staff/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App