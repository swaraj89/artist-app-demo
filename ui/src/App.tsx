import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster, toast } from 'sonner'
import { ArtistDetailDrawer } from './components/ArtistDetailView'
import { ArtistTable } from './components/ArtistTable'
import { ArtistModal } from './components/ArtistModal'
import { ThemeToggle } from './components/ThemeToggle'
import { useArtists } from './hooks/useArtists'
import type { Artist, ArtistRequestDto, ValidationErrorResponse } from './lib/api'

const queryClient = new QueryClient()

function AppContent() {
  const { createMutation, updateMutation } = useArtists()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState<Artist | undefined>(undefined)
  const [selectedArtistId, setSelectedArtistId] = useState<string | undefined>(undefined)
  const [detailOpen, setDetailOpen] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleOpenCreate = () => {
    setSelectedArtist(undefined)
    setFieldErrors({})
    setModalOpen(true)
  }

  const handleEditArtist = (artist: Artist) => {
    setSelectedArtist(artist)
    setFieldErrors({})
    setModalOpen(true)
  }

  const handleViewArtist = (artistId: string) => {
    setSelectedArtistId(artistId)
    setDetailOpen(true)
  }

  const handleSave = async (data: ArtistRequestDto) => {
    setFieldErrors({})
    try {
      if (selectedArtist) {
        await updateMutation.mutateAsync({ artistId: selectedArtist.artistId, data })
        toast.success('Artist updated successfully')
      } else {
        await createMutation.mutateAsync(data)
        toast.success('Artist created successfully')
      }
      setModalOpen(false)
    } catch (error) {
      const response = (error as any)?.response?.data as ValidationErrorResponse
      if (response?.errors) {
        setFieldErrors(response.errors)
      } else {
        toast.error('Unable to save artist. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Spotify Artist Manager</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Artist directory</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage artist metadata and view profile details backed by the Spring Boot API.</p>
          </div>
          <ThemeToggle />
        </header>

        <ArtistTable onOpenCreate={handleOpenCreate} onEditArtist={handleEditArtist} onViewArtist={handleViewArtist} />
      </div>

      <ArtistDetailDrawer
        open={Boolean(detailOpen && selectedArtistId)}
        onOpenChange={(open) => {
          setDetailOpen(open)
          if (!open) setSelectedArtistId(undefined)
        }}
        artistId={selectedArtistId}
      />

      <ArtistModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
        title={selectedArtist ? 'Edit artist' : 'Add artist'}
        initialData={selectedArtist}
        errorMap={fieldErrors}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <Toaster position="top-right" richColors />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
