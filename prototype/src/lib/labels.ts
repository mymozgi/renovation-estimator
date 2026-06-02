import type {
  RoomType, QualityTier, WallFinish, FloorFinish, CeilingFinish,
  WallCondition, FloorCondition, CeilingCondition,
  PropertyType, PropertyCondition, RenovationScope, City,
} from './types'

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  kitchen:     'Kitchen',
  living_room: 'Living Room',
  bedroom:     'Bedroom',
  bathroom:    'Bathroom',
  hallway:     'Hallway',
  office:      'Office',
}

export const ROOM_TYPE_ICONS: Record<RoomType, string> = {
  kitchen:     '🍳',
  living_room: '🛋️',
  bedroom:     '🛏️',
  bathroom:    '🛁',
  hallway:     '🚪',
  office:      '💼',
}

export const QUALITY_LABELS: Record<QualityTier, string> = {
  economy:  'Economy',
  standard: 'Standard',
  premium:  'Premium',
}

export const WALL_FINISH_LABELS: Record<WallFinish, string> = {
  paint:              'Paint',
  wallpaper:          'Wallpaper',
  decorative_plaster: 'Decorative Plaster',
}

export const FLOOR_FINISH_LABELS: Record<FloorFinish, string> = {
  laminate: 'Laminate',
  tile:     'Tile',
  vinyl:    'Vinyl',
}

export const CEILING_FINISH_LABELS: Record<CeilingFinish, string> = {
  paint:           'Paint',
  stretch_ceiling: 'Stretch Ceiling',
  drywall:         'Drywall',
}

export const WALL_CONDITION_LABELS: Record<WallCondition, { label: string; description: string; price: string }> = {
  ready:     { label: 'Ready to finish',   description: 'Smooth, no prep needed',              price: '+0 PLN/m²'     },
  primer:    { label: 'Primer needed',     description: 'Surface needs priming',               price: '+6–12 PLN/m²'  },
  putty:     { label: 'Putty needed',      description: 'Leveling and putty required',         price: '+16–26 PLN/m²' },
  full_prep: { label: 'Full preparation',  description: 'Strip, level, putty, prime',          price: '+32–52 PLN/m²' },
}

export const FLOOR_CONDITION_LABELS: Record<FloorCondition, { label: string; description: string; price: string }> = {
  ready:    { label: 'Ready',           description: 'Floor is level and prepared',     price: '+0 PLN/m²'     },
  leveling: { label: 'Leveling needed', description: 'Self-leveling compound required', price: '+22–38 PLN/m²' },
}

export const CEILING_CONDITION_LABELS: Record<CeilingCondition, { label: string; description: string; price: string }> = {
  ready:     { label: 'Ready',            description: 'Ceiling is smooth',              price: '+0 PLN/m²'     },
  primer:    { label: 'Primer needed',    description: 'Ceiling needs priming',          price: '+6–10 PLN/m²'  },
  full_prep: { label: 'Full preparation', description: 'Repair, putty, and prime',       price: '+20–35 PLN/m²' },
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: 'Apartment',
  house:     'House',
}

export const PROPERTY_CONDITION_LABELS: Record<PropertyCondition, { label: string; desc: string; description: string }> = {
  new:      { label: 'New building',  desc: 'Developer finish',  description: 'Developer finish'  },
  preowned: { label: 'Pre-owned',     desc: 'Secondary market',  description: 'Secondary market'  },
}

export const SCOPE_LABELS: Record<RenovationScope, { label: string; desc: string; description: string }> = {
  cosmetic: { label: 'Cosmetic',        desc: 'Paint, floors, minor updates',          description: 'Paint, floors, minor updates'          },
  premium:  { label: 'Premium',         desc: 'High-end materials & luxury finishes',  description: 'High-end materials & luxury finishes'  },
  full:     { label: 'Full renovation', desc: 'Complete room overhaul',                description: 'Complete room overhaul'                },
}

export const CITY_LABELS: Record<City, string> = {
  warsaw:  'Warsaw',
  krakow:  'Kraków',
  wroclaw: 'Wrocław',
  gdansk:  'Gdańsk',
  poznan:  'Poznań',
  other:   'Other city',
}
