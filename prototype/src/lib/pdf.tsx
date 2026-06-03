import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import type { Room, PropertySettings } from './types'
import { calcRoomEstimate, calcTotalEstimate, formatPLN } from './calculations'
import {
  ROOM_TYPE_LABELS,
  WALL_FINISH_LABELS,
  FLOOR_FINISH_LABELS,
  CEILING_FINISH_LABELS,
  QUALITY_LABELS,
  CITY_LABELS,
  PROPERTY_TYPE_LABELS,
  SCOPE_LABELS,
} from './labels'

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1C1C1A',
    paddingHorizontal: 40,
    paddingVertical: 36,
    backgroundColor: '#FFFFFF',
  },
  // Header
  header: { marginBottom: 20 },
  title: { fontSize: 20, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  subtitle: { fontSize: 9, color: '#6B7060' },

  // Disclaimer banner
  disclaimer: {
    backgroundColor: '#F5F5E8',
    borderRadius: 4,
    padding: '8 12',
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#2D5A3D',
  },
  disclaimerText: { fontSize: 8, color: '#3D5020', lineHeight: 1.5 },

  // Total box
  totalBox: {
    backgroundColor: '#F0EBE0',
    borderRadius: 6,
    padding: '12 16',
    marginBottom: 16,
  },
  totalLabel: { fontSize: 8, color: '#6B7060', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  totalValue: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#1C1C1A', marginBottom: 2 },
  totalMeta: { fontSize: 7.5, color: '#6B7060' },

  // Cost breakdown
  sectionTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#6B7060', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, marginTop: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 0.5, borderBottomColor: '#E2DAD0' },
  rowLabel: { fontSize: 9, color: '#1C1C1A' },
  rowValue: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#1C1C1A' },

  // Room card
  roomCard: {
    borderWidth: 0.5,
    borderColor: '#E2DAD0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8 12',
    backgroundColor: '#FAFAF8',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2DAD0',
  },
  roomName: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#1C1C1A' },
  roomTotal: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#2D5A3D' },
  roomBody: { padding: '6 12 10' },
  roomMeta: { fontSize: 7.5, color: '#6B7060', marginBottom: 3 },
  roomBadge: {
    backgroundColor: '#E8F0EB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  roomBadgeText: { fontSize: 7, color: '#2D5A3D', fontFamily: 'Helvetica-Bold' },
  roomRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  roomRowLabel: { fontSize: 8, color: '#6B7060' },
  roomRowValue: { fontSize: 8, color: '#1C1C1A' },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    borderTopWidth: 0.5,
    borderTopColor: '#E2DAD0',
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 7, color: '#9B9A8A' },
})

interface PDFReportProps {
  property: PropertySettings
  rooms: Room[]
}

export function PDFReport({ property, rooms }: PDFReportProps) {
  const city = property.city ?? 'other'
  const cityLabel = property.city ? CITY_LABELS[property.city] : 'the selected region'
  const estimates = rooms.map((r) => calcRoomEstimate(r, city))
  const total = calcTotalEstimate(rooms, city)

  const aggregated = estimates.reduce(
    (acc, e) => ({
      materials:   { min: acc.materials.min + e.materials.min,     max: acc.materials.max + e.materials.max },
      labor:       { min: acc.labor.min + e.labor.min,             max: acc.labor.max + e.labor.max },
      preparation: { min: acc.preparation.min + e.preparation.min, max: acc.preparation.max + e.preparation.max },
      supporting:  { min: acc.supporting.min + e.supporting.min,   max: acc.supporting.max + e.supporting.max },
    }),
    { materials: {min:0,max:0}, labor: {min:0,max:0}, preparation: {min:0,max:0}, supporting: {min:0,max:0} }
  )

  const scopeLabel = property.scope ? SCOPE_LABELS[property.scope].label : ''
  const typeLabel  = property.type  ? PROPERTY_TYPE_LABELS[property.type] : ''

  const fmtRange = (r: { min: number; max: number }) =>
    `${formatPLN(r.min)} – ${formatPLN(r.max)} PLN`

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.title}>Renovation Estimate Report</Text>
          <Text style={s.subtitle}>
            {[typeLabel, scopeLabel, cityLabel].filter(Boolean).join(' · ')}
          </Text>
        </View>

        {/* Regional disclaimer */}
        <View style={s.disclaimer}>
          <Text style={s.disclaimerText}>
            Prices are average estimates for {cityLabel}. Actual costs may vary ±10–15% depending on contractor, timeline, and current market conditions. This is not a final quote.
          </Text>
        </View>

        {/* Total */}
        <View style={s.totalBox}>
          <Text style={s.totalLabel}>Total estimate</Text>
          <Text style={s.totalValue}>{fmtRange(total)}</Text>
          <Text style={s.totalMeta}>{rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} · Based on {cityLabel} regional pricing</Text>
        </View>

        {/* Cost breakdown */}
        <Text style={s.sectionTitle}>Cost breakdown</Text>
        {[
          { label: 'Materials',           value: aggregated.materials   },
          { label: 'Labor',               value: aggregated.labor       },
          { label: 'Surface preparation', value: aggregated.preparation },
          { label: 'Supporting materials',value: aggregated.supporting  },
        ].map(({ label, value }) => (
          <View key={label} style={s.row}>
            <Text style={s.rowLabel}>{label}</Text>
            <Text style={s.rowValue}>{fmtRange(value)}</Text>
          </View>
        ))}

        {/* Room breakdown */}
        <Text style={s.sectionTitle}>Room breakdown</Text>
        {rooms.map((room, i) => {
          const est = estimates[i]
          return (
            <View key={room.id} style={s.roomCard} wrap={false}>
              <View style={s.roomHeader}>
                <Text style={s.roomName}>{ROOM_TYPE_LABELS[room.type]}</Text>
                <Text style={s.roomTotal}>{fmtRange(est.total)}</Text>
              </View>
              <View style={s.roomBody}>
                <View style={s.roomBadge}>
                  <Text style={s.roomBadgeText}>{QUALITY_LABELS[room.qualityTier]}</Text>
                </View>
                <Text style={s.roomMeta}>
                  {room.width}×{room.length}×{room.height} m · Floor {est.areas.floor.toFixed(1)} m² · Wall {est.areas.wall.toFixed(1)} m²
                </Text>
                <Text style={s.roomMeta}>
                  Wall: {WALL_FINISH_LABELS[room.wallFinish]}  ·  Floor: {FLOOR_FINISH_LABELS[room.floorFinish]}  ·  Ceiling: {CEILING_FINISH_LABELS[room.ceilingFinish]}
                </Text>
                <View style={s.roomRow}>
                  <Text style={s.roomRowLabel}>Materials</Text>
                  <Text style={s.roomRowValue}>{fmtRange(est.materials)}</Text>
                </View>
                <View style={s.roomRow}>
                  <Text style={s.roomRowLabel}>Labor</Text>
                  <Text style={s.roomRowValue}>{fmtRange(est.labor)}</Text>
                </View>
                {est.preparation.min > 0 && (
                  <View style={s.roomRow}>
                    <Text style={s.roomRowLabel}>Preparation</Text>
                    <Text style={s.roomRowValue}>{fmtRange(est.preparation)}</Text>
                  </View>
                )}
              </View>
            </View>
          )
        })}

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            Prices are average estimates for {cityLabel}. Actual costs may vary ±10–15%. Not a final quote.
          </Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}
