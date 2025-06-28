import React from 'react'
// Update the import path below if ParticleBackground is in a different folder
import { ParticleBackground } from '../SignIn/ParticleBackground'
import SignUpForm from './SignUpForm'
import SocialSignUp from './SocialSignUp'
import { GithubIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
const SignUpPage = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-slate-900 text-white">
      <ParticleBackground />
      <main className="w-full max-w-md px-4 z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">
            Join VirtuBot and Start Your AI-Powered Journey
          </h1>
          <p className="text-slate-300 animate-fade-in-delayed">
            Experience the future of AI assistance
          </p>
        </div>
        <SignUpForm />
        <div className="text-center mt-6 animate-fade-in-delayed">
          <p className="text-slate-300 mb-4">Or sign up with</p>
          <SocialSignUp />
        </div>
        <div className="text-center mt-8 text-sm text-slate-400">
          <p className="transition-all hover:text-white">
            Already have an account?{' '}
            <a href="#" className="text-blue-400 font-medium hover:underline">
              Sign In
            </a>
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 w-full py-4 text-center text-slate-500 text-sm">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:text-white transition-colors">
            <TwitterIcon size={18} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <InstagramIcon size={18} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <GithubIcon size={18} />
          </a>
        </div>
        <p>© 2023 VirtuBot. All rights reserved.</p>
      </footer>
    </div>
  )
}
export default SignUpPage
