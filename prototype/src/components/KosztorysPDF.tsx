import React from 'react'
import { Document, Page, View, Text, StyleSheet, Font, Image } from '@react-pdf/renderer'
import type { PDFData, PDFRoomData } from '@/lib/kosztorys-types'

const _o = typeof window !== 'undefined' ? window.location.origin : ''

Font.register({
  family: 'Manrope',
  fonts: [
    { src: `${_o}/fonts/Manrope-Regular.ttf`, fontWeight: 400 },
    { src: `${_o}/fonts/Manrope-Bold.ttf`,    fontWeight: 700 },
  ],
})

const LOGO_SRC = `${_o}/logo-header-remonta.png`

/* ─── Lookup tables ─────────────────────────────────────────────────────── */
const MAT: Record<string, string[]> = {
  farba:      ['Farba lateksowa akrylowa (2×)', 'Preparat gruntujący'],
  tapeta:     ['Tapeta dekoracyjna', 'Klej tapetarski'],
  tynk:       ['Tynk strukturalny / mikro-cement', 'Preparat gruntujący'],
  plytki:     ['Gres / terakota', 'Klej C2TE', 'Fuga'],
  panele:     ['Panele laminowane AC4/AC5', 'Podkład akustyczny 3mm'],
  deska:      ['Deska drewniana / parkiet', 'Lakier lub olej podłogowy'],
  'plytki-p': ['Gres antypoślizgowy', 'Klej C2TE', 'Fuga'],
  wykl:       ['Wykładzina PVC / dywanowa', 'Klej do wykładzin'],
  'farba-s':  ['Farba sufitowa biała (2×)', 'Grunt izolacyjny'],
  gladz:      ['Gładź gipsowa', 'Farba sufitowa biała'],
  pod:        ['Profile stalowe K-G', 'Płyty gipsowo-kartonowe', 'Oświetlenie LED'],
}
const ROB: Record<string, string> = {
  farba:      'Malarz — gruntowanie, szpachlowanie i 2× malowanie ścian',
  tapeta:     'Tapetarz — klejenie i wykończenie tapety',
  tynk:       'Tynkarz — nakładanie i modelowanie faktury',
  plytki:     'Płytkarz — układanie płytek i fugowanie ścian',
  panele:     'Układacz — montaż paneli z podkładem i listwami',
  deska:      'Parkieciarz — układanie, szlifowanie i lakierowanie',
  'plytki-p': 'Płytkarz — układanie gresu i fugowanie podłogi',
  wykl:       'Układacz — klejenie lub montaż wykładziny',
  'farba-s':  'Malarz — gruntowanie i 2× malowanie sufitu',
  gladz:      'Gładziarz — nakładanie, szlifowanie i malowanie',
  pod:        'Sufitkarz — montaż stelaża, płyt i oświetlenia',
}
const PREP: Record<string, string[]> = {
  farba:      ['Szlifowanie nierówności ścian', 'Gruntowanie powierzchni'],
  tapeta:     ['Gruntowanie ścian', 'Wyrównanie podłoża'],
  tynk:       ['Czyszczenie i zagruntowanie podłoża'],
  plytki:     ['Wyrównanie ściany', 'Hydroizolacja strefy mokrej'],
  panele:     ['Wylewka samopoziomująca', 'Folia paroizolacyjna'],
  deska:      ['Wylewka anhydrytowa', 'Stabilizacja podłoża'],
  'plytki-p': ['Wylewka samopoziomująca', 'Zagruntowanie podłoża'],
  wykl:       ['Wyrównanie podłoża', 'Zagruntowanie'],
  'farba-s':  ['Szlifowanie i zagruntowanie sufitu'],
  gladz:      ['Oczyszczenie i zagruntowanie sufitu'],
  pod:        ['Pomiary i projekt sufitu podwieszanego', 'Zakotwienia i stelaż nośny'],
}
const CAT_MAP: Record<string, string> = {
  farba: 'Malowanie ścian', tapeta: 'Tapetowanie', tynk: 'Tynkowanie',
  plytki: 'Płytkarstwo ścian', panele: 'Panele podłogowe', deska: 'Deska / parkiet',
  'plytki-p': 'Płytkarstwo podłogi', wykl: 'Wykładziny',
  'farba-s': 'Malowanie sufitu', gladz: 'Gładź sufitowa', pod: 'Sufit podwieszany',
}
const CITY_L: Record<string, string> = {
  warszawa: 'Warszawa', krakow: 'Kraków', gdansk: 'Gdańsk',
  poznan: 'Poznań', wroclaw: 'Wrocław', lodz: 'Łódź',
}
const STD_L: Record<string, string> = {
  ekonomiczny: 'Ekonomiczny', optymalny: 'Optymalny', premium: 'Premium',
}

