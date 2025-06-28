import React from 'react'
interface ButtonProps {
  children: React.ReactNode
  primary?: boolean
  className?: string
  onClick?: () => void
}
export const Button: React.FC<ButtonProps> = ({
  children,
  primary = false,
  className = '',
  onClick,
}) => {
  const baseClasses =
    'px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const primaryClasses =
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
  const secondaryClasses =
    'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-500'
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`
  return (
    <button className={buttonClasses} onClick={onClick}>
      <div className="flex items-center justify-center">{children}</div>
    </button>
  )
}
