import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import type { AKHData } from '../types'
import { BADGE_STYLES } from '../constants'

interface Props { data: AKHData }

export default function PageRooms({ data }: Props) {
  const [query, setQuery] = useState('')
  const [filterGeb, setFilterGeb] = useState('')
  const [filterKat, setFilterKat] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return data.rooms.filter(r => {
      const matchQ = !q || r.raumnummer?.toLowerCase().includes(q) ||
        r.raumbezeichnung?.toLowerCase().includes(q) ||
        r.fachbereich?.toLowerCase().includes(q) ||
        String(r.kst).includes(q)
      const matchG = !filterGeb || r.gebaeude === filterGeb
      const matchK = !filterKat || r.kategorie === filterKat
      return matchQ && matchG && matchK
    })
  }, [data.rooms, query, filterGeb, filterKat])

  const buildings = [...new Set(data.rooms.map(r => r.gebaeude).filter(Boolean))].sort()
  const kategorien = [...new Set(data.rooms.map(r => r.kategorie).filter(Boolean))].sort()

  return (
    <div className="flex flex-col gap-3">
      {/* Filters */}
      <div className="panel flex gap-3 items-end">
        <div className="flex-1">
          <div className="text-xs text-slate-500 mb-1">Suche</div>
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Raumnummer, Bezeichnung, Fachbereich, KST…"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-akh-blue"
            />
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Gebäude</div>
          <select value={filterGeb} onChange={e => setFilterGeb(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200">
            <option value="">Alle</option>
            {buildings.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Kategorie</div>
          <select value={filterKat} onChange={e => setFilterKat(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200">
            <option value="">Alle</option>
            {kategorien.map(k => <option key={k}>{k}</option>)}
          </select>
        </div>
        <div className="text-xs text-slate-500 pb-1.5">{filtered.length} / {data.rooms.length} Räume</div>
      </div>

      {/* Table header */}
      <div className="panel p-0 overflow-hidden">
        <div className="grid text-xs font-medium text-slate-500 uppercase tracking-wide px-3 py-2 border-b border-slate-800"
          style={{ gridTemplateColumns: '120px 1fr 80px 60px 60px 140px' }}>
          <span>Raumnr.</span><span>Bezeichnung</span><span>Fachbereich</span>
          <span>Geb.</span><span className="text-right">m²</span><span className="text-right">Kategorie</span>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 560 }}>
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-center text-xs text-slate-600">Keine Räume gefunden.</div>
          )}
          {filtered.map((r, i) => (
            <div key={i}
              className="grid items-center px-3 py-2 border-b border-slate-800 hover:bg-slate-800 cursor-default text-xs"
              style={{ gridTemplateColumns: '120px 1fr 80px 60px 60px 140px' }}>
              <span className="text-slate-300 font-mono">{r.raumnummer}</span>
              <span className="text-slate-200 truncate pr-2">{r.raumbezeichnung || '—'}</span>
              <span className="text-slate-400 truncate">{r.fachbereich || '—'}</span>
              <span className="text-slate-500">{r.gebaeude}</span>
              <span className="text-right text-slate-400">{r.area > 0 ? r.area : '—'}</span>
              <span className="text-right">
                <span className={`badge ${BADGE_STYLES[r.kategorie] ?? 'bg-slate-800 text-slate-400'}`}>
                  {r.kategorie ? r.kategorie.split('/')[0].trim() : '—'}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