const WARNINGS = [
  { title: 'Elektryka', desc: 'Sprawdź stan instalacji aluminiowej — wymiana na miedzianą jest kluczowa dla bezpieczeństwa.' },
  { title: 'Hydraulika', desc: 'Weryfikacja ciśnienia wody i drożności pionów kanalizacyjnych przed zabudową.' },
  { title: 'Osiadanie budynku', desc: 'Pęknięcia na ścianach i dylatacje wymagają zbrojenia siatką przed tynkowaniem.' },
  { title: 'Nasłonecznienie', desc: 'Orientacja okien wpływa na dobór mocy klimatyzacji i zyski ciepła zimą.' },
  { title: 'Wilgoć i Wentylacja', desc: 'Niezbędna kontrola drożności kratek wentylacyjnych i sprawdzenie poziomu wilgoci.' },
  { title: 'Izolacja akustyczna', desc: 'Dodatkowa izolacja między kondygnacjami zmniejsza hałas z sąsiednich lokali.' },
]

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const fmt = (n: number) => Math.round(n).toLocaleString('pl-PL')
const round100 = (n: number) => Math.round(n / 100) * 100

type TableItem = { cat: string; desc: string; cost: number }

function getTableItems(r: PDFRoomData) {
  const types = [r.walls, r.floor, r.ceiling].filter(Boolean) as string[]
  const n = types.length || 1
  const mat: TableItem[] = []
  const rob: TableItem[] = []
  const prep: TableItem[] = []

  for (const t of types) {
    const cat = CAT_MAP[t] ?? 'Materiały'
    const mItems = MAT[t] ?? []
    const rItem  = ROB[t]
    const pItems = PREP[t] ?? []

    const matShare  = r.cost.mat   / n
    const labShare  = r.cost.labor / n
    const prepShare = r.cost.prep  / n

    mItems.forEach((desc, i) => {
      mat.push({ cat, desc, cost: round100(matShare / Math.max(mItems.length, 1)) })
    })
    if (rItem) rob.push({ cat, desc: rItem, cost: round100(labShare) })
    pItems.forEach(desc => prep.push({ cat, desc, cost: round100(prepShare / Math.max(pItems.length, 1)) }))
  }
  return { mat, rob, prep }
}

function projectId(data: PDFData) {
  const city = (CITY_L[data.city] ?? data.city).slice(0, 3).toUpperCase()
  const yr   = new Date().getFullYear()
  const num  = String(data.area + data.rooms.length).padStart(3, '0')
  return `#PL-${yr}-${num}-RW`
}

