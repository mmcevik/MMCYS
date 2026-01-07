import React from 'react'
import './Filters.css'

export default function Filters({ filters, setFilters, pageSlice, toggleSelectAll }){
  return (
    <tr className="filters-row">
      <th><label className="checkbox" title="Tümünü seç"><input className="select-all-checkbox" type="checkbox" onChange={(e)=> toggleSelectAll(e.target.checked, pageSlice)} checked={pageSlice.every(r => filters.__selectedIds ? filters.__selectedIds.has(r.id) : false) && pageSlice.length>0} /><span className="checkbox-custom" aria-hidden="true"></span></label></th>
      <th></th>
      <th>
        <div className="filter-cell"><input className="filter-input number-filter" aria-label="İleti Numarası filtresi" value={filters.number} placeholder="İleti Numarası" onChange={(e)=> setFilters(f => ({...f, number: e.target.value}))} /><button type="button" className="filter-btn" title="Temizle" aria-label="Temizle İleti Numarası" onClick={()=> setFilters(f=>({...f, number:''}))}>✖</button></div>
      </th>
      <th>
        <div className="filter-cell"><select aria-label="Type filtresi" className="filter-input type-filter" value={filters.type} onChange={(e)=> setFilters(f => ({...f, type: e.target.value}))}>
            <option value="">Tümü</option>
            <option value="sep">sep</option>
          </select>
          {filters.type ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, type:''}))} aria-label="Temizle Type">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">▾</button>}
        </div>
      </th>
      <th>
        <div className="filter-cell"><input aria-label="Kimden filtresi" className="filter-input from-filter" value={filters.from} placeholder="Kimden" onChange={(e)=> setFilters(f => ({...f, from: e.target.value}))} />{filters.from ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, from:''}))} aria-label="Temizle Kimden">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}</div>
      </th>
      <th>
        <div className="filter-cell"><input aria-label="Kime filtresi" className="filter-input to-filter" value={filters.to} placeholder="Kime" onChange={(e)=> setFilters(f => ({...f, to: e.target.value}))} />{filters.to ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, to:''}))} aria-label="Temizle Kime">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}</div>
      </th>
      <th>
        <div className="filter-cell"><input aria-label="Konu filtresi" className="filter-input subject-filter" value={filters.subject} placeholder="Konu" onChange={(e)=> setFilters(f => ({...f, subject: e.target.value}))} />{filters.subject ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, subject:''}))} aria-label="Temizle Konu">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}</div>
      </th>
      <th>
        <div className="filter-cell"><input aria-label="Barkod filtresi" className="filter-input barcode-filter" value={filters.barcode} placeholder="İleti Detay (Barkod) Numarası" onChange={(e)=> setFilters(f => ({...f, barcode: e.target.value}))} />{filters.barcode ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, barcode:''}))} aria-label="Temizle Barkod">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}</div>
      </th>
      <th>
        <div className="filter-cell"><input aria-label="Süreç filtresi" className="filter-input process-filter" value={filters.process} placeholder="Süreç" onChange={(e)=> setFilters(f => ({...f, process: e.target.value}))} />{filters.process ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, process:''}))} aria-label="Temizle Süreç">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}</div>
      </th>
      <th>
        <div className="filter-cell"><input aria-label="Aktivite filtresi" className="filter-input activity-filter" value={filters.activity} placeholder="Aktivite" onChange={(e)=> setFilters(f => ({...f, activity: e.target.value}))} />{filters.activity ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, activity:''}))} aria-label="Temizle Aktivite">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}</div>
      </th>
      <th>
        <div className="filter-cell"><input aria-label="Oluşturan Kullanıcı filtresi" className="filter-input creator-filter" value={filters.creator} placeholder="Oluşturan Kullanıcı" onChange={(e)=> setFilters(f => ({...f, creator: e.target.value}))} />{filters.creator ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, creator:''}))} aria-label="Temizle Oluşturan Kullanıcı">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}</div>
      </th>
      <th>
        <div className="filter-cell"><input aria-label="Aktivite Başlangıç Tarihi filtresi" className="filter-input activityStart-filter" value={filters.activityStart} placeholder="Aktivite Başlangıç Tarihi" onChange={(e)=> setFilters(f => ({...f, activityStart: e.target.value}))} />{filters.activityStart ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, activityStart:''}))} aria-label="Temizle Aktivite Başlangıç Tarihi">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}</div>
      </th>
      <th>
        <div className="filter-cell">
          <input aria-label="Süreç Başlangıç Tarihi filtresi" value={filters.processStart} placeholder="Süreç Başlangıç Tarihi" onChange={(e)=> setFilters(f => ({...f, processStart: e.target.value}))} />
          {filters.processStart ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, processStart:''}))} aria-label="Temizle Süreç Başlangıç Tarihi">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}
        </div>
      </th>
      <th>
        <div className="filter-cell">
          <input aria-label="Şube İsmi filtresi" value={filters.branch} placeholder="Şube İsmi" onChange={(e)=> setFilters(f => ({...f, branch: e.target.value}))} />
          {filters.branch ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, branch:''}))} aria-label="Temizle Şube İsmi">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}
        </div>
      </th>
      <th>
        <div className="filter-cell">
          <input aria-label="Bilgi filtresi" value={filters.info} placeholder="Bilgi" onChange={(e)=> setFilters(f => ({...f, info: e.target.value}))} />
          {filters.info ? <button type="button" className="filter-btn" onClick={()=> setFilters(f=>({...f, info:''}))} aria-label="Temizle Bilgi">✖</button> : <button type="button" className="filter-icon" aria-hidden="true">🔍</button>}
        </div>
      </th>
    </tr>
  )
}
