import type { Room, City, EstimateRange, RoomEstimate } from './types'
import {
  REGIONAL_MULTIPLIERS,
  WALL_MATERIAL, FLOOR_MATERIAL, CEILING_MATERIAL,
  WALL_LABOR, FLOOR_LABOR, CEILING_LABOR,
  WALL_PREP, FLOOR_PREP, CEILING_PREP,
  WINDOW_AREA, DOOR_AREA,
  SUPPORTING_MATERIALS_RATE,
} from './pricing'

function range(min: number, max: number): EstimateRange {
  return { min: Math.round(min), max: Math.round(max) }
}

function addRanges(...ranges: EstimateRange[]): EstimateRange {
  return range(
    ranges.reduce((s, r) => s + r.min, 0),
    ranges.reduce((s, r) => s + r.max, 0),
  )
}

function scaleRange(r: EstimateRange, factor: number): EstimateRange {
  return range(r.min * factor, r.max * factor)
}

// ─── Area calculations ────────────────────────────────────────────────────────

export function calcAreas(room: Room) {
  const floorArea = room.width * room.length
  const ceilingArea = floorArea
  const perimeterWall = 2 * (room.width + room.length) * room.height
  const windowDeduct = room.windows * WINDOW_AREA
  const doorDeduct = room.doors * DOOR_AREA
  const wallArea = Math.max(0, perimeterWall - windowDeduct - doorDeduct)
  return { wall: wallArea, floor: floorArea, ceiling: ceilingArea }
}

// ─── Per-surface costs ────────────────────────────────────────────────────────

function calcWallCosts(room: Room, area: number) {
  const [matMin, matMax] = WALL_MATERIAL[room.wallFinish][room.qualityTier]
  const [labMin, labMax] = WALL_LABOR[room.wallFinish]
  const [prepMin, prepMax] = WALL_PREP[room.wallCondition]
  return {
    materials:   range(matMin * area, matMax * area),
    labor:       range(labMin * area, labMax * area),
    preparation: range(prepMin * area, prepMax * area),
  }
}

function calcFloorCosts(room: Room, area: number) {
  const [matMin, matMax] = FLOOR_MATERIAL[room.floorFinish][room.qualityTier]
  const [labMin, labMax] = FLOOR_LABOR[room.floorFinish]
  const [prepMin, prepMax] = FLOOR_PREP[room.floorCondition]
  return {
    materials:   range(matMin * area, matMax * area),
    labor:       range(labMin * area, labMax * area),
    preparation: range(prepMin * area, prepMax * area),
  }
}

function calcCeilingCosts(room: Room, area: number) {
  const [matMin, matMax] = CEILING_MATERIAL[room.ceilingFinish][room.qualityTier]
  const [labMin, labMax] = CEILING_LABOR[room.ceilingFinish]
  const [prepMin, prepMax] = CEILING_PREP[room.ceilingCondition]
  return {
    materials:   range(matMin * area, matMax * area),
    labor:       range(labMin * area, labMax * area),
    preparation: range(prepMin * area, prepMax * area),
  }
}

// ─── Room estimate ────────────────────────────────────────────────────────────

export function calcRoomEstimate(room: Room, city: City): RoomEstimate {
  const areas = calcAreas(room)
  const multiplier = REGIONAL_MULTIPLIERS[city]

  const wall    = calcWallCosts(room, areas.wall)
  const floor   = calcFloorCosts(room, areas.floor)
  const ceiling = calcCeilingCosts(room, areas.ceiling)

  const materials   = addRanges(wall.materials, floor.materials, ceiling.materials)
  const labor       = addRanges(wall.labor, floor.labor, ceiling.labor)
  const preparation = addRanges(wall.preparation, floor.preparation, ceiling.preparation)
  const supporting  = range(
    materials.min * SUPPORTING_MATERIALS_RATE[0],
    materials.max * SUPPORTING_MATERIALS_RATE[1],
  )

  const subtotal = addRanges(materials, labor, preparation, supporting)
  const total    = scaleRange(subtotal, multiplier)

  return { roomId: room.id, areas, materials, preparation, labor, supporting, total }
}

export function calcTotalEstimate(rooms: Room[], city: City): EstimateRange {
  if (rooms.length === 0) return { min: 0, max: 0 }
  const estimates = rooms.map(r => calcRoomEstimate(r, city))
  return addRanges(...estimates.map(e => e.total))
}

export function formatPLN(value: number): string {
  return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(value)
}

export function formatRange(range: EstimateRange): string {
  return `${formatPLN(range.min)} – ${formatPLN(range.max)} PLN`
}
