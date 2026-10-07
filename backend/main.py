"""
FastAPI Agentic Backend for Harsh Shah's Portfolio
Provides API endpoints for HS-01 Copilot RAG, Terminal commands, Contact inquiries, and Telemetry.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from langchain_agent import invoke_hs01_agent, get_llm_status, set_active_provider
from rag_engine import get_rag_engine

app = FastAPI(
    title="Harsh Shah Portfolio Agentic Backend",
    description="LangChain Agent with Production-Grade RAG Tool & Multi-Tier Failover",
    version="2.1.0"
)

# Initialize and warm up RAG engine
@app.on_event("startup")
def startup_event():
    engine = get_rag_engine()
    print(f"[FastAPI Startup] Production RAG Engine warmed with {len(engine.chunks)} chunks.")

# Enable CORS for local Vite dev and future deployment URLs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CopilotQuery(BaseModel):
    query: str

class TerminalRequest(BaseModel):
    command: str

class SwitchProviderRequest(BaseModel):
    provider: str

class ContactRequest(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str

@app.get("/")
def root():
    return {
        "status": "online",
        "system": "HS-01 LangChain Autonomous Agent with RAG Tool & Multi-Tier Failover",
        "version": "2.1.0",
        "developer": "Harsh Shah"
    }

@app.get("/api/telemetry")
def get_telemetry():
    llm_info = get_llm_status()
    return {
        "orchestrator": "LangGraph v1.2 / LangChain 1.4",
        "active_provider": llm_info.get("last_used_provider", "google_primary"),
        "failover_mode": llm_info.get("mode", "auto_failover"),
        "protocol": "Model Context Protocol (MCP) + A2A",
        "agent_tools": ["query_harsh_dossier_rag", "get_project_architecture_specs"],
        "average_latency": "8.2s (down from 18s at TIAA)",
        "accuracy": "100% deterministic schema conformity",
        "status": "DAEMON_ACTIVE"
    }

@app.get("/api/llm/status")
def llm_status_endpoint():
    """Return status and telemetry of all 4 LLM tiers."""
    return get_llm_status()

@app.post("/api/llm/switch")
def llm_switch_endpoint(payload: SwitchProviderRequest):
    """Manually pin a provider or reset to auto failover."""
    result = set_active_provider(payload.provider)
    if result.get("status") == "error":
        raise HTTPException(status_code=400, detail=result.get("message"))
    return result

@app.post("/api/copilot")
def copilot_endpoint(payload: CopilotQuery):
    if not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    result = invoke_hs01_agent(payload.query.strip())
    return {
        "response": result["answer"],
        "sources": result.get("sources", []),
        "tool_calls": result.get("tool_calls", []),
        "model": result.get("model", "gemini-2.5-flash"),
        "provider": result.get("provider", "google_primary"),
        "failover_occurred": result.get("failover_occurred", False),
        "failover_path": result.get("failover_path", [])
    }

TERMINAL_COMMANDS = {
    "help": """AVAILABLE COMMANDS IN HS-01 RUNTIME:
  ask <query>        - Semantic vector query across Harsh's experience and repositories
  projects           - Inspect production agentic systems (TIAA, JobPilot, Governance Copilot)
  experience         - Chronological work history (TIAA, Space Agency, Katapult)
  education          - Academic degree (DJSCE, SBMP) and CGPA metrics
  skills             - Inspect technical proficiencies (LangGraph, MCP, Python, React, Docker)
  llm                - Live status of multi-tier LLM failover engine (Google, OpenRouter, RAG)
  keys               - Inspect configured API keys, tier states, and fallback priority
  telemetry          - Live orchestrator telemetry, active daemons, and system health
  mcp                - Model Context Protocol tools, JSON-RPC schemas, and adapters
  benchmarks         - Deterministic LLM metrics, latency reductions, and evaluation stats
  publications       - View academic research paper & hackathon achievements
  contact            - Print verified comms coordinates (email, phone, LinkedIn, GitHub)
  cat about.md       - Read Harsh's engineering manifesto
  cat contact.json   - View structured digital business card
  clear              - Purge terminal output window""",

    "projects": """HARSH SHAH // PRODUCTION ARCHITECTURES:

[01] TIAA ENTERPRISE AGENTIC ORCHESTRATOR
     Role: Analyst - Agentic AI Developer
     Stack: LangGraph, LangChain, MCP, A2A, FastAPI, Docker, OpenShift
     Metrics: 5 -> 2-3 LLM calls | Latency: 17-18s -> 8-9s | SSE streaming

