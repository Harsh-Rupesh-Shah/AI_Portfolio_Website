"""
HS-01 Agentic RAG Engine
Grounded in Harsh Shah's real experience, production repositories, and resume.
"""

import os
import re
from typing import List, Dict, Any, Tuple
from dotenv import load_dotenv

load_dotenv()

# Check for Gemini API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
gemini_model = None

if GOOGLE_API_KEY:
    try:
        import google.generativeai as genai
        genai.configure(api_key=GOOGLE_API_KEY)
        gemini_model = genai.GenerativeModel("models/gemini-2.5-flash")
    except Exception as e:
        print(f"[RAG] Warning: Could not initialize Gemini model: {e}")

# Ingested Portfolio Knowledge Base Chunks
KNOWLEDGE_CHUNKS = [
    {
        "id": "profile",
        "title": "Harsh Shah Profile & Background",
        "keywords": ["who", "harsh", "profile", "bio", "title", "role", "location", "current"],
        "content": (
            "Harsh Shah is an Analyst - Agentic AI Developer based in Mumbai, Maharashtra, India. "
            "He is currently working at TIAA where he builds enterprise multi-agent AI systems using LangChain, "
            "LangGraph, Model Context Protocol (MCP), and A2A protocols. He graduated with a B.Tech in Computer Science "
            "and Engineering (IoT & Cyber Security with Blockchain) from Dwarkadas Jivanlal Sanghvi College of Engineering (DJSCE) "
            "with a CGPA of 8.70/10 and minors in AI, Machine Learning, and Deep Learning."
        )
    },
    {
        "id": "tiaa_experience",
        "title": "TIAA Enterprise Multi-Agent Systems",
        "keywords": ["tiaa", "latency", "sequencer", "rmd", "calls", "enterprise", "sse", "websockets", "openshift"],
        "content": (
            "At TIAA (July 2025 - Present), Harsh built multi-agent AI systems orchestrating domain-specific agents "
            "across complex enterprise workflows using LangChain, LangGraph, MCP, and A2A. "
            "He engineered custom Python sequencers that reduced LLM calls from 5 down to 2-3 per request, cutting round-trip "
            "latency from 17-18s down to 8-9s (a ~50% latency reduction). "
            "He implemented real-time streaming architectures using SSE and WebSockets for dynamic React frontend updates, "
            "and deployed containerized microservices via Docker, Jenkins CI/CD, and OpenShift."
        )
    },
    {
        "id": "jobpilot",
        "title": "JobPilot – Multi-Agent Job Application Co-Pilot",
        "keywords": ["jobpilot", "dag", "concurrent", "ats", "resume", "playwright", "tavily", "hitl", "interrupt", "faiss"],
        "content": (
            "JobPilot (https://github.com/Harsh-Rupesh-Shah/JobPilot) is an open-source multi-agent system created by Harsh "
            "that automates personalized job preparation. It runs a two-phase directed acyclic graph (DAG) in LangGraph. "
            "Phase 1 concurrently executes Tavily/Playwright company research alongside semantic resume chunking using "
            "all-MiniLM-L6-v2 and FAISS vector retrieval. Phase 2 synthesizes cover letters, interview preparation, and outreach. "
            "It incorporates a Human-in-the-Loop (HITL) control flow using LangGraph's interrupt() mechanism so execution safely pauses "
            "for user approval before triggering irreversible actions, multiplexing tokens to React via Server-Sent Events (SSE)."
        )
    },
    {
        "id": "ai_governance",
        "title": "AI Decision Governance Copilot",
        "keywords": ["governance", "compliance", "policy", "chromadb", "gemini", "memory", "mongodb", "risk", "audit", "pydantic"],
        "content": (
            "AI Decision Governance Copilot is an enterprise-grade stateful multi-agent system built by Harsh with LangGraph, "
            "Google Gemini, and MongoDB. It coordinates specialized agents (Intent, Policy, Memory, Risk, Audit) over a centralized "
            "state graph. It features a dual-layer memory system backed by MongoDB (short-term checkpointing for fault-tolerant execution "
            "plus persistent cross-thread memory to detect historical risk patterns). It uses local ChromaDB vector embeddings "
            "to inject enterprise policies into agent prompts without hitting API rate limits, enforcing safe execution with Pydantic schemas."
        )
    },
    {
        "id": "skills_and_stack",
        "title": "Technical Skills & Ecosystem",
        "keywords": ["skills", "stack", "python", "fastapi", "react", "langgraph", "langchain", "mcp", "docker", "mongodb"],
        "content": (
            "Harsh's technical stack includes: "
            "Agentic Orchestration: LangGraph, LangChain, Model Context Protocol (MCP), A2A, Multi-Agent DAGs, HITL Interrupts; "
            "Languages & Backend: Python 3.12, FastAPI, Pydantic v2, Node.js, Express, REST, SSE, WebSockets; "
            "Frontend: React.js, JavaScript, HTML5, Vanilla CSS, Three.js; "
            "Databases & Vectors: MongoDB & MongoDB Atlas Search, ChromaDB, FAISS, Vector Embeddings, HuggingFace; "
            "DevOps: Docker, OpenShift, Kubernetes, Jenkins CI/CD, Git, GitLab, Terraform."
        )
    },
    {
        "id": "education_and_honors",
        "title": "Education & Academic Honors",
        "keywords": ["education", "college", "djsce", "degree", "cgpa", "hackathon", "sih", "publication", "paper"],
        "content": (
            "Education: B.Tech in CSE (IoT & Cyber Security with Blockchain) from Dwarkadas Jivanlal Sanghvi College of Engineering (DJSCE) "
            "with CGPA 8.70/10 (2022-2025), and Diploma in Computer Engineering from Shri Bhagubhai Mafatlal Polytechnic (SBMP) with 92.00% (2019-2022). "
            "Honors: National Finalist at Smart India Hackathon (SIH) 2024. "
            "Published research paper titled 'Coded Websites Vs WordPress Websites' in IJARSCT Journal (DOI: 10.48175/IJARSCT-2140)."
        )
    },
    {
        "id": "contact_info",
        "title": "Communication Channels & Social Links",
        "keywords": ["contact", "email", "phone", "github", "linkedin", "reach", "hire"],
        "content": (
            "Harsh Shah's contact details: "
            "Email: hrsshah04022004@gmail.com; "
            "Phone: +91 9175366700; "
            "GitHub: https://github.com/Harsh-Rupesh-Shah; "
            "LinkedIn: https://linkedin.com/in/harshshah2004; "
            "Base: Mumbai, Maharashtra, India (IST / UTC +5:30)."
        )
    }
]

