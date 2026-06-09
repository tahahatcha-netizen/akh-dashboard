import ReactECharts from 'echarts-for-react'
import KpiCard from '../components/KpiCard'
import HBarChart from '../components/HBarChart'
import type { AKHData } from '../types'
import { BUILDINGS_ALL, FLOORS_ALL, FLOOR_LABEL } from '../constants'

interface Props { data: AKHData }

export default function PageSpace({ data }: Props) {
  const { floors, boden, meta } = data

  // Heatmap data matrix
  const heatmapData: Array<[number, number, number]> = []
  FLOORS_ALL.forEach((f, fi) => {
    BUILDINGS_ALL.forEach((b, bi) => {
      const entry = floors.find(r => r.gebaeude === b && String(r.etage) === f)
      heatmapData.push([bi, fi, entry?.rooms ?? 0])
    })
  })

  const max = Math.max(...heatmapData.map(d => d[2]))

  const heatmapOption = {
    tooltip: {
      formatter: (p: { data: [number, number, number] }) => {
        const b = BUILDINGS_ALL[p.data[0]]
        const f = FLOOR_LABEL[FLOORS_ALL[p.data[1]]]
        const n = p.data[2]
        return n > 0 ? `Haus ${b} · ${f}: ${n} Räume` : `Haus ${b} · ${f}: keine Daten`
      },
    },
    grid: { top: 40, bottom: 50, left: 45, right: 10 },
    xAxis: {
      type: 'category' as const,
      data: BUILDINGS_ALL.map(b => `Haus ${b}`),
      axisLabel: { color: '#64748b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#334155' } },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category' as const,
      data: FLOORS_ALL.map(f => FLOOR_LABEL[f]),
      axisLabel: { color: '#64748b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#334155' } },
      splitLine: { show: false },
    },
    visualMap: {
      min: 0, max,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: 5,
      itemHeight: 80,
      inRange: { color: ['#1e293b', '#185FA5', '#1D9E75'] },
      textStyle: { color: '#64748b', fontSize: 9 },
    },
    series: [{
      type: 'heatmap' as const,
      data: heatmapData,
      label: {
        show: true,
        formatter: (p: { data: [number, number, number] }) => p.data[2] > 0 ? String(p.data[2]) : '',
        fontSize: 9,
        color: '#cbd5e1',
      },
      itemStyle: { borderWidth: 2, borderColor: '#0f172a' },
    }],
    backgroundColor: 'transparent',
  }

  const bodenBars = boden.map(b => ({ label: b.name, value: b.count, color: '#378ADD' }))

  // Area by floor (sum across buildings)
  const etageMap: Record<string, number> = {}
  floors.forEach(f => {
    const key = FLOOR_LABEL[String(f.etage)] ?? String(f.etage)
    etageMap[key] = (etageMap[key] ?? 0) + f.area
  })
  const etageBars = FLOORS_ALL
    .map(f => ({ label: FLOOR_LABEL[f], value: Math.round(etageMap[FLOOR_LABEL[f]] ?? 0), color: '#1d9e75' }))
    .filter(b => b.value > 0)

  const avgArea = meta.totalRooms > 0 ? (meta.totalArea / meta.totalRooms).toFixed(1) : '–'

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        <KpiCard label="Ø Fläche je Raum" value={`${avgArea} m²`} accent="teal" />
        <KpiCard label="Größtes Gebäude" value="Haus C" sub="19.554 m²" accent="blue" />
        <KpiCard label="Fehlende KST-Gruppe" value="2.730" sub="80,9 % ohne Zuordnung" accent="amber" />
      </div>

      {/* Heatmap */}
      <div className="panel">
        <div className="panel-title">🌡 Heatmap — Räume je Gebäude × Etage</div>
        <ReactECharts option={heatmapOption} style={{ height: 320 }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="panel">
          <div className="panel-title">📐 Fläche je Etage (gesamt, m²)</div>
          <HBarChart data={etageBars} formatValue={v => `${v.toLocaleString('de-DE')} m²`} />
        </div>
        <div className="panel">
          <div className="panel-title">🪵 Fußbodenbelag-Verteilung</div>
          <HBarChart data={bodenBars} />
        </div>
      </div>
    </div>
  )
}
