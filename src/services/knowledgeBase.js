/**
 * Knowledge Base & Telemetry Data
 * Grounded in Harsh Shah's real experience, production repositories, and resume.
 * Projects: TIAA Enterprise Agentic Systems, JobPilot, AI Decision Governance Copilot
 */

export const COPILOT_KNOWLEDGE = {
  "Explain RMD workflow":
    "At TIAA, Harsh architected multi-agent enterprise workflows using LangChain, LangGraph, Model Context Protocol (MCP), and A2A protocols. He developed custom Python sequencers that reduced LLM calls from 5 to 2–3 per request, cutting round-trip latency from 17–18s to 8–9s while enforcing 100% deterministic calculation accuracy and SSE streaming.",
  "Deterministic LLM benchmarks":
    "Harsh enforces determinism across production LLM pipelines through Pydantic structured schemas, short-term and long-term state checkpointing in MongoDB, local ChromaDB policy vector stores, and automated adversarial eval harnesses to eliminate semantic drift and hallucinations.",
  "Multi-agent swarm architecture":
    "In projects like JobPilot and AI Decision Governance Copilot, Harsh designs stateful LangGraph directed acyclic graphs (DAGs). These feature concurrent worker nodes (research scrapers, ATS resume matchers, policy auditors, and risk evaluators), dual-layer memory, and human-in-the-loop (HITL) interrupt controls.",
  "JobPilot architecture":
    "JobPilot (github.com/Harsh-Rupesh-Shah/JobPilot) is a multi-agent system built on LangGraph. It runs a two-phase DAG: Phase 1 runs concurrent web scraping (Tavily/Playwright) and semantic ATS resume chunking (FAISS / all-MiniLM-L6-v2), and Phase 2 generates targeted materials. It uses LangGraph's interrupt() mechanism for human approval before dispatching outreach, multiplexing tokens to React via SSE.",
  "AI Governance Copilot":
    "The AI Decision Governance Copilot orchestrates specialized agents (Intent, Policy, Memory, Risk, Audit) with Gemini and LangGraph. It features dual-layer MongoDB memory (workflow checkpoints + persistent cross-thread user history) and a local ChromaDB RAG engine to evaluate and govern enterprise AI actions without hitting API rate limits.",
  "contact":
    "Harsh Shah is based in Mumbai, India. You can reach him at hrsshah04022004@gmail.com, on LinkedIn at linkedin.com/in/harshshah2004, or on GitHub at github.com/Harsh-Rupesh-Shah.",
  "How to reach Harsh?":
    "Harsh can be reached directly via email at hrsshah04022004@gmail.com or via phone at +91 9175366700. He is currently an Analyst - Agentic AI Developer at TIAA in Mumbai, open to discussions on autonomous agent architectures and distributed AI infrastructure."
};

