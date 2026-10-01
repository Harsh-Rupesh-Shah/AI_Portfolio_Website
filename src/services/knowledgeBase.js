/**
 * Knowledge Base & Telemetry Data
 * Extracted from Stitch project: AI Portfolio Website
 * Grounded in production repositories, LangGraph systems, and MCP tooling.
 */

export const COPILOT_KNOWLEDGE = {
  "Explain RMD workflow":
    "In the TIAA retirement workflow, Harsh replaced multi-hop serial LLM calls with a single semantic routing graph using LangChain and Anthropic MCP. Round-trip latency was reduced from ~18s to 8.2s, cutting LLM calls from 5 down to 2–3 while ensuring 100% deterministic calculation accuracy and zero schema drift.",
  "Deterministic LLM benchmarks":
    "Harsh engineers deterministic evaluation harnesses using token fuzzing, schema validation assertions (Pydantic), and semantic drift measurement (< 0.05 rad), running in under 14.2s per 1,200-case test suite to achieve a 99.4% pass rate before production release on OpenShift.",
  "Multi-agent swarm architecture":
    "A 4-agent collaborative swarm (Searcher, Critic, Verifier, Synthesizer) communicating over an asynchronous A2A JSON-RPC bus with 4.8x context compression, verified citation graph consensus, and a 0.2% verified hallucination delta.",
  "Real-time MCP Context Fabric":
    "A high-throughput Model Context Protocol server exposing verified tools (Retirement Calculators, DAG Evaluators, Context Pruners) over JSON-RPC with 4ms-12ms execution latency and cryptographic schema verification.",
  "contact":
    "Harsh can be reached directly via email at harsh.shah@example.com (or harsh@shah.systems), on LinkedIn at linkedin.com/in/harsh-shah-ai, or on GitHub at github.com/harsh-shah-dev. He is open to discussions on autonomous agent architectures, MCP implementations, and high-performance AI backend systems.",
  "How to reach Harsh?":
    "Harsh is based in Mumbai, India (UTC +5:30) and collaborates globally. You can connect via email at harsh.shah@example.com or trigger the terminal 'contact' command for encrypted communication details."
};

