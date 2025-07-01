import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import { AnimatedWords } from './AnimatedText'
import { ArrowRightIcon, MessageCircleIcon } from 'lucide-react'

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <div
            className={`inline-block mb-6 p-2 px-4 bg-indigo-100 rounded-full text-indigo-700 transition-all duration-1000 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center space-x-2">
              <MessageCircleIcon className="w-5 h-5" />
              <span className="font-medium">
                Introducing VirtuBot-Psychology Counselor
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <AnimatedWords
              text="Welcome to Your Personalized Assistant"
              staggerDelay={150}
            />
            <div className="mt-2 text-indigo-600">
              <AnimatedWords
                text="Connect with a Smart Chatbot"
                staggerDelay={150}
                className="inline-block"
              />
            </div>
          </h1>
          <p
            className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 opacity-0 animate-fade-in"
            style={{
              animationDelay: '0.8s',
              animationFillMode: 'forwards',
            }}
          >
            Talk to VirtuBot, your AI health psychology counselor. Get personalized advice, compassionate guidance, and explore mental wellness resources. Available whenever you need support or just someone to listen.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in"
            style={{
              animationDelay: '1s',
              animationFillMode: 'forwards',
            }}
          >
            <a href="/sign-in">
              <Button
                primary
                className="flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                Get Started
                <ArrowRightIcon className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Button className="text-lg px-8 py-4">Learn More</Button>
          </div>
        </div>
        <div
          className="mt-16 opacity-0 animate-fade-in"
          style={{
            animationDelay: '1.2s',
            animationFillMode: 'forwards',
          }}
        >
          <div className="relative mx-auto max-w-3xl">
            <div className="bg-white rounded-2xl shadow-xl p-2 border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                      V
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-gray-800">
                        How can VirtuBot assist you today?
                      </p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <div className="chat-bubble-typing inline-flex items-center space-x-1 bg-indigo-100 p-2 rounded-lg">
                        <div
                          className="dot w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                          style={{
                            animationDelay: '0s',
                          }}
                        ></div>
                        <div
                          className="dot w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                          style={{
                            animationDelay: '0.2s',
                          }}
                        ></div>
                        <div
                          className="dot w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                          style={{
                            animationDelay: '0.4s',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-full border border-gray-300 px-4 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Type your message..."
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-700">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full opacity-70 animate-pulse"></div>
            <div
              className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-full opacity-70 animate-pulse"
              style={{
                animationDelay: '1s',
              }}
            ></div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