export const SYSTEMS_DATA = [
  {
    id: "system-01",
    tag: "FLAGSHIP · 01",
    organization: "TIAA ENTERPRISE PRODUCTION",
    title: "Enterprise Multi-Agent Orchestrator",
    summary:
      "Production multi-agent systems using LangChain, LangGraph, Model Context Protocol (MCP), and A2A protocols, orchestrating domain-specific agents across complex financial workflows with real-time SSE streaming.",
    tech: ["PYTHON", "FASTAPI", "LANGGRAPH", "MCP", "A2A", "REACT", "DOCKER", "OPENSHIFT"],
    telemetry: [
      { label: "LLM INFERENCE CALLS", val: "2 - 3", previous: "5", note: "Custom Python sequencers" },
      { label: "ROUND-TRIP LATENCY", val: "8 - 9s", previous: "17 - 18s", note: "~50% reduction", highlight: true },
      { label: "STREAMING PROTOCOL", val: "SSE & WEBSOCKETS", note: "Real-time perceived response", highlight: true },
      { label: "DEPLOYMENT STACK", val: "OPENSHIFT / DOCKER", note: "Jenkins CI/CD automated gates" }
    ],
    dagSteps: [
      { step: "01 / INGRESS", title: "Enterprise Request", desc: "User / Advisor conversational context" },
      { step: "02 / ORCHESTRATION", title: "LangGraph Sequencer", desc: "State machine + Python dispatch", isCore: true },
      { step: "03 / TOOL & PROTOCOL", title: "MCP & A2A Bus", desc: "Domain agent invocation & tool schemas" },
      { step: "04 / STREAMING", title: "SSE Token Stream", desc: "Real-time React UI rendering" }
    ],
    architectureDetails: {
      problemStatement:
        "Enterprise financial and retirement workflows involved fragile multi-hop LLM scripts with high latency (17–18s) and 5+ sequential API calls, causing slow response times and vulnerability to intermediate failure.",
      solutionArchitecture:
        "Redesigned the orchestration architecture into a stateful multi-agent DAG using LangGraph and custom sequencers. Integrated Model Context Protocol (MCP) and A2A for standardized tool execution, with Server-Sent Events (SSE) and WebSockets multiplexing tokens directly to React UI components.",
      results: [
        "Cut LLM calls from 5 down to 2–3 per request through intelligent semantic routing.",
        "Reduced round-trip latency from 17–18s to 8–9s, significantly improving user responsiveness.",
        "Engineered real-time streaming architectures deployed reliably on OpenShift and Docker."
      ]
    }
  },
  {
    id: "system-02",
    tag: "SYSTEM 02 // MULTI-AGENT DAG",
    organization: "OPEN SOURCE PRODUCTION",
    title: "JobPilot – Multi-Agent Job Application Co-Pilot",
    summary:
      "A concurrent two-phase LangGraph system that automates tailored job preparation. Features parallel web scraping, semantic ATS resume chunking, and Human-in-the-Loop (HITL) execution controls.",
    tech: ["LANGGRAPH", "FASTAPI", "FAISS", "PLAYWRIGHT", "TAVILY", "MONGODB", "REACT"],
    githubUrl: "https://github.com/Harsh-Rupesh-Shah/JobPilot",
    topology: [
      { role: "SUPERVISOR", active: false },
      { role: "RESEARCH & ATS", active: true },
      { role: "HITL APPROVAL", active: true }
    ],
    metrics: [
      { label: "WORKFLOW TOPOLOGY", val: "2-PHASE DAG", highlight: true },
      { label: "CONTROL FLOW", val: "HITL INTERRUPT()" }
    ],
    queryKey: "JobPilot architecture",
    dagSteps: [
      { step: "PHASE 1", title: "Supervisor Node", desc: "Structured metadata extraction" },
      { step: "CONCURRENT", title: "Research & Resume", desc: "Tavily web briefing + FAISS vector search", isCore: true },
      { step: "PHASE 2", title: "Synthesizer Agents", desc: "Cover letter, STAR interview prep, outreach" },
      { step: "CONTROL", title: "HITL Interrupt", desc: "User approval before SMTP dispatch" }
    ],
    architectureDetails: {
      problemStatement:
        "Customizing job applications requires gathering company context, aligning resume bullet points to ATS schemas, and writing personalized outreach—a process that is serial, repetitive, and time-consuming.",
      solutionArchitecture:
        "Built a stateful DAG in LangGraph split into two fan-out/fan-in phases. Phase 1 concurrently runs Tavily/Playwright company research alongside FAISS semantic resume chunking (all-MiniLM-L6-v2). Phase 2 synthesizes cover letters and interview prep. Utilizes LangGraph's interrupt() to pause before triggering outreach.",
      results: [
        "Concurrent DAG design cuts total processing time by parallelizing web research and vector search.",
        "Deterministic ATS scoring with semantic grounding prevents resume hallucination.",
        "Safe execution with human verification before any email or file dispatch."
      ]
    }
  },
  {
    id: "system-03",
    tag: "SYSTEM 03 // GOVERNANCE & EVAL",
    organization: "ENTERPRISE AGENT SYSTEM",
    title: "AI Decision Governance Copilot",
    summary:
      "Stateful multi-agent governance system built with LangGraph and Google Gemini, automating risk analysis, policy compliance, and audit trails with dual-layer MongoDB memory.",
    tech: ["LANGGRAPH", "GEMINI 2.0", "CHROMADB", "PYDANTIC", "MONGODB", "FASTAPI"],
    githubUrl: "https://github.com/Harsh-Rupesh-Shah/AI_Governance_Project",
    progress: {
      title: "POLICY CONFORMITY & RISK GATES",
      percentage: "100%",
      tags: ["INTENT AGENT", "POLICY RAG", "DUAL-LAYER MEMORY", "RISK AUDITOR"]
    },
    metrics: [
      { label: "MEMORY ARCHITECTURE", val: "DUAL-LAYER MONGODB", highlight: true },
      { label: "SCHEMA VALIDATION", val: "PYDANTIC RIGID" }
    ],
    queryKey: "AI Governance Copilot",
    dagSteps: [
      { step: "01 / INTENT", title: "Intent & Action Parser", desc: "Structured Gemini extraction" },
      { step: "02 / POLICY RAG", title: "ChromaDB Store", desc: "Local policy embeddings (zero rate limits)", isCore: true },
      { step: "03 / RISK EVAL", title: "Risk & Escalation", desc: "Historical cross-thread pattern detection" },
      { step: "04 / AUDIT", title: "Audit Trail & Commit", desc: "MongoDB short & long term checkpointing" }
    ],
    architectureDetails: {
      problemStatement:
        "Autonomous AI systems acting in financial or operational domains (e.g. issuing refunds or modifying permissions) risk policy violations, stochastic drift, and repetitive vulnerabilities without cross-session memory.",
      solutionArchitecture:
        "Orchestrated specialized agents (Intent, Policy, Memory, Risk, Audit) on a LangGraph state graph. Employs a dual-layer memory system: short-term state checkpoints for fault tolerance + MongoDBStore long-term memory to detect cross-thread risk patterns. Uses ChromaDB for rate-limit-free local policy RAG.",
      results: [
        "100% schema validation using Gemini with Pydantic structured output.",
        "Zero API rate limit exposure on internal compliance rules through ChromaDB vector retrieval.",
        "Automatic human escalation for anomalous or high-risk multi-agent requests."
      ]
    }
  }
];

