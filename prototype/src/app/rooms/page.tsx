'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { WizardLayout } from '@/components/WizardLayout'
import { RoomCard } from '@/components/RoomCard'
import { RunningEstimateFooter } from '@/components/RunningEstimateFooter'
import { RoomWizard } from '@/components/RoomWizard'
import { useEstimatorStore } from '@/lib/store'
import { calcRoomEstimate, calcTotalEstimate } from '@/lib/calculations'
import type { Room } from '@/lib/types'

let nextId = 1

export default function RoomsPage() {
  const router = useRouter()
  const { rooms, property, addRoom, updateRoom, removeRoom } = useEstimatorStore()
  const [wizardOpen, setWizardOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null)

  const city = property.city ?? 'other'
  const total = calcTotalEstimate(rooms, city)

  function handleSave(draft: Omit<Room, 'id'>) {
    if (editingRoom) {
      updateRoom(editingRoom.id, draft)
    } else {
      addRoom({ ...draft, id: String(nextId++) })
    }
    setWizardOpen(false)
    setEditingRoom(null)
  }

  function openAdd() {
    setEditingRoom(null)
    setWizardOpen(true)
  }

  function openEdit(room: Room) {
    setEditingRoom(room)
    setWizardOpen(true)
  }

  return (
    <>
      <WizardLayout
        step={2}
        totalSteps={4}
        backHref="/estimate"
        footer={
          <div className="space-y-3">
            <RunningEstimateFooter total={total} roomCount={rooms.length} />
            <button
              onClick={() => router.push('/report')}
              disabled={rooms.length === 0}
              className="w-full bg-primary text-white font-semibold rounded-xl py-4 text-base disabled:bg-muted-green disabled:cursor-not-allowed transition-colors hover:bg-primary/90"
            >
              See full estimate →
            </button>
          </div>
        }
      >
        <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Your rooms</h2>
        <p className="text-muted text-sm mb-5">Add each room you want to renovate.</p>

        <button
          onClick={openAdd}
          className="w-full border-2 border-dashed border-border rounded-xl py-4 flex items-center justify-center gap-2 text-muted font-medium hover:border-primary/50 hover:text-primary transition-colors mb-4"
        >
          <Plus size={16} />
          Add a room
        </button>

        <div className="space-y-3">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              estimate={calcRoomEstimate(room, city).total}
              onEdit={() => openEdit(room)}
              onRemove={() => setConfirmRemove(room.id)}
            />
          ))}
        </div>
      </WizardLayout>

      {/* Room wizard overlay */}
      {wizardOpen && (
        <RoomWizard
          initial={editingRoom ?? undefined}
          onSave={handleSave}
          onClose={() => { setWizardOpen(false); setEditingRoom(null) }}
        />
      )}

      {/* Remove confirmation */}
      {confirmRemove && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end max-w-md mx-auto">
          <div className="w-full bg-surface rounded-t-2xl p-6">
            <h3 className="font-serif font-bold text-fg text-lg mb-2">Remove room?</h3>
            <p className="text-muted text-sm mb-5">This room and its estimate will be deleted.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmRemove(null)}
                className="flex-1 border border-border rounded-xl py-3 font-medium text-fg"
              >
                Cancel
              </button>
              <button
                onClick={() => { removeRoom(confirmRemove); setConfirmRemove(null) }}
                className="flex-1 bg-destructive text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2"
              >
                <Trash2 size={15} /> Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
