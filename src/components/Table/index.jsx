import React from 'react'
import './Table.css'

export default function Table({ className = '', role = 'table', ariaLabel = '', children }){
  return (
    <div className="table-container">
      <table className={`app-table ${className}`} role={role} aria-label={ariaLabel}>
        {children}
      </table>
    </div>
  )
}
