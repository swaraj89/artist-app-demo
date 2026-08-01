import { useEffect, useState } from 'react'
import { Eye, Pencil, Trash2, Plus } from 'lucide-react'
import { useArtists } from '../hooks/useArtists'
import type { Artist } from '../lib/api'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from './ui/AlertDialog'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

interface ArtistTableProps {
  onOpenCreate: () => void
  onEditArtist: (artist: Artist) => void
  onViewArtist: (artistId: string) => void
}

function ArtistRow({ artist, onEditArtist, onViewArtist, isEven }: { artist: Artist; onEditArtist: (artist: Artist) => void; onViewArtist: (artistId: string) => void; isEven: boolean }) {
  const { deleteMutation } = useArtists()

  return (
    <tr className={
      `transition-colors ${isEven ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'} hover:bg-slate-100 dark:hover:bg-slate-900`
    }>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{artist.artistName}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{artist.gender}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{artist.countryOfOrigin}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{artist.primaryLanguage}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{artist.primaryGenre}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{artist.artistType}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{artist.debutYear}</td>
      <td className="px-4 py-3 text-right space-x-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewArtist(artist.artistId)}
          title="View artist"
          aria-label="View artist"
          className="h-10 w-10 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEditArtist(artist)}
          title="Edit artist"
          aria-label="Edit artist"
          className="h-10 w-10 p-0"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              title="Delete artist"
              aria-label="Delete artist"
              className="h-10 w-10 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Delete artist?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete <strong>{artist.artistName}</strong>?
            </AlertDialogDescription>
            <div className="mt-6 flex justify-end gap-2">
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(artist.artistId)}
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  )
}

