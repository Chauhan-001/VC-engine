import React from 'react'

export default function ToolLayout({ title, children }) {
  return (
    <div style={{ padding: '22px 16px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 18, background: 'white' }}>
          {title ? (
            <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 10 }}>{title}</div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  )
}

