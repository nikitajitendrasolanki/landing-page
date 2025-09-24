import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

export default function Auth({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (u) navigate('/')
    })
    return () => unsub()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? 'Sign up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded"
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password (6+ chars)"
            className="w-full px-4 py-2 border rounded"
            type="password"
            required
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button className="w-full px-4 py-2 bg-black text-white rounded">
            {isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          <button
            onClick={() => setIsSignUp((s) => !s)}
            className="underline"
          >
            {isSignUp ? 'Have an account? Login' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}
