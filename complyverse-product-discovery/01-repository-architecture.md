# Repository and architecture

## Meaningful repository map

```text
D:\complywerse_ai
├─ grc-frontend/                 Next.js 14 App Router product UI
│  ├─ src/app/                   198 page-entry files: auth, dashboard, modules
│  ├─ src/components/            shared and feature UI
│  ├─ src/lib/api.ts             Axios API client/proxy usage
│  ├─ middleware.ts              present but empty in inspected copy
│  ├─ .env.example, Dockerfile, next.config.js
├─ backend/                      FastAPI application and workers
│  ├─ main.py                    ASGI mount entry
│  ├─ grc/main.py                FastAPI, middleware, router registration
│  ├─ grc/models/                SQLAlchemy model source, numbered modules
│  ├─ grc/schemas/               Pydantic request/response schemas
│  ├─ grc/routers/               core API routers
│  ├─ grc/modules/               feature routers/services
│  ├─ grc/tasks/                 Celery background tasks
│  ├─ grc/seed_data/, seed_*.py  framework/demo/bootstrap data
│  ├─ tests/, Dockerfile, .env.example
├─ docs/                         existing project docs, retained unchanged
├─ NCA_Templates/                NCA policy, standard, register and report templates
├─ CIS_Module_Updated/           separate CIS workstream/artifacts
├─ Updated_CIS_Assests/          separate updated-pages workstream
├─ workflow_audit_modules/       separate workflow-engine workstream
└─ mockups/, proposals/          non-runtime design/proposal material
```

## Technology findings

| Layer | Finding | Evidence |
|---|---|---|
| Languages | TypeScript/TSX and Python | `grc-frontend/package.json`, `backend/requirements.txt` |
| Frontend | Next.js 14.2.3, React 18, App Router, Tailwind | `grc-frontend/package.json`, `src/app/`, `tailwind.config.ts` |
| UI/data client | Axios, TanStack React Query, TipTap, XYFlow, Recharts | `grc-frontend/package.json` |
| Backend | FastAPI with router modules | `backend/grc/main.py` |
| Database/ORM | PostgreSQL and SQLAlchemy | `README.md`, `backend/grc/models/`, `requirements.txt` |
| Validation | Pydantic | `requirements.txt`, `backend/grc/schemas/` |
| Async | Celery and Redis, plus APScheduler | `requirements.txt`, `README.md`, `backend/grc/tasks/` |
| Files/docs | local `UPLOAD_ROOT`; document/PDF/OCR libraries | `.env.example`, `requirements.txt`, `modules/evidence/routers/ocr.py` |
| AI | OpenAI, LangChain/LangGraph, Qdrant, LangSmith configuration | `requirements.txt`, `.env.example`, `modules/chatbot/` |
| Deployment | frontend and backend Dockerfiles; no confirmed production orchestrator/IaC found | `grc-frontend/Dockerfile`, `backend/Dockerfile` |

## Architecture

`Browser → Next.js UI / /api proxy → FastAPI at /grc → tenant-specific PostgreSQL database`

The README says a master catalog stores tenant registry data and each tenant uses a `grc_{slug}` PostgreSQL database. `TenantMiddleware` resolves a tenant from a JWT cookie, subdomain, `X-Tenant-Slug`, query fallback, or `DEFAULT_TENANT_SLUG`; database dependencies bind the request. Evidence: `README.md`, `backend/grc/middleware/subdomain.py`, `backend/grc/db.py`.

`FastAPI → Celery/Redis → parse, framework, governance, control-library and other heavy jobs` is configured/referenced, but worker deployment is not verified. Evidence: `README.md`, `backend/grc/celery_app.py`, `backend/grc/tasks/`.

## Configuration names, values redacted

Backend examples name database, Redis/Celery, session/cookie, CORS, OpenAI, LangSmith, Qdrant, SMTP, n8n, upload, Tesseract, tenant and runtime variables. Notable names include `MASTER_DATABASE_URL`, `TENANT_DB_URL_TEMPLATE`, `REDIS_URL`, `SESSION_SECRET`, `OPENAI_API_KEY`, `QDRANT_URL`, `SMTP_HOST`, `N8N_BASE_URL`, `UPLOAD_ROOT`, and `DEFAULT_TENANT_SLUG`. Evidence: `backend/.env.example`. Frontend examples use `NEXT_PUBLIC_BACKEND_URL` and `NEXT_PUBLIC_API_BASE_URL`. Evidence: `grc-frontend/.env.example`.
