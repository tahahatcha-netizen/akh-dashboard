<<<<<<< HEAD
# AKH Digital Twin Dashboard

Enterprise-grade hospital space analytics prototype for **Albertinen Krankenhaus Hamburg**.  
Built with React 18, TypeScript, Vite, Tailwind CSS and Apache ECharts.

---

## Live Preview

> After deployment: `https://<your-username>.github.io/akh-digital-twin/`

---

## Features

| Page | Description |
|------|-------------|
| Executive Overview | 6 KPIs, building & department bar charts, category donut |
| BIM Space Explorer | Floor-plan grid, building/floor selector, 3 color modes |
| Org Analyse | Domain accordion, treemap, donut chart |
| Space Analytics | Building × floor heatmap, floor area bars, flooring dist. |
| Fachbereich Deep Dive | Drillthrough by department — rooms, area, building split |
| Room Explorer | Live search + filters across 200 sample rooms |
| Datenmodell | Star schema diagram, data quality issues, DAX measures |

---

## Quick Start (local)

```bash
# 1. Clone your repo
git clone https://github.com/<YOUR_USERNAME>/akh-digital-twin.git
cd akh-digital-twin

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173/akh-digital-twin/
```

---

## Deploy to GitHub Pages (step-by-step)

### Step 1 — Create the repository

1. Go to https://github.com/new
2. Name it exactly: `akh-digital-twin`
3. Set to **Public** (required for free GitHub Pages)
4. Do NOT initialize with README (you'll push existing files)
5. Click **Create repository**

### Step 2 — Enable GitHub Pages

1. In your new repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

### Step 3 — Push the code

```bash
cd akh-digital-twin   # the folder you downloaded and unzipped

git init
git add .
git commit -m "feat: initial AKH Digital Twin dashboard"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/akh-digital-twin.git
git push -u origin main
```

Replace `<YOUR_USERNAME>` with your GitHub username.

### Step 4 — Wait for deployment (~2 min)

1. Go to your repo → **Actions** tab
2. You'll see "Deploy to GitHub Pages" running
3. Once the green ✓ appears, visit:
   `https://<YOUR_USERNAME>.github.io/akh-digital-twin/`

### Step 5 — Future updates

Any `git push` to `main` automatically rebuilds and redeploys.

```bash
# Make changes, then:
git add .
git commit -m "update: ..."
git push
```

---

## Project Structure

```
akh-digital-twin/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions CI/CD
├── src/
│   ├── components/
│   │   ├── HBarChart.tsx       ← Reusable horizontal bar chart
│   │   ├── KpiCard.tsx         ← KPI card widget
│   │   └── Sidebar.tsx         ← Navigation sidebar
│   ├── data/
│   │   └── akh_data.json       ← Real data from Logbuch_data.xlsx
│   ├── pages/
│   │   ├── PageOverview.tsx
│   │   ├── PageBIM.tsx
│   │   ├── PageOrg.tsx
│   │   ├── PageSpace.tsx
│   │   ├── PageDept.tsx
│   │   ├── PageRooms.tsx
│   │   └── PageDataModel.tsx
│   ├── App.tsx                 ← Root component + routing
│   ├── constants.ts            ← Colors, org domains, nav items
│   ├── index.css               ← Tailwind + custom classes
│   ├── main.tsx                ← React entry point
│   └── types.ts                ← TypeScript interfaces
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts              ← base: '/akh-digital-twin/'
```

---

## Customizing the Repo Name

If you name your GitHub repo something other than `akh-digital-twin`,
update **one line** in `vite.config.ts`:

```ts
base: '/YOUR_REPO_NAME/',
```

---

## Data

The dashboard uses `src/data/akh_data.json` — exported from `Logbuch_data.xlsx`.  
To refresh with new data, re-run the Python export script (see `scripts/export_data.py` if added).

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool)
- **Tailwind CSS 3** (styling)
- **Apache ECharts** via `echarts-for-react` (charts)
- **Lucide React** (icons)
- **GitHub Actions** (CI/CD)
- **GitHub Pages** (hosting)
=======
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
>>>>>>> 9e6ed5d46f0512452dcf9b5494f5727ea06e6af2
