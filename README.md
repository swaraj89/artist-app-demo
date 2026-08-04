# Spotify Artist App

A full-stack Spotify artist management demo with:
- Spring Boot + Spring Batch + Spring Data JPA backend
- React + TypeScript + Vite frontend
- PostgreSQL database
- Docker Compose development setup

## Repository structure

- `service/` - Java Spring Boot service for batch loading and artist API
- `ui/` - React app with artist search, add, and detail views
- `docker-compose.yml` - local development composition for database, backend, and frontend
- `render.yaml` - deployment configuration for Render.com
- `.env.example` - example environment variables for local development

## Features

- Artist data ingest and batch processing
- REST API backend with Spring Boot
- PostgreSQL persistence
- OpenAPI / Swagger UI via SpringDoc
- React UI with search, table, and modal workflows
- Docker-based local orchestration

## Local setup

### Prerequisites

- Docker
- Docker Compose
- Java 21 (for local Maven builds if not using Docker)
- Node.js 20+ (for local UI development if not using Docker)

### Run with Docker Compose

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
2. Start the stack:
   ```bash
   docker compose up --build
   ```
3. Access the apps:
   - Backend: `http://localhost:8080`
   - UI: `http://localhost:5173`

### Local development without Docker

#### Backend

```bash
cd service
./mvnw clean package
./mvnw spring-boot:run
```

Default database settings expect PostgreSQL at `jdbc:postgresql://db:5432/spotify_artists`.

#### Frontend

```bash
cd ui
npm install
npm run dev
```

The UI will use `VITE_API_BASE_URL` to call the backend.

## Environment variables

Use `.env.example` as a template for local development.

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_PROFILES_ACTIVE`
- `VITE_API_BASE_URL`

## Deployment

This repository includes a `render.yaml` configuration for two Render services:

- `artist-service` - Spring Boot backend deployed from `service/Dockerfile`
- `artist-ui` - React frontend deployed from `ui/Dockerfile`

In Render, the frontend is configured to communicate with the backend via `VITE_API_BASE_URL`.

## Notes

- The backend is packaged as an executable JAR.
- The frontend is built with Vite and served by Nginx in Docker.
- PostgreSQL is provided via `postgres:16-alpine` in the Compose configuration.

## Contact

For questions or enhancements, review the source in `service/src/main/java` and `ui/src`.
