# Product Requirements Document: Spotify Artist Manager — Frontend

## 1. Overview

Build a sleek, minimalistic React frontend that consumes an existing Spring Boot REST API for managing a database of Spotify artists. This is a showcase UI for a personal learning project — prioritize clean visual design and smooth UX over feature breadth.

**Tech stack (required):**
- React (Vite, not Create React App)
- shadcn/ui for components
- Tailwind CSS (comes with shadcn)
- React Router for navigation
- A data-fetching library (TanStack Query / React Query strongly preferred — gives free loading/error states, caching, and refetch-on-mutation)

**Design direction:** minimalistic, generous whitespace, clear typography hierarchy, subtle motion/transitions (not flashy). Should feel like a modern internal admin tool (think Linear, Vercel dashboard, or shadcn's own examples) — not a generic Bootstrap CRUD app.

---

## 2. Backend API Reference

Base URL: `http://localhost:8080` (make this configurable via an env variable, e.g. `VITE_API_BASE_URL`)

### 2.1 Artist object shape (full, as returned by GET endpoints)

```json
{
  "artistId": "string (UUID)",
  "artistName": "string",
  "gender": "MALE | FEMALE | MIXED | OTHER",
  "countryOfOrigin": "string",
  "primaryLanguage": "string",
  "primaryGenre": "string",
  "artistType": "SOLO | GROUP",
  "debutYear": "number",
  "totalStreams": "number | null",
  "leadStreams": "number | null",
  "featureStreams": "number | null",
  "soloStreams": "number | null",
  "percentOfSoloStreams": "number | null",
  "collaborativeStreams": "number | null",
  "percentOfCollaborativeStreams": "number | null"
}
```

Note: all numeric streaming fields can be `null` for artists created manually via the API (they're only populated by the CSV batch import job).

### 2.2 Endpoints

| Method | Path | Purpose | Body |
|---|---|---|---|
| GET | `/artists` | List all artists | — |
| GET | `/artists/{artistId}` | Get one artist | — |
| POST | `/artists` | Create an artist | `CreateArtistRequestDto` (see below) |
| PATCH | `/artists/{artistId}` | Partially update an artist | `UpdateArtistRequestDto` (see below) |
| DELETE | `/artists/{artistId}` | Delete an artist | — |
| POST | `/batch/start` | Trigger the CSV batch import job | — (returns a plain text status message) |

### 2.3 `CreateArtistRequestDto` — the 7 client-editable fields

```json
{
  "artistName": "string, required, not blank",
  "gender": "MALE | FEMALE | MIXED | OTHER, required",
  "countryOfOrigin": "string, required, not blank",
  "primaryLanguage": "string, required, not blank",
  "primaryGenre": "string, required, not blank",
  "artistType": "SOLO | GROUP, required",
  "debutYear": "number, required, between 1980 and 2026"
}
```

`UpdateArtistRequestDto` has the identical 7 fields, but **all optional** — only send the fields the user actually changed (PATCH semantics; omitted fields are left untouched server-side).

### 2.4 Error response shapes

**404 Not Found** (artist doesn't exist):
```json
{ "message": "Artist with ID 'xxx' not found.", "status": 404, "timestamp": 1234567890 }
```

**400 Bad Request** (validation failure — field-level):
```json
{
  "status": 400,
  "message": "Validation failed for one or more fields",
  "errors": { "debutYear": "Debut year must be greater than or equal to 1980" },
  "timestamp": 1234567890
}
```

The frontend should be able to map `errors` (a field-name → message object) directly onto form field error states.

---

## 3. Views / Pages

### 3.1 Landing Page — Artist Table (`/`)

- Table showing **only these 7 columns**: Artist Name, Gender, Country of Origin, Primary Language, Primary Genre, Artist Type, Debut Year.
- Each row has row-level actions: **View**, **Edit**, **Delete** (icon buttons, e.g. eye / pencil / trash from `lucide-react`).
- "Add Artist" button, prominent, top-right of the page — opens the create flow.
- **Delete** should trigger a confirmation dialog (shadcn `AlertDialog`) before actually calling the DELETE endpoint — never delete on a single click.
- Loading state (skeleton rows) while fetching. Empty state (friendly message + "Add your first artist" CTA) if the list is empty.
- **Search/filter** input above the table that filters by artist name (client-side filtering is fine given the dataset size).
- Do **not** build a CSV import/upload UI yet — the backend's `POST /batch/start` endpoint currently only re-reads a fixed server-side CSV file, it does not accept an uploaded file. A "trigger batch import" UI feature will be added once a file-upload endpoint exists on the backend. Leave this out of scope for now.

### 3.2 Add Artist (modal or dedicated route — your choice, but modal is more "sleek" for a 7-field form)

- Form with the 7 `CreateArtistRequestDto` fields.
- `gender` and `artistType` as select/dropdown inputs (shadcn `Select`), not free text.
- `debutYear` as a number input, constrained visually to a sane range (1980–2026) with inline validation feedback.
- On submit: call `POST /artists`. On success, close the form and refresh the table (toast confirmation). On validation error (400), map the `errors` object onto the corresponding form fields inline — do not just show a generic alert.

### 3.3 Edit Artist (modal or dedicated route, consistent with Add)

- Same 7-field form as Add, pre-populated with the artist's current values.
- Only send fields that were actually changed in the PATCH request (or send all 7 if simpler to implement — either is acceptable, but sending only diffed fields is a nice touch demonstrating you understand the PATCH semantics).
- Same inline validation error handling as Add.

### 3.4 View Artist Details (`/artists/:artistId` or a modal/drawer)

- Shows **all 15 fields** — the 7 editable ones plus all numeric streaming stats (`totalStreams`, `leadStreams`, `featureStreams`, `soloStreams`, `percentOfSoloStreams`, `collaborativeStreams`, `percentOfCollaborativeStreams`).
- If numeric fields are `null` (manually-created artist, never batch-imported), show a clear "No streaming data available" state for that section rather than blank/zero values.
- Consider a clean two-section layout: "Profile" (the 7 fields) and "Streaming Stats" (the 8 numeric fields, maybe with simple visual bars/percentages for the solo vs. collaborative split since that's an interesting stat).

### 3.5 Dark / Light Mode Toggle

- Global toggle (e.g., in a header/nav bar), persisted across sessions (localStorage is fine for this — it's outside the API's data model).
- Use shadcn's standard theme-provider pattern with Tailwind's `dark:` variants.

---

## 4. Cross-cutting Requirements

- **Error handling:** every API call should handle network/5xx failures gracefully (toast notification, not a blank screen or unhandled crash).
- **Toast notifications** (shadcn `sonner` or `toast`) for all mutations: create success, update success, delete success, batch import result, and all failure cases.
- **Responsive:** should work reasonably on a laptop screen at minimum; mobile polish is a nice-to-have, not required.
- **No localStorage/sessionStorage for actual artist data** — only for UI preference (theme). All artist data must come from the live API on load.
- Keep components small and organized (e.g., `components/ArtistTable.tsx`, `components/ArtistForm.tsx`, `components/ArtistDetailView.tsx`, `hooks/useArtists.ts`, etc.) — this is a showcase project, so clean structure matters for anyone reviewing the code.

---

## 5. Explicitly Out of Scope (do not build)

- Authentication/login — the API has none.
- Pagination on the backend (the API returns all records in one call) — client-side-only concerns like search/filter are fine, but don't build server-side pagination since the endpoint doesn't support it.
- Editing the numeric streaming fields — those are batch-import-only and not part of the create/update DTOs.
- Any CSV upload/import trigger UI — deferred until the backend supports uploading a file (current `POST /batch/start` only re-processes a fixed server-side file, with no file parameter).