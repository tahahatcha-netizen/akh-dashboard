import { useState } from 'react'
import Sidebar from './components/Sidebar'
import PageOverview  from './pages/PageOverview'
import PageBIM       from './pages/PageBIM'
import PageOrg       from './pages/PageOrg'
import PageSpace     from './pages/PageSpace'
import PageDept      from './pages/PageDept'
import PageRooms     from './pages/PageRooms'
import PageDataModel from './pages/PageDataModel'
import type { PageId } from './types'
import akhData from './data/akh_data.json'

const PAGE_TITLES: Record<PageId, string> = {
  overview:  'Executive Overview',
  bim:       'BIM Space Explorer',
  org:       'Organisationsanalyse',
  space:     'Space Analytics',
  dept:      'Fachbereich Deep Dive',
  rooms:     'Room Explorer',
  datamodel: 'Datenmodell & Datenqualität',
}

export default function App() {
  const [page, setPage] = useState<PageId>('overview')

  const renderPage = () => {
    switch (page) {
      case 'overview':  return <PageOverview  data={akhData as never} />
      case 'bim':       return <PageBIM       data={akhData as never} />
      case 'org':       return <PageOrg       data={akhData as never} />
      case 'space':     return <PageSpace     data={akhData as never} />
      case 'dept':      return <PageDept      data={akhData as never} />
      case 'rooms':     return <PageRooms     data={akhData as never} />
      case 'datamodel': return <PageDataModel />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar activePage={page} onNavigate={setPage} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="h-11 px-5 flex items-center justify-between bg-slate-900 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white">{PAGE_TITLES[page]}</span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-500">Albertinen Krankenhaus Hamburg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-akh-teal" />
              3.376 Räume · 58.562 m²
            </div>
            <div className="text-xs text-slate-600 bg-slate-800 px-2 py-1 rounded-md">
              Datenstand: Logbuch_data.xlsx
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