/* ─── Styles ────────────────────────────────────────────────────────────── */
const s = StyleSheet.create({
  page: { backgroundColor: '#FFFFFF', fontFamily: 'Manrope', fontSize: 10 },

  // ── Footer ──────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1, borderTopColor: '#F0EDEC', borderTopStyle: 'solid',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingLeft: 44, paddingRight: 44,
  },
  footerText: { color: '#717975', fontSize: 8 },

  // ── Header ──────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingLeft: 44, paddingRight: 44, paddingTop: 56, paddingBottom: 24,
    borderBottomWidth: 1, borderBottomColor: '#E1E3E2', borderBottomStyle: 'solid',
  },
  headerTitle: {
    fontWeight: 700, fontSize: 22, color: '#002113',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8,
  },
  headerMeta: { fontSize: 8.5, color: '#717975', letterSpacing: 0.3 },
  headerRight:    { alignItems: 'flex-end' },
  headerLogo:     { width: 99, height: 33 },
  headerSubtext:  {
    fontSize: 8, color: '#717975', textTransform: 'uppercase',
    letterSpacing: 0.8, marginTop: 5,
  },

  // ── Cover body ───────────────────────────────────────────────────────────
  body:    { paddingLeft: 44, paddingRight: 44, paddingTop: 28, paddingBottom: 72 },

  // ── Dark card ────────────────────────────────────────────────────────────
  darkCard: {
    backgroundColor: '#1D5039', borderRadius: 10,
    paddingLeft: 28, paddingRight: 28, paddingTop: 26, paddingBottom: 26,
    marginBottom: 14,
  },
  darkLabel:  { color: '#71a488', fontSize: 8.5, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  darkAmount: { color: '#FFFFFF', fontWeight: 700, fontSize: 28, letterSpacing: -0.8, marginBottom: 18 },
  ratioBar:   { flexDirection: 'row', height: 6, borderRadius: 999, overflow: 'hidden', marginBottom: 10 },
  legend:     { flexDirection: 'row' },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 18 },
  legendDot:  { width: 7, height: 7, borderRadius: 999, marginRight: 5 },
  legendText: { color: '#FFFFFF', fontSize: 9 },

  // ── 3-col summary ────────────────────────────────────────────────────────
  summaryRow:      { flexDirection: 'row', marginBottom: 24 },
  summaryCard:     { flex: 1, backgroundColor: '#F6F3F2', borderRadius: 8, paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16 },
  summaryCardMid:  { flex: 1, backgroundColor: '#F6F3F2', borderRadius: 8, paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16, marginLeft: 8, marginRight: 8 },
  summaryCardDark: { flex: 1, backgroundColor: '#1D5039', borderRadius: 8, paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16 },
  summaryLabel:     { fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.8, color: '#717975', marginBottom: 8 },
  summaryLabelDark: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.8, color: '#71a488', marginBottom: 8 },
  summaryAmount:    { fontWeight: 700, fontSize: 17, color: '#191C1C' },
  summaryAmountDark:{ fontWeight: 700, fontSize: 17, color: '#FFFFFF' },

  // ── Disclaimer ────────────────────────────────────────────────────────────
  disclaimer:     { marginTop: 14, paddingLeft: 14, paddingRight: 14, paddingTop: 12, paddingBottom: 12, backgroundColor: '#F6F3F2', borderRadius: 8 },
  disclaimerText: { color: '#717975', fontSize: 8.5, lineHeight: 1.5, textAlign: 'center' },

  // ── Rooms page: table ─────────────────────────────────────────────────────
  roomsBody: { paddingLeft: 44, paddingRight: 44, paddingTop: 32, paddingBottom: 72 },

  tableHeaderRow: {
    flexDirection: 'row', paddingBottom: 8,
    borderBottomWidth: 1, borderBottomColor: '#E1E3E2', borderBottomStyle: 'solid',
  },
  colHead: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.8, color: '#717975' },

  roomTitleRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 14, paddingBottom: 10, marginTop: 6,
    borderBottomWidth: 1, borderBottomColor: '#E1E3E2', borderBottomStyle: 'solid',
  },
  roomName:  { fontWeight: 700, fontSize: 11, color: '#002113', textTransform: 'uppercase', letterSpacing: 0.5, flex: 5 },
  roomM2:    { fontSize: 8.5, color: '#717975', flex: 4, textAlign: 'center' },
  roomCostV: { fontWeight: 700, fontSize: 11, color: '#002113', flex: 3, textAlign: 'right' },

  sectionBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5,
  },
  sectionBarText: { color: '#FFFFFF', fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 },
  sectionBarAmt:  { color: '#FFFFFF', fontSize: 8, marginLeft: 'auto' },

  itemRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingTop: 6, paddingBottom: 6,
    borderBottomWidth: 1, borderBottomColor: '#F6F3F2', borderBottomStyle: 'solid',
  },
  itemCat:  { fontSize: 8.5, color: '#191C1C', flex: 5 },
  itemDesc: { fontSize: 9, color: '#717975', flex: 4 },
  itemAmt:  { fontSize: 8.5, color: '#191C1C', flex: 3, textAlign: 'right' },

  // ── Warnings section ─────────────────────────────────────────────────────
  warnSection:   { marginTop: 28 },
  warnBorder:    { borderLeftWidth: 3, borderLeftColor: '#1D5039', borderLeftStyle: 'solid', paddingLeft: 12, marginBottom: 16 },
  warnTitle:     { fontWeight: 700, fontSize: 11, color: '#002113', textTransform: 'uppercase', letterSpacing: 0.5 },
  warnRow:       { flexDirection: 'row', marginBottom: 10 },
  warnCard:      { flex: 1, backgroundColor: '#F6F3F2', borderRadius: 8, paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12 },
  warnCardRight: { flex: 1, backgroundColor: '#F6F3F2', borderRadius: 8, paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12, marginLeft: 10 },
  warnCardTitle: { fontWeight: 700, fontSize: 8.5, color: '#002113', marginBottom: 4 },
  warnCardDesc:  { fontSize: 8.5, color: '#717975', lineHeight: 1.5 },

  // ── Includes box (page 1, before dark card) ───────────────────────────────
  includesRow:       { flexDirection: 'row', marginBottom: 14 },
  includesCard:      { flex: 1, backgroundColor: '#F6F3F2', borderRadius: 8, paddingLeft: 14, paddingRight: 14, paddingTop: 12, paddingBottom: 12 },
  includesCardMid:   { flex: 1, backgroundColor: '#F6F3F2', borderRadius: 8, paddingLeft: 14, paddingRight: 14, paddingTop: 12, paddingBottom: 12, marginLeft: 8, marginRight: 8 },
  includesCardDark:  { flex: 1, backgroundColor: '#1D5039', borderRadius: 8, paddingLeft: 14, paddingRight: 14, paddingTop: 12, paddingBottom: 12 },
  includesHead:      { fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: '#717975', marginBottom: 8 },
  includesHeadDark:  { fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: '#b9efcf', marginBottom: 8 },
  includesItem:      { fontSize: 8.5, color: '#191C1C', marginBottom: 4, lineHeight: 1.5 },
  includesItemGray:  { fontSize: 8.5, color: '#717975', marginBottom: 4, lineHeight: 1.5 },
  includesPrecision: { fontWeight: 700, fontSize: 22, color: '#FFFFFF', marginBottom: 4 },
  includesNote:      { fontSize: 8, color: '#b9efcf', lineHeight: 1.5 },

  // ── Next steps section (end of page 2) ───────────────────────────────────
  nextSection:     { marginTop: 28, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#E1E3E2', borderTopStyle: 'solid' },
  nextBorder:      { borderLeftWidth: 3, borderLeftColor: '#4D8F6A', borderLeftStyle: 'solid', paddingLeft: 12, marginBottom: 16 },
  nextTitle:       { fontWeight: 700, fontSize: 11, color: '#002113', textTransform: 'uppercase', letterSpacing: 0.5 },
  nextRow:         { flexDirection: 'row' },
  nextCard:        { flex: 1, backgroundColor: '#F6F3F2', borderRadius: 8, paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12, marginRight: 10 },
  nextNum:         { fontWeight: 700, fontSize: 16, color: '#1D5039', marginBottom: 6 },
  nextCardTitle:   { fontWeight: 700, fontSize: 8.5, color: '#002113', marginBottom: 4 },
  nextCardDesc:    { fontSize: 8, color: '#717975', lineHeight: 1.5 },
})

