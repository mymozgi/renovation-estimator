'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { WizardLayout } from '@/components/WizardLayout'
import { RoomCard } from '@/components/RoomCard'
import { RunningEstimateFooter } from '@/components/RunningEstimateFooter'
import { RoomWizard } from '@/components/RoomWizard'
import { Button } from '@/components/Button'
import { useEstimatorStore } from '@/lib/store'
import { calcRoomEstimate, calcTotalEstimate } from '@/lib/calculations'
import type { Room } from '@/lib/types'

let nextId = 1

export default function RoomsPage() {
  const router  = useRouter()
  const locale  = useLocale()
  const t       = useTranslations('rooms')
  const { rooms, property, addRoom, updateRoom, removeRoom } = useEstimatorStore()
  const [wizardOpen,   setWizardOpen]   = useState(false)
  const [editingRoom,  setEditingRoom]  = useState<Room | null>(null)
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null)

  const city  = property.city ?? 'other'
  const total = calcTotalEstimate(rooms, city)

  function handleSave(draft: Omit<Room, 'id'>) {
    if (editingRoom) updateRoom(editingRoom.id, draft)
    else addRoom({ ...draft, id: String(nextId++) })
    setWizardOpen(false)
    setEditingRoom(null)
  }

  return (
    <>
      <WizardLayout step={2} totalSteps={4} backHref={`/${locale}/estimate`}
        footer={
          <div className="space-y-3">
            <RunningEstimateFooter total={total} roomCount={rooms.length} />
            <Button onClick={() => router.push(`/${locale}/report`)} disabled={rooms.length === 0}
              fullWidth className="disabled:!bg-muted-green disabled:!opacity-100">
              {t('seeEstimate')}
            </Button>
          </div>
        }
      >
        <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('title')}</h2>
        <p className="text-muted text-sm mb-5">{t('subtitle')}</p>

        <button onClick={() => { setEditingRoom(null); setWizardOpen(true) }}
          className="w-full border-2 border-dashed border-border rounded-xl py-4 flex items-center justify-center gap-2 text-muted font-medium hover:border-primary/50 hover:text-primary transition-colors mb-4">
          <Plus size={16} /> {t('addRoom')}
        </button>

        <div className="space-y-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} estimate={calcRoomEstimate(room, city).total}
              onEdit={() => { setEditingRoom(room); setWizardOpen(true) }}
              onRemove={() => setConfirmRemove(room.id)} />
          ))}
        </div>
      </WizardLayout>

      {wizardOpen && (
        <RoomWizard initial={editingRoom ?? undefined} onSave={handleSave}
          onClose={() => { setWizardOpen(false); setEditingRoom(null) }} />
      )}

      {confirmRemove && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end max-w-md mx-auto">
          <div className="w-full bg-surface rounded-t-2xl p-6">
            <h3 className="font-serif font-bold text-fg text-lg mb-2">{t('removeTitle')}</h3>
            <p className="text-muted text-sm mb-5">{t('removeDesc')}</p>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={() => setConfirmRemove(null)} className="flex-1">{t('cancel')}</Button>
              <Button variant="destructive" size="sm" onClick={() => { removeRoom(confirmRemove); setConfirmRemove(null) }} className="flex-1">
                <Trash2 size={15} /> {t('remove')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
