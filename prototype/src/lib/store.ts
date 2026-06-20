'use client'

import { create } from 'zustand'
import type { PropertySettings, Room } from './types'

interface EstimatorStore {
  property: PropertySettings
  rooms: Room[]
  setProperty: (update: Partial<PropertySettings>) => void
  addRoom: (room: Room) => void
  updateRoom: (id: string, update: Partial<Room>) => void
  removeRoom: (id: string) => void
  reset: () => void
}

const defaultProperty: PropertySettings = {
  type: null,
  condition: null,
  qualityTier: null,
  scope: null,
  city: null,
}

export const useEstimatorStore = create<EstimatorStore>((set) => ({
  property: { ...defaultProperty },
  rooms: [],

  setProperty: (update) =>
    set((s) => ({ property: { ...s.property, ...update } })),

  addRoom: (room) =>
    set((s) => ({ rooms: [...s.rooms, room] })),

  updateRoom: (id, update) =>
    set((s) => ({
      rooms: s.rooms.map((r) => (r.id === id ? { ...r, ...update } : r)),
    })),

  removeRoom: (id) =>
    set((s) => ({ rooms: s.rooms.filter((r) => r.id !== id) })),

  reset: () =>
    set({ property: { ...defaultProperty }, rooms: [] }),
}))
