import React from 'react'

export default function Button({ children, variant = 'primary', ...props }) {
  const styles =
    variant === 'primary'
      ? {
          background: '#111827',
          color: 'white',
          border: '1px solid #111827',
        }
      : {
          background: 'transparent',
          color: '#111827',
          border: '1px solid #e5e7eb',
        }

  return (
    <button
      {...props}
      style={{
        padding: '10px 14px',
        borderRadius: 10,
        cursor: 'pointer',
        fontWeight: 600,
        ...styles,
        ...(props.style || {}),
      }}
    >
      {children}
    </button>
  )
}

