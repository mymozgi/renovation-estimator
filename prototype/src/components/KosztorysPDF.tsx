import React from 'react'
import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer'
import type { PDFData, PDFRoomData } from '@/lib/kosztorys-types'

const _o = typeof window !== 'undefined' ? window.location.origin : ''

Font.register({
  family: 'Manrope',
  fonts: [
    { src: `${_o}/fonts/Manrope-Variable.ttf`, fontWeight: 400 },
    { src: `${_o}/fonts/Manrope-Variable.ttf`, fontWeight: 700 },
  ],
})

/* ─── Finish descriptions ──────────────────────────────────────────────── */
const MAT: Record<string, string[]> = {
  farba:     ['Farba lateksowa akrylowa (2×)', 'Preparat gruntujący'],
  tapeta:    ['Tapeta dekoracyjna', 'Klej tapetarski'],
  tynk:      ['Tynk strukturalny / mikro-cement', 'Preparat gruntujący'],
  plytki:    ['Gres / terakota', 'Klej C2TE', 'Fuga'],
  panele:    ['Panele laminowane AC4/AC5', 'Podkład akustyczny 3mm'],
  deska:     ['Deska drewniana / parkiet', 'Lakier lub olej podłogowy'],
  'plytki-p':['Gres antypoślizgowy', 'Klej C2TE', 'Fuga'],
  wykl:      ['Wykładzina PVC / dywanowa', 'Klej do wykładzin'],
  'farba-s': ['Farba sufitowa biała (2×)', 'Grunt izolacyjny'],
  gladz:     ['Gładź gipsowa', 'Farba sufitowa biała'],
  pod:       ['Profile stalowe K-G', 'Płyty gipsowo-kartonowe', 'Oświetlenie LED'],
}
const ROB: Record<string, string> = {
  farba:     'Malarz — gruntowanie, szpachlowanie i 2× malowanie ścian',
  tapeta:    'Tapetarz — klejenie i wykończenie tapety',
  tynk:      'Tynkarz — nakładanie i modelowanie faktury',
  plytki:    'Płytkarz — układanie płytek i fugowanie ścian',
  panele:    'Układacz — montaż paneli z podkładem i listwami',
  deska:     'Parkieciarz — układanie, szlifowanie i lakierowanie',
  'plytki-p':'Płytkarz — układanie gresu i fugowanie podłogi',
  wykl:      'Układacz — klejenie lub montaż wykładziny',
  'farba-s': 'Malarz — gruntowanie i 2× malowanie sufitu',
  gladz:     'Gładziarz — nakładanie, szlifowanie i malowanie',
  pod:       'Sufitkarz — montaż stelaża, płyt i oświetlenia',
}
const PREP: Record<string, string[]> = {
  farba:     ['Szlifowanie nierówności ścian', 'Gruntowanie powierzchni'],
  tapeta:    ['Gruntowanie ścian', 'Wyrównanie podłoża'],
  tynk:      ['Czyszczenie i zagruntowanie podłoża'],
  plytki:    ['Wyrównanie ściany', 'Hydroizolacja strefy mokrej'],
  panele:    ['Wylewka samopoziomująca', 'Folia paroizolacyjna'],
  deska:     ['Wylewka anhydrytowa', 'Stabilizacja podłoża'],
  'plytki-p':['Wylewka samopoziomująca', 'Zagruntowanie podłoża'],
  wykl:      ['Wyrównanie podłoża', 'Zagruntowanie'],
  'farba-s': ['Szlifowanie i zagruntowanie sufitu'],
  gladz:     ['Oczyszczenie i zagruntowanie sufitu'],
  pod:       ['Pomiary i projekt sufitu podwieszanego', 'Zakotwienia i stelaż nośny'],
}

const CITY_L: Record<string, string> = {
  warszawa: 'Warszawa', krakow: 'Kraków', gdansk: 'Gdańsk',
  poznan: 'Poznań', wroclaw: 'Wrocław', lodz: 'Łódź',
}
const STD_L: Record<string, string> = {
  ekonomiczny: 'Ekonomiczny', optymalny: 'Optymalny', premium: 'Premium',
}
const CT_L: Record<string, string> = {
  'wykończenie': 'Wykończenie pod klucz',
  'rynek-wtorny': 'Rynek wtórny',
  'remont-generalny': 'Remont generalny',
}

