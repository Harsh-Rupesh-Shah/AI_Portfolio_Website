"""
HS-01 LangChain Autonomous Agent with Production RAG Tool
Powered by LangGraph / LangChain, Gemini 2.5 Flash, and the Production RAG Engine.
"""

import os
from typing import Dict, Any, List
from dotenv import load_dotenv

load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.prebuilt import create_react_agent
from rag_engine import query_harsh_dossier_rag, get_project_architecture_specs

SYSTEM_PROMPT = """You are HS-01, the production-grade autonomous agent for Harsh Shah's AI Portfolio.
Harsh Shah is an Analyst & Agentic AI Developer at TIAA (Mumbai), and the architect of multi-agent systems including JobPilot and AI Decision Governance Copilot.

MANDATORY INSTRUCTIONS:
1. ALWAYS execute the `query_harsh_dossier_rag` tool to retrieve verified facts before answering questions about Harsh's work experience, project architectures, metrics, education, or contact details.
2. Ground all answers STRICTLY in the retrieved context. Never invent statistics or technologies.
3. Highlight specific engineering metrics when relevant:
   - TIAA: Reduced LLM calls from 5 down to 2-3 per request; latency cut by ~50% from 17-18s to 8-9s; SSE & WebSockets token streaming.
   - JobPilot: Two-phase LangGraph DAG running concurrent Tavily/Playwright web research and FAISS ATS resume matching; HITL `interrupt()` user approval gate.
   - AI Decision Governance: Multi-agent graph (Intent, Policy, Memory, Risk, Audit) with dual-layer MongoDB memory and local ChromaDB policy RAG.
   - Education: DJSCE B.Tech in CSE (CGPA 8.70/10), SBMP Diploma (92%).
4. Tone: Concise, confident, direct, and engineered. Deliver high signal-to-noise technical answers in 3-4 sentences.
"""

# Initialize Gemini LLM
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
llm = None

if GOOGLE_API_KEY:
    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=GOOGLE_API_KEY,
            temperature=0.1
        )
    except Exception as e:
        print(f"[LangChain Agent] Warning: Could not initialize Gemini LLM: {e}")

# Register production tools
tools = [query_harsh_dossier_rag, get_project_architecture_specs]

# Create LangGraph ReAct agent
agent_executor = None
if llm:
    try:
        agent_executor = create_react_agent(
            model=llm,
            tools=tools,
            prompt=SYSTEM_PROMPT
        )
        print("[LangChain Agent] HS-01 LangGraph agent compiled successfully with RAG tools.")
    except Exception as e:
        print(f"[LangChain Agent] Error compiling agent: {e}")

def invoke_hs01_agent(query: str) -> Dict[str, Any]:
    """Invoke the LangChain HS-01 agent with production RAG tool execution."""
    if not query.strip():
        return {
            "answer": "Query cannot be empty.",
            "sources": [],
            "tool_calls": [],
            "model": "none"
        }

    # If LangChain agent is compiled, run with tool calling
    if agent_executor:
        try:
            inputs = {"messages": [HumanMessage(content=query.strip())]}
            response = agent_executor.invoke(inputs)
            
            messages = response.get("messages", [])
            final_message = messages[-1] if messages else None
            raw_answer = final_message.content if final_message else "No response generated."

            if isinstance(raw_answer, list):
                answer = "".join([part.get("text", "") if isinstance(part, dict) else str(part) for part in raw_answer]).strip()
            else:
                answer = str(raw_answer).strip()

            # Inspect intermediate tool calls
            tool_calls_executed = []
            for msg in messages:
                if hasattr(msg, "tool_calls") and msg.tool_calls:
                    for tc in msg.tool_calls:
                        tool_calls_executed.append(tc.get("name", "unknown_tool"))

            return {
                "answer": answer,
                "tool_calls": list(set(tool_calls_executed)),
                "sources": ["harsh_knowledge_base.md", "resume.pdf"],
                "model": "gemini-2.5-flash (LangGraph ReAct Agent)"
            }
        except Exception as e:
            print(f"[LangChain Agent] Error during execution: {e}")

    # High-quality deterministic fallback from Production RAG Engine
    try:
        from rag_engine import get_rag_engine
        engine = get_rag_engine()
        results = engine.retrieve(query, top_k=2)
        if results:
            formatted_answer = "\n\n".join([r["content"].strip() for r in results])
            return {
                "answer": f"[HS-01 DETERMINISTIC RAG]:\n{formatted_answer}",
                "tool_calls": ["query_harsh_dossier_rag"],
                "sources": list(set([r["source"] for r in results])),
                "model": "deterministic-rag-fallback"
            }
    except Exception as e:
        print(f"[LangChain Agent] Fallback retrieval error: {e}")

    rag_tool_output = query_harsh_dossier_rag.invoke(query)
    return {
        "answer": f"[HS-01 DETERMINISTIC RAG]:\n{rag_tool_output}",
        "tool_calls": ["query_harsh_dossier_rag"],
        "sources": ["harsh_knowledge_base.md", "resume.pdf"],
        "model": "deterministic-rag-fallback"
    }
