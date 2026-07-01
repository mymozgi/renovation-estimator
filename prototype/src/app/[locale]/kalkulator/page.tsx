'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { CalcWizardLayout } from '@/components/CalcWizardLayout'
import { Check, Plus, Pencil, Trash2 } from 'lucide-react'
import type { PDFData } from '@/lib/kosztorys-types'

const BuyPDFButton = dynamic(() => import('@/components/BuyPDFButton'), { ssr: false })

/* ─── Types ─────────────────────────────────────────────────────────────── */
type CalcType = 'wykończenie' | 'remont-generalny' | 'rynek-wtorny'
type City = 'warszawa' | 'krakow' | 'gdansk' | 'poznan' | 'wroclaw' | 'lodz'
type Standard = 'ekonomiczny' | 'optymalny' | 'premium'
type PropType = 'mieszkanie' | 'dom'
type RoomType = 'salon' | 'sypialnia' | 'kuchnia' | 'lazienka' | 'wc' | 'gabinet' | 'przedpokoj' | 'pokoj'
type Phase = 'setup' | 'rooms' | 'room-edit' | 'estimate'
type SetupStep = 'city' | 'property-type' | 'area' | 'standard' | 'conditions' | 'rynek-info'

interface Room {
  id: string; type: RoomType | null; label: string
  width: number; length: number; height: number; windows: number; doors: number
  walls: string | null; floor: string | null; ceiling: string | null
}
interface Conds {
  electrical: boolean; plumbing: boolean; wallDemo: boolean
  newWalls: boolean; ceilingReplace: boolean; floorRemoval: boolean
}
interface RynekInfo {
  age: string | null; finish: string | null
  windows: boolean; doors: boolean; heating: boolean; plaster: boolean
}
interface FS {
  calcType: CalcType | null; city: City | null; propType: PropType | null
  area: number; standard: Standard | null
  conds: Conds; rynek: RynekInfo; rooms: Room[]
  phase: Phase; ss: number; erid: string | null; res: number
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function getSetupSteps(ct: CalcType | null): SetupStep[] {
  const base: SetupStep[] = ['city', 'property-type', 'area', 'standard']
  if (ct === 'remont-generalny') return [...base, 'conditions']
  if (ct === 'rynek-wtorny') return [...base, 'rynek-info']
  return base
}

const CITY_M: Record<City, number> = { warszawa: 1.25, krakow: 1.10, gdansk: 1.05, poznan: 1.0, wroclaw: 1.08, lodz: 0.92 }
const STD_M: Record<Standard, number> = { ekonomiczny: 0.75, optymalny: 1.0, premium: 1.45 }

function calcEst(f: FS) {
  const m2 = f.rooms.reduce((s, r) => s + r.width * r.length, 0) || f.area
  const extras = f.calcType === 'remont-generalny'
    ? Object.values(f.conds).filter(Boolean).length * 0.08
    : f.calcType === 'rynek-wtorny'
    ? [f.rynek.windows, f.rynek.doors, f.rynek.heating, f.rynek.plaster].filter(Boolean).length * 0.06
    : 0
  const base = m2 * 2200 * (CITY_M[f.city!] ?? 1) * (STD_M[f.standard!] ?? 1) * (1 + extras)
  const r = (v: number, s: number) => Math.round(v / s) * s
  return { m2, min: r(base * 0.9, 500), max: r(base * 1.1, 500), mat: r(base * 0.55, 100), labor: r(base * 0.35, 100), prep: r(base * 0.10, 100) }
}

const fmt = (n: number) => n.toLocaleString('pl-PL')
const newRoom = (): Room => ({ id: Date.now().toString(), type: null, label: '', width: 4, length: 5, height: 2.6, windows: 1, doors: 1, walls: null, floor: null, ceiling: null })
const isDone = (r: Room) => r.type !== null && r.walls !== null && r.floor !== null && r.ceiling !== null

/* ─── Shared atoms ───────────────────────────────────────────────────────── */
function Radio({ checked, label, desc, onClick }: { checked: boolean; label: string; desc?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-colors w-full ${checked ? 'border-primary bg-primary-fixed/20' : 'border-border bg-surface hover:border-primary/40'}`}>
      <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${checked ? 'border-primary bg-primary' : 'border-border'}`}>
        {checked && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <div>
        <div className="font-semibold text-fg text-sm mb-0.5">{label}</div>
        {desc && <div className="text-muted text-xs leading-relaxed">{desc}</div>}
      </div>
    </button>
  )
}

function Chk({ checked, label, desc, onToggle }: { checked: boolean; label: string; desc?: string; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-colors w-full ${checked ? 'border-primary bg-primary-fixed/20' : 'border-border bg-surface hover:border-primary/40'}`}>
      <div className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center ${checked ? 'border-primary bg-primary' : 'border-border'}`}>
        {checked && <Check size={11} className="text-white" />}
      </div>
      <div>
        <div className="font-semibold text-fg text-sm mb-0.5">{label}</div>
        {desc && <div className="text-muted text-xs leading-relaxed">{desc}</div>}
      </div>
    </button>
  )
}