export const PIPELINE_STAGES = [
  {
    num: "01",
    title: "INGRESS & INTENT",
    desc: "Deconstruct unstructured requests into validated Pydantic models with explicit boundary bounds.",
    detail: "Supervisor parsing, intent classification, and schema enforcement before invoking agents."
  },
  {
    num: "02",
    title: "CONCURRENT RETRIEVAL",
    desc: "Fan-out execution running vector similarity search and real-time web scrapers in parallel.",
    detail: "ChromaDB/FAISS vector embeddings coupled with Playwright or Tavily live web research."
  },
  {
    num: "03",
    title: "LANGGRAPH ORCHESTRATION",
    desc: "Stateful cyclic/DAG graph with short-term checkpointing and custom node routing logic.",
    detail: "Centralized state transitions, memory routing, and exception recovery via LangGraph checkpoints.",
    isCore: true
  },
  {
    num: "04",
    title: "MCP & TOOL DISPATCH",
    desc: "Invoke external capabilities and domain microservices over Model Context Protocol and JSON-RPC.",
    detail: "Cryptographically verified schemas, sandboxed execution, and A2A inter-agent message buses."
  },
  {
    num: "05",
    title: "HITL & POLICY EVALUATION",
    desc: "LangGraph interrupt() control flow pausing for human authorization on high-stakes actions.",
    detail: "Cross-thread historical risk detection in MongoDB, token fuzzing, and deterministic guardrails."
  },
  {
    num: "06",
    title: "STREAMING & CONTAINERIZATION",
    desc: "Multiplex tokens to React frontend via SSE/WebSockets, packaged in Docker for OpenShift.",
    detail: "Real-time token streaming, Prometheus telemetry metrics, and automated Jenkins CI/CD deployment."
  }
];

export const SKILLS_CATEGORIES = {
  "Agentic & AI Orchestration": [
    "LangGraph", "LangChain", "Model Context Protocol (MCP)", "A2A Protocol", "Multi-Agent DAGs",
    "Human-in-the-Loop (HITL)", "State Checkpointing", "Supervisor Patterns"
  ],
  "Languages & Backend": [
    "Python", "FastAPI", "Pydantic", "Node.js", "JavaScript (ES6+)", "TypeScript", "REST APIs", "SSE & WebSockets"
  ],
  "Frontend & UI": [
    "React.js", "MERN Stack", "HTML5", "Vanilla CSS", "Three.js", "TailwindCSS", "Component Architecture"
  ],
  "Vector Stores & Databases": [
    "MongoDB & Atlas Search", "ChromaDB", "FAISS", "Vector Embeddings", "HuggingFace", "Redis"
  ],
  "Cloud & DevOps": [
    "Docker", "OpenShift", "Kubernetes", "Jenkins CI/CD", "Git & GitHub", "GitLab", "Terraform"
  ]
};

