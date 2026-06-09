import ReactECharts from 'echarts-for-react'
import KpiCard from '../components/KpiCard'
import HBarChart from '../components/HBarChart'
import type { AKHData } from '../types'
import { BUILDING_COLORS, DEPT_COLORS, KATEGORIE_COLORS } from '../constants'

interface Props { data: AKHData }

export default function PageOverview({ data }: Props) {
  const { meta, buildings, depts, kategorien, raumarten } = data

  const bldgBars = buildings
    .filter(b => b.area > 0)
    .sort((a, b) => b.area - a.area)
    .map(b => ({ label: `Haus ${b.gebaeude}`, value: b.area, color: BUILDING_COLORS[b.gebaeude] }))

  const deptBars = depts
    .slice(0, 10)
    .map(d => ({ label: d.name, value: d.area, color: DEPT_COLORS[d.name] ?? '#888780' }))

  const raumartBars = raumarten
    .slice(0, 8)
    .map(r => ({ label: r.name, value: r.rooms, color: '#378ADD' }))

  const katPie = {
    tooltip: { trigger: 'item' as const, formatter: '{b}: {c} ({d}%)' },
    legend: { show: false },
    series: [{
      type: 'pie' as const,
      radius: ['40%', '70%'],
      data: kategorien.map(k => ({
        name: k.name,
        value: k.rooms,
        itemStyle: { color: KATEGORIE_COLORS[k.name] ?? '#888780' },
      })),
      label: { show: true, fontSize: 10, color: '#94a3b8',
               formatter: (p: { name: string; percent: number }) =>
                 `${p.name.split('/')[0]}\n${p.percent.toFixed(0)}%` },
    }],
    backgroundColor: 'transparent',
  }

  return (
    <div className="flex flex-col gap-3">
      {/* KPIs */}
      <div className="grid grid-cols-6 gap-2">
        <KpiCard label="Gesamtfläche" value={`${(meta.totalArea / 1000).toFixed(1)}k m²`} sub="58.562 m²" accent="teal" />
        <KpiCard label="Räume" value={meta.totalRooms.toLocaleString('de-DE')} sub="Raumeinheiten" accent="blue" />
        <KpiCard label="Gebäude" value={meta.totalBuildings} sub="Haus A–K" />
        <KpiCard label="Etagen" value={meta.totalFloors} sub="UG–7.OG" />
        <KpiCard label="Fachbereiche" value={meta.totalDepts} sub="Org.-Einheiten" accent="amber" />
        <KpiCard label="Kostenstellen" value={meta.totalKST} sub="KST aktiv" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="panel">
          <div className="panel-title">🏢 Fläche je Gebäude (m²)</div>
          <HBarChart data={bldgBars} formatValue={v => `${v.toLocaleString('de-DE')} m²`} />
        </div>
        <div className="panel">
          <div className="panel-title">🏥 Top-Fachbereiche nach Fläche</div>
          <HBarChart data={deptBars} formatValue={v => `${v.toLocaleString('de-DE')} m²`} />
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="panel">
          <div className="panel-title">🗂 Raumkategorien</div>
          <ReactECharts option={katPie} style={{ height: 200 }} />
        </div>
        <div className="panel">
          <div className="panel-title">📋 Häufigste Raumarten</div>
          <HBarChart data={raumartBars} />
        </div>
      </div>
    </div>
  )
}
