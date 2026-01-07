import React from 'react'
import Button from '../Button'
import './RowActions.css'

export default function RowActions({ onView, onReply, row }){
  return (
    <div className="row-actions">
      <Button size="sm" title={`Görüntüle ${row.number}`} aria-label={`Görüntüle ${row.number}`} onClick={()=> onView && onView(row)}>👁️</Button>
      <Button variant="secondary" size="sm" title={`Yanıtla ${row.number}`} aria-label={`Yanıtla ${row.number}`} onClick={()=> onReply && onReply(row)}>↩️</Button>
    </div>
  )
}
