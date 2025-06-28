import React, { useEffect, useState } from 'react'
import { SignInForm } from './SignInForm'
import { ParticleBackground } from './/ParticleBackground'
export function SignInPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div
        className={`z-10 w-full max-w-md px-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome Back to VirtuBot
          </h1>
          <p className="text-gray-300">Your AI assistant is waiting for you</p>
        </div>
        <SignInForm />
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Or sign in with</p>
          <div className="flex justify-center space-x-4">
            <SocialButton icon="google" />
            <SocialButton icon="facebook" />
            <SocialButton icon="twitter" />
          </div>
        </div>
      </div>
      <footer className="absolute bottom-4 text-center text-gray-500 text-sm w-full">
        <p>© 2023 VirtuBot. All rights reserved.</p>
      </footer>
    </div>
  )
}
function SocialButton({ icon }: { icon: 'google' | 'facebook' | 'twitter' }) {
  const getIcon = () => {
    switch (icon) {
      case 'google':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
          </svg>
        )
      case 'facebook':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.198,21.5h4v-8.01h3.604l0.396-3.98h-4V7.5c0-1.032,0.333-1.99,1.938-1.99h2.073V2.14c-0.436-0.058-1.936-0.184-3.49-0.184c-3.452,0-5.917,1.932-5.917,5.48v3.075H4.198v3.98h3.604V21.5z" />
          </svg>
        )
      case 'twitter':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636C20.514,6.135,21.699,4.943,22,3.999z" />
          </svg>
        )
      default:
        return null
    }
  }
  return (
    <button className="w-10 h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-colors duration-300 transform hover:scale-110">
      {getIcon()}
    </button>
  )
}
