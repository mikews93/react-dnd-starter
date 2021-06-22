import React from 'react'

export const Col = ({ isOver, children }) => {
  const className = isOver ? 'highlight-region': ''
  return (
    <div className={`col ${className}`}>
      {children}
    </div>
  )
}