export const SYSTEMS_DATA = [
  {
    id: "system-01",
    tag: "FLAGSHIP · 01",
    organization: "TIAA ENTERPRISE PRODUCTION",
    title: "Agentic Retirement Workflows (RMD / SDA)",
    summary:
      "Autonomous reasoning engine replacing fragile multi-hop advisor scripts with deterministic LangChain graph orchestration and Model Context Protocol (MCP) tool endpoints.",
    tech: ["PYTHON", "FASTAPI", "LANGCHAIN", "MCP PROTOCOL", "DOCKER", "OPENSHIFT"],
    telemetry: [
      { label: "LLM INFERENCE CALLS", val: "2 - 3", previous: "5", note: "Optimized graph routing" },
      { label: "ROUND-TRIP LATENCY", val: "8.2s", previous: "~18s", note: "-54% reduction", highlight: true },
      { label: "CALCULATION DRIFT", val: "100% DETERMINISTIC", note: "Zero semantic drift" },
      { label: "INTERFACE STANDARD", val: "MODEL CONTEXT PROTOCOL", note: "Anthropic MCP Specification", highlight: true }
    ],
    dagSteps: [
      { step: "01 / INGRESS", title: "User Intent Payload", desc: "Natural Language Request" },
      { step: "02 / ORCHESTRATOR", title: "Agentic Graph", desc: "FastAPI + LangChain Memory", isCore: true },
      { step: "03 / TOOL DISPATCH", title: "Deterministic MCP", desc: "RMD & Calculation Endpoints" },
      { step: "04 / OUTPUT", title: "Audited Result", desc: "Zero Semantic Drift" }
    ],
    architectureDetails: {
      problemStatement:
        "Retirement calculations such as Required Minimum Distributions (RMD) and Systematic Distribution Annuities (SDA) require absolute regulatory precision. Traditional LLM prompting led to hallucinations and compounding errors over multi-step prompts.",
      solutionArchitecture:
        "Engineered a stateful LangGraph execution DAG. The LLM handles solely semantic intention parsing and structured parameter extraction via Pydantic schemas, delegating all math and calculations to audited Python MCP tool microservices.",
      results: [
        "Eliminated math hallucination completely (0% calculation error rate).",
        "Decreased round-trip latency from ~18s to 8.2s by consolidating 5 serial calls into 2 parallelized graph nodes.",
        "Created an immutable audit log for compliance with full state reconstruction."
      ]
    }
  },
  {
    id: "system-02",
    tag: "SYSTEM 02 // RESEARCH SWARM",
    organization: "A2A PROTOCOL",
    title: "Multi-Agent Research Synthesizer",
    summary:
      "Autonomous 4-agent collaborative swarm (Searcher, Critic, Verifier, Synthesizer) orchestrating paper summarization, citation graph validation, and cross-source consensus verification.",
    tech: ["PYTORCH", "FASTAPI", "FAISS", "LANGGRAPH", "QDRANT"],
    topology: [
      { role: "SEARCHER", active: false },
      { role: "CRITIC", active: false },
      { role: "SYNTHESIZER", active: true }
    ],
    metrics: [
      { label: "VERIFICATION DELTA", val: "0.2% DRIFT", highlight: true },
      { label: "COMMUNICATION BUS", val: "A2A JSON RPC" }
    ],
    queryKey: "Multi-agent swarm architecture",
    architectureDetails: {
      problemStatement:
        "Single-agent LLM summarization often confabulates citations, misrepresents statistical power, and misses contradictions between literature sources.",
      solutionArchitecture:
        "Designed an asynchronous A2A (Agent-to-Agent) topology where a Searcher gathers candidate passages, a Critic adversarial stress-tests assertions, a Verifier checks against graph vector embeddings, and a Synthesizer writes the output only when consensus thresholds (>0.92) are met.",
      results: [
        "4.8x context window compression through recursive summarization.",
        "0.2% verified hallucination delta on cross-citation evaluation benchmarks.",
        "Sub-second A2A message exchange using Redis pub/sub."
      ]
    }
  },
  {
    id: "system-03",
    tag: "SYSTEM 03 // RELIABILITY",
    organization: "CI/CD TESTBED",
    title: "Deterministic Evaluation & Guardrail Harness",
    summary:
      "Automated regression testbed for non-deterministic LLM pipelines, executing fuzz testing, semantic boundary assertion, and schema integrity validation prior to production deployment.",
    tech: ["PYTHON", "DOCKER", "PYTEST", "PYDANTIC", "OPENSHIFT"],
    progress: {
      title: "BENCHMARK SUITE (1,200 CASES)",
      percentage: "99.4%",
      tags: ["TOKEN FUZZING", "SCHEMA INTEGRITY", "OPENSHIFT VERIFIED"]
    },
    metrics: [
      { label: "SEMANTIC REGRESSION", val: "< 0.05 RAD", highlight: true },
      { label: "CYCLE TIME", val: "14.2s SUITE" }
    ],
    queryKey: "Deterministic LLM benchmarks",
    architectureDetails: {
      problemStatement:
        "Prompt drift and foundation model updates frequently break production pipelines silently, altering output JSON structure or changing edge-case reasoning without error flags.",
      solutionArchitecture:
        "Constructed an automated CI/CD eval harness executing 1,200 deterministic unit and integration tests. Includes token perturbation fuzzing, schema boundary validation, and embedding drift angle metrics.",
      results: [
        "99.4% test suite pass rate across 1,200 adversarial test fixtures.",
        "Total execution cycle completed in 14.2s using parallelized async pytest runners.",
        "Zero schema breaking regressions across 6 production release cycles."
      ]
    }
  }
];