/* ─── Footer component ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerText}>© {new Date().getFullYear()} Remonta. Wszelkie prawa zastrzeżone.</Text>
      <Text
        style={s.footerText}
        render={({ pageNumber, totalPages }) => `Strona ${pageNumber} z ${totalPages}`}
        fixed
      />
    </View>
  )
}

/* ─── Room section (table rows) ─────────────────────────────────────────── */
function RoomSection({ room }: { room: PDFRoomData }) {
  const m2 = (room.width * room.length).toFixed(0)
  const { mat, rob, prep } = getTableItems(room)

  return (
    <View wrap={false}>
      {/* Room title row */}
      <View style={s.roomTitleRow}>
        <Text style={s.roomName}>{room.label}</Text>
        <Text style={s.roomM2}>{m2} m²</Text>
        <Text style={s.roomCostV}>{fmt(room.cost.total)} PLN</Text>
      </View>

      {/* MATERIAŁY */}
      {mat.length > 0 && (
        <>
          <View style={[s.sectionBar, { backgroundColor: '#1D5039' }]}>
            <Text style={s.sectionBarText}>Materiały</Text>
            <Text style={s.sectionBarAmt}>{fmt(room.cost.mat)} PLN</Text>
          </View>
          {mat.map((item, i) => (
            <View key={i} style={s.itemRow}>
              <Text style={s.itemCat}>{item.cat}</Text>
              <Text style={s.itemDesc}>{item.desc}</Text>
              <Text style={s.itemAmt}>{fmt(item.cost)} PLN</Text>
            </View>
          ))}
        </>
      )}

      {/* ROBOCIZNA */}
      {rob.length > 0 && (
        <>
          <View style={[s.sectionBar, { backgroundColor: '#1D5039' }]}>
            <Text style={s.sectionBarText}>Robocizna</Text>
            <Text style={s.sectionBarAmt}>{fmt(room.cost.labor)} PLN</Text>
          </View>
          {rob.map((item, i) => (
            <View key={i} style={s.itemRow}>
              <Text style={s.itemCat}>{item.cat}</Text>
              <Text style={s.itemDesc}>{item.desc}</Text>
              <Text style={s.itemAmt}>{fmt(item.cost)} PLN</Text>
            </View>
          ))}
        </>
      )}

      {/* PRZYGOTOWANIE */}
      {prep.length > 0 && (
        <>
          <View style={[s.sectionBar, { backgroundColor: '#4D8F6A' }]}>
            <Text style={s.sectionBarText}>Przygotowanie</Text>
            <Text style={s.sectionBarAmt}>{fmt(room.cost.prep)} PLN</Text>
          </View>
          {prep.map((item, i) => (
            <View key={i} style={s.itemRow}>
              <Text style={s.itemCat}>{item.cat}</Text>
              <Text style={s.itemDesc}>{item.desc}</Text>
              <Text style={s.itemAmt}>{fmt(item.cost)} PLN</Text>
            </View>
          ))}
        </>
      )}
    </View>
  )
}

