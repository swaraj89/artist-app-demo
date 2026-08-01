import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8080')

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Artist {
  artistId: string
  artistName: string
  gender: 'MALE' | 'FEMALE' | 'MIXED' | 'OTHER'
  countryOfOrigin: string
  primaryLanguage: string
  primaryGenre: string
  artistType: 'SOLO' | 'GROUP'
  debutYear: number
  totalStreams: number | null
  leadStreams: number | null
  featureStreams: number | null
  soloStreams: number | null
  percentOfSoloStreams: number | null
  collaborativeStreams: number | null
  percentOfCollaborativeStreams: number | null
}

export interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
  }
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
  numberOfElements: number
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  empty: boolean
}

export interface ArtistRequestDto {
  artistName?: string
  gender?: 'MALE' | 'FEMALE' | 'MIXED' | 'OTHER'
  countryOfOrigin?: string
  primaryLanguage?: string
  primaryGenre?: string
  artistType?: 'SOLO' | 'GROUP'
  debutYear?: number
}

export interface ValidationErrorResponse {
  status: number
  message: string
  timestamp: number
  errors: Record<string, string>
}

export async function fetchArtists(page = 0, size = 8, sort = 'artistName,asc', artistName?: string, country?: string) {
  const params: Record<string, unknown> = {
    page,
    size,
    sort,
  }

  if (artistName) {
    params.artistName = artistName
  }

  if (country) {
    params.country = country
  }

  const response = await apiClient.get<PageResponse<Artist>>('/artists', {
    params,
  })
  return response.data
}

export async function fetchArtist(artistId: string) {
  const response = await apiClient.get<Artist>(`/artists/${artistId}`)
  return response.data
}

export async function fetchArtistCountries() {
  const response = await apiClient.get<string[]>('/artists/countries')
  return response.data
}

export async function createArtist(data: ArtistRequestDto) {
  const response = await apiClient.post<Artist>('/artists', data)
  return response.data
}

export async function updateArtist(artistId: string, data: ArtistRequestDto) {
  const response = await apiClient.patch<Artist>(`/artists/${artistId}`, data)
  return response.data
}

export async function deleteArtist(artistId: string) {
  await apiClient.delete(`/artists/${artistId}`)
}
