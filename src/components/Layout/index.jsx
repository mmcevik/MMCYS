import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import './Layout.css'

export default function Layout({ children }){
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-shell">
        <Topbar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  )
}
