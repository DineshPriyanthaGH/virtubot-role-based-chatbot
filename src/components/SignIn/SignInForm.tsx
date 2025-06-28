import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password')
      shakeForm()
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      shakeForm()
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      shakeForm()
      return
    }
    // Here you would typically handle the actual sign-in process
    console.log('Signing in with:', {
      email,
      password,
    })
    setError('')
  }
  const shakeForm = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 600)
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div
      className={`bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700 ${isShaking ? 'animate-shake' : ''}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-transform duration-300 transform hover:scale-110"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="mb-4 text-red-400 text-sm font-medium">{error}</div>
        )}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-300"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-300">
          Don't have an account?{' '}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all duration-300"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
