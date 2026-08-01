import * as Dialog from '@radix-ui/react-dialog'
import type { Artist } from '../lib/api'
import { ArtistForm } from './ArtistForm'
import { Button } from './ui/Button'

interface ArtistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: any) => void
  title: string
  initialData?: Artist
  errorMap?: Record<string, string>
  submitting?: boolean
}

export function ArtistModal({
  open,
  onOpenChange,
  onSave,
  title,
  initialData,
  errorMap,
  submitting,
}: ArtistModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(95vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <Dialog.Title className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage the artist record using the required fields below.</Dialog.Description>

          <div className="mt-6">
            <ArtistForm
              initialData={initialData}
              onSubmit={onSave}
              onClose={() => onOpenChange(false)}
              errorMap={errorMap}
              submitting={submitting}
            />
          </div>

          <Dialog.Close asChild>
            <Button variant="outline" className="mt-4">Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
