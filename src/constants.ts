import type { OrgDomain, NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  { id: 'overview',   label: 'Executive Overview',   icon: 'grid',       section: 'Analyse'      },
  { id: 'bim',        label: 'BIM Space Explorer',   icon: 'building-2', section: 'Analyse'      },
  { id: 'org',        label: 'Org Analyse',          icon: 'git-fork',   section: 'Analyse'      },
  { id: 'space',      label: 'Space Analytics',      icon: 'layout',     section: 'Analyse'      },
  { id: 'dept',       label: 'Fachbereich Deep Dive',icon: 'stethoscope',section: 'Details'      },
  { id: 'rooms',      label: 'Room Explorer',        icon: 'door-open',  section: 'Details'      },
  { id: 'datamodel',  label: 'Datenmodell',          icon: 'database',   section: 'Infrastruktur'},
]

export const ORG_DOMAINS: OrgDomain[] = [
  {
    label: 'Kliniken & Operative Klinikfunktionen',
    shortLabel: 'Kliniken',
    color: '#185FA5',
    area: 22000,
    groups: ['Herzchirurgie','Kardiologie','Gynäkologie','Neurologie','Orthopädie',
             'Allg. Chirurgie','Psychiatrie','Geriatrie','Innere Medizin','ZNA','Urologie'],
  },
  {
    label: 'Pflege',
    shortLabel: 'Pflege',
    color: '#1D9E75',
    area: 10338,
    groups: ['Pflege Leitung','Belegungsmanagement','Sozialdienst',
             'Stationen A1–B6','Station C1','Station ZfA','Gerotopsych. TK'],
  },
  {
    label: 'Ärztliche Direktion',
    shortLabel: 'Ärztl. Dir.',
    color: '#534AB7',
    area: 4200,
    groups: ['Ärztl. Direktor','KH Hygiene','KH Therapeuten Physikofitt',
             'Therapeuten Neurologie','Therapeuten Geriatrie','Therapiezentrum Leitung'],
  },
  {
    label: 'Geschäftsbereiche',
    shortLabel: 'Geschäftsbereiche',
    color: '#BA7517',
    area: 7800,
    groups: ['Geschäftsführung u. QM','Klinisches Prozessmanagement',
             'Patientenaufnahme','Personalwesen','Betrieblicher Gesundheitsdienst',
             'Medizin Technik','Klinikmanagement','Phlebodienst'],
  },
  {
    label: 'AKH Infrastruktur',
    shortLabel: 'Infrastruktur',
    color: '#5F5E5A',
    area: 9500,
    groups: ['KH Gebäude','Gebäude ZfA','AEMP Wasserschaden',
             'ASH Services','Klinikbereiche Allg.'],
  },
  {
    label: 'Nebenbetriebe & Schulen',
    shortLabel: 'Schulen',
    color: '#993556',
    area: 4724,
    groups: ['Nebenbetriebe Friseur','Patienten Bücherei','ONK Praxis',
             'NEF Kaltenkirchen','Krankenpflegeschule','Döpfer Schulen'],
  },
]

export const BUILDING_COLORS: Record<string, string> = {
  A: '#185FA5', B: '#1D9E75', C: '#0F6E56', D: '#888780',
  E: '#BA7517', F: '#D4537E', G: '#534AB7', H: '#D85A30',
  I: '#378ADD', K: '#993556',
}

export const DEPT_COLORS: Record<string, string> = {
  'AKH':                         '#888780',
  'Psychiatrie':                 '#534AB7',
  'Gynäkologie':                 '#D4537E',
  'Kardiologie':                 '#378ADD',
  'ZOP':                         '#1D9E75',
  'ITS':                         '#E24B4A',
  'ADW':                         '#BA7517',
  'Herzchirurgie':               '#D85A30',
  'ZNA':                         '#993556',
  'Neurologie':                  '#0F6E56',
  'NFR':                         '#185FA5',
  'WL-Station':                  '#378ADD',
  'Orthopädie/ MIC-Klinik':      '#3B6D11',
  'Pflege':                      '#1D9E75',
  'Röntgendiagnostik':           '#EA580C',
}

export const KATEGORIE_COLORS: Record<string, string> = {
  'Klinik':                                         '#185FA5',
  'Patient':                                        '#1D9E75',
  'Verkehrsfläche':                                 '#888780',
  'Verwaltung':                                     '#534AB7',
  'Technikfläche/Logistik/Infrastruktur':           '#BA7517',
  'Instrumentenmanagement / Annahme Leihsysteme':   '#D85A30',
}

export const BADGE_STYLES: Record<string, string> = {
  'Klinik':       'bg-blue-950 text-blue-300',
  'Patient':      'bg-emerald-950 text-emerald-300',
  'Verkehrsfläche': 'bg-slate-800 text-slate-400',
  'Verwaltung':   'bg-purple-950 text-purple-300',
  'Technikfläche/Logistik/Infrastruktur': 'bg-amber-950 text-amber-300',
}

export const FLOORS_ALL = ['-1','0','1','2','3','4','5','6','7']
export const BUILDINGS_ALL = ['A','B','C','D','E','F','G','H','I','K']

export const FLOOR_LABEL: Record<string, string> = {
  '-1': 'UG', '0': 'EG', '1': '1.OG', '2': '2.OG', '3': '3.OG',
  '4': '4.OG', '5': '5.OG', '6': '6.OG', '7': '7.OG',
}