export const PIPELINE_STAGES = [
  {
    num: "01",
    title: "CONCEPT",
    desc: "Deconstructing manual friction into verifiable decision boundaries and system bounds.",
    detail: "Requirement ingestion, regulatory constraint mapping, failure mode taxonomy."
  },
  {
    num: "02",
    title: "GRAPH DESIGN",
    desc: "Graph topology mapping, state-machine modeling, and failure-mode redundancy planning.",
    detail: "Cyclic vs DAG flow definition, checkpoint strategy, timeout & fallback paths."
  },
  {
    num: "03",
    title: "ORCHESTRATE",
    desc: "Stateful LangChain flows combining reasoning, tools, persistent memory, and structured outputs.",
    detail: "Pydantic output parsing, thread-safe memory management, state checkpointing.",
    isCore: true
  },
  {
    num: "04",
    title: "MCP CONNECT",
    desc: "Exposing deterministic internal tools and enterprise data stores through Model Context Protocol.",
    detail: "Anthropic MCP client/server schemas, secure JSON-RPC socket communication."
  },
  {
    num: "05",
    title: "EVALUATE",
    desc: "Automated regression suites, ground-truth validations, and token fuzz testing against drift.",
    detail: "Embedding drift angle checks (< 0.05 rad), 1,200-case CI test matrix, prompt injection fuzzing."
  },
  {
    num: "06",
    title: "SHIP",
    desc: "Containerized deployments on OpenShift clusters with live telemetry budgets and health probes.",
    detail: "Docker containerization, Prometheus/Grafana telemetry stream, automated canary rollout."
  }
];

export const SKILLS_CATEGORIES = {
  "Orchestration": [
    "LangGraph", "LangChain", "AutoGen", "CrewAI", "Custom DAG Engines", "State Machines"
  ],
  "Protocols & Tooling": [
    "Model Context Protocol (MCP)", "Anthropic Tool Calling", "JSON-RPC 2.0", "gRPC", "REST APIs"
  ],
  "Languages & Backend": [
    "Python 3.12", "FastAPI", "Pydantic v2", "TypeScript", "Node.js", "Docker", "OpenShift"
  ],
  "Vector & Storage": [
    "Qdrant", "pgvector", "Redis Cluster", "ClickHouse", "FAISS", "PostgreSQL"
  ],
  "Evals & Guardrails": [
    "PyTest", "DeepEval", "Ragas", "Token Fuzzing", "Semantic Drift Validation", "Guardrails AI"
  ]
};

