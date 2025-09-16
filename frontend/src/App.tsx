import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Users from './pages/Users'
import Posts from './pages/Posts'
import Profile from './pages/Profile'
import Ingredients from './pages/Ingredients'

function Nav() {
  const location = useLocation()
  return (
    <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      {[
        { to: '/', label: 'Ana Sayfa' },
        { to: '/users', label: 'Şefler' },
        { to: '/posts', label: 'Tarifler' },
        { to: '/ingredients', label: 'Malzemelerim' },
        { to: '/profile', label: 'Profil' },
      ].map((item) => (
        <Link key={item.to} to={item.to} style={{
          textDecoration: location.pathname === item.to ? 'underline' : 'none'
        }}>{item.label}</Link>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: 16 }}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}
