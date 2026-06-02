import type { City, WallFinish, FloorFinish, CeilingFinish, QualityTier, WallCondition, FloorCondition, CeilingCondition } from './types'

export const REGIONAL_MULTIPLIERS: Record<City, number> = {
  warsaw: 1.20,
  krakow: 1.10,
  wroclaw: 1.10,
  gdansk: 1.05,
  poznan: 1.05,
  other: 1.00,
}

// Material costs PLN/m² [min, max] per finish × tier
export const WALL_MATERIAL: Record<WallFinish, Record<QualityTier, [number, number]>> = {
  paint:               { economy: [12, 18], standard: [22, 35], premium: [40, 65] },
  wallpaper:           { economy: [28, 42], standard: [55, 80], premium: [100, 160] },
  decorative_plaster:  { economy: [35, 50], standard: [70, 100], premium: [130, 200] },
}

export const FLOOR_MATERIAL: Record<FloorFinish, Record<QualityTier, [number, number]>> = {
  laminate: { economy: [22, 32], standard: [40, 60], premium: [75, 120] },
  tile:     { economy: [40, 60], standard: [75, 110], premium: [140, 220] },
  vinyl:    { economy: [18, 28], standard: [35, 50], premium: [65, 100] },
}

export const CEILING_MATERIAL: Record<CeilingFinish, Record<QualityTier, [number, number]>> = {
  paint:          { economy: [10, 16], standard: [20, 30], premium: [35, 55] },
  stretch_ceiling: { economy: [55, 80], standard: [90, 130], premium: [160, 240] },
  drywall:        { economy: [45, 65], standard: [80, 115], premium: [140, 200] },
}

// Labor costs PLN/m² [min, max] per finish (tier-independent)
export const WALL_LABOR: Record<WallFinish, [number, number]> = {
  paint:              [22, 38],
  wallpaper:          [32, 52],
  decorative_plaster: [48, 78],
}

export const FLOOR_LABOR: Record<FloorFinish, [number, number]> = {
  laminate: [22, 38],
  tile:     [55, 95],
  vinyl:    [18, 32],
}

export const CEILING_LABOR: Record<CeilingFinish, [number, number]> = {
  paint:           [18, 32],
  stretch_ceiling: [75, 140],
  drywall:         [55, 90],
}

// Preparation costs PLN/m² [min, max]
export const WALL_PREP: Record<WallCondition, [number, number]> = {
  ready:     [0, 0],
  primer:    [6, 12],
  putty:     [16, 26],
  full_prep: [32, 52],
}

export const FLOOR_PREP: Record<FloorCondition, [number, number]> = {
  ready:    [0, 0],
  leveling: [22, 38],
}

export const CEILING_PREP: Record<CeilingCondition, [number, number]> = {
  ready:     [0, 0],
  primer:    [6, 10],
  full_prep: [20, 35],
}

// Window and door area deductions (m²)
export const WINDOW_AREA = 1.5
export const DOOR_AREA = 2.0

// Supporting materials as % of total materials
export const SUPPORTING_MATERIALS_RATE: [number, number] = [0.10, 0.15]