function FinishCard({ selected, label, desc, img, onClick }: { selected: boolean; label: string; desc: string; img: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-2xl border-2 text-left transition-all overflow-hidden ${selected ? 'border-primary' : 'border-border bg-surface hover:border-primary/40'}`}>
      <div className="relative aspect-video w-full">
        <Image src={img} alt={label} fill className="object-cover" />
      </div>
      <div className={`p-4 ${selected ? 'bg-primary-fixed/20' : ''}`}>
        <div className="font-semibold text-fg text-sm mb-0.5">{label}</div>
        <div className="text-muted text-xs">{desc}</div>
      </div>
    </button>
  )
}

/* ─── Main component ────────────────────────────────────────────────────── */
export default function KalkulatorPage() {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()
  const t = useTranslations('calc')

  /* ── Static data (locale-aware) ── */
  const CITIES: { id: City; icon: string }[] = [
    { id: 'warszawa', icon: '/icons/corporate_fare.svg' },
    { id: 'krakow',   icon: '/icons/castle.svg'         },
    { id: 'gdansk',   icon: '/icons/anchor.svg'         },
    { id: 'poznan',   icon: '/icons/real_estate_agent.svg' },
    { id: 'wroclaw',  icon: '/icons/houseboat.svg'      },
    { id: 'lodz',     icon: '/icons/factory.svg'        },
  ]

  const CALC_TYPES: { id: CalcType; label: string; desc: string; img: string }[] = [
    { id: 'wykończenie',      label: t('calcTypeWykonczenieLabel'),    desc: t('calcTypeWykonczenieDesc'),    img: '/images/developer.jpg'       },
    { id: 'rynek-wtorny',     label: t('calcTypeRynekWtoryLabel'),     desc: t('calcTypeRynekWtoryDesc'),     img: '/images/resale_property.jpg' },
    { id: 'remont-generalny', label: t('calcTypeRemontGeneralnyLabel'), desc: t('calcTypeRemontGeneralnyDesc'), img: '/images/general.jpg'         },
  ]

  const STANDARDS: { id: Standard; label: string; desc: string; img: string }[] = [
    { id: 'ekonomiczny', label: t('standardEkonomicznyLabel'), desc: t('standardEkonomicznyDesc'), img: '/images/economy.jpg'   },
    { id: 'optymalny',   label: t('standardOptymalnyLabel'),   desc: t('standardOptymalnyDesc'),   img: '/images/srandard.jpg'  },
    { id: 'premium',     label: t('standardPremiumLabel'),     desc: t('standardPremiumDesc'),     img: '/images/premium.jpg'   },
  ]

  const PROP_TYPES: { id: PropType; label: string; desc: string; img: string }[] = [
    { id: 'mieszkanie', label: t('propMieszkanieLabel'), desc: t('propMieszkanieDesc'), img: '/images/flat.jpg'  },
    { id: 'dom',        label: t('propDomLabel'),        desc: t('propDomDesc'),        img: '/images/house.jpg' },
  ]

  const ROOM_TYPES: { id: RoomType; label: string; icon: string }[] = [
    { id: 'salon',      label: t('roomSalon'),      icon: '/icons/sports_bar.svg'    },
    { id: 'sypialnia',  label: t('roomSypialnia'),  icon: '/icons/bed.svg'           },
    { id: 'kuchnia',    label: t('roomKuchnia'),    icon: '/icons/soup_kitchen.svg'  },
    { id: 'lazienka',   label: t('roomLazienka'),   icon: '/icons/shower.svg'        },
    { id: 'wc',         label: t('roomWc'),         icon: '/icons/door_back.svg'     },
    { id: 'gabinet',    label: t('roomGabinet'),    icon: '/icons/desktop_mac.svg'   },
    { id: 'przedpokoj', label: t('roomPrzedpokoj'), icon: '/icons/meeting_room.svg'  },
    { id: 'pokoj',      label: t('roomPokoj'),      icon: '/icons/home_work.svg'     },
  ]

  const WALL_FINISHES: { id: string; label: string; desc: string; img: string }[] = [
    { id: 'farba',  label: t('wallFarbaLabel'),  desc: t('wallFarbaDesc'),  img: '/images/paint.jpg'              },
    { id: 'tapeta', label: t('wallTapetaLabel'), desc: t('wallTapetaDesc'), img: '/images/wallpaper.jpg'          },
    { id: 'tynk',   label: t('wallTynkLabel'),   desc: t('wallTynkDesc'),   img: '/images/decorative_plaster.jpg' },
    { id: 'plytki', label: t('wallPlytkiLabel'), desc: t('wallPlytkiDesc'), img: '/images/tile.jpg'               },
  ]

  const FLOOR_FINISHES: { id: string; label: string; desc: string; img: string }[] = [
    { id: 'panele',   label: t('floorPaneleLabel'), desc: t('floorPaneleDesc'), img: '/images/laminate_flooring.jpg' },
    { id: 'deska',    label: t('floorDeskaLabel'),  desc: t('floorDeskaDesc'),  img: '/images/vinyl_flooring.jpg'   },
    { id: 'plytki-p', label: t('floorPlytkiLabel'), desc: t('floorPlytkiDesc'), img: '/images/tile.jpg'             },
    { id: 'wykl',     label: t('floorWyklLabel'),   desc: t('floorWyklDesc'),   img: '/images/vinyl_flooring.jpg'   },
  ]

  const CEILING_FINISHES: { id: string; label: string; desc: string; img: string }[] = [
    { id: 'farba-s', label: t('ceilingFarbaLabel'), desc: t('ceilingFarbaDesc'), img: '/images/ceiling_painting.jpg' },
    { id: 'gladz',   label: t('ceilingGladzLabel'), desc: t('ceilingGladzDesc'), img: '/images/ceiling_painting.jpg' },
    { id: 'pod',     label: t('ceilingPodLabel'),   desc: t('ceilingPodDesc'),   img: '/images/drywall_ceiling.jpg'  },
  ]

  const COND_ITEMS: { key: keyof Conds; label: string; desc: string }[] = [
    { key: 'electrical',     label: t('condElectricalLabel'),     desc: t('condElectricalDesc')     },
    { key: 'plumbing',       label: t('condPlumbingLabel'),       desc: t('condPlumbingDesc')       },
    { key: 'wallDemo',       label: t('condWallDemoLabel'),       desc: t('condWallDemoDesc')       },
    { key: 'newWalls',       label: t('condNewWallsLabel'),       desc: t('condNewWallsDesc')       },
    { key: 'ceilingReplace', label: t('condCeilingReplaceLabel'), desc: t('condCeilingReplaceDesc') },
    { key: 'floorRemoval',   label: t('condFloorRemovalLabel'),   desc: t('condFloorRemovalDesc')   },
  ]

  const AGE_OPTS = [
    { id: '<10',   label: t('ageLt10') },
    { id: '10-30', label: t('ageMid')  },
    { id: '>30',   label: t('ageGt30') },
  ]

  const FINISH_OPTS = [
    { id: 'good', label: t('finishGoodLabel'), desc: t('finishGoodDesc') },
    { id: 'avg',  label: t('finishAvgLabel'),  desc: t('finishAvgDesc')  },
    { id: 'bad',  label: t('finishBadLabel'),  desc: t('finishBadDesc')  },
  ]

  const RYNEK_REPLACE: { key: 'windows' | 'doors' | 'heating' | 'plaster'; label: string }[] = [
    { key: 'windows', label: t('rynekWindows') },
    { key: 'doors',   label: t('rynekDoors')   },
    { key: 'heating', label: t('rynekHeating') },
    { key: 'plaster', label: t('rynekPlaster') },
  ]

  const DIM_SLIDERS: { key: 'width' | 'length' | 'height'; label: string; min: number; max: number }[] = [
    { key: 'width',  label: t('dimWidthLabel'),  min: 1, max: 15 },
    { key: 'length', label: t('dimLengthLabel'), min: 1, max: 20 },
    { key: 'height', label: t('dimHeightLabel'), min: 2, max: 5  },
  ]

  const ROOM_EDIT_LABELS = [
    t('editStepTyp'),
    t('editStepWymiary'),
    t('editStepSciany'),
    t('editStepPodloga'),
    t('editStepSufit'),
  ] as const

  /* ── State ── */
  const [f, setF] = useState<FS>({
    calcType: null, city: null, propType: null, area: 65, standard: null,
    conds: { electrical: false, plumbing: false, wallDemo: false, newWalls: false, ceilingReplace: false, floorRemoval: false },
    rynek: { age: null, finish: null, windows: false, doors: false, heating: false, plaster: false },
    rooms: [], phase: 'setup', ss: -1, erid: null, res: 0,
  })

  const upd = useCallback((patch: Partial<FS>) => setF(p => ({ ...p, ...patch })), [])
  const updRoom = useCallback((id: string, patch: Partial<Room>) =>
    setF(p => ({ ...p, rooms: p.rooms.map(r => r.id === id ? { ...r, ...patch } : r) })), [])

  function getDisplayLabel(room: Room, allRooms: Room[]): string {
    if (!room.type) return room.label
    const baseName = ROOM_TYPES.find(rt => rt.id === room.type)?.label ?? room.label
    const sameType = allRooms.filter(r => r.type === room.type)
    if (sameType.length === 1) return baseName
    const idx = sameType.findIndex(r => r.id === room.id) + 1
    return `${baseName} ${idx}`
  }

  function getRoomCountLabel(count: number): string {
    if (count === 1) return `${count} ${t('roomSingular')}`
    if (count < 5) return `${count} ${t('roomFew')}`
    return `${count} ${t('roomMany')}`
  }

  const sSteps = getSetupSteps(f.calcType)
  const curSS = sSteps[f.ss] as SetupStep | undefined
  const er = f.rooms.find(r => r.id === f.erid) ?? null

  const progress = f.phase === 'setup'
    ? f.ss < 0 ? 5 : Math.round(((f.ss + 1) / (sSteps.length + 2)) * 55)
    : f.phase === 'rooms' ? 65
    : f.phase === 'room-edit' ? 65 + f.res * 5
    : 100

  const stepLabel = f.phase === 'setup'
    ? f.ss < 0
      ? t('stepStart')
      : t('stepLabel', { current: f.ss + 1, total: sSteps.length })
    : f.phase === 'rooms'
    ? t('stepRooms')
    : f.phase === 'room-edit'
    ? ROOM_EDIT_LABELS[f.res] ?? t('stepRooms')
    : t('estTitle')

  function back() {
    if (f.phase === 'room-edit') {
      if (f.res > 0) { upd({ res: f.res - 1 }); return }
      const room = f.rooms.find(r => r.id === f.erid)
      if (room && !isDone(room)) {
        setF(p => ({ ...p, rooms: p.rooms.filter(r => r.id !== f.erid), phase: 'rooms', erid: null }))
      } else {
        upd({ phase: 'rooms', erid: null })
      }
      return
    }
    if (f.phase === 'rooms') { upd({ phase: 'setup', ss: sSteps.length - 1 }); return }
    if (f.phase === 'estimate') { upd({ phase: 'rooms' }); return }
    if (f.ss <= 0) upd({ ss: -1 })
    else upd({ ss: f.ss - 1 })
  }

  function nextSetup() {
    if (f.ss < sSteps.length - 1) upd({ ss: f.ss + 1 })
    else upd({ phase: 'rooms' })
  }

  function addRoom() {
    const r = newRoom()
    setF(p => ({ ...p, rooms: [...p.rooms, r], erid: r.id, res: 0, phase: 'room-edit' }))
  }

  function nextRoomStep() {
    if (f.res < 4) upd({ res: f.res + 1 })
    else upd({ phase: 'rooms', erid: null })
  }

  /* ══ Flow select ══ */
  if (f.phase === 'setup' && f.ss < 0) {
    return (
      <CalcWizardLayout stepLabel={t('stepStart')} progress={5} onBack={() => router.push(`/${locale}`)} showBack={false} hideFooterNav>
        <h2 className="font-bold text-fg text-3xl md:text-4xl text-center mb-2">{t('startTitle')}</h2>
        <p className="text-muted text-base text-center mb-10">{t('startSubtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CALC_TYPES.map(ct => (
            <button key={ct.id} onClick={() => upd({ calcType: ct.id, ss: 0 })}
              className="flex flex-col rounded-2xl overflow-hidden border-2 border-border bg-surface hover:border-primary transition-colors text-left">
              <div className="relative aspect-[4/3] w-full">
                <Image src={ct.img} alt={ct.label} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-fg text-base mb-1">{ct.label}</h3>
                <p className="text-muted text-xs leading-relaxed">{ct.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </CalcWizardLayout>
    )
  }

  /* ══ City ══ */
  if (f.phase === 'setup' && curSS === 'city') {
    return (
      <CalcWizardLayout stepLabel={stepLabel} progress={progress} onBack={back} onNext={() => f.city && nextSetup()} nextDisabled={!f.city}>
        <h2 className="font-bold text-fg text-4xl text-center mb-3">{t('cityTitle')}</h2>
        <p className="text-muted text-base text-center mb-10">{t('citySubtitle')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CITIES.map(({ id, icon }) => (
            <button key={id} onClick={() => upd({ city: id })}
              className={`flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border-2 transition-colors ${f.city === id ? 'border-primary bg-primary-fixed/20' : 'border-border bg-surface hover:border-primary/40'}`}>
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center">
                <Image src={icon} alt={id} width={28} height={28} style={{ filter: 'invert(20%) sepia(60%) saturate(400%) hue-rotate(115deg)' }} />
              </div>
              <span className="font-medium text-fg text-sm capitalize">{id === 'lodz' ? 'Łódź' : id.charAt(0).toUpperCase() + id.slice(1)}</span>
            </button>
          ))}
        </div>
      </CalcWizardLayout>
    )
  }

  /* ══ Property type ══ */
  if (f.phase === 'setup' && curSS === 'property-type') {
    return (
      <CalcWizardLayout stepLabel={stepLabel} progress={progress} onBack={back} onNext={() => f.propType && nextSetup()} nextDisabled={!f.propType}>
        <h2 className="font-bold text-fg text-4xl text-center mb-3">{t('propTypeTitle')}</h2>
        <p className="text-muted text-base text-center mb-10">{t('propTypeSubtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROP_TYPES.map(pt => (
            <button key={pt.id} onClick={() => upd({ propType: pt.id })}
              className={`flex flex-col rounded-2xl overflow-hidden border-2 text-left transition-colors ${f.propType === pt.id ? 'border-primary' : 'border-border bg-surface hover:border-primary/40'}`}>
              <div className="relative aspect-[4/3] w-full">
                <Image src={pt.img} alt={pt.label} fill className="object-cover" />
              </div>
              <div className={`p-4 ${f.propType === pt.id ? 'bg-primary-fixed/20' : 'bg-surface'}`}>
                <h3 className="font-semibold text-fg text-base mb-1">{pt.label}</h3>
                <p className="text-muted text-xs">{pt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </CalcWizardLayout>
    )
  }

  /* ══ Area ══ */
  if (f.phase === 'setup' && curSS === 'area') {
    return (
      <CalcWizardLayout stepLabel={stepLabel} progress={progress} onBack={back} onNext={nextSetup}>
        <h2 className="font-bold text-fg text-4xl text-center mb-3">{t('areaTitle')}</h2>
        <p className="text-muted text-base text-center mb-10">{t('areaSubtitle')}</p>
        <div className="bg-surface border border-border rounded-2xl p-8 max-w-md mx-auto">
          <div className="flex items-baseline justify-center gap-1.5 mb-1">
            <input
              type="number"
              min={10}
              max={9999}
              step={1}
              value={f.area}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v > 0) upd({ area: v })
              }}
              onBlur={() => {
                if (f.area < 10) upd({ area: 10 })
                if (f.area > 9999) upd({ area: 9999 })
              }}
              className="font-bold text-fg text-6xl w-40 text-center bg-transparent outline-none border-b-2 border-transparent focus:border-primary transition-colors"
            />
            <span className="text-muted text-2xl">m²</span>
          </div>
          <p className="text-center text-xs text-muted/60 mb-8">{t('areaHint')}</p>
          <input
            type="range"
            min={10}
            max={500}
            step={5}
            value={Math.min(f.area, 500)}
            onChange={e => upd({ area: parseInt(e.target.value) })}
            className="w-full h-2 rounded-full bg-border accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted mt-2 mb-8">
            <span>10 m²</span><span>500 m²</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[40, 65, 90, 120].map(v => (
              <button key={v} onClick={() => upd({ area: v })}
                className={`py-2 rounded-xl text-sm font-medium border transition-colors ${f.area === v ? 'border-primary bg-primary-fixed/20 text-primary' : 'border-border text-fg hover:border-primary/40'}`}>
                {v} m²
              </button>
            ))}
          </div>
        </div>
      </CalcWizardLayout>
    )
  }

  /* ══ Standard ══ */
  if (f.phase === 'setup' && curSS === 'standard') {
    return (
      <CalcWizardLayout stepLabel={stepLabel} progress={progress} onBack={back} onNext={() => f.standard && nextSetup()} nextDisabled={!f.standard}>
        <h2 className="font-bold text-fg text-4xl text-center mb-3">{t('standardTitle')}</h2>
        <p className="text-muted text-base text-center mb-10">{t('standardSubtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STANDARDS.map(s => (
            <button key={s.id} onClick={() => upd({ standard: s.id })}
              className={`flex flex-col rounded-2xl overflow-hidden border-2 transition-colors text-left ${f.standard === s.id ? 'border-primary' : 'border-border bg-surface hover:border-primary/40'}`}>
              <div className="relative aspect-[4/3] w-full">
                <Image src={s.img} alt={s.label} fill className="object-cover" />
              </div>
              <div className={`p-4 ${f.standard === s.id ? 'bg-primary-fixed/20' : 'bg-surface'}`}>
                <h3 className="font-semibold text-fg text-base mb-1">{s.label}</h3>
                <p className="text-muted text-xs">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </CalcWizardLayout>
    )
  }

  /* ══ Conditions ══ */
  if (f.phase === 'setup' && curSS === 'conditions') {
    return (
      <CalcWizardLayout stepLabel={stepLabel} progress={progress} onBack={back} onNext={nextSetup}>
        <h2 className="font-bold text-fg text-4xl text-center mb-3">{t('condTitle')}</h2>
        <p className="text-muted text-base text-center mb-8">{t('condSubtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COND_ITEMS.map(({ key, label, desc }) => (
            <Chk key={key} checked={f.conds[key]} label={label} desc={desc}
              onToggle={() => upd({ conds: { ...f.conds, [key]: !f.conds[key] } as Conds })} />
          ))}
        </div>
      </CalcWizardLayout>
    )
  }

  /* ══ Rynek wtórny info ══ */
  if (f.phase === 'setup' && curSS === 'rynek-info') {
    const canNext = !!f.rynek.age && !!f.rynek.finish
    return (
      <CalcWizardLayout stepLabel={stepLabel} progress={progress} onBack={back} onNext={() => canNext && nextSetup()} nextDisabled={!canNext}>
        <h2 className="font-bold text-fg text-4xl text-center mb-3">{t('rynekTitle')}</h2>
        <p className="text-muted text-base text-center mb-8">{t('rynekSubtitle')}</p>

        <h3 className="font-semibold text-fg text-sm mb-3">{t('rynekAgeTitle')}</h3>
        <div className="flex gap-3 mb-6">
          {AGE_OPTS.map(o => (
            <button key={o.id} onClick={() => upd({ rynek: { ...f.rynek, age: o.id } })}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${f.rynek.age === o.id ? 'border-primary bg-primary-fixed/20 text-primary' : 'border-border text-fg hover:border-primary/40'}`}>
              {o.label}
            </button>
          ))}
        </div>

        <h3 className="font-semibold text-fg text-sm mb-3">{t('rynekFinishTitle')}</h3>
        <div className="flex flex-col gap-2 mb-6">
          {FINISH_OPTS.map(o => (
            <Radio key={o.id} checked={f.rynek.finish === o.id} label={o.label} desc={o.desc}
              onClick={() => upd({ rynek: { ...f.rynek, finish: o.id } })} />
          ))}
        </div>

        <h3 className="font-semibold text-fg text-sm mb-3">
          {t('rynekReplaceTitle')} <span className="text-muted font-normal">{t('rynekReplaceOptional')}</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {RYNEK_REPLACE.map(({ key, label }) => (
            <Chk key={key} checked={f.rynek[key]} label={label}
              onToggle={() => upd({ rynek: { ...f.rynek, [key]: !f.rynek[key] } as RynekInfo })} />
          ))}
        </div>
      </CalcWizardLayout>
    )
  }

  /* ══ Rooms dashboard ══ */
  if (f.phase === 'rooms') {
    const completedCount = f.rooms.filter(isDone).length
    return (
      <div className="flex flex-col min-h-screen bg-bg">
        <div className="bg-surface border-b border-border">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
            <span className="font-bold text-fg text-base">Remontowo</span>
            <div className="w-px h-5 bg-border" />
            <span className="bg-primary-fixed text-primary text-xs font-semibold px-3 py-1 rounded-full">{t('roomsBadge')}</span>
          </div>
          <div className="h-0.5 bg-border">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: '65%' }} />
          </div>
        </div>

        <div className="flex-1 max-w-3xl mx-auto px-6 py-10 w-full">
          <h2 className="font-bold text-fg text-3xl mb-1">{t('roomsTitle')}</h2>
          <p className="text-muted text-sm mb-8">{t('roomsSubtitle')}</p>

          {f.rooms.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {f.rooms.map(room => {
                const rt = ROOM_TYPES.find(rtt => rtt.id === room.type)
                const done = isDone(room)
                return (
                  <div key={room.id} className={`bg-surface border-2 rounded-2xl p-4 flex items-center gap-4 ${done ? 'border-primary/30' : 'border-border'}`}>
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                      {rt ? (
                        <Image src={rt.icon} alt={rt.label} width={24} height={24}
                          style={{ filter: 'invert(20%) sepia(60%) saturate(400%) hue-rotate(115deg)' }} />
                      ) : (
                        <Image src="/icons/home_work.svg" alt="room" width={24} height={24}
                          style={{ filter: 'invert(20%) sepia(60%) saturate(400%) hue-rotate(115deg)' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-fg text-sm truncate">{getDisplayLabel(room, f.rooms)}</div>
                      <div className="text-muted text-xs">{(room.width * room.length).toFixed(0)} m² · {room.height.toFixed(1)} m</div>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${done ? 'bg-primary-fixed text-primary' : 'bg-border/60 text-muted'}`}>
                        {done ? t('roomComplete') : t('roomIncomplete')}
                      </span>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => upd({ erid: room.id, res: 0, phase: 'room-edit' })}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-fg hover:border-fg transition-colors">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setF(p => ({ ...p, rooms: p.rooms.filter(r => r.id !== room.id) }))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-destructive hover:border-destructive/40 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <button onClick={addRoom}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-border text-muted hover:border-primary hover:text-primary transition-colors text-sm font-medium mb-6">
            <Plus size={18} /> {t('addRoom')}
          </button>

          {f.rooms.length > 0 && (
            <div className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted uppercase tracking-wide mb-0.5">{t('totalLabel')}</div>
                <div className="font-bold text-fg text-sm">
                  {f.rooms.reduce((s, r) => s + r.width * r.length, 0).toFixed(0)} m² · {getRoomCountLabel(f.rooms.length)}
                </div>
              </div>
              <div className="text-xs text-muted">{completedCount}/{f.rooms.length}</div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 z-10 border-t border-border bg-surface shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={back} className="px-5 py-2 rounded-full border border-border text-fg text-sm font-medium hover:bg-bg transition-colors">
              {t('prevStep')}
            </button>
            <button onClick={() => upd({ phase: 'estimate' })} disabled={f.rooms.length === 0}
              className="px-7 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              {f.rooms.length === 0 ? t('addFirstRoom') : t('calcEstimate')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ══ Room edit sub-wizard ══ */
  if (f.phase === 'room-edit' && er) {
    const wallArea = Math.max(0, 2 * (er.width + er.length) * er.height - er.windows * 1.8 - er.doors * 2.0)
    const canNext = f.res === 0 ? er.type !== null : f.res === 2 ? er.walls !== null : f.res === 3 ? er.floor !== null : f.res === 4 ? er.ceiling !== null : true

    return (
      <CalcWizardLayout stepLabel={stepLabel} progress={progress} onBack={back}
        onNext={nextRoomStep} nextDisabled={!canNext} nextLabel={f.res === 4 ? t('btnSave') : t('btnNext')}>

        {/* SubStepBar */}
        <div className="flex items-start justify-center mb-8">
          {ROOM_EDIT_LABELS.map((label, i) => (
            <div key={label} className="flex items-start">
              <div className="flex flex-col items-center gap-1.5 w-16">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i < f.res ? 'bg-primary-fixed text-primary' : i === f.res ? 'bg-primary text-white' : 'bg-border text-muted'}`}>
                  {i < f.res ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-[10px] text-center leading-tight ${i === f.res ? 'text-fg font-medium' : 'text-muted'}`}>{label}</span>
              </div>
              {i < ROOM_EDIT_LABELS.length - 1 && (
                <div className="w-6 h-px bg-border mt-3.5 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Room type */}
        {f.res === 0 && (
          <>
            <h2 className="font-bold text-fg text-3xl text-center mb-8">{t('typeTitle')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ROOM_TYPES.map(rt => (
                <button key={rt.id} onClick={() => updRoom(er.id, { type: rt.id, label: rt.label })}
                  className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 transition-colors ${er.type === rt.id ? 'border-primary bg-primary-fixed/20' : 'border-border bg-surface hover:border-primary/40'}`}>
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
                    <Image src={rt.icon} alt={rt.label} width={24} height={24}
                      style={{ filter: 'invert(20%) sepia(60%) saturate(400%) hue-rotate(115deg)' }} />
                  </div>
                  <span className="font-semibold text-fg text-xs text-center">{rt.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 1: Measurements */}
        {f.res === 1 && (
          <>
            <h2 className="font-bold text-fg text-3xl text-center mb-2">{t('dimTitle')}</h2>
            <p className="text-muted text-sm text-center mb-8">{t('dimSubtitle')}</p>
            <div className="grid md:grid-cols-[1fr_220px] gap-6">
              <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
                {DIM_SLIDERS.map(({ key, label, min, max }) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-fg">{label}</span>
                      <span className="font-semibold text-fg text-sm bg-border/40 px-2 py-0.5 rounded">{er[key].toFixed(1)}</span>
                    </div>
                    <input type="range" min={min} max={max} step={0.1} value={er[key]}
                      onChange={e => updRoom(er.id, { [key]: parseFloat(e.target.value) } as Partial<Room>)}
                      className="w-full h-1.5 rounded-full bg-border accent-primary cursor-pointer" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {(['windows', 'doors'] as const).map(key => (
                    <div key={key} className="border border-border rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-2">
                        <Image src={key === 'windows' ? '/icons/window.svg' : '/icons/door_back.svg'} alt={key} width={16} height={16}
                          style={{ filter: 'invert(45%) sepia(10%) saturate(300%) hue-rotate(130deg)' }} />
                        <span className="text-xs font-medium text-muted">{key === 'windows' ? t('dimWindowsLabel') : t('dimDoorsLabel')}</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => updRoom(er.id, { [key]: Math.max(0, er[key] - 1) } as Partial<Room>)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-fg hover:bg-bg">−</button>
                        <span className="font-bold text-fg w-4 text-center">{er[key]}</span>
                        <button onClick={() => updRoom(er.id, { [key]: er[key] + 1 } as Partial<Room>)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-fg hover:bg-bg">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-border/30 rounded-2xl p-5 flex flex-col gap-3">
                <h3 className="font-semibold text-fg text-sm">{t('dimSummaryTitle')}</h3>
                {[
                  { label: t('dimWallsNet'),    value: `${wallArea.toFixed(1)} m²`               },
                  { label: t('dimFloorCeiling'), value: `${(er.width * er.length).toFixed(1)} m²` },
                  { label: t('dimPerimeter'),    value: `${(2 * (er.width + er.length)).toFixed(1)} m` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3 bg-surface rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center">
                      <Image src="/icons/square.svg" alt="" width={16} height={16}
                        style={{ filter: 'invert(20%) sepia(60%) saturate(400%) hue-rotate(115deg)' }} />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted">{label}</div>
                      <div className="font-bold text-fg text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 2: Wall finish */}
        {f.res === 2 && (
          <>
            <h2 className="font-bold text-fg text-3xl text-center mb-2">{t('wallsTitle')}</h2>
            <p className="text-muted text-sm text-center mb-8">{t('wallsSubtitle')}</p>
            <div className="grid grid-cols-2 gap-3">
              {WALL_FINISHES.map(fin => (
                <FinishCard key={fin.id} selected={er.walls === fin.id} label={fin.label} desc={fin.desc} img={fin.img}
                  onClick={() => updRoom(er.id, { walls: fin.id })} />
              ))}
            </div>
          </>
        )}

        {/* Step 3: Floor finish */}
        {f.res === 3 && (
          <>
            <h2 className="font-bold text-fg text-3xl text-center mb-2">{t('floorTitle')}</h2>
            <p className="text-muted text-sm text-center mb-8">{t('floorSubtitle')}</p>
            <div className="grid grid-cols-2 gap-3">
              {FLOOR_FINISHES.map(fin => (
                <FinishCard key={fin.id} selected={er.floor === fin.id} label={fin.label} desc={fin.desc} img={fin.img}
                  onClick={() => updRoom(er.id, { floor: fin.id })} />
              ))}
            </div>
          </>
        )}

        {/* Step 4: Ceiling finish */}
        {f.res === 4 && (
          <>
            <h2 className="font-bold text-fg text-3xl text-center mb-2">{t('ceilingTitle')}</h2>
            <p className="text-muted text-sm text-center mb-8">{t('ceilingSubtitle')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CEILING_FINISHES.map(fin => (
                <FinishCard key={fin.id} selected={er.ceiling === fin.id} label={fin.label} desc={fin.desc} img={fin.img}
                  onClick={() => updRoom(er.id, { ceiling: fin.id })} />
              ))}
            </div>
          </>
        )}
      </CalcWizardLayout>
    )
  }

  /* ══ Estimate result ══ */
  if (f.phase === 'estimate') {
    const est = calcEst(f)
    const total = est.mat + est.labor + est.prep
    const matPct = Math.round(est.mat / total * 100)
    const laborPct = Math.round(est.labor / total * 100)
    const prepPct = 100 - matPct - laborPct

    const pdfData: PDFData = {
      city:        f.city        ?? '',
      propType:    f.propType    ?? '',
      standard:    f.standard    ?? '',
      calcType:    f.calcType    ?? '',
      area:        est.m2,
      est,
      rooms: f.rooms.map(room => {
        const m2 = room.width * room.length
        const rc = m2 * 2200 * (CITY_M[f.city!] ?? 1) * (STD_M[f.standard!] ?? 1)
        const rnd = (v: number) => Math.round(v / 100) * 100
        return {
          label:   getDisplayLabel(room, f.rooms),
          width:   room.width,
          length:  room.length,
          height:  room.height,
          walls:   room.walls,
          floor:   room.floor,
          ceiling: room.ceiling,
          cost:    { mat: rnd(rc * 0.55), labor: rnd(rc * 0.35), prep: rnd(rc * 0.10), total: rnd(rc) },
        }
      }),
      generatedAt: new Date().toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' }),
    }

    return (
      <div className="flex flex-col min-h-screen bg-bg">
        <div className="bg-surface border-b border-border">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
            <span className="font-bold text-fg text-base">Remontowo</span>
          </div>
        </div>

        <div className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
          <h1 className="font-bold text-fg text-4xl text-center mb-2">{t('estTitle')}</h1>
          <p className="text-muted text-sm text-center mb-10">{t('estSubtitle')}</p>

          {/* Total cost */}
          <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-fg text-sm mb-1">{t('estTotalTitle')}</h2>
            <p className="text-muted text-xs mb-4">{t('estTotalSubtitle')}</p>
            <div className="font-bold text-fg text-4xl mb-3">{fmt(est.min)} – {fmt(est.max)} PLN</div>
            <span className="inline-flex items-center gap-1 bg-primary-fixed text-primary text-xs font-medium px-3 py-1 rounded-full">
              <Check size={11} /> {t('estPrecision')}
            </span>
            <div className="border-t border-border mt-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: t('estLabelType'),     value: f.propType === 'dom' ? t('estTypDom') : t('estTypMieszk') },
                { label: t('estLabelArea'),     value: `${est.m2.toFixed(0)} m²` },
                { label: t('estLabelStandard'), value: f.standard ? f.standard[0].toUpperCase() + f.standard.slice(1) : '—' },
                { label: t('estLabelCity'),     value: f.city ? (f.city === 'lodz' ? 'Łódź' : f.city[0].toUpperCase() + f.city.slice(1)) : '—' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[10px] text-muted uppercase tracking-wide mb-0.5">{label}</div>
                  <div className="font-semibold text-fg text-sm">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost structure */}
          <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-fg text-sm mb-5">{t('estCostStructure')}</h2>
            <div className="flex rounded-full overflow-hidden h-2 mb-1 gap-px">
              <div className="bg-primary rounded-l-full"        style={{ width: `${matPct}%` }} />
              <div className="bg-green-400"                     style={{ width: `${laborPct}%` }} />
              <div className="bg-charcoal-100 rounded-r-full"   style={{ width: `${prepPct}%` }} />
            </div>
            <div className="flex mb-5 text-[10px] text-muted">
              <span style={{ width: `${matPct}%` }} className="text-center truncate">{matPct}%</span>
              <span style={{ width: `${laborPct}%` }} className="text-center truncate">{laborPct}%</span>
              <span style={{ width: `${prepPct}%` }} className="text-center truncate">{prepPct}%</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {([
                { label: t('estMaterials'),   pct: matPct,   amt: est.mat,   dot: 'bg-primary',      border: false },
                { label: t('estLabor'),       pct: laborPct, amt: est.labor, dot: 'bg-green-400',    border: false },
                { label: t('estPreparation'), pct: prepPct,  amt: est.prep,  dot: 'bg-charcoal-100', border: true  },
              ] as const).map(({ label, pct, amt, dot, border }) => (
                <div key={label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-bg">
                  <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${dot} ${border ? 'border border-border' : ''}`} />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-fg truncate">{label}</div>
                    <div className="text-[11px] text-muted">{pct}% · ~{fmt(amt)} PLN</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Per-room breakdown */}
          {f.rooms.length > 0 && (
            <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
              <h2 className="font-semibold text-fg text-sm mb-4">{t('estPerRoom')}</h2>
              <div className="flex flex-col">
                {f.rooms.map(room => {
                  const rt = ROOM_TYPES.find(rtt => rtt.id === room.type)
                  const m2 = room.width * room.length
                  const roomCost = Math.round(m2 * 2200 * (CITY_M[f.city!] ?? 1) * (STD_M[f.standard!] ?? 1) / 100) * 100
                  return (
                    <div key={room.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        {rt && (
                          <Image src={rt.icon} alt={rt.label} width={20} height={20}
                            style={{ filter: 'invert(20%) sepia(60%) saturate(400%) hue-rotate(115deg)' }} />
                        )}
                        <div>
                          <div className="font-medium text-fg text-sm">{getDisplayLabel(room, f.rooms)}</div>
                          <div className="text-xs text-muted">{m2.toFixed(0)} m²</div>
                        </div>
                      </div>
                      <div className="font-semibold text-fg text-sm">~{fmt(roomCost)} PLN</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* PDF paywall */}
          <div id="pdf-paywall" className="border border-border rounded-2xl overflow-hidden mb-8">
            <div className="bg-surface px-5 pt-5 pb-3 blur-[3px] pointer-events-none select-none border-b border-border" aria-hidden>
              <div className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-3">{t('pdfPreviewLabel')}</div>
              <div className="grid grid-cols-1 gap-2">
                {(f.rooms.length > 0 ? f.rooms.slice(0, 2) : [null]).map((room, i) => {
                  const label = room ? getDisplayLabel(room, f.rooms) : t('roomSalon').toUpperCase()
                  const cost = room ? Math.round(room.width * room.length * 2200 * (CITY_M[f.city!] ?? 1) * (STD_M[f.standard!] ?? 1) / 100) * 100 : 0
                  return (
                    <div key={i} className="bg-white rounded-xl p-3 flex gap-4">
                      <div className="flex-1">
                        <div className="font-bold text-fg text-xs mb-1.5">{label.toUpperCase()}</div>
                        {[
                          { cat: t('pdfCatMaterials'), pct: '55%' },
                          { cat: t('pdfCatLabor'),     pct: '35%' },
                          { cat: t('pdfCatPrep'),      pct: '10%' },
                        ].map(({ cat, pct }) => (
                          <div key={cat} className="flex items-center justify-between py-0.5 text-[9px] text-muted border-t border-border/50">
                            <span>{cat}</span>
                            <span className="text-primary font-medium">{pct} · ████████</span>
                          </div>
                        ))}
                      </div>
                      {cost > 0 && (
                        <div className="text-right shrink-0">
                          <div className="text-[9px] text-muted">{t('pdfTotalLabel')}</div>
                          <div className="font-bold text-primary text-sm">~{fmt(cost)} PLN</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white px-6 py-6 text-center">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>

              <h3 className="font-bold text-fg text-lg mb-1">{t('pdfTitle')}</h3>
              <p className="text-muted text-xs leading-relaxed mb-4 max-w-xs mx-auto">{t('pdfSubtitle')}</p>

              <ul className="flex flex-col gap-1.5 text-left mb-5 max-w-xs mx-auto">
                {[t('pdfFeature1'), t('pdfFeature2'), t('pdfFeature3')].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted">
                    <Check size={12} className="text-primary mt-0.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>

              <div className="font-bold text-fg text-3xl mb-0.5">{t('pdfPrice')}</div>
              <div className="text-muted text-xs mb-5">{t('pdfPriceNote')}</div>

              <BuyPDFButton
                data={pdfData}
                className="w-full bg-primary text-white py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center"
                label={t('pdfBuyButton')}
              />
              <p className="text-[10px] text-muted/70 mt-2.5">{t('pdfPaymentNote')}</p>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 border-t border-border bg-surface shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
          <div className="max-w-3xl mx-auto px-6 py-3.5 flex justify-between items-center gap-4">
            <button onClick={() => router.push(`/${locale}/kalkulator`)}
              className="px-5 py-2 rounded-full border border-border text-fg text-sm font-medium hover:bg-bg transition-colors shrink-0">
              {t('estStartOver')}
            </button>
            <button
              onClick={() => document.getElementById('pdf-paywall')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="flex items-center gap-3 bg-primary hover:bg-primary/90 transition-colors text-white pl-5 pr-4 py-2.5 rounded-full"
            >
              <div className="text-left">
                <div className="text-xs font-semibold leading-none mb-0.5">{t('pdfStickyTitle')}</div>
                <div className="text-[10px] text-white/70 leading-none">{t('pdfStickySubtitle')}</div>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