export function ArtistTable({ onOpenCreate, onEditArtist, onViewArtist }: ArtistTableProps) {
  const { listQuery, artistCountriesQuery } = useArtists()
  const [search, setSearch] = useState('')
  const [artistNameFilter, setArtistNameFilter] = useState('')
  const [country, setCountry] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [sortBy, setSortBy] = useState('artistName,asc')
  const pageOptions = [5, 8, 12, 20]

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setArtistNameFilter(search.trim())
      setPage(1)
    }, 400)

    return () => window.clearTimeout(handler)
  }, [search])

  const pageQuery = listQuery(page - 1, pageSize, sortBy, artistNameFilter, country || undefined)
  const artists = pageQuery.data?.content ?? []
  const pageCount = Math.max(1, pageQuery.data?.totalPages ?? 1)

  const getSortDirection = (field: string) => {
    if (!sortBy.startsWith(field)) return ''
    return sortBy.endsWith(',asc') ? '↑' : '↓'
  }

  const handleSort = (field: string) => {
    setSortBy((current) => {
      const [currentField, currentDirection] = current.split(',')
      if (currentField === field) {
        return `${field},${currentDirection === 'asc' ? 'desc' : 'asc'}`
      }
      return `${field},asc`
    })
    setPage(1)
  }

  const countryQuery = artistCountriesQuery()
  const countryOptions = countryQuery.data ?? []

  const getPageItems = () => {
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, index) => index + 1)
    }

    if (page <= 3) {
      return [1, 2, 3, '...', pageCount] as const
    }

    if (page >= pageCount - 2) {
      return [1, '...', pageCount - 2, pageCount - 1, pageCount] as const
    }

    return [1, '...', page - 1, page, page + 1, '...', pageCount] as const
  }

  const handlePageSizeChange = (value: number) => {
    setPageSize(value)
    setPage(1)
  }

  if (pageQuery.isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(pageSize)].map((_, idx) => (
          <div key={idx} className="h-14 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    )
  }

  if (pageQuery.isError) {
    return <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-200">Unable to load artists. Please try again.</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 flex-1">
          <div className="flex-1">
            <Input
              placeholder="Search by artist name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
            <label htmlFor="country-filter" className="font-medium">Country:</label>
            <select
              id="country-filter"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value)
                setPage(1)
              }}
              className="rounded-md border border-slate-300 bg-transparent px-2 py-1 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
            >
              <option value="">All countries</option>
              {countryOptions.map((countryOption) => (
                <option key={countryOption} value={countryOption}>{countryOption}</option>
              ))}
            </select>
          </div>
          {(artistNameFilter || country) ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('')
                setArtistNameFilter('')
                setCountry('')
                setPage(1)
              }}
            >
              Clear filters
            </Button>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
            <label htmlFor="page-size" className="font-medium">Per page:</label>
            <select
              id="page-size"
              value={pageSize}
              onChange={(event) => handlePageSizeChange(Number(event.target.value))}
              className="rounded-md border border-slate-300 bg-transparent px-2 py-1 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
            >
              {pageOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <Button onClick={onOpenCreate} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Artist
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-700">
        <table className="w-full border-collapse bg-white text-left dark:bg-slate-950">
              <thead>
                <tr className="bg-slate-900 text-slate-100 shadow-inner shadow-slate-950/20 dark:bg-slate-950">
                  <th className="border-b border-slate-700 px-4 py-3 text-sm font-semibold uppercase tracking-wide">
                    <button type="button" className="inline-flex items-center gap-1" onClick={() => handleSort('artistName')}>
                      Artist Name
                      <span className="text-xs text-slate-300">{getSortDirection('artistName')}</span>
                    </button>
                  </th>
                  <th className="border-b border-slate-700 px-4 py-3 text-sm font-semibold uppercase tracking-wide">Gender</th>
                  <th className="border-b border-slate-700 px-4 py-3 text-sm font-semibold uppercase tracking-wide">Country</th>
                  <th className="border-b border-slate-700 px-4 py-3 text-sm font-semibold uppercase tracking-wide">Language</th>
                  <th className="border-b border-slate-700 px-4 py-3 text-sm font-semibold uppercase tracking-wide">
                    <button type="button" className="inline-flex items-center gap-1" onClick={() => handleSort('primaryGenre')}>
                      Genre
                      <span className="text-xs text-slate-300">{getSortDirection('primaryGenre')}</span>
                    </button>
                  </th>
                  <th className="border-b border-slate-700 px-4 py-3 text-sm font-semibold uppercase tracking-wide">
                    <button type="button" className="inline-flex items-center gap-1" onClick={() => handleSort('artistType')}>
                      Type
                      <span className="text-xs text-slate-300">{getSortDirection('artistType')}</span>
                    </button>
                  </th>
                  <th className="border-b border-slate-700 px-4 py-3 text-sm font-semibold uppercase tracking-wide">
                    <button type="button" className="inline-flex items-center gap-1" onClick={() => handleSort('debutYear')}>
                      Debut Year
                      <span className="text-xs text-slate-300">{getSortDirection('debutYear')}</span>
                    </button>
                  </th>
                  <th className="border-b border-slate-700 px-4 py-3 text-sm font-semibold uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {artists.map((artist, index) => (
                  <ArtistRow
                    key={artist.artistId}
                    artist={artist}
                    onEditArtist={onEditArtist}
                    onViewArtist={onViewArtist}
                    isEven={index % 2 === 0}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {artists.length} of {artists.length} artists on page {page} of {pageCount}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                Previous
              </Button>
              {getPageItems().map((item, index) => {
                if (item === '...') {
                  return (
                    <span key={`ellipsis-${index}`} className="inline-flex h-10 items-center justify-center px-3 text-sm text-slate-500 dark:text-slate-400">
                      …
                    </span>
                  )
                }

                return (
                  <Button
                    key={item}
                    variant={item === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPage(item as number)}
                    className="min-w-[2.5rem]"
                  >
                    {item}
                  </Button>
                )
              })}
              <Button variant="outline" size="sm" onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))} disabled={page === pageCount}>
                Next
              </Button>
            </div>
          </div>
      </div>
    )
  }

