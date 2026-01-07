import React, { useMemo, useState } from 'react'
import Button from '../../components/Button'
import Toolbar from '../../components/Toolbar'
import RowActions from '../../components/RowActions'
import './Gorevler.css'

// Mock data generator
const makeItem = (id) => ({
  id,
  number: 633700 + id,
  type: 'sep',
  from: `"User ${id}" <user${id}@example.com>`,
  to: `"Receiver ${id}" <recv${id}@example.com>`,
  subject: `Konu örneği ${id}`,
  barcode: `${100000 + id}`,
  process: 'SEP Gelen İletiler',
  activity: 'İletilen Birim',
  creator: `"Oluşturan ${id}" <creator${id}@example.com>`,
  activityStart: `2026-01-${String((id % 28) + 1).padStart(2, '0')}`,
  processStart: `2026-01-${String(((id + 1) % 28) + 1).padStart(2, '0')}`,
  branch: `Şube ${((id % 5) + 1)}`,
  info: id % 2 === 0 ? 'Bilgi örneği A' : 'Bilgi örneği B',
})

const initialData = Array.from({ length: 51 }, (_, i) => makeItem(i + 1))

export default function Gorevler() {
  const [data] = useState(initialData)
  const [filters, setFilters] = useState({ number: '', type: '', from: '', to: '', subject: '', barcode: '', process: '', activity: '', creator: '', activityStart: '', processStart: '', branch: '', info: '' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState(new Set())

  function toggleSelectAll(checked, pageRows){
    if(checked){
      const next = new Set(selectedIds)
      pageRows.forEach(r => next.add(r.id))
      setSelectedIds(next)
    } else {
      const next = new Set(selectedIds)
      pageRows.forEach(r => next.delete(r.id))
      setSelectedIds(next)
    }
  }

  function toggleSelect(id){
    const next = new Set(selectedIds)
    if(next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  function clearFilters(){
    setFilters({ number: '', type: '', from: '', to: '', subject: '', barcode: '', process: '', activity: '', creator: '', activityStart: '', processStart: '', branch: '', info: '' })
    setPage(1)
    setSelectedIds(new Set())
  }

  const filtered = useMemo(() => {
    return data.filter((r) => {
      if (filters.number && !String(r.number).includes(filters.number)) return false
      if (filters.type && !r.type.includes(filters.type)) return false
      if (filters.from && !r.from.toLowerCase().includes(filters.from.toLowerCase())) return false
      if (filters.to && !r.to.toLowerCase().includes(filters.to.toLowerCase())) return false
      if (filters.subject && !r.subject.toLowerCase().includes(filters.subject.toLowerCase())) return false
      if (filters.barcode && !r.barcode.includes(filters.barcode)) return false
      if (filters.process && !r.process.toLowerCase().includes(filters.process.toLowerCase())) return false
      if (filters.activity && !r.activity.toLowerCase().includes(filters.activity.toLowerCase())) return false
      if (filters.creator && !r.creator.toLowerCase().includes(filters.creator.toLowerCase())) return false
      if (filters.activityStart && !r.activityStart.includes(filters.activityStart)) return false
      if (filters.processStart && !r.processStart.includes(filters.processStart)) return false
      if (filters.branch && !r.branch.toLowerCase().includes(filters.branch.toLowerCase())) return false
      if (filters.info && !r.info.toLowerCase().includes(filters.info.toLowerCase())) return false
      return true
    })
  }, [data, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * pageSize
  const pageSlice = filtered.slice(pageStart, pageStart + pageSize)

  async function handleExportXLSX() {
    // Try to dynamically import SheetJS (xlsx). If not available, fall back to CSV export
    try {
      const { default: XLSX } = await import('xlsx')
      const rowsSource = selectedIds.size > 0 ? filtered.filter(r => selectedIds.has(r.id)) : filtered
      const headers = ['İleti Numarası','Type','Kimden','Kime','Konu','İleti Detay Numarası','Süreç','Aktivite','Oluşturan Kullanıcı','Aktivite Başlangıç Tarihi','Süreç Başlangıç Tarihi','Şube İsmi','Bilgi']
      const data = [headers, ...rowsSource.map(r => [r.number, r.type, r.from, r.to, r.subject, r.barcode, r.process, r.activity, r.creator, r.activityStart, r.processStart, r.branch, r.info])]
      const ws = XLSX.utils.aoa_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Görevler')
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([wbout], { type: 'application/octet-stream' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const stamp = new Date().toISOString().slice(0,10)
      a.download = selectedIds.size > 0 ? `gorevler-selected-${stamp}.xlsx` : `gorevler-${stamp}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      // fallback to CSV
      console.warn('XLSX export failed, falling back to CSV', err)
      const headers = ['İleti Numarası','Type','Kimden','Kime','Konu','İleti Detay Numarası','Süreç','Aktivite','Oluşturan Kullanıcı','Aktivite Başlangıç Tarihi','Süreç Başlangıç Tarihi','Şube İsmi','Bilgi']
      const rowsSource = selectedIds.size > 0 ? filtered.filter(r => selectedIds.has(r.id)) : filtered
      const rows = rowsSource.map(r => [r.number, r.type, r.from, r.to, r.subject, r.barcode, r.process, r.activity, r.creator, r.activityStart, r.processStart, r.branch, r.info])
      const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const stamp = new Date().toISOString().slice(0,10)
      a.download = selectedIds.size > 0 ? `gorevler-selected-${stamp}.csv` : `gorevler-${stamp}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="gorevler-page">
      <div className="gorevler-header">
        <h2>Görevlerim</h2>
        <div className="gorevler-actions">
          {selectedIds.size > 0 && <div className="selected-count" aria-live="polite">{selectedIds.size} seçildi</div>}
        </div>
      </div>

      <div className="gorevler-table-wrap">
        <Toolbar
          left={(
            <>
              <Button variant="success" onClick={handleExportXLSX} disabled={filtered.length===0} aria-label="Excel'e Aktar">📥 Excel'e Aktar {selectedIds.size > 0 && <span className="export-badge">{selectedIds.size}</span>}</Button>
              <Button variant="secondary" onClick={clearFilters} aria-label="Yenile">🔄 Yenile</Button>
              <Button variant="secondary" onClick={clearFilters} aria-label="Filtreleri temizle">🧹 Filtreleri Temizle</Button>
              <span className="toolbar-note">Seçili varsa sadece seçililer dışa aktarılır</span>
            </>
          )}
          right={(
            <Button variant="secondary" size="sm" onClick={()=> alert(`Seçili: ${selectedIds.size} kayıt`)} disabled={selectedIds.size===0} aria-label="Toplu İşlem">✓ Toplu İşlem</Button>
          )}
        />

        <table className="gorevler-table" role="table" aria-label="Görevler Tablosu">
          <thead>
            <tr className="header-row">
              <th style={{width: '48px'}}></th>
              <th scope="col" style={{width: '120px'}}>İşlemler</th>
              <th scope="col">İleti Numarası</th>
              <th scope="col">Type</th>
              <th scope="col">Kimden</th>
              <th scope="col">Kime</th>
              <th scope="col">Konu</th>
              <th scope="col">İleti Detay</th>
              <th scope="col">Süreç</th>
              <th scope="col">Aktivite</th>
              <th scope="col">Oluşturan Kullanıcı</th>
              <th scope="col">Aktivite Başlangıç Tarihi</th>
              <th scope="col">Süreç Başlangıç Tarihi</th>
              <th scope="col">Şube İsmi</th>
              <th scope="col">Bilgi</th>
            </tr>

            <tr className="filters-row">
              <th><label className="checkbox" title="Tümünü seç"><input className="select-all-checkbox" type="checkbox" onChange={(e)=> toggleSelectAll(e.target.checked, pageSlice)} checked={pageSlice.every(r => selectedIds.has(r.id)) && pageSlice.length>0} /><span className="checkbox-custom" aria-hidden="true"></span></label></th>
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
          </thead>
          <tbody>
            {pageSlice.map(row => (
              <tr key={row.id}>
                <td><label className="checkbox" title={`Seç ${row.number}`}><input className="row-checkbox" type="checkbox" checked={selectedIds.has(row.id)} onChange={()=> toggleSelect(row.id)} /><span className="checkbox-custom" aria-hidden="true"></span></label></td> 
                <td className="actions" role="group" aria-label="Satır işlemleri">
                  <RowActions row={row} onView={(r)=> alert(`Görüntüle ${r.number}`)} onReply={(r)=> alert(`Yanıtla ${r.number}`)} />
                </td>
                <td>{row.number}</td>
                <td>{row.type}</td>
                <td className="mono" title={row.from}><div className="mono-compact">{row.from}</div></td>
                <td className="mono" title={row.to}><div className="mono-compact">{row.to}</div></td>
                <td title={row.subject}>{row.subject}</td>
                <td>{row.barcode}</td>
                <td>{row.process}</td>
                <td>{row.activity}</td>
                <td className="mono" title={row.creator}><div className="mono-compact">{row.creator}</div></td>
                <td>{row.activityStart}</td>
                <td>{row.processStart}</td>
                <td>{row.branch}</td>
                <td>{row.info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gorevler-footer">
        <div className="pagination-left">
          <button onClick={() => setPage(1)} disabled={currentPage===1}>{'|<'}</button>
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={currentPage===1}>{'<'}</button>
          <span>Sayfa</span>
          <input className="page-input" type="number" min={1} max={totalPages} aria-label="Sayfa numarası" value={currentPage} onChange={(e)=> setPage(Math.max(1, Math.min(totalPages, Number(e.target.value) || 1)))} />
          <span>/ {totalPages}</span> 
          <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={currentPage===totalPages}>{'>'}</button>
          <button onClick={() => setPage(totalPages)} disabled={currentPage===totalPages}>{'>|'}</button>
        </div>

        <div className="pagination-right">
          <label>Sayfa başına görüntülenecek kayıt sayısı</label>
          <select aria-label="Sayfa başına kayıt sayısı" value={pageSize} onChange={(e)=>{ setPageSize(Number(e.target.value)); setPage(1); }}>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <div className="summary">{pageStart + 1} - {Math.min(pageStart + pageSize, filtered.length)} / {filtered.length} Kayıt</div>
        </div>
      </div>
    </div>
  )
}
