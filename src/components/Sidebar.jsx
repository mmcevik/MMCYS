import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar(){
  const linkClass = ({ isActive }) => isActive ? 'nav-item active' : 'nav-item'

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">MYS Portal</div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={linkClass}><span className="icon">🏠</span> Anasayfa</NavLink>
        <NavLink to="/raporlar" className={linkClass}><span className="icon">📊</span> Raporlar</NavLink>
        <NavLink to="/eyp" className={linkClass}><span className="icon">⚙️</span> EYP İşlemleri</NavLink>
        <NavLink to="/basili" className={linkClass}><span className="icon">📄</span> Basılı İleti</NavLink>
        <NavLink to="/kep" className={linkClass}><span className="icon">✉️</span> KEP İleti</NavLink>
        <NavLink to="/gorevler" className={linkClass}><span className="icon">🗂️</span> Görevler</NavLink>
      </nav>
      <div className="sidebar-footer">
        <div className="company">Şirket Name</div>
        <div className="user">User Name </div>
      </div>
    </aside>
  )
}
