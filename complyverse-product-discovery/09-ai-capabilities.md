# AI capabilities

## Technical foundation

OpenAI, LangChain, LangGraph, Qdrant and LangSmith are dependency/configuration evidence. Environment names include `OPENAI_API_KEY`, `OPENAI_MODEL`, `QDRANT_URL`, `LANGSMITH_API_KEY` and AI-usage controls. Evidence: `backend/requirements.txt`, `backend/.env.example`.

## Implemented or referenced AI functions

| Function | Input/output | Evidence | Status |
|---|---|---|---|
| ComplyChat retrieval/chat | tenant documents/context to chat response; embedding worker/Qdrant service | `modules/chatbot/router.py`, `qdrant_service.py`, `embedding_worker.py`, `grc_sql_agent.py`, `/complychat` | Partial, runtime/provider dependent |
| Evidence AI assessment | evidence to assessment/cache | `models/_10...py`, `modules/evidence/routers/ai_assessment.py` | Partial |
| OCR extraction | document/image to extracted OCR content | `modules/evidence/routers/ocr.py`, Tesseract config | Partial |
| AI policy/document drafting | drafting task/pipeline and governance router paths | `tasks/ai_drafting.py`, `modules/governance/ai_drafting/`, `policy_parser.py` | Partial; code contains scaffolds/placeholders |
| AI risk assessment/recommendations | risk inputs to stored/retrieved recommendations | `models/_39_ai_risk_assessment_template.py`, `_40_ai_recommendation_store.py`, `routers/ai_risk_assessment_router.py`, `ai_recommendations_router.py` | Partial |
| AI control mapping/evidence recommendations | control/framework text to suggested matches/evidence | `_09_1_unified...py`, `modules/control_library/routers/ai_mapping.py`, `evidence_recs.py` | Partial |
| AI vulnerability/vendor analysis | vulnerability/vendor inputs to analysis/remediation hints | `modules/vuln_management/routers/ai_analysis.py`, `remediation/plan_generator.py`, `modules/vendor_risk/routers/ai_analysis.py` | Partial, placeholder references exist |
| Workflow AI panel | workflow design assistance UI/API | `modules/workflow_engine/routers/ai.py`, `workflow-engine/components/AIPanel.tsx` | Partial |
| AI use governance | usage events and token-budget models/admin view | `_45_ai_usage.py`, `_46_ai_budget.py`, `services/ai_usage.py`, `admin_ai_usage_router.py` | Confirmed/partial |

## Safe AI wording

“Includes AI-assisted drafting, analysis, mapping and chat surfaces, with persisted usage/budget models.” Do not claim autonomous compliance decisions, accuracy, RAG grounding quality, data isolation within providers, or human review enforcement without a security and runtime review. Human approval models exist in related workflows but are not a universal AI safety gate.