[02] JOBPILOT – MULTI-AGENT JOB APPLICATION CO-PILOT
     Repo: https://github.com/Harsh-Rupesh-Shah/JobPilot
     Stack: LangGraph, FastAPI, FAISS, Playwright, Tavily, MongoDB, React
     Architecture: 2-Phase DAG, Concurrent ATS & Web Scraping, HITL interrupt()

[03] AI DECISION GOVERNANCE COPILOT
     Repo: https://github.com/Harsh-Rupesh-Shah/AI_Governance_Project
     Stack: LangGraph, Google Gemini 2.0, ChromaDB, Pydantic, MongoDB
     Architecture: Dual-Layer MongoDB Memory, Local Policy RAG, 100% Schema Validation""",

    "videos": """PRODUCTION ARCHITECTURE VIDEO DEMONSTRATIONS:

[01] AI DECISION GOVERNANCE COPILOT
     Duration: 03:15 // 4K Walkthrough | Stack: LangGraph + ChromaDB
     Highlights: Dual-layer MongoDB memory checkpoints, local policy RAG, 100% Pydantic validation
     Target File: public/videos/ai_governance_demo.mp4

[02] JOBPILOT – AUTONOMOUS JOB APPLICATION CO-PILOT
     Duration: 02:40 // 4K Walkthrough | Stack: 2-Phase DAG + HITL
     Highlights: Concurrent ATS scoring (FAISS) & Playwright crawling + HITL interrupt() gate
     Target File: public/videos/jobpilot_demo.mp4

Navigate to the VIDEOS section in Web Mode or click the Video Cards to launch the in-site player!""",

    "telemetry": """HS-01 TELEMETRY STATUS // LIVE DAEMON:
  • Orchestrator:       LangGraph v1.2 / LangChain 1.4 ReAct Engine
  • Cognitive Engine:   Google Gemini 2.5 Flash
  • Protocol:           Model Context Protocol (MCP) + A2A Bus
  • Memory Architecture: Dual-Layer MongoDB (Checkpoints + Long-Term Store)
  • Vector Stores:      ChromaDB (Local Policy) + FAISS (ATS Embeddings)
  • Latency Benchmark:  8.2s avg (reduced ~50% from 18s at TIAA)
  • Concurrency:        2-Phase DAG Fan-out (Concurrent Scraper + Vector Search)
  • Determinism:        100% Pydantic Schema Conformity""",

    "mcp": """MODEL CONTEXT PROTOCOL (MCP) // TOOL SUITE:
  [TOOL 01] query_harsh_dossier_rag
    Schema: {"type": "object", "properties": {"query": {"type": "string"}}}
    Target: harsh_knowledge_base.md + resume.pdf (48 chunks, hybrid BM25 + dense)
  [TOOL 02] get_project_architecture_specs
    Schema: {"type": "object", "properties": {"project_name": {"type": "string"}}}
    Target: Detailed DAG topologies, sequencer logic, and streaming specs
  [TRANSPORT] JSON-RPC over stdio / HTTP SSE""",

    "benchmarks": """PRODUCTION PERFORMANCE BENCHMARKS:
  • LLM Call Reduction:   5 calls  ──>  2 - 3 calls  (-50% LLM overhead)
  • Round-Trip Latency:   17-18s   ──>  8 - 9s        (~50% round-trip reduction)
  • Output Determinism:   100% (Zero schema drift via Pydantic v2 validators)
  • Stream Perceived Latency: Sub-400ms First Token via Server-Sent Events (SSE)
  • Context Compression:  4.8x ratio across multi-hop agent state handoffs""",

    "experience": """CHRONOLOGICAL WORK HISTORY:

• TIAA // ANALYST - AGENTIC AI DEVELOPER (JULY 2025 - CURRENT | MUMBAI)
  - Engineered multi-agent AI systems with LangChain, LangGraph, MCP, and A2A.
  - Reduced LLM hops (5 -> 2-3) and latency (18s -> 8-9s) with custom Python sequencers.
  - Built real-time streaming AI applications using SSE and WebSockets.
  - Deployed containerized microservices through Docker, Jenkins CI/CD, and OpenShift.

• SPACE AGENCY // FULL STACK DEVELOPER (JUNE 2024 - MAY 2025 | MUMBAI)
  - Delivered responsive web applications using MERN stack (MongoDB, Express, React, Node.js).
  - Implemented secure JWT auth, cookies, and encryption protocols.

