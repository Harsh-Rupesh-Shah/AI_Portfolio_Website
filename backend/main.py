"""
FastAPI Agentic Backend for Harsh Shah's Portfolio
Provides API endpoints for HS-01 Copilot RAG, Terminal commands, Contact inquiries, and Telemetry.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from langchain_agent import invoke_hs01_agent
from rag_engine import get_rag_engine

app = FastAPI(
    title="Harsh Shah Portfolio Agentic Backend",
    description="LangChain Agent with Production-Grade RAG Tool",
    version="2.0.0"
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

class ContactRequest(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str

@app.get("/")
def root():
    return {
        "status": "online",
        "system": "HS-01 LangChain Autonomous Agent with RAG Tool",
        "version": "2.0.0",
        "developer": "Harsh Shah"
    }

@app.get("/api/telemetry")
def get_telemetry():
    return {
        "orchestrator": "LangGraph v1.2 / LangChain 1.4",
        "model": "Gemini 2.5 Flash",
        "protocol": "Model Context Protocol (MCP) + A2A",
        "agent_tools": ["query_harsh_dossier_rag", "get_project_architecture_specs"],
        "average_latency": "8.2s (down from 18s at TIAA)",
        "accuracy": "100% deterministic schema conformity",
        "status": "DAEMON_ACTIVE"
    }

@app.post("/api/copilot")
def copilot_endpoint(payload: CopilotQuery):
    if not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    result = invoke_hs01_agent(payload.query.strip())
    return {
        "response": result["answer"],
        "sources": result.get("sources", []),
        "tool_calls": result.get("tool_calls", []),
        "model": result.get("model", "gemini-2.5-flash")
    }

TERMINAL_COMMANDS = {
    "help": """AVAILABLE COMMANDS IN HS-01 RUNTIME:
  ask <query>        - Semantic vector query across Harsh's experience and repositories
  projects           - Inspect production agentic systems (TIAA, JobPilot, Governance Copilot)
  experience         - Chronological work history (TIAA, Space Agency, Katapult)
  education          - Academic degree (DJSCE, SBMP) and CGPA metrics
  skills             - Inspect technical proficiencies (LangGraph, MCP, Python, React, Docker)
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

    # 2. Known shell command in dictionary
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
        return {
            "type": "inference",
            "query": query,
            "output": f"> INFERENCE ENGINE: {result.get('model', 'gemini-2.5-flash')}\n"
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
        return {
            "type": "inference",
            "query": cmd,
            "output": f"> INFERENCE ENGINE: {result.get('model', 'gemini-2.5-flash')}\n"
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
