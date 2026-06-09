<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'akh-digital-twin' to your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/akh-digital-twin/',
})
=======
// ─── Data Model Types ───────────────────────────────────────────────────────

export interface Meta {
  totalRooms: number
  totalArea: number
  totalBuildings: number
  totalFloors: number
  totalDepts: number
  totalKST: number
}

export interface BuildingStat {
  gebaeude: string
  rooms: number
  area: number
}

export interface DeptStat {
  name: string
  rooms: number
  area: number
}

export interface KSTEntry {
  kst: number
  kst_bez: string
  rooms: number
  area: number
}

export interface KategorieStat {
  name: string
  rooms: number
  area: number
}

export interface RaumartenStat {
  name: string
  rooms: number
}

export interface FloorStat {
  gebaeude: string
  etage: number
  rooms: number
  area: number
}

export interface BodenStat {
  name: string
  count: number
}

export interface Room {
  raumnummer: string
  raumbezeichnung: string
  gebaeude: string
  etage: number
  fachbereich: string
  area: number
  kategorie: string
  raumart: string
  kst: string | number
  kst_bez: string
  gesellschaft: string
}

export interface AKHData {
  meta: Meta
  buildings: BuildingStat[]
  depts: DeptStat[]
  kst: KSTEntry[]
  kategorien: KategorieStat[]
  raumarten: RaumartenStat[]
  floors: FloorStat[]
  boden: BodenStat[]
  rooms: Room[]
}

// ─── UI / Navigation Types ──────────────────────────────────────────────────

export type PageId =
  | 'overview'
  | 'bim'
  | 'org'
  | 'space'
  | 'dept'
  | 'rooms'
  | 'datamodel'

export interface NavItem {
  id: PageId
  label: string
  icon: string
  section: string
}

// ─── Org Domain ─────────────────────────────────────────────────────────────

export interface OrgDomain {
  label: string
  shortLabel: string
  color: string
  area: number
  groups: string[]
}
>>>>>>> 9e6ed5d46f0512452dcf9b5494f5727ea06e6af2