const fmt = (n: number) => n.toLocaleString('pl-PL')

function matItems(r: PDFRoomData): string[] {
  return [
    ...(r.walls   ? MAT[r.walls]   ?? [] : []),
    ...(r.floor   ? MAT[r.floor]   ?? [] : []),
    ...(r.ceiling ? MAT[r.ceiling] ?? [] : []),
  ]
}
function robItems(r: PDFRoomData): string[] {
  return [
    ...(r.walls   ? [ROB[r.walls]]   : []),
    ...(r.floor   ? [ROB[r.floor]]   : []),
    ...(r.ceiling ? [ROB[r.ceiling]] : []),
  ].filter(Boolean) as string[]
}
function prepItems(r: PDFRoomData): string[] {
  return [
    ...(r.walls   ? PREP[r.walls]   ?? [] : []),
    ...(r.floor   ? PREP[r.floor]   ?? [] : []),
    ...(r.ceiling ? PREP[r.ceiling] ?? [] : []),
  ]
}

/* ─── Styles ───────────────────────────────────────────────────────────── */
const s = StyleSheet.create({
  page: { backgroundColor: '#FFFFFF', fontFamily: 'Manrope', fontSize: 10 },

  // ── Footer (fixed on every page) ─────────────────────────────────────
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 52, backgroundColor: '#1D5039',
    flexDirection: 'row', alignItems: 'center',
    paddingLeft: 44, paddingRight: 44,
  },
  footerBrand: { color: '#FFFFFF', fontFamily: 'Manrope', fontWeight: 700, fontSize: 9, marginRight: 14 },
  footerDisc:  { color: '#B9EFCF', fontSize: 6.5, flex: 1, lineHeight: 1.5 },
  footerPage:  { color: '#FFFFFF', fontSize: 8, opacity: 0.65, marginLeft: 14 },

  // ── Cover banner ──────────────────────────────────────────────────────
  coverBanner: {
    backgroundColor: '#1D5039',
    paddingLeft: 44, paddingRight: 44,
    paddingTop: 44, paddingBottom: 34,
  },
  coverLogo:    { color: '#FFFFFF', fontFamily: 'Manrope', fontWeight: 700, fontSize: 22, letterSpacing: 0.5 },
  coverLogoSub: { color: '#B9EFCF', fontSize: 10, marginTop: 3 },

  // ── Cover body ────────────────────────────────────────────────────────
  coverBody:  { paddingLeft: 44, paddingRight: 44, paddingTop: 26, paddingBottom: 80 },
  coverTitle: { color: '#191C1C', fontFamily: 'Manrope', fontWeight: 700, fontSize: 24, marginBottom: 4 },
  coverSub:   { color: '#717975', fontSize: 10, marginBottom: 22 },

  metaRow:        { flexDirection: 'row', backgroundColor: '#F6F3F2', borderRadius: 10, padding: 16, marginBottom: 18 },
  metaItem:       { flex: 1 },
  metaLabel:      { color: '#717975', fontSize: 7, textTransform: 'uppercase', letterSpacing: 0.8 },
  metaValue:      { color: '#191C1C', fontFamily: 'Manrope', fontWeight: 700, fontSize: 10, marginTop: 2 },

  totalCard:      { backgroundColor: '#E8F5E9', borderRadius: 10, padding: 18, marginBottom: 18 },
  totalLabel:     { color: '#717975', fontFamily: 'Manrope', fontWeight: 700, fontSize: 7.5, textTransform: 'uppercase', letterSpacing: 0.8 },
  totalRange:     { color: '#1D5039', fontFamily: 'Manrope', fontWeight: 700, fontSize: 26, marginTop: 6, marginBottom: 3 },
  totalNote:      { color: '#717975', fontSize: 8 },
  totalStatsRow:  { flexDirection: 'row', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#B9EFCF', borderTopStyle: 'solid' },
  totalStatItem:  { flex: 1 },
  totalStatLabel: { color: '#717975', fontSize: 7, textTransform: 'uppercase' },
  totalStatValue: { color: '#191C1C', fontFamily: 'Manrope', fontWeight: 700, fontSize: 9, marginTop: 1 },

  structCard:       { backgroundColor: '#F6F3F2', borderRadius: 10, padding: 16 },
  structTitle:      { color: '#191C1C', fontFamily: 'Manrope', fontWeight: 700, fontSize: 10, marginBottom: 12 },
  structBar:        { flexDirection: 'row', height: 7, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  structItemsRow:   { flexDirection: 'row' },
  structItem:       { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 7, padding: 9 },
  structItemMid:    { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 7, padding: 9, marginLeft: 6, marginRight: 6 },
  structDot:        { width: 7, height: 7, borderRadius: 2, marginBottom: 4 },
  structName:       { color: '#191C1C', fontFamily: 'Manrope', fontWeight: 700, fontSize: 7.5 },
  structPct:        { color: '#717975', fontSize: 7, marginTop: 1 },
  structAmt:        { color: '#1D5039', fontFamily: 'Manrope', fontWeight: 700, fontSize: 8.5, marginTop: 3 },

  // ── Rooms page ────────────────────────────────────────────────────────
  roomsBody:      { paddingLeft: 44, paddingRight: 44, paddingTop: 36, paddingBottom: 80 },
  roomsTitle:     { color: '#191C1C', fontFamily: 'Manrope', fontWeight: 700, fontSize: 18, marginBottom: 4 },
  roomsSub:       { color: '#717975', fontSize: 9, marginBottom: 24 },

  roomCard:       { marginBottom: 18, borderWidth: 1, borderColor: '#E1E3E2', borderStyle: 'solid', borderRadius: 10 },
  roomHead:       { backgroundColor: '#F6F3F2', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: '#E1E3E2', borderBottomStyle: 'solid', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  roomName:       { color: '#191C1C', fontFamily: 'Manrope', fontWeight: 700, fontSize: 13 },
  roomDims:       { color: '#717975', fontSize: 8, marginTop: 2 },
  roomTotal:      { color: '#1D5039', fontFamily: 'Manrope', fontWeight: 700, fontSize: 13 },

  secRow:         { paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E1E3E2', borderBottomStyle: 'solid' },
  secRowLast:     { paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 },
  secHeader:      { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  secDot:         { width: 7, height: 7, borderRadius: 2, marginRight: 7 },
  secName:        { color: '#191C1C', fontFamily: 'Manrope', fontWeight: 700, fontSize: 8.5, textTransform: 'uppercase', letterSpacing: 0.5, flex: 1 },
  secAmt:         { color: '#1D5039', fontFamily: 'Manrope', fontWeight: 700, fontSize: 9 },
  secItem:        { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 },
  secBullet:      { color: '#717975', fontSize: 8, width: 10 },
  secText:        { color: '#717975', fontSize: 7.5, flex: 1, lineHeight: 1.4 },

  summaryRow:     { backgroundColor: '#E8F5E9', borderRadius: 10, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  summaryLabel:   { color: '#1D5039', fontFamily: 'Manrope', fontWeight: 700, fontSize: 10 },
  summaryValue:   { color: '#1D5039', fontFamily: 'Manrope', fontWeight: 700, fontSize: 14 },

  noRooms:        { backgroundColor: '#F6F3F2', borderRadius: 10, padding: 24 },
  noRoomsText:    { color: '#717975', fontSize: 9, textAlign: 'center', lineHeight: 1.6 },
})

/* ─── Footer ───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerBrand}>Remontowo.pl</Text>
      <Text style={s.footerDisc}>
        Niniejszy kosztorys ma charakter orientacyjny. Za bardziej dokładnym obliczeniem należy zwracać się do profesjonalnych firm remontowych.
        Nasz proszcz może być niepełny, a jedynie punktem wyjścia.
      </Text>
      <Text
        style={s.footerPage}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </View>
  )
}

/* ─── Room card ─────────────────────────────────────────────────────────── */
function RoomCard({ room }: { room: PDFRoomData }) {
  const m2 = (room.width * room.length).toFixed(1)
  const mItems = matItems(room)
  const rItems = robItems(room)
  const pItems = prepItems(room)

  return (
    <View style={s.roomCard} wrap={false}>
      {/* Header */}
      <View style={s.roomHead}>
        <View>
          <Text style={s.roomName}>{room.label.toUpperCase()}</Text>
          <Text style={s.roomDims}>
            {room.width}m × {room.length}m = {m2} m²  ·  wys. {room.height.toFixed(1)} m
          </Text>
        </View>
        <Text style={s.roomTotal}>~{fmt(room.cost.total)} PLN</Text>
      </View>

      {/* MATERIAŁY */}
      <View style={s.secRow}>
        <View style={s.secHeader}>
          <View style={[s.secDot, { backgroundColor: '#1D5039' }]} />
          <Text style={s.secName}>Materiały</Text>
          <Text style={s.secAmt}>~{fmt(room.cost.mat)} PLN</Text>
        </View>
        {mItems.length === 0
          ? <Text style={s.secText}>Brak wybranych wykończeń</Text>
          : mItems.map((item, i) => (
            <View key={i} style={s.secItem}>
              <Text style={s.secBullet}>•</Text>
              <Text style={s.secText}>{item}</Text>
            </View>
          ))
        }
      </View>

      {/* ROBOCIZNA */}
      <View style={s.secRow}>
        <View style={s.secHeader}>
          <View style={[s.secDot, { backgroundColor: '#4D8F6A' }]} />
          <Text style={s.secName}>Robocizna</Text>
          <Text style={s.secAmt}>~{fmt(room.cost.labor)} PLN</Text>
        </View>
        {rItems.length === 0
          ? <Text style={s.secText}>Brak wybranych wykończeń</Text>
          : rItems.map((item, i) => (
            <View key={i} style={s.secItem}>
              <Text style={s.secBullet}>•</Text>
              <Text style={s.secText}>{item}</Text>
            </View>
          ))
        }
      </View>

      {/* PRZYGOTOWANIE */}
      <View style={s.secRowLast}>
        <View style={s.secHeader}>
          <View style={[s.secDot, { backgroundColor: '#C4C7C5' }]} />
          <Text style={s.secName}>Przygotowanie</Text>
          <Text style={s.secAmt}>~{fmt(room.cost.prep)} PLN</Text>
        </View>
        {pItems.length === 0
          ? <Text style={s.secText}>Brak wybranych wykończeń</Text>
          : pItems.map((item, i) => (
            <View key={i} style={s.secItem}>
              <Text style={s.secBullet}>•</Text>
              <Text style={s.secText}>{item}</Text>
            </View>
          ))
        }
      </View>
    </View>
  )
}

/* ─── Main document ─────────────────────────────────────────────────────── */
export function KosztorysPDF({ data }: { data: PDFData }) {
  const { est } = data
  const total = est.mat + est.labor + est.prep
  const matPct  = Math.round(est.mat   / total * 100)
  const labPct  = Math.round(est.labor / total * 100)
  const prepPct = 100 - matPct - labPct

  return (
    <Document
      title="Kosztorys Remontu — Remontowo"
      author="Remontowo.pl"
    >
      {/* ══ Page 1 — Cover + Summary ══ */}
      <Page size="A4" style={s.page}>
        {/* Dark green banner */}
        <View style={s.coverBanner}>
          <Text style={s.coverLogo}>REMONTOWO</Text>
          <Text style={s.coverLogoSub}>remontowo.pl · bezpłatny kalkulator kosztów remontu</Text>
        </View>

        <View style={s.coverBody}>
          <Text style={s.coverTitle}>Kosztorys Remontu</Text>
          <Text style={s.coverSub}>Wygenerowano {data.generatedAt}</Text>

          {/* Config meta */}
          <View style={s.metaRow}>
            {[
              { label: 'Miasto',       value: CITY_L[data.city]      ?? data.city },
              { label: 'Typ',          value: data.propType === 'dom' ? 'Dom' : 'Mieszkanie' },
              { label: 'Rodzaj prac',  value: CT_L[data.calcType]    ?? data.calcType },
              { label: 'Standard',     value: STD_L[data.standard]   ?? data.standard },
              { label: 'Powierzchnia', value: `${data.area.toFixed(0)} m²` },
            ].map(({ label, value }) => (
              <View key={label} style={s.metaItem}>
                <Text style={s.metaLabel}>{label}</Text>
                <Text style={s.metaValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Total cost card */}
          <View style={s.totalCard}>
            <Text style={s.totalLabel}>Całkowity szacowany koszt</Text>
            <Text style={s.totalRange}>{fmt(est.min)} – {fmt(est.max)} PLN</Text>
            <Text style={s.totalNote}>±10–15% dokładności · ceny rynkowe 2026</Text>

            <View style={s.totalStatsRow}>
              {[
                { label: 'Materiały',     value: `~${fmt(est.mat)} PLN`   },
                { label: 'Robocizna',     value: `~${fmt(est.labor)} PLN` },
                { label: 'Przygotowanie', value: `~${fmt(est.prep)} PLN`  },
                { label: 'Łącznie m²',   value: `${est.m2.toFixed(0)} m²` },
              ].map(({ label, value }) => (
                <View key={label} style={s.totalStatItem}>
                  <Text style={s.totalStatLabel}>{label}</Text>
                  <Text style={s.totalStatValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Cost structure */}
          <View style={s.structCard}>
            <Text style={s.structTitle}>Struktura kosztów</Text>

            <View style={s.structBar}>
              <View style={{ flex: matPct,  backgroundColor: '#1D5039' }} />
              <View style={{ flex: labPct,  backgroundColor: '#4D8F6A' }} />
              <View style={{ flex: prepPct, backgroundColor: '#C4C7C5' }} />
            </View>

            <View style={s.structItemsRow}>
              {([
                { label: 'Materiały',     pct: matPct,  amt: est.mat,   dot: '#1D5039', style: s.structItem    },
                { label: 'Robocizna',     pct: labPct,  amt: est.labor, dot: '#4D8F6A', style: s.structItemMid },
                { label: 'Przygotowanie', pct: prepPct, amt: est.prep,  dot: '#C4C7C5', style: s.structItem    },
              ] as const).map(({ label, pct, amt, dot, style }) => (
                <View key={label} style={style}>
                  <View style={[s.structDot, { backgroundColor: dot }]} />
                  <Text style={s.structName}>{label}</Text>
                  <Text style={s.structPct}>{pct}% udziału</Text>
                  <Text style={s.structAmt}>~{fmt(amt)} PLN</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ══ Page 2+ — Room details ══ */}
      <Page size="A4" style={s.page}>
        <View style={s.roomsBody}>
          <Text style={s.roomsTitle}>Szczegóły pomieszczeń</Text>
          <Text style={s.roomsSub}>
            Podział kosztów materiałów, robocizny i przygotowania dla każdego pomieszczenia
          </Text>

          {data.rooms.length === 0 ? (
            <View style={s.noRooms}>
              <Text style={s.noRoomsText}>
                Kosztorys oparty na łącznej powierzchni {data.area.toFixed(0)} m² bez podziału na pomieszczenia.{'\n'}
                Aby uzyskać szczegółowy podział, wróć do kalkulatora i dodaj poszczególne pomieszczenia.
              </Text>
            </View>
          ) : (
            data.rooms.map((room, i) => <RoomCard key={i} room={room} />)
          )}

          {/* Grand total */}
          <View style={s.summaryRow}>
            <Text style={s.summaryLabel}>Suma szacunkowa (wszystkie pomieszczenia)</Text>
            <Text style={s.summaryValue}>{fmt(est.min)} – {fmt(est.max)} PLN</Text>
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  )
}
