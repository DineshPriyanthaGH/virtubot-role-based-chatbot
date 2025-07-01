import React, { useEffect, useState, useRef } from 'react'

interface Testimonial {
  id: number
  content: string
  name: string
  title: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      'VirtuBot’s compassionate guidance has helped me manage anxiety and stress more effectively, providing support whenever I need it.',
    name: 'Emily Carter',
    title: 'Graduate Psychology Student',
    initials: 'EC',
  },
  {
    id: 2,
    content:
      "As a therapist, I recommend VirtuBot to my clients for daily coping strategies and mental wellness check-ins.",
    name: 'Dr. Mark Thompson',
    title: 'Licensed Therapist',
    initials: 'MT',
  },
  {
    id: 3,
    content:
      'VirtuBot is a great companion for emotional support, offering personalized advice that feels both professional and empathetic.',
    name: 'Sophia Lee',
    title: 'Mental Health Advocate',
    initials: 'SL',
  },
  {
    id: 4,
    content:
      'I use VirtuBot to help maintain mindfulness throughout my day and to gain insights into managing work-related stress.',
    name: 'Jason Nguyen',
    title: 'Corporate Wellness Coach',
    initials: 'JN',
  },
  {
    id: 5,
    content:
      'The personalized conversations with VirtuBot have boosted my motivation and helped me develop healthier habits.',
    name: 'Rachel Kim',
    title: 'Health Psychology Researcher',
    initials: 'RK',
  },
]

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length,
    )
  }

  const goToTestimonial = (index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.1 },
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

  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Real experiences from people improving their mental well-being with VirtuBot.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {testimonial.initials}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-lg text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                    <blockquote className="text-lg text-gray-700 italic">"{testimonial.content}"</blockquote>
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-50 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 mx-1 rounded-full focus:outline-none ${
                  index === activeIndex ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
