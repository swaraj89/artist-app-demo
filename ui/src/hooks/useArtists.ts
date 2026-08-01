import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Artist, ArtistRequestDto, PageResponse } from '../lib/api'
import { createArtist, deleteArtist, fetchArtist, fetchArtistCountries, fetchArtists, updateArtist } from '../lib/api'

const artistsQueryKey = ['artists']

export function useArtists() {
  const queryClient = useQueryClient()

  const listQuery = (page: number, size: number, sort: string, artistName?: string, country?: string) =>
    useQuery<PageResponse<Artist>, Error, PageResponse<Artist>, readonly [string, number, number, string, string | undefined, string | undefined]>({
      queryKey: ['artists', page, size, sort, artistName, country],
      queryFn: () => fetchArtists(page, size, sort, artistName, country),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    })

  const artistCountriesQuery = () =>
    useQuery<string[]>({
      queryKey: ['artistCountries'],
      queryFn: fetchArtistCountries,
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    })

  const getArtistQuery = (artistId: string) =>
    useQuery<Artist>({
      queryKey: ['artist', artistId],
      queryFn: () => fetchArtist(artistId),
      enabled: Boolean(artistId),
    })

  const createMutation = useMutation({
    mutationFn: createArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: artistsQueryKey })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ artistId, data }: { artistId: string; data: ArtistRequestDto }) =>
      updateArtist(artistId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: artistsQueryKey })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: artistsQueryKey })
    },
  })

  return {
    listQuery,
    artistCountriesQuery,
    getArtistQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