• KATAPULT TECHNOLOGIES // FRONTEND DEVELOPER INTERN (JULY 2021 - SEP 2021 | MUMBAI)
  - Developed responsive frontend user interfaces with modular web components.""",

    "education": """ACADEMIC BACKGROUND:

• DWARKADAS JIVANLAL SANGHVI COLLEGE OF ENGINEERING (DJSCE), MUMBAI
  B.Tech in Computer Science and Engineering (IoT & Cyber Security with Blockchain)
  Graduation: 2022 - 2025 | CGPA: 8.70 / 10
  Minors: Artificial Intelligence | Machine Learning | Deep Learning

• SHRI BHAGUBHAI MAFATLAL POLYTECHNIC (SBMP), MUMBAI
  Diploma in Computer Engineering | 2019 - 2022
  Score: 92.00%""",

    "skills": """TECHNICAL PROFICIENCY MATRIX:

• Agentic AI:   LangGraph, LangChain, Model Context Protocol (MCP), A2A, HITL, RAG
• Backend:      Python 3.12, FastAPI, Pydantic v2, Node.js, Express, REST, SSE
• Frontend:     React.js, JavaScript (ES6+), HTML5, CSS3, Three.js
• Databases:    MongoDB, MongoDB Atlas Search, ChromaDB, FAISS, Vector Embeddings
• DevOps:       Docker, Kubernetes, OpenShift, Jenkins CI/CD, Git, GitLab, Terraform""",

    "publications": """PUBLICATIONS & HONORS:

• Smart India Hackathon (SIH) 2024 — National Finalist (Dec 2024)
• Research Publication — IJARSCT Journal (Dec 2021)
  Title: "Coded Websites Vs WordPress Websites" (DOI: 10.48175/IJARSCT-2140)""",

    "contact": """SECURE COMMUNICATION COORDINATES:

• Full Name:   Harsh Shah
• Location:    Mumbai, Maharashtra, India
• Email:       hrsshah04022004@gmail.com
• Phone:       +91 9175366700
• GitHub:      https://github.com/Harsh-Rupesh-Shah
• LinkedIn:    https://linkedin.com/in/harshshah2004""",

    "cat about.md": """HARSH SHAH // AGENTIC AI & SYSTEMS DEVELOPER
"I bridge the gap between speculative foundation models and deterministic, reliable enterprise systems."
Focus: Multi-agent DAG architectures with LangGraph, Model Context Protocol (MCP) tool integration, Pydantic verification, and real-time streaming user interfaces.""",

    "cat contact.json": """{
  "name": "Harsh Shah",
  "role": "Analyst - Agentic AI Developer",
  "organization": "TIAA",
  "location": "Mumbai, India",
  "email": "hrsshah04022004@gmail.com",
  "phone": "+91 9175366700",
  "github": "https://github.com/Harsh-Rupesh-Shah",
  "linkedin": "https://linkedin.com/in/harshshah2004",
  "status": "Engineering autonomous agentic infrastructure"
}""",

    "ls": "about.md  contact.json  resume.pdf  harsh_knowledge_base.md  projects.dag",
    "dir": "about.md  contact.json  resume.pdf  harsh_knowledge_base.md  projects.dag"
}

