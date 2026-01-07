import React from 'react'
import './Toolbar.css'

export default function Toolbar({ left, right, children }){
  return (
    <div className="table-toolbar" role="toolbar" aria-label="Tablo araçları">
      <div className="left-tools">{left}</div>
      <div className="right-tools">{right}</div>
      {children}
    </div>
  )
}