/* ─── Main document ─────────────────────────────────────────────────────── */
export function KosztorysPDF({ data }: { data: PDFData }) {
  const { est } = data
  const total   = est.mat + est.labor + est.prep
  const matPct  = Math.round(est.mat   / total * 100)
  const labPct  = Math.round(est.labor / total * 100)
  const prepPct = 100 - matPct - labPct
  const pid     = projectId(data)

  const warnPairs = WARNINGS.reduce<(typeof WARNINGS)[]>((rows, item, i) => {
    if (i % 2 === 0) rows.push([item])
    else rows[rows.length - 1].push(item)
    return rows
  }, [])

  return (
    <Document title="Raport Kosztorysowy — Remonta" author="Remonta">

      {/* ══ Page 1 — Cover ══════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.headerTitle}>Raport Kosztorysowy</Text>
            <Text style={s.headerMeta}>
              PROJECT ID: {pid}{'   '}|{'   '}DATA: {data.generatedAt}
            </Text>
            <Text style={[s.headerMeta, { marginTop: 3 }]}>
              {CITY_L[data.city] ?? data.city}, Polska{'   '}·{'   '}{STD_L[data.standard] ?? data.standard}{'   '}·{'   '}{data.area.toFixed(0)} m²
            </Text>
          </View>
          <View style={s.headerRight}>
            <Image src={LOGO_SRC} style={s.headerLogo} />
            <Text style={s.headerSubtext}>PRECISION GUARANTEE™</Text>
          </View>
        </View>

        {/* Cover body */}
        <View style={s.body}>

          {/* Co obejmuje / Nie obejmuje / Precyzja */}
          <View style={s.includesRow}>
            <View style={s.includesCard}>
              <Text style={s.includesHead}>Co obejmuje</Text>
              {['Materiały wykończeniowe', 'Robocizna ekipy', 'Prace przygotowawcze', 'Korekty regionalne'].map(item => (
                <View key={item} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#1D5039', marginTop: 2.5, marginRight: 7 }} />
                  <Text style={s.includesItem}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={s.includesCardMid}>
              <Text style={s.includesHead}>Nie obejmuje</Text>
              {['Elektryka i hydraulika', 'Meble i AGD', 'Wyburzenia konstrukcyjne', 'Pozwolenia budowlane'].map(item => (
                <View key={item} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#c5c7c6', marginTop: 2.5, marginRight: 7 }} />
                  <Text style={s.includesItemGray}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={s.includesCardDark}>
              <Text style={s.includesHeadDark}>Precyzja szacunku</Text>
              <Text style={s.includesPrecision}>±10–15%</Text>
              <Text style={s.includesNote}>Typowa zmienność{'\n'}cen rynkowych w Polsce</Text>
            </View>
          </View>

          {/* Dark green total cost card */}
          <View style={s.darkCard}>
            <Text style={s.darkLabel}>SZACOWANY KOSZT CAŁKOWITY</Text>
            <Text style={s.darkAmount}>{fmt(est.min)} – {fmt(est.max)} PLN</Text>

            <View style={s.ratioBar}>
              <View style={{ flex: matPct,  backgroundColor: '#b9efcf' }} />
              <View style={{ flex: labPct,  backgroundColor: '#71a488' }} />
              <View style={{ flex: prepPct, backgroundColor: '#c5c7c6' }} />
            </View>

            <View style={s.legend}>
              {[
                { label: `Materiały (${matPct}%)`,      dot: '#b9efcf' },
                { label: `Robocizna (${labPct}%)`,      dot: '#71a488' },
                { label: `Przygotowanie (${prepPct}%)`, dot: '#c5c7c6' },
              ].map(({ label, dot }) => (
                <View key={label} style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: dot }]} />
                  <Text style={s.legendText}>{label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 3-col summary */}
          <View style={s.summaryRow}>
            <View style={s.summaryCard}>
              <Text style={s.summaryLabel}>Materiały</Text>
              <Text style={s.summaryAmount}>{fmt(est.mat)} PLN</Text>
            </View>
            <View style={s.summaryCardMid}>
              <Text style={s.summaryLabel}>Robocizna</Text>
              <Text style={s.summaryAmount}>{fmt(est.labor)} PLN</Text>
            </View>
            <View style={s.summaryCardDark}>
              <Text style={s.summaryLabelDark}>Suma razem</Text>
              <Text style={s.summaryAmountDark}>{fmt(total)} PLN</Text>
            </View>
          </View>

          {/* Disclaimer */}
          <View style={s.disclaimer}>
            <Text style={s.disclaimerText}>
              Niniejszy kosztorys ma charakter orientacyjny i oparty jest na średnich cenach rynkowych (±10–15% dokładności).
              Rzeczywisty koszt remontu może różnić się w zależności od wybranej ekipy, jakości materiałów i zakresu prac.
              Zalecamy uzyskanie co najmniej 3 ofert od sprawdzonych wykonawców przed podjęciem decyzji.
            </Text>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ══ Page 2+ — Room details ══════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <View style={s.roomsBody}>

          {/* Table header */}
          <View style={s.tableHeaderRow}>
            <Text style={[s.colHead, { flex: 5 }]}>Kategoria</Text>
            <Text style={[s.colHead, { flex: 4, textAlign: 'center' }]}>Opcja / Standard</Text>
            <Text style={[s.colHead, { flex: 3, textAlign: 'right' }]}>Koszt</Text>
          </View>

          {/* Rooms */}
          {data.rooms.length === 0 ? (
            <View style={{ backgroundColor: '#F6F3F2', borderRadius: 10, padding: 24, marginTop: 16 }}>
              <Text style={{ color: '#717975', fontSize: 9, textAlign: 'center', lineHeight: 1.6 }}>
                Kosztorys oparty na łącznej powierzchni {data.area.toFixed(0)} m² bez podziału na pomieszczenia.{'\n'}
                Aby uzyskać szczegółowy podział, wróć do kalkulatora i dodaj poszczególne pomieszczenia.
              </Text>
            </View>
          ) : (
            data.rooms.map((room, i) => <RoomSection key={i} room={room} />)
          )}

          {/* Total summary row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#1D5039', borderRadius: 8, paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, marginTop: 20 }}>
            <Text style={{ color: '#71a488', fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.8, flex: 5 }}>Suma szacunkowa</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 8, flex: 4, textAlign: 'center' }}>Wszystkie pomieszczenia</Text>
            <Text style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 11, flex: 3, textAlign: 'right' }}>{fmt(est.min)} – {fmt(est.max)} PLN</Text>
          </View>

          {/* Na co zwrócić uwagę */}
          <View style={s.warnSection} wrap={false}>
            <View style={s.warnBorder}>
              <Text style={s.warnTitle}>Na co zwrócić uwagę</Text>
            </View>
            {warnPairs.map((pair, i) => (
              <View key={i} style={s.warnRow}>
                <View style={s.warnCard}>
                  <Text style={s.warnCardTitle}>{pair[0].title}</Text>
                  <Text style={s.warnCardDesc}>{pair[0].desc}</Text>
                </View>
                {pair[1] ? (
                  <View style={s.warnCardRight}>
                    <Text style={s.warnCardTitle}>{pair[1].title}</Text>
                    <Text style={s.warnCardDesc}>{pair[1].desc}</Text>
                  </View>
                ) : (
                  <View style={{ flex: 1, marginLeft: 10 }} />
                )}
              </View>
            ))}
          </View>

          {/* Następne kroki */}
          <View style={s.nextSection}>
            <View style={s.nextBorder}>
              <Text style={s.nextTitle}>Następne kroki</Text>
            </View>
            <View style={s.nextRow}>
              {[
                { n: '01', title: 'Zbierz 3 oferty', desc: 'Poproś co najmniej 3 wykonawców o wycenę tego samego zakresu prac.' },
                { n: '02', title: 'Pokaż ten kosztorys', desc: 'Użyj go jako punktu odniesienia — wykonawca powinien uzasadnić różnice.' },
                { n: '03', title: 'Porównaj pozycje', desc: 'Sprawdź podział na materiały i robociznę, nie tylko cenę łączną.' },
                { n: '04', title: 'Negocjuj świadomie', desc: 'Oferta o >20% wyższa od widełek? Zapytaj o szczegóły lub zmień ekipę.' },
              ].map((step, i, arr) => (
                <View key={step.n} style={[s.nextCard, i === arr.length - 1 ? { marginRight: 0 } : {}]}>
                  <Text style={s.nextNum}>{step.n}</Text>
                  <Text style={s.nextCardTitle}>{step.title}</Text>
                  <Text style={s.nextCardDesc}>{step.desc}</Text>
                </View>
              ))}
            </View>
          </View>

        </View>
        <Footer />
      </Page>
    </Document>
  )
}