def retrieve_relevant_chunks(query: str, top_k: int = 3) -> List[Dict[str, Any]]:
    """Simple semantic & lexical keyword scoring RAG retrieval."""
    query_tokens = set(re.findall(r'\w+', query.lower()))
    scored_chunks: List[Tuple[float, Dict[str, Any]]] = []

    for chunk in KNOWLEDGE_CHUNKS:
        score = 0.0
        # Check keyword matches
        for kw in chunk["keywords"]:
            if kw in query.lower():
                score += 2.5
        
        # Check content overlap
        content_tokens = set(re.findall(r'\w+', chunk["content"].lower()))
        overlap = query_tokens.intersection(content_tokens)
        score += len(overlap) * 0.5

        scored_chunks.append((score, chunk))

    scored_chunks.sort(key=lambda x: x[0], reverse=True)
    return [chunk for score, chunk in scored_chunks[:top_k] if score > 0] or [KNOWLEDGE_CHUNKS[0]]

def run_hs01_agent(query: str) -> Dict[str, Any]:
    """Execute the HS-01 Cognitive Agent with RAG grounded generation."""
    relevant_chunks = retrieve_relevant_chunks(query, top_k=3)
    context_str = "\n\n".join([f"[{c['title']}]: {c['content']}" for c in relevant_chunks])

    if gemini_model:
        prompt = f"""You are HS-01, the autonomous cognitive assistant for Harsh Shah's portfolio website.
Harsh is an Analyst & Agentic AI Developer at TIAA and creator of JobPilot and AI Decision Governance Copilot.

Use ONLY the grounded context below to answer the user's question accurately, concisely, and professionally.
Highlight metrics (e.g. latency cut from 18s to 8-9s, 5 to 2-3 calls, 2-phase DAG, dual-layer MongoDB memory) when relevant.
Do NOT invent information that is not in the context.

GROUNDED CONTEXT:
{context_str}

USER QUERY:
{query}

ANSWER (Concise, technical, direct, max 3-4 sentences):"""

        try:
            response = gemini_model.generate_content(prompt)
            return {
                "answer": response.text.strip(),
                "sources": [c["title"] for c in relevant_chunks],
                "model": "gemini-2.5-flash"
            }
        except Exception as e:
            print(f"[RAG Agent] Gemini error: {e}")

    # Fallback response if Gemini is unreachable
    best_chunk = relevant_chunks[0]
    return {
        "answer": f"[HS-01 COGNITION]: {best_chunk['content']}",
        "sources": [best_chunk["title"]],
        "model": "local-rag-fallback"
    }
