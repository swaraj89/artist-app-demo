import * as Dialog from '@radix-ui/react-dialog'
import { BarChart3, CalendarDays, Globe, Music2, Percent, Sparkles, Users, User } from 'lucide-react'
import { useArtists } from '../hooks/useArtists'
import { Button } from './ui/Button'

const detailFields = [
  { key: 'gender', label: 'Gender', icon: User, description: 'Artist identity and spotlight classification.' },
  { key: 'artistType', label: 'Artist type', icon: Users, description: 'Solo performer or group collective.' },
  { key: 'countryOfOrigin', label: 'Country', icon: Globe, description: 'Primary origin for the artist.' },
  { key: 'primaryLanguage', label: 'Language', icon: Globe, description: 'Main language used in releases.' },
  { key: 'primaryGenre', label: 'Genre', icon: Music2, description: 'Primary musical style.' },
  { key: 'debutYear', label: 'Debut year', icon: CalendarDays, description: 'Year the artist first appeared publicly.' },
] as const

const metricLabels = [
  { key: 'totalStreams', label: 'Total Streams', icon: BarChart3, description: 'All stream volume in millions.' },
  { key: 'leadStreams', label: 'Lead Streams', icon: Sparkles, description: 'Streams where the artist is credited as lead.' },
  { key: 'featureStreams', label: 'Feature Streams', icon: Users, description: 'Streams where the artist is featured.' },
  { key: 'soloStreams', label: 'Solo Streams', icon: User, description: 'Streams from solo performances.' },
  { key: 'percentOfSoloStreams', label: 'Percent Solo Streams', icon: Percent, description: 'Share of solo stream volume.' },
  { key: 'collaborativeStreams', label: 'Collaborative Streams', icon: Users, description: 'Streams from collaborations or group work.' },
  { key: 'percentOfCollaborativeStreams', label: 'Percent Collaborative Streams', icon: Percent, description: 'Share of collaborative stream volume.' },
] as const

type ArtistDetailDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  artistId?: string
}

function formatStreamValue(key: string, value: number | null) {
  if (value === null) {
    return 'No data available'
  }

  if (key.startsWith('percent')) {
    return `${value.toFixed(1).replace(/\.0$/, '')}%`
  }

  if (value >= 10) {
    return `${Math.round(value)}M`
  }

  if (value >= 1) {
    return `${value.toFixed(1).replace(/\.0$/, '')}M`
  }

  return `${value.toFixed(2).replace(/\.0+$/, '')}M`
}

export function ArtistDetailDrawer({ open, onOpenChange, artistId }: ArtistDetailDrawerProps) {
  const { getArtistQuery } = useArtists()
  const query = getArtistQuery(artistId ?? '')

  const artist = query.data

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Artist detail</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-50">Profile drawer</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">View artist metadata and streaming metrics without leaving the list.</p>
            </div>
            <Dialog.Close asChild>
              <Button variant="outline" className="h-10">Close</Button>
            </Dialog.Close>
          </div>

          {query.isLoading ? (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-900">Loading artist details…</div>
          ) : query.isError || !artist ? (
            <div className="mt-8 rounded-3xl border border-red-300 bg-red-50 p-8 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
              Unable to load artist details.
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                      <Music2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Artist</p>
                      <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">{artist.artistName}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{artist.primaryGenre} · {artist.artistType.toLowerCase()}</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {detailFields.map((field) => {
                      const Icon = field.icon
                      return (
                        <div key={field.key} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{field.label}</p>
                            <p className="mt-1 text-base font-semibold text-slate-950 dark:text-slate-100">{String(artist[field.key as keyof typeof artist])}</p>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{field.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Streaming metrics</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-slate-50">Millions view</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">All stream totals are shown with a human-friendly millions format.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {metricLabels.map((metric) => {
                    const Icon = metric.icon
                    const rawValue = artist[metric.key as keyof typeof artist] as number | null
                    return (
                      <div key={metric.key} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.label}</p>
                            <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-slate-50">{formatStreamValue(metric.key, rawValue)}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{metric.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
