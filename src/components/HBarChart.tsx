interface BarItem {
  label: string
  value: number
  color?: string
  unit?: string
}

interface HBarChartProps {
  data: BarItem[]
  formatValue?: (v: number) => string
  maxItems?: number
}

export default function HBarChart({ data, formatValue, maxItems = 12 }: HBarChartProps) {
  const items = data.slice(0, maxItems)
  const max = Math.max(...items.map(d => d.value), 1)

  const fmt = formatValue ?? ((v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toLocaleString('de-DE')
  )

  return (
    <div className="flex flex-col gap-0">
      {items.map((item, i) => (
        <div key={i} className="bar-row">
          <div className="bar-label" title={item.label}>{item.label}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${Math.round((item.value / max) * 100)}%`,
                background: item.color ?? '#378ADD',
              }}
            />
          </div>
          <div className="bar-value">
            {fmt(item.value)}{item.unit ?? ''}
          </div>
        </div>
      ))}
    </div>
  )
}
