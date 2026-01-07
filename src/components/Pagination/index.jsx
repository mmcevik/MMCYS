import React from 'react'
import './Pagination.css'

export default function Pagination({ currentPage, totalPages, pageStart, pageSize, setPage, setPageSize, filteredLength }){
  return (
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
        <div className="summary">{pageStart + 1} - {Math.min(pageStart + pageSize, filteredLength)} / {filteredLength} Kayıt</div>
      </div>
    </div>
  )
}
