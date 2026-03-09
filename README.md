# Document Management System (MVP)

A simple full-stack MVP for uploading and reviewing documents.

## Tech Stack
- **Frontend:** React (Vite), Axios, simple CSS
- **Backend:** Node.js, Express.js, Multer
- **Database:** PostgreSQL

## Project Structure

```text
backend/
  server.js
  routes/documents.js
  db.js
  uploads/
  schema.sql
frontend/
  src/pages/UploadDocument.jsx
  src/pages/DocumentsList.jsx
  src/App.jsx
  src/api.js
```

## Features
1. Upload documents
2. View all documents
3. Approve or reject documents
4. Document statuses: `pending`, `approved`, `rejected`
5. Files stored in local `backend/uploads`
6. REST API backend
7. Frontend consumes API via Axios

## Setup Instructions

### 1) Create PostgreSQL database

```sql
CREATE DATABASE document_management;
```

### 2) Create tables
Run:

```bash
psql -U postgres -d document_management -f backend/schema.sql
```

### 3) Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

### 4) Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## API Endpoints

- `POST /api/documents/upload` – Upload a document (`multipart/form-data` with `title`, `uploaded_by`, `file`)
- `GET /api/documents` – Get all documents
- `PUT /api/documents/:id/approve` – Approve document
- `PUT /api/documents/:id/reject` – Reject document

## Notes
- The upload form includes sample users (`id` 1,2,3) seeded from `schema.sql`.
- Uploaded files can be accessed at `http://localhost:5000/uploads/<filename>`.
