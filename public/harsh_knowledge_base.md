# Harsh Shah — Official Engineering Knowledge Base

> Verified Technical Dossier & Production Architecture Documentation  
> Role: Analyst - Agentic AI Developer @ TIAA  
> Location: Mumbai, Maharashtra, India (IST / UTC +5:30)  
> Email: hrsshah04022004@gmail.com | Phone: +91 9175366700  
> GitHub: [https://github.com/Harsh-Rupesh-Shah](https://github.com/Harsh-Rupesh-Shah)  
> LinkedIn: [https://linkedin.com/in/harshshah2004](https://linkedin.com/in/harshshah2004)  

---

## 1. Executive Summary & Engineering Philosophy

Harsh Shah is an Agentic AI Developer and Distributed Systems Engineer based in Mumbai, India. His work centers on moving large language models beyond stochastic prompt engineering into **deterministic, auditable multi-agent state machines**. He specializes in enterprise workflow orchestration using LangGraph, LangChain, Model Context Protocol (MCP), and A2A protocols, backed by robust backend infrastructure in Python, FastAPI, and Docker on OpenShift.

### Core Principles
- **Determinism Over Stochastic Drift:** Autonomous agents in high-stakes enterprise domains (finance, retirement, governance) must be bound by strict Pydantic schemas, invariant boundaries, and deterministic fallback channels.
- **Decoupled Cognitive Nodes:** Deconstruct monolithic multi-hop prompts into modular, single-responsibility agent nodes operating concurrently across directed acyclic graphs (DAGs).
- **Human-in-the-Loop (HITL) Safety:** High-risk actions (dispatches, mutations, external tool calls) must support pause and resume mechanisms with explicit human authorization before state persistence.
- **Latency & Token Efficiency:** Parallelize independent retrieval stages, optimize prompt compression, and stream tokens via Server-Sent Events (SSE) and WebSockets.

---

## 2. Professional Work History

### TIAA — Analyst, Agentic AI Developer
* **Timeline:** July 2025 – Present  
* **Location:** Mumbai, India  
* **Focus:** Enterprise Multi-Agent Systems, LangGraph, Model Context Protocol (MCP), Concurrency & Latency Optimization  

#### Key Achievements & Architectural Impact:
1. **Multi-Agent Orchestration Architecture:**
   - Designed and built enterprise-grade multi-agent systems using LangChain, LangGraph, Model Context Protocol (MCP), and A2A protocols.
   - Orchestrated domain-specific agents to autonomously coordinate across complex enterprise and retirement workflows (e.g. RMD/SDA calculations).
2. **Latency & LLM Call Optimization:**
   - Engineered custom Python sequencers and semantic graph routing, reducing sequential LLM calls from **5 down to 2–3 per request**.
   - Slashed round-trip user latency by ~50%, dropping from **17–18s down to 8–9s** while ensuring 100% calculation determinism.
3. **Real-Time Streaming Pipelines:**
   - Implemented real-time streaming architectures utilizing **Server-Sent Events (SSE) and WebSockets** to multiplex agent token streams directly to frontend interfaces, drastically improving perceived response times.
4. **Context-Aware Dynamic UI:**
   - Developed dynamic AI-driven frontend experiences using React and Python, allowing UI components to re-render in real time based on intermediate agent states.
5. **Enterprise Integrations & Cloud Deployment:**
   - Integrated enterprise RAG pipelines and legacy database mainframe endpoints via standardized MCP adapters.
   - Deployed containerized microservices through Docker, Jenkins automated CI/CD evaluation pipelines, and OpenShift enterprise clusters.

---

### Space Agency — Full Stack Developer (Part-Time)
* **Timeline:** June 2024 – May 2025  
* **Location:** Mumbai, India  
* **Focus:** MERN Stack, Application Security, REST Microservices  

#### Key Achievements:
- Developed and delivered full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js), JavaScript (ES6+), HTML5, and modern CSS.
- Implemented secure authentication and authorization mechanisms with JWT, HTTP-only secure cookies, and cryptographic hashing.
- Designed modular REST endpoints and asynchronous backend worker queues ensuring dependable data flow and uptime.

---

### Katapult Technologies Pvt. Ltd — FrontEnd Web Developer (Intern)
* **Timeline:** July 2021 – September 2021  
* **Location:** Mumbai, India  
* **Focus:** Modern Frontend UI, Responsive Web Components, Performance Optimization  

#### Key Achievements:
- Engineered modular, mobile-responsive user interface components using JavaScript, HTML5, and CSS3.
- Optimized web performance, asset delivery, and cross-browser consistency.

---

## 3. Flagship Production Projects

### Project 1: JobPilot – Multi-Agent Job Application Co-Pilot
* **GitHub Repository:** [https://github.com/Harsh-Rupesh-Shah/JobPilot](https://github.com/Harsh-Rupesh-Shah/JobPilot)  
* **Tech Stack:** Python 3.12, LangGraph, LangChain, FastAPI, FAISS, Playwright, Tavily Search, MongoDB, Motor, React 18, Vite, TypeScript, Server-Sent Events (SSE)  

#### Architecture & Technical Innovations:
- **Two-Phase Directed Acyclic Graph (DAG):**
  - **Phase 1 (Concurrent Extraction & Retrieval):**
    - *Supervisor Node:* Uses `with_structured_output` and Pydantic models to extract structured metadata (role requirements, technical skills, hiring team) from unstructured job descriptions.
    - *Research Agent:* Asynchronously scrapes company context, team culture, and recent news using Tavily and Playwright.
    - *Resume Agent:* Chunks the candidate's base resume, generates dense embeddings with `all-MiniLM-L6-v2`, indexes them into a local FAISS vector store, and semantically retrieves ATS-matched bullet points.
    - *Concurrency:* Runs web research and resume vector search in parallel, cutting pipeline latency in half.
  - **Phase 2 (Generation & Synthesis):**
    - *Cover Letter Agent:* Synthesizes tailored narrative combining research brief and ATS-aligned experience.
    - *Interview Prep Agent:* Generates role-specific behavioral (STAR method) and technical interview questions.
    - *Outreach Agent:* Drafts personalized cold emails to hiring managers.
- **Human-in-the-Loop (HITL) Control Flow:**
  - Implements LangGraph's native `interrupt()` pattern before executing final mutations or sending emails.
  - The React frontend displays intermediate outputs for human review. Upon user confirmation, execution resumes via `Command(resume=...)` to persist artifacts in MongoDB and dispatch outreach over SMTP.
- **Multiplexed SSE Token Streaming:**
  - Multiplexes parallel agent token streams over Server-Sent Events (SSE) to the frontend, providing immediate visual feedback as each agent reasons.

---

### Project 2: AI Decision Governance Copilot
* **GitHub Repository:** [https://github.com/Harsh-Rupesh-Shah/AI_Governance_Project](https://github.com/Harsh-Rupesh-Shah/AI_Governance_Project)  
* **Tech Stack:** Python 3.12, LangGraph, Google Gemini 1.5/2.0, MongoDB, MongoDBStore, ChromaDB, HuggingFace Embeddings, Pydantic v2, FastAPI  

#### Architecture & Technical Innovations:
- **Specialized Multi-Agent Governance Graph:**
  - Orchestrates specialized cognitive agents over a centralized state graph:
    - *Intent Agent:* Dissects natural language actions and maps them to regulated operations (e.g. refunds, access elevation).
    - *Policy Agent:* Retrieves organizational compliance boundaries and regulatory constraints from ChromaDB.
    - *Memory Agent:* Analyzes historical cross-session patterns for anomalies.
    - *Risk Agent:* Calculates composite risk scores and determines escalation thresholds.
    - *Audit Agent:* Emits tamper-evident decision logs.
- **Dual-Layer Memory Architecture:**
  - *Short-Term Memory:* MongoDB state checkpointer saves graph snapshots at every node boundary, enabling zero-loss fault recovery and execution resumption.
  - *Long-Term Memory:* Uses persistent cross-thread memory (`MongoDBStore`) to retain behavioral patterns across sessions, allowing agents to identify repeated near-threshold requests or historical risk flags.
- **Rate-Limit-Free Policy RAG:**
  - Uses local ChromaDB with HuggingFace embeddings to index enterprise governance policies, allowing continuous semantic retrieval without external API rate limits or latency bottlenecks.
- **Strict Pydantic Output Enforcement:**
  - Enforces rigid schema validation via Gemini's structured output mode, falling back to deterministic deterministic routing rules whenever schema drift occurs.

---

## 4. Academic Background & Honors

### Dwarkadas Jivanlal Sanghvi College of Engineering (DJSCE) — Mumbai, India
* **Degree:** Bachelor of Technology (B.Tech) in Computer Science and Engineering  
* **Specialization:** IoT and Cyber Security with Block Chain Technology  
* **Minors:** Artificial Intelligence | Machine Learning | Deep Learning  
* **Timeline:** 2022 – 2025  
* **Cumulative GPA (CGPA):** **8.70 / 10.0**  

### Shri Bhagubhai Mafatlal Polytechnic (SBMP) — Mumbai, India
* **Degree:** Diploma in Computer Engineering  
* **Timeline:** 2019 – 2022  
* **Final Percentage:** **92.00%**  

### Honors & Extracurricular Accomplishments
* **Smart India Hackathon (SIH) 2024 — National Finalist (December 2024):**
  - Selected as a National Finalist in India's premier nationwide engineering hackathon for presenting an innovative automated solution to real-world operational challenges.
* **Academic Research Publication — IJARSCT Journal (December 2021):**
  - Published research paper titled *"Coded Websites Vs WordPress Websites"* in the International Journal of Advanced Research in Science, Communication and Technology (IJARSCT).
  - DOI: `10.48175/IJARSCT-2140`.

---

## 5. Comprehensive Technical Skills Matrix

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Agentic AI & Orchestration** | LangGraph, LangChain, Model Context Protocol (MCP), Anthropic MCP, A2A Protocol, Multi-Agent DAGs, Human-in-the-Loop (HITL), State Checkpointing, Supervisor Architecture |
| **Languages & Frameworks** | Python 3.12, FastAPI, Pydantic v2, Node.js, Express, JavaScript (ES6+), TypeScript, React.js, MERN Stack |
| **Data & Vector Stores** | MongoDB, MongoDB Atlas Search, ChromaDB, FAISS, Vector Embeddings, HuggingFace, Redis, PostgreSQL |
| **LLMs & Foundation Models** | Google Gemini (1.5 Flash/Pro, 2.0/2.5 Flash), Claude (Anthropic), OpenRouter, RAG Pipelines, Semantic Search |
| **Streaming & APIs** | Server-Sent Events (SSE), WebSockets, REST APIs, JSON-RPC 2.0, gRPC |
| **Cloud & DevOps** | Docker, OpenShift, Kubernetes, Jenkins CI/CD, Git, GitHub, GitLab, Terraform |
| **Frontend & Visualization** | React.js, Vite, Three.js (3D Agentic Graphs), Vanilla CSS Design Systems, TailwindCSS |

---

## 6. Communication Coordinates & Contact

- **Full Name:** Harsh Shah
- **Current Position:** Analyst - Agentic AI Developer @ TIAA
- **Base:** Mumbai, Maharashtra, India (Available for high-impact agentic AI architecture discussions)
- **Email:** `hrsshah04022004@gmail.com`
- **Phone:** `+91 9175366700`
- **GitHub:** [https://github.com/Harsh-Rupesh-Shah](https://github.com/Harsh-Rupesh-Shah)
- **LinkedIn:** [https://linkedin.com/in/harshshah2004](https://linkedin.com/in/harshshah2004)
