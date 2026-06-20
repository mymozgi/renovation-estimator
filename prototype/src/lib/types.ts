export type PropertyType = 'apartment' | 'house'
export type PropertyCondition = 'new' | 'preowned'
export type RenovationScope = 'cosmetic' | 'premium' | 'full'
export type City = 'warsaw' | 'krakow' | 'wroclaw' | 'gdansk' | 'poznan' | 'other'

export type RoomType = 'kitchen' | 'living_room' | 'bedroom' | 'bathroom' | 'hallway' | 'office'
export type QualityTier = 'economy' | 'standard' | 'premium'

export type WallFinish = 'paint' | 'wallpaper' | 'decorative_plaster'
export type FloorFinish = 'laminate' | 'tile' | 'vinyl'
export type CeilingFinish = 'paint' | 'stretch_ceiling' | 'drywall'

export type WallCondition = 'ready' | 'primer' | 'putty' | 'full_prep'
export type FloorCondition = 'ready' | 'leveling'
export type CeilingCondition = 'ready' | 'primer' | 'full_prep'

export interface Room {
  id: string
  type: RoomType
  width: number
  length: number
  height: number
  windows: number
  doors: number
  wallCondition: WallCondition
  floorCondition: FloorCondition
  ceilingCondition: CeilingCondition
  wallFinish: WallFinish
  floorFinish: FloorFinish
  ceilingFinish: CeilingFinish
  qualityTier: QualityTier
}

export interface PropertySettings {
  type: PropertyType | null
  condition: PropertyCondition | null
  qualityTier: QualityTier | null
  scope: RenovationScope | null
  city: City | null
}

export interface EstimateRange {
  min: number
  max: number
}

export interface RoomEstimate {
  roomId: string
  areas: { wall: number; floor: number; ceiling: number }
  materials: EstimateRange
  preparation: EstimateRange
  labor: EstimateRange
  supporting: EstimateRange
  total: EstimateRange
}
