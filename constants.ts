interface KpiCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: 'teal' | 'blue' | 'amber' | 'red' | 'purple'
}

const ACCENT_BORDER: Record<string, string> = {
  teal:   'border-l-2 border-l-akh-teal',
  blue:   'border-l-2 border-l-akh-blue',
  amber:  'border-l-2 border-l-akh-amber',
  red:    'border-l-2 border-l-akh-red',
  purple: 'border-l-2 border-l-akh-purple',
}

export default function KpiCard({ label, value, sub, accent }: KpiCardProps) {
  return (
    <div className={`kpi-card ${accent ? ACCENT_BORDER[accent] : ''}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-val">{typeof value === 'number' ? value.toLocaleString('de-DE') : value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  )
}
