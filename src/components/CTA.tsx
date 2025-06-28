import React, { useEffect, useState, useRef } from 'react'
import { Button } from './Button'
import { ArrowRightIcon } from 'lucide-react'
export const CTA = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
      },
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-indigo-600"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="lg:grid lg:grid-cols-2">
            <div className="py-12 px-6 sm:px-12 lg:py-16 lg:px-16 xl:py-20 xl:px-20">
              <div className="max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Ready to experience smarter conversations?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of users who are already benefiting from
                  VirtuBot's personalized assistance. Get started today for
                  free.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                  <a href="/sign-up">
                    <Button primary className="w-full sm:w-auto text-lg group">
                      Sign up for free
                      <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <a href="/demo">
                    <Button className="w-full sm:w-auto text-lg">
                      Schedule a demo
                    </Button>
                  </a>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  No credit card required. Cancel anytime.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-500 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 text-white max-w-md">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-xl">
                        What users are saying
                      </h3>
                    </div>
                  </div>
                  <blockquote className="italic">
                    "VirtuBot has completely transformed how I manage my daily
                    tasks. The personalized assistance is like having a personal
                    assistant available 24/7!"
                  </blockquote>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                        JD
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Jane Doe</p>
                      <p className="text-sm opacity-75">Product Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
