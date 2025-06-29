import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUpSuccess() {
  const nav = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-600 text-white">
      <h1 className="text-4xl mb-4">🎉 Account Created!</h1>
      <p className="mb-8">You can now sign in to your new account.</p>
      <button
        onClick={() => nav('/sign-in')}
        className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition"
      >
        Go to Sign In
      </button>
    </div>
  )
}
