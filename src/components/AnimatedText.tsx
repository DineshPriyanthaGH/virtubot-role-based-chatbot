import React, { useEffect, useState, Fragment } from 'react'
interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])
  return (
    <span
      className={`${className} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {text}
    </span>
  )
}
interface AnimatedWordProps {
  text: string
  className?: string
  staggerDelay?: number
}
export const AnimatedWords: React.FC<AnimatedWordProps> = ({
  text,
  className = '',
  staggerDelay = 100,
}) => {
  const words = text.split(' ')
  return (
    <div className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <AnimatedText
            text={word}
            delay={index * staggerDelay}
            className="inline-block"
          />
          {index !== words.length - 1 && ' '}
        </Fragment>
      ))}
    </div>
  )
}