export const TERMINAL_COMMANDS = {
  help: `AVAILABLE COMMANDS IN HS-01 RUNTIME:
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
  clear              - Purge terminal output window`,

  projects: `HARSH SHAH // PRODUCTION ARCHITECTURES:

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
     Architecture: Dual-Layer MongoDB Memory, Local Policy RAG, 100% Schema Validation`,

  telemetry: `HS-01 TELEMETRY STATUS // LIVE DAEMON:
  • Orchestrator:       LangGraph v1.2 / LangChain 1.4 ReAct Engine
  • Cognitive Engine:   Google Gemini 2.5 Flash
  • Protocol:           Model Context Protocol (MCP) + A2A Bus
  • Memory Architecture: Dual-Layer MongoDB (Checkpoints + Long-Term Store)
  • Vector Stores:      ChromaDB (Local Policy) + FAISS (ATS Embeddings)
  • Latency Benchmark:  8.2s avg (reduced ~50% from 18s at TIAA)
  • Concurrency:        2-Phase DAG Fan-out (Concurrent Scraper + Vector Search)
  • Determinism:        100% Pydantic Schema Conformity`,

  mcp: `MODEL CONTEXT PROTOCOL (MCP) // TOOL SUITE:
  [TOOL 01] query_harsh_dossier_rag
    Schema: {"type": "object", "properties": {"query": {"type": "string"}}}
    Target: harsh_knowledge_base.md + resume.pdf (48 chunks, hybrid BM25 + dense)
  [TOOL 02] get_project_architecture_specs
    Schema: {"type": "object", "properties": {"project_name": {"type": "string"}}}
    Target: Detailed DAG topologies, sequencer logic, and streaming specs
  [TRANSPORT] JSON-RPC over stdio / HTTP SSE`,

  benchmarks: `PRODUCTION PERFORMANCE BENCHMARKS:
  • LLM Call Reduction:   5 calls  ──>  2 - 3 calls  (-50% LLM overhead)
  • Round-Trip Latency:   17-18s   ──>  8 - 9s        (~50% round-trip reduction)
  • Output Determinism:   100% (Zero schema drift via Pydantic v2 validators)
  • Stream Perceived Latency: Sub-400ms First Token via Server-Sent Events (SSE)
  • Context Compression:  4.8x ratio across multi-hop agent state handoffs`,

  experience: `CHRONOLOGICAL WORK HISTORY:

• TIAA // ANALYST - AGENTIC AI DEVELOPER (JULY 2025 - CURRENT | MUMBAI)
  - Engineered multi-agent AI systems with LangChain, LangGraph, MCP, and A2A.
  - Reduced LLM hops (5 -> 2-3) and latency (18s -> 8-9s) with custom Python sequencers.
  - Built real-time streaming AI applications using SSE and WebSockets.
  - Deployed containerized microservices through Docker, Jenkins CI/CD, and OpenShift.

• SPACE AGENCY // FULL STACK DEVELOPER (JUNE 2024 - MAY 2025 | MUMBAI)
  - Delivered responsive web applications using MERN stack (MongoDB, Express, React, Node.js).
  - Implemented secure JWT auth, cookies, and encryption protocols.

• KATAPULT TECHNOLOGIES // FRONTEND DEVELOPER INTERN (JULY 2021 - SEP 2021 | MUMBAI)
  - Developed responsive frontend user interfaces with modular web components.`,

  education: `ACADEMIC BACKGROUND:

• DWARKADAS JIVANLAL SANGHVI COLLEGE OF ENGINEERING (DJSCE), MUMBAI
  B.Tech in Computer Science and Engineering (IoT & Cyber Security with Blockchain)
  Graduation: 2022 - 2025 | CGPA: 8.70 / 10
  Minors: Artificial Intelligence | Machine Learning | Deep Learning

• SHRI BHAGUBHAI MAFATLAL POLYTECHNIC (SBMP), MUMBAI
  Diploma in Computer Engineering | 2019 - 2022
  Score: 92.00%`,

  skills: `TECHNICAL PROFICIENCY MATRIX:

• Agentic AI:   LangGraph, LangChain, Model Context Protocol (MCP), A2A, HITL, RAG
• Backend:      Python 3.12, FastAPI, Pydantic v2, Node.js, Express, REST, SSE
• Frontend:     React.js, JavaScript (ES6+), HTML5, CSS3, Three.js
• Databases:    MongoDB, MongoDB Atlas Search, ChromaDB, FAISS, Vector Embeddings
• DevOps:       Docker, Kubernetes, OpenShift, Jenkins CI/CD, Git, GitLab, Terraform`,

  publications: `PUBLICATIONS & HONORS:

• Smart India Hackathon (SIH) 2024 — National Finalist (Dec 2024)
• Research Publication — IJARSCT Journal (Dec 2021)
  Title: "Coded Websites Vs WordPress Websites" (DOI: 10.48175/IJARSCT-2140)`,

  contact: `SECURE COMMUNICATION COORDINATES:

• Full Name:   Harsh Shah
• Location:    Mumbai, Maharashtra, India
• Email:       hrsshah04022004@gmail.com
• Phone:       +91 9175366700
• GitHub:      https://github.com/Harsh-Rupesh-Shah
• LinkedIn:    https://linkedin.com/in/harshshah2004`,

  "cat about.md": `HARSH SHAH // AGENTIC AI & SYSTEMS DEVELOPER
"I bridge the gap between speculative foundation models and deterministic, reliable enterprise systems."
Focus: Multi-agent DAG architectures with LangGraph, Model Context Protocol (MCP) tool integration, Pydantic verification, and real-time streaming user interfaces.`,

  "cat contact.json": `{
  "name": "Harsh Shah",
  "role": "Analyst - Agentic AI Developer",
  "organization": "TIAA",
  "location": "Mumbai, India",
  "email": "hrsshah04022004@gmail.com",
  "phone": "+91 9175366700",
  "github": "https://github.com/Harsh-Rupesh-Shah",
  "linkedin": "https://linkedin.com/in/harshshah2004",
  "status": "Engineering autonomous agentic infrastructure"
}`
};
