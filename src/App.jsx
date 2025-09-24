import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Auth from './pages/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import { auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <Routes>
      <Route path="/" element={<Landing user={user} onLogout={handleLogout} />} />
      <Route path="/auth" element={<Auth setUser={setUser} />} />
      <Route
        path="/protected"
        element={
          <ProtectedRoute user={user}>
            <div className="min-h-screen flex items-center justify-center">
              Protected content for {user?.email}
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
