# ARCHITECTURE.md — Sweden Life Guide
**Brand:** RAED SHIHAB — Arab Sweden Since 2007

## Architecture Overview

Application Architecture: Full-Stack React (TypeScript + Vite) + Express Node.js Server.

```
[ Browser Client (React UI / RTL) ]
        │
        ▼ (HTTPS REST / Multipart)
[ Express Server (server.ts) ]
        │
        ├──► Sensitive Data Redactor (Personnummer & Injection Protection)
        ├──► Extractor/Transcriber (Files & Speech)
        ├──► Official Source Registry & Domain Whitelist Validator
        ├──► Gemini API Client (@google/genai — gemini-3.6-flash)
        └──► Output Structured Answer Validator
```

### Key Components

1. **Frontend Layer**:
   - `src/App.tsx`: Navigation, view states, modals.
   - `src/features/ask/`: Unified question form, voice recorder, file uploader, pipeline status modal.
   - `src/features/result/`: Structured answer rendering, PDF export trigger, email dispatch trigger.
   - `src/features/history/`: Questions history & filter engine.
   - `src/features/admin/`: Admin control panel (`/admin`).

2. **Backend API Layer**:
   - Express server (`server.ts`) serving on port 3000 (`0.0.0.0`).
   - Route `/api/query-guide`: Express API calling `@google/genai` with `gemini-3.6-flash` and JSON schema.

3. **Service Layer Adapters**:
   - `pipeline.ts`: Orchestrates 5 pipeline stages.
   - `sensitiveData.ts`: Regex redactor for Personnummer and Prompt Injection.
   - `pdfService.ts`: HTML canvas & jsPDF generator with Unicode support.
   - `emailService.ts`: Email dispatcher with Demo simulation.
