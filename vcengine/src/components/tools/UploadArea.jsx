import React from 'react'

export default function UploadArea({ onFilesSelected }) {
  return (
    <div
      style={{
        border: '2px dashed #dbeafe',
        borderRadius: 16,
        padding: 18,
        background: '#f8fafc',
      }}
    >
      <div style={{ fontWeight: 800 }}>Upload</div>
      <div style={{ color: '#6b7280', marginTop: 6, fontSize: 14 }}>
        Drop a file here or use the file picker.
      </div>

      <input
        style={{ marginTop: 12 }}
        type="file"
        onChange={(e) => onFilesSelected?.(e.target.files)}
      />
    </div>
  )
}

