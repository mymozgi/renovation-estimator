export interface PDFRoomData {
  label:   string
  width:   number
  length:  number
  height:  number
  walls:   string | null
  floor:   string | null
  ceiling: string | null
  cost: { mat: number; labor: number; prep: number; total: number }
}

export interface PDFData {
  city:       string
  propType:   string
  standard:   string
  calcType:   string
  area:       number
  est:        { min: number; max: number; mat: number; labor: number; prep: number; m2: number }
  rooms:      PDFRoomData[]
  generatedAt: string
}
