import { useState } from 'react'
import KpiCard from '../components/KpiCard'
import HBarChart from '../components/HBarChart'
import type { AKHData } from '../types'
import { BUILDING_COLORS, DEPT_COLORS } from '../constants'

interface Props { data: AKHData }

const TOP_DEPTS = ['AKH','Psychiatrie','Gynäkologie','Kardiologie','ZOP','ITS',
                   'Herzchirurgie','Neurologie','ZNA','NFR','WL-Station','ADW',
                   'Orthopädie/ MIC-Klinik','Röntgendiagnostik','Innere Medizin Allg.']

export default function PageDept({ data }: Props) {
  const [selected, setSelected] = useState('AKH')

  const dept = data.depts.find(d => d.name === selected) ?? { name: selected, rooms: 0, area: 0 }
  const rooms = data.rooms.filter(r => r.fachbereich === selected)

  const raumartMap: Record<string, number> = {}
  rooms.forEach(r => { if (r.raumart) raumartMap[r.raumart] = (raumartMap[r.raumart] ?? 0) + 1 })
  const raumartBars = Object.entries(raumartMap)
    .sort(([,a],[,b]) => b - a)
    .map(([n, v]) => ({ label: n, value: v, color: '#378ADD' }))

  const bldgMap: Record<string, number> = {}
  rooms.forEach(r => { if (r.gebaeude) bldgMap[r.gebaeude] = (bldgMap[r.gebaeude] ?? 0) + 1 })
  const bldgBars = Object.entries(bldgMap)
    .sort(([,a],[,b]) => b - a)
    .map(([n, v]) => ({ label: `Haus ${n}`, value: v, color: BUILDING_COLORS[n] ?? '#888780' }))

  const share = data.meta.totalArea > 0 ? ((dept.area / data.meta.totalArea) * 100).toFixed(1) : '–'
  const avgArea = rooms.length > 0 ? (rooms.reduce((s, r) => s + r.area, 0) / rooms.length).toFixed(1) : '–'

  return (
    <div className="flex flex-col gap-3">
      {/* Department selector */}
      <div className="panel">
        <div className="panel-title">Fachbereich auswählen</div>
        <div className="flex flex-wrap gap-1.5">
          {TOP_DEPTS.map(d => (
            <button
              key={d}
              className={`chip ${d === selected ? 'active' : ''}`}
              onClick={() => setSelected(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-2">
        <KpiCard label="Fläche" value={`${dept.area.toLocaleString('de-DE')} m²`} accent="teal" />
        <KpiCard label="Räume (Stichprobe)" value={rooms.length} accent="blue" />
        <KpiCard label="Ø Raumgröße" value={`${avgArea} m²`} />
        <KpiCard label="Anteil Gesamtfläche" value={`${share} %`} accent="amber" />
      </div>

      {/* Accent bar */}
      <div
        className="h-1 rounded-full"
        style={{ background: DEPT_COLORS[selected] ?? '#378ADD' }}
      />

      {/* Detail charts */}
      <div className="grid grid-cols-2 gap-3">
        <div className="panel">
          <div className="panel-title">🚪 Räume nach Typ</div>
          {raumartBars.length > 0
            ? <HBarChart data={raumartBars} />
            : <p className="text-xs text-slate-500">Keine Daten in Stichprobe verfügbar.</p>}
        </div>
        <div className="panel">
          <div className="panel-title">🏢 Räume je Gebäude</div>
          {bldgBars.length > 0
            ? <HBarChart data={bldgBars} />
            : <p className="text-xs text-slate-500">Keine Daten in Stichprobe verfügbar.</p>}
        </div>
      </div>

      {/* Room list */}
      {rooms.length > 0 && (
        <div className="panel">
          <div className="panel-title">📋 Räume (Stichprobe)</div>
          <div className="overflow-y-auto" style={{ maxHeight: 220 }}>
            {rooms.map((r, i) => (
              <div key={i} className="room-row">
                <div className="w-24 text-slate-400 flex-shrink-0">{r.raumnummer}</div>
                <div className="flex-1 min-w-0 truncate text-slate-300">{r.raumbezeichnung}</div>
                <div className="w-14 text-right text-slate-500">{r.area > 0 ? `${r.area} m²` : '–'}</div>
                <div className="w-6 text-right text-slate-600">{r.gebaeude}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