@app.post("/api/terminal")
def terminal_endpoint(payload: TerminalRequest):
    cmd = payload.command.strip()
    if not cmd:
        return {"type": "empty", "output": ""}
    
    cmd_lower = cmd.lower()

    # 1. Clear terminal
    if cmd_lower == "clear":
        return {"type": "clear", "output": ""}

    # 2. Dynamic LLM status and keys commands
    if cmd_lower in ["llm", "keys"]:
        info = get_llm_status()
        tiers = info.get("tiers", {})
        g1 = tiers.get("google_primary", {})
        g2 = tiers.get("google_backup", {})
        op = tiers.get("openrouter", {})
        rag = tiers.get("deterministic_rag", {})
        
        output = (
            f"HS-01 COGNITIVE ENGINE PROVIDERS & RESILIENT FAILOVER POOL:\n"
            f"  Mode:                {info.get('mode', 'auto_failover').upper()}\n"
            f"  Active Preference:   {info.get('active_preference', 'auto')}\n"
            f"  Last Provider Used:  {info.get('last_used_provider', 'none')}\n\n"
            f"  [TIER 1] {g1.get('name')}\n"
            f"           Key: {g1.get('key_masked')} | Status: {g1.get('state')} | Calls: {g1.get('success_count')}\n"
            f"  [TIER 2] {g2.get('name')}\n"
            f"           Key: {g2.get('key_masked')} | Status: {g2.get('state')} | Calls: {g2.get('success_count')}\n"
            f"  [TIER 3] {op.get('name')}\n"
            f"           Key: {op.get('key_masked')} | Status: {op.get('state')} | Calls: {op.get('success_count')}\n"
            f"  [TIER 4] {rag.get('name')}\n"
            f"           Status: {rag.get('state')} (Offline Deterministic Hybrid RAG)\n\n"
            f"Failover Strategy: Automatic sequential failover on HTTP 429 / Quota / Network Error.\n"
            f"Switch Provider:   Type 'switch <provider>' (e.g. 'switch openrouter' or 'switch auto')"
        )
        return {
            "type": "text",
            "command": cmd,
            "output": output
        }

    # 3. Dynamic Switch Provider command
    if cmd_lower.startswith("switch "):
        target = cmd[7:].strip()
        res = set_active_provider(target)
        if res.get("status") == "success":
            return {
                "type": "text",
                "command": cmd,
                "output": f"[HS-01 ENGINE]: Active provider preference set to: '{res.get('active')}' (Mode: {res.get('mode')})"
            }
        else:
            return {
                "type": "error",
                "command": cmd,
                "output": f"Error: {res.get('message')}"
            }

    # 4. Known shell command in dictionary
    if cmd_lower in TERMINAL_COMMANDS:
        return {
            "type": "text",
            "command": cmd,
            "output": TERMINAL_COMMANDS[cmd_lower]
        }

    # 3. Explicit ask command
    if cmd_lower.startswith("ask "):
        query = cmd[4:].strip()
        result = invoke_hs01_agent(query)
        tools_str = ", ".join(result.get("tool_calls", [])) or "query_harsh_dossier_rag"
        sources_str = ", ".join(result.get("sources", [])) or "harsh_knowledge_base.md"
        failover_note = ""
        if result.get("failover_occurred"):
            failover_note = f"> Failover Route: {' -> '.join(result.get('failover_path', []))}\n"

        return {
            "type": "inference",
            "query": query,
            "output": f"> INFERENCE ENGINE: {result.get('model', 'gemini-2.5-flash')}\n"
                      f"> Provider Tier: [{result.get('provider', 'google_primary')}]\n"
                      f"{failover_note}"
                      f"> Autonomous Tools Invoked: [{tools_str}]\n"
                      f"> Grounded Knowledge: [{sources_str}]\n\n"
                      f"{result['answer']}"
        }

    # 4. Natural language query / question (contains space, ends with ?, or starts with question verbs)
    question_triggers = ["what", "how", "who", "tell", "explain", "describe", "why", "where", "can", "is", "does", "which"]
    is_question = (
        " " in cmd or 
        cmd.endswith("?") or 
        any(cmd_lower.startswith(w) for w in question_triggers)
    )

    if is_question:
        result = invoke_hs01_agent(cmd)
        tools_str = ", ".join(result.get("tool_calls", [])) or "query_harsh_dossier_rag"
        sources_str = ", ".join(result.get("sources", [])) or "harsh_knowledge_base.md"

        failover_note = ""
        if result.get("failover_occurred"):
            failover_note = f"> Failover Route: {' -> '.join(result.get('failover_path', []))}\n"

        return {
            "type": "inference",
            "query": cmd,
            "output": f"> INFERENCE ENGINE: {result.get('model', 'gemini-2.5-flash')}\n"
                      f"> Provider Tier: [{result.get('provider', 'google_primary')}]\n"
                      f"{failover_note}"
                      f"> Autonomous Tools Invoked: [{tools_str}]\n"
                      f"> Grounded Knowledge: [{sources_str}]\n\n"
                      f"{result['answer']}"
        }

    # 5. Unknown command
    return {
        "type": "error",
        "command": cmd,
        "output": f"zsh: command not found: {cmd}\nType 'help' to see all available commands, or ask any question about Harsh's work."
    }

@app.post("/api/contact")
def contact_endpoint(payload: ContactRequest):
    print(f"[Contact Received] From: {payload.name} ({payload.email})")
    print(f"Subject: {payload.subject}")
    print(f"Message: {payload.message}\n")
    return {
        "success": True,
        "message": f"Thank you {payload.name}! Your inquiry has been received and logged."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
