import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Reports from './pages/Reports'
import EypIslemleri from './pages/EypIslemleri'
import BasiliIleti from './pages/BasiliIleti'
import KepIleti from './pages/KepIleti'
import Gorevler from './pages/Gorevler/Gorevler'
import './App.css'

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/raporlar" element={<Reports />} />
        <Route path="/eyp" element={<EypIslemleri />} />
        <Route path="/basili" element={<BasiliIleti />} />
        <Route path="/kep" element={<KepIleti />} />
        <Route path="/gorevler" element={<Gorevler />} />
      </Routes>
    </Layout>
  )
}
