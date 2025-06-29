// src/components/SignUp/SignUpForm.tsx
import React, { useState } from 'react'
import {
  AtSignIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
  UserIcon,
} from 'lucide-react'
import { useAuth } from '../../services/AuthProvider'
import { useNavigate } from 'react-router-dom'

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}
interface FormErrors {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [firebaseError, setFirebaseError] = useState('')

  const { signup } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFirebaseError('')
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsSubmitting(true)
    try {
      await signup(formData.email, formData.password)
      navigate('/chatpage')
    } catch (err: any) {
      setFirebaseError(err.message || 'Failed to sign up')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10"
    >
      <div className="space-y-4">
        {/* Full Name Input */}
        <div className="relative">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon size={16} className="text-slate-400" />
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`block w-full pl-10 pr-3 py-2 rounded-md bg-slate-800 border ${
                errors.fullName ? 'border-red-500' : 'border-slate-700'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1 animate-shake">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSignIcon size={16} className="text-slate-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`block w-full pl-10 pr-3 py-2 rounded-md bg-slate-800 border ${
                errors.email ? 'border-red-500' : 'border-slate-700'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 animate-shake">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`block w-full pl-3 pr-10 py-2 rounded-md bg-slate-800 border ${
                errors.password ? 'border-red-500' : 'border-slate-700'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon
                  size={16}
                  className="text-slate-400 hover:text-slate-300"
                />
              ) : (
                <EyeIcon
                  size={16}
                  className="text-slate-400 hover:text-slate-300"
                />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 animate-shake">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative group">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`block w-full pl-3 pr-10 py-2 rounded-md bg-slate-800 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-slate-700'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon
                  size={16}
                  className="text-slate-400 hover:text-slate-300"
                />
              ) : (
                <EyeIcon
                  size={16}
                  className="text-slate-400 hover:text-slate-300"
                />
              )}
            </button>
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs rounded p-2 -bottom-8 left-1/2 transform -translate-x-1/2 z-10 w-40 text-center">
              Make sure your passwords match
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 animate-shake">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {firebaseError && (
          <div className="text-red-500 text-sm font-medium mt-2 animate-shake">
            {firebaseError}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transform hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <LoaderIcon size={18} className="animate-spin mr-2" />
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