export const TERMINAL_COMMANDS = {
  help: `AVAILABLE COMMANDS IN HS-01 RUNTIME:
  ask <query>        - Run semantic vector inference across production portfolio
  projects           - Print architecture details for deployed agentic systems
  telemetry          - Display real-time throughput, latency, and drift metrics
  mcp                - Inspect Model Context Protocol tools and schemas
  experience         - Print chronological system engineering work history
  skills             - Inspect agent engineering tech stack (LangGraph, Python, MCP)
  benchmarks         - Execute deterministic eval suite runner
  contact            - Print secure channel keys & comms coordinates
  cat <filename>     - Read file (e.g., 'cat about.md', 'cat contact.json')
  clear              - Purge current terminal output`,

  projects: `DEPLOYED AGENTIC SYSTEMS:
[01] TIAA RETIREMENT WORKFLOWS (RMD / SDA)
     Stack: Python, FastAPI, LangChain, Anthropic MCP, OpenShift
     Metric: ~18s -> 8.2s Latency (-54%) | 100% Deterministic

[02] MULTI-AGENT RESEARCH SYNTHESIZER
     Stack: PyTorch, FastAPI, FAISS, A2A JSON-RPC
     Metric: 4.8x Context Compression | 0.2% Drift Delta

[03] DETERMINISTIC EVALUATION & GUARDRAIL HARNESS
     Stack: PyTest, Token Fuzzers, Semantic Drift Evaluator
     Metric: 1,200 Test Cases | 99.4% Pass Rate in 14.2s`,

  telemetry: `SYSTEM RUNTIME TELEMETRY (LIVE SNAPSHOT):
  • Core Orchestrator:       LangGraph v0.2.14 [ACTIVE]
  • Tool Protocol:           Anthropic MCP v1.0 [STABLE]
  • Average Graph Latency:   8.24s (Down from 18.0s)
  • Semantic Drift Delta:    < 0.048 rad (Tolerance: < 0.05 rad)
  • Schema Validation Pass:  99.4% across 1,200 synthetic vectors
  • Active Worker Nodes:     4 agents (Searcher, Critic, Synthesizer, Guard)
  • Memory Overhead:         18.4MB / request`,

  mcp: `MCP DISPATCH TABLE [v1.0-READY]:
  • tool://portfolio/retirement_calc      -> [ONLINE] [Latency: 12ms]
  • tool://portfolio/dag_evaluator        -> [ONLINE] [Latency: 8ms]
  • tool://portfolio/context_pruner       -> [ONLINE] [Latency: 4ms]
  • tool://portfolio/schema_assert_v2     -> [ONLINE] [Latency: 1ms]
  All tool calls strictly constrained via JSONSchema with tamper check.`,

  experience: `CHRONOLOGICAL ENGINEERING LOG:
  2025 - PRESENT // SOFTWARE DEVELOPER, AGENTIC AI & SYSTEMS @ TIAA
  • Architected autonomous agentic workflows and Model Context Protocol (MCP) infrastructure.
  • Reduced retirement advisor latency by 54% (18s -> 8.2s) with zero calculation hallucination.
  • Deployed containerized microservices on OpenShift with automated CI/CD eval gates.

  2024 // DISTRIBUTED SYSTEMS & CONCURRENCY
  • Constructed modular microservices, REST interfaces, and async task pipelines.
  • Established foundational principles in caching models and deterministic testing.`,

  skills: `CORE STACK & RUNTIMES:
  • Orchestration: LangGraph, LangChain, AutoGen, CrewAI, Custom DAG Engines
  • Protocols: Model Context Protocol (Anthropic MCP), gRPC, JSON-RPC, REST
  • Language & Frameworks: Python 3.12, TypeScript, FastAPI, Pydantic, Rust
  • Vector & Storage: Qdrant, pgvector, Redis Cluster, ClickHouse
  • Evals & Guardrails: DeepEval, Ragas, TruLens, Guardrails AI, Custom Fuzzers`,

  benchmarks: `RUNNING EVAL SUITE [1,200 TEST CASES]...
  [Test 001 - 250]: Schema Conformity ................ 250/250 PASSED [OK]
  [Test 251 - 500]: Adversarial Prompt Injection ..... 250/250 PASSED [OK]
  [Test 501 - 750]: Tool Dispatch Precision .......... 250/250 PASSED [OK]
  [Test 751 - 1000]: State Graph Recovery ............ 250/250 PASSED [OK]
  [Test 1001 - 1200]: Stochastic Drift Tolerance ..... 200/200 PASSED [OK]
  ========================================================================
  RESULT: 1,200/1,200 PASSED (100%) in 13.88s | MEMORY OVERHEAD: 18.4MB`,

  contact: `COMMUNICATION PROTOCOL:
  • Location: Mumbai, India (IST / UTC +5:30)
  • Secure Email: harsh@shah.systems (or harsh.shah@example.com)
  • GitHub: https://github.com/harsh-shah-dev
  • LinkedIn: https://linkedin.com/in/harsh-shah-ai
  • Status: OPEN FOR STRATEGIC AGENTIC AI & ORCHESTRATION ROLES`,

  "cat about.md": `HARSH SHAH // AGENTIC AI ENGINEER
"I replace speculative probabilistic LLM prompts with deterministic, auditable multi-agent systems that enterprise infrastructure can trust."
Focus: LangGraph DAGs, MCP Protocol integration, adversarial evals, and low-latency cognitive pipelines.`,

  "cat contact.json": `{
  "name": "Harsh Shah",
  "role": "Agentic AI & Systems Engineer",
  "base": "Mumbai, India",
  "keys": {
    "ed25519": "0x7F4E9921B5AA109E2B",
    "mcp_agent_id": "hs-agent-01-prod"
  },
  "status": "Available for High-Impact Agentic Work"
}`
};
