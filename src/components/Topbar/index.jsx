import React from 'react'
import Button from '../Button'
import './Topbar.css'

export default function Topbar(){
  return (
    <header className="topbar">
      <div className="topbar-left">
        <Button variant="danger">KEP İletisi Oluştur</Button>
        <Button variant="success">SEP İletisi Oluştur</Button>
        <Button variant="info">Giden Basılı İleti Oluştur</Button>
      </div>
      <div className="topbar-right">
        <button className="notif-btn" aria-label="Bildirimler" title="Bildirimler">🔔<span className="badge">51</span></button>
        <div className="lang" aria-hidden>TR</div>
        <div className="avatar" title="Hesap"> <div className="avatar-circle" aria-hidden>MS</div></div>
      </div>
    </header>
  )
}
