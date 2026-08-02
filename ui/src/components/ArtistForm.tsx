import type * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { Artist, ArtistRequestDto } from '../lib/api'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import { Select } from './ui/Select'

const genderOptions = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Mixed', value: 'MIXED' },
  { label: 'Other', value: 'OTHER' },
]

const artistTypeOptions = [
  { label: 'Solo', value: 'SOLO' },
  { label: 'Group', value: 'GROUP' },
]

interface ArtistFormProps {
  initialData?: Artist
  onSubmit: (data: ArtistRequestDto) => void
  onClose: () => void
  errorMap?: Record<string, string>
  submitting?: boolean
}

export function ArtistForm({ initialData, onSubmit, onClose, errorMap = {}, submitting = false }: ArtistFormProps) {
  const [form, setForm] = useState<ArtistRequestDto>({
    artistName: initialData?.artistName ?? '',
    gender: initialData?.gender,
    countryOfOrigin: initialData?.countryOfOrigin ?? '',
    primaryLanguage: initialData?.primaryLanguage ?? '',
    primaryGenre: initialData?.primaryGenre ?? '',
    artistType: initialData?.artistType,
    debutYear: initialData?.debutYear,
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        artistName: initialData.artistName,
        gender: initialData.gender,
        countryOfOrigin: initialData.countryOfOrigin,
        primaryLanguage: initialData.primaryLanguage,
        primaryGenre: initialData.primaryGenre,
        artistType: initialData.artistType,
        debutYear: initialData.debutYear,
      })
    }
  }, [initialData])

  const fieldErrors = useMemo(() => errorMap ?? {}, [errorMap])

  const handleChange = (field: keyof ArtistRequestDto, value: string | number | undefined) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="artistName">Artist Name</Label>
          <Input
            id="artistName"
            value={form.artistName ?? ''}
            onChange={(event) => handleChange('artistName', event.target.value)}
            aria-invalid={Boolean(fieldErrors.artistName)}
          />
          {fieldErrors.artistName ? <p className="mt-1 text-sm text-red-600">{fieldErrors.artistName}</p> : null}
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            id="gender"
            value={form.gender ?? ''}
            onChange={(value) => handleChange('gender', value as Artist['gender'])}
            options={[{ label: 'Select gender', value: '' }, ...genderOptions]}
            placeholder="Select gender"
            className="w-full"
          />
          {fieldErrors.gender ? <p className="mt-1 text-sm text-red-600">{fieldErrors.gender}</p> : null}
        </div>

        <div>
          <Label htmlFor="countryOfOrigin">Country of Origin</Label>
          <Input
            id="countryOfOrigin"
            value={form.countryOfOrigin ?? ''}
            onChange={(event) => handleChange('countryOfOrigin', event.target.value)}
            aria-invalid={Boolean(fieldErrors.countryOfOrigin)}
          />
          {fieldErrors.countryOfOrigin ? <p className="mt-1 text-sm text-red-600">{fieldErrors.countryOfOrigin}</p> : null}
        </div>

        <div>
          <Label htmlFor="artistType">Artist Type</Label>
          <Select
            id="artistType"
            value={form.artistType ?? ''}
            onChange={(value) => handleChange('artistType', value as Artist['artistType'])}
            options={[{ label: 'Select type', value: '' }, ...artistTypeOptions]}
            placeholder="Select type"
            className="w-full"
          />
          {fieldErrors.artistType ? <p className="mt-1 text-sm text-red-600">{fieldErrors.artistType}</p> : null}
        </div>

        <div>
          <Label htmlFor="primaryLanguage">Primary Language</Label>
          <Input
            id="primaryLanguage"
            value={form.primaryLanguage ?? ''}
            onChange={(event) => handleChange('primaryLanguage', event.target.value)}
            aria-invalid={Boolean(fieldErrors.primaryLanguage)}
          />
          {fieldErrors.primaryLanguage ? <p className="mt-1 text-sm text-red-600">{fieldErrors.primaryLanguage}</p> : null}
        </div>

        <div>
          <Label htmlFor="primaryGenre">Primary Genre</Label>
          <Input
            id="primaryGenre"
            value={form.primaryGenre ?? ''}
            onChange={(event) => handleChange('primaryGenre', event.target.value)}
            aria-invalid={Boolean(fieldErrors.primaryGenre)}
          />
          {fieldErrors.primaryGenre ? <p className="mt-1 text-sm text-red-600">{fieldErrors.primaryGenre}</p> : null}
        </div>

        <div>
          <Label htmlFor="debutYear">Debut Year</Label>
          <Input
            id="debutYear"
            type="number"
            min={1980}
            max={2026}
            value={form.debutYear ?? ''}
            onChange={(event) => handleChange('debutYear', event.target.value ? Number(event.target.value) : undefined)}
            aria-invalid={Boolean(fieldErrors.debutYear)}
          />
          {fieldErrors.debutYear ? <p className="mt-1 text-sm text-red-600">{fieldErrors.debutYear}</p> : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {initialData ? 'Save Changes' : 'Create Artist'}
        </Button>
      </div>
    </form>
  )
}
