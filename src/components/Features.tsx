import React, { useEffect, useState, useRef } from 'react'
import { ClockIcon, MessageSquareIcon, UserIcon, ZapIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
      },
    )
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isHovered ? 'shadow-lg scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
          isHovered ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
        }`}
      >
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      {isHovered && (
        <div className="mt-4 text-indigo-600 font-medium flex items-center">
          <span>Learn more</span>
          <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-indigo-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Discover VirtuBot's Capabilities
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Compassionate, personalized, and confidential support for your mental well-being.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ZapIcon className="w-6 h-6" />}
            title="Compassionate Guidance"
            description="VirtuBot offers empathetic and understanding support tailored to your emotional needs."
            delay={100}
          />
          <FeatureCard
            icon={<UserIcon className="w-6 h-6" />}
            title="Personalized Support"
            description="Learn from your unique experiences and receive advice that evolves with you."
            delay={300}
          />
          <FeatureCard
            icon={<ClockIcon className="w-6 h-6" />}
            title="Available 24/7"
            description="Access mental health assistance anytime, whenever you need a caring listener."
            delay={500}
          />
          <FeatureCard
            icon={<MessageSquareIcon className="w-6 h-6" />}
            title="Multi-topic Expertise"
            description="From anxiety management to lifestyle advice, VirtuBot helps you across many areas."
            delay={700}
          />
          <FeatureCard
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
            title="Confidential & Secure"
            description="Your privacy matters. All conversations are confidential and securely handled."
            delay={900}
          />
          <FeatureCard
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            }
            title="Continuous Learning"
            description="VirtuBot grows with you, improving its understanding and recommendations."
            delay={1100}
          />
        </div>
      </div>
    </section>
  )
}
