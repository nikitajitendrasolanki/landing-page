import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing({ user, onLogout }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl w-full p-8 bg-white rounded-2xl shadow-lg">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">CV Hackathon</h1>
          <nav className="space-x-4">
            {user ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-md border"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth" className="px-4 py-2 rounded-md border">
                Login / Sign up
              </Link>
            )}
          </nav>
        </header>

        <main>
          <h2 className="text-3xl font-semibold mb-3">
            Build your Computer Vision project — fast
          </h2>
          <p className="text-gray-600 mb-6">
            Use this starter to save time on auth and focus on model prototyping.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-2">Realtime demos</h3>
              <p className="text-sm text-gray-600">
                Hook in your ML camera demo or upload images.
              </p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-2">Team access</h3>
              <p className="text-sm text-gray-600">
                Invite teammates by sharing the project repo.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
