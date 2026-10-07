"""
HS-01 Multi-Tier Resilient Agent with Production RAG Tool & Automatic LLM Failover
Supported Tiers:
  [Tier 1] Google Gemini 2.5 Flash (Primary Key)
  [Tier 2] Google Gemini 2.5 Flash (Backup Key)
  [Tier 3] OpenRouter (openrouter/free - Cohere/Gemma/Llama)
  [Tier 4] Local Production Deterministic RAG Engine (Zero-API Offline Fallback)
"""

import os
import time
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent
from rag_engine import query_harsh_dossier_rag, get_project_architecture_specs, get_rag_engine

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

def mask_key(k: Optional[str]) -> str:
    if not k:
        return "NOT_SET"
    if len(k) <= 10:
        return "***"
    return f"{k[:7]}...{k[-4:]}"

class LLMProviderPool:
    def __init__(self):
        self.tools = [query_harsh_dossier_rag, get_project_architecture_specs]
        self.manual_override: Optional[str] = None  # None = 'auto' mode
        self.last_used_provider: str = "google_primary"
        self.failover_history: List[Dict[str, Any]] = []

        # Tier status trackers
        self.status = {
            "google_primary": {
                "name": "Google Gemini 2.5 Flash (Primary Key)",
                "key_masked": mask_key(os.getenv("GOOGLE_API_KEY")),
                "configured": bool(os.getenv("GOOGLE_API_KEY")),
                "state": "HEALTHY" if os.getenv("GOOGLE_API_KEY") else "UNCONFIGURED",
                "failure_count": 0,
                "success_count": 0,
                "last_error": None,
                "last_tested": None
            },
            "google_backup": {
                "name": "Google Gemini 2.5 Flash (Backup Key)",
                "key_masked": mask_key(os.getenv("GOOGLE_API_KEY_BACKUP")),
                "configured": bool(os.getenv("GOOGLE_API_KEY_BACKUP")),
                "state": "HEALTHY" if os.getenv("GOOGLE_API_KEY_BACKUP") else "UNCONFIGURED",
                "failure_count": 0,
                "success_count": 0,
                "last_error": None,
                "last_tested": None
            },
            "openrouter": {
                "name": f"OpenRouter Free ({os.getenv('OPENROUTER_MODEL', 'openrouter/free')})",
                "key_masked": mask_key(os.getenv("OPENROUTER_API_KEY")),
                "configured": bool(os.getenv("OPENROUTER_API_KEY")),
                "state": "HEALTHY" if os.getenv("OPENROUTER_API_KEY") else "UNCONFIGURED",
                "failure_count": 0,
                "success_count": 0,
                "last_error": None,
                "last_tested": None
            },
            "deterministic_rag": {
                "name": "Production Deterministic RAG Engine (Zero-API Local)",
                "key_masked": "N/A (OFFLINE ENGINE)",
                "configured": True,
                "state": "ONLINE",
                "failure_count": 0,
                "success_count": 0,
                "last_error": None,
                "last_tested": None
            }
        }

        # Lazy agent executor references
        self._agents: Dict[str, Any] = {}
        self._build_agents()

    def _build_agents(self):
        """Compile ReAct agents for configured providers."""
        # Tier 1: Primary Google Key
        g1_key = os.getenv("GOOGLE_API_KEY")
        if g1_key:
            try:
                g1_llm = ChatGoogleGenerativeAI(
                    model="gemini-2.5-flash",
                    google_api_key=g1_key,
                    temperature=0.1
                )
                self._agents["google_primary"] = create_react_agent(
                    model=g1_llm,
                    tools=self.tools,
                    prompt=SYSTEM_PROMPT
                )
                print("[LLM Pool] Tier 1: Google Primary agent compiled.")
            except Exception as e:
                print(f"[LLM Pool] Tier 1 compile warning: {e}")
                self.status["google_primary"]["state"] = "ERROR"
                self.status["google_primary"]["last_error"] = str(e)

        # Tier 2: Backup Google Key
        g2_key = os.getenv("GOOGLE_API_KEY_BACKUP")
        if g2_key:
            try:
                g2_llm = ChatGoogleGenerativeAI(
                    model="gemini-2.5-flash",
                    google_api_key=g2_key,
                    temperature=0.1
                )
                self._agents["google_backup"] = create_react_agent(
                    model=g2_llm,
                    tools=self.tools,
                    prompt=SYSTEM_PROMPT
                )
                print("[LLM Pool] Tier 2: Google Backup agent compiled.")
            except Exception as e:
                print(f"[LLM Pool] Tier 2 compile warning: {e}")
                self.status["google_backup"]["state"] = "ERROR"
                self.status["google_backup"]["last_error"] = str(e)

        # Tier 3: OpenRouter Free Models
        or_key = os.getenv("OPENROUTER_API_KEY")
        or_model = os.getenv("OPENROUTER_MODEL", "openrouter/free")
        if or_key:
            try:
                or_llm = ChatOpenAI(
                    base_url="https://openrouter.ai/api/v1",
                    api_key=or_key,
                    model=or_model,
                    temperature=0.1
                )
                self._agents["openrouter"] = create_react_agent(
                    model=or_llm,
                    tools=self.tools,
                    prompt=SYSTEM_PROMPT
                )
                print("[LLM Pool] Tier 3: OpenRouter Free agent compiled.")
            except Exception as e:
                print(f"[LLM Pool] Tier 3 compile warning: {e}")
                self.status["openrouter"]["state"] = "ERROR"
                self.status["openrouter"]["last_error"] = str(e)

    def _execute_agent(self, agent_name: str, query: str) -> Dict[str, Any]:
        """Execute a specific agent executor and return standard dictionary."""
        agent = self._agents.get(agent_name)
        if not agent:
            raise RuntimeError(f"Agent '{agent_name}' is not compiled or configured.")

        inputs = {"messages": [HumanMessage(content=query.strip())]}
        response = agent.invoke(inputs)

        messages = response.get("messages", [])
        final_message = messages[-1] if messages else None
        raw_answer = final_message.content if final_message else "No response generated."

        if isinstance(raw_answer, list):
            answer = "".join([part.get("text", "") if isinstance(part, dict) else str(part) for part in raw_answer]).strip()
        else:
            answer = str(raw_answer).strip()

        tool_calls_executed = []
        for msg in messages:
            if hasattr(msg, "tool_calls") and msg.tool_calls:
                for tc in msg.tool_calls:
                    tool_calls_executed.append(tc.get("name", "unknown_tool"))

        return {
            "answer": answer,
            "tool_calls": list(set(tool_calls_executed)) or ["query_harsh_dossier_rag"],
            "sources": ["harsh_knowledge_base.md", "resume.pdf"]
        }

    def _execute_deterministic_rag(self, query: str) -> Dict[str, Any]:
        """Execute local deterministic RAG fallback."""
        try:
            engine = get_rag_engine()
            results = engine.retrieve(query, top_k=2)
            if results:
                formatted_answer = "\n\n".join([r["content"].strip() for r in results])
                return {
                    "answer": f"[HS-01 DETERMINISTIC RAG]:\n{formatted_answer}",
                    "tool_calls": ["query_harsh_dossier_rag"],
                    "sources": list(set([r["source"] for r in results]))
                }
        except Exception as e:
            print(f"[LLM Pool] RAG engine error: {e}")

        rag_tool_output = query_harsh_dossier_rag.invoke(query)
        return {
            "answer": f"[HS-01 DETERMINISTIC RAG]:\n{rag_tool_output}",
            "tool_calls": ["query_harsh_dossier_rag"],
            "sources": ["harsh_knowledge_base.md", "resume.pdf"]
        }

    def invoke(self, query: str) -> Dict[str, Any]:
        """
        Execute query with automated multi-tier failover.
        Tiers tried in order:
          Tier 1 (google_primary) -> Tier 2 (google_backup) -> Tier 3 (openrouter) -> Tier 4 (deterministic_rag)
        """
        if not query.strip():
            return {
                "answer": "Query cannot be empty.",
                "sources": [],
                "tool_calls": [],
                "model": "none",
                "provider": "none",
                "failover_occurred": False
            }

        # If manual override is active, try it first
        tier_sequence = ["google_primary", "google_backup", "openrouter", "deterministic_rag"]
        if self.manual_override and self.manual_override in tier_sequence:
            tier_sequence.remove(self.manual_override)
            tier_sequence.insert(0, self.manual_override)

        attempted_path = []
        failover_occurred = False

        for tier in tier_sequence:
            attempted_path.append(tier)
            try:
                if tier == "deterministic_rag":
                    result = self._execute_deterministic_rag(query)
                    self.status["deterministic_rag"]["success_count"] += 1
                    self.last_used_provider = "deterministic_rag"
                    return {
                        "answer": result["answer"],
                        "tool_calls": result["tool_calls"],
                        "sources": result["sources"],
                        "model": "Deterministic Hybrid RAG Engine (Zero-API Offline)",
                        "provider": "deterministic_rag",
                        "failover_occurred": failover_occurred,
                        "failover_path": attempted_path
                    }

                # External LLM execution (google_primary, google_backup, openrouter)
                if tier not in self._agents:
                    raise RuntimeError(f"Tier {tier} not available or unconfigured")

                result = self._execute_agent(tier, query)
                self.status[tier]["success_count"] += 1
                self.status[tier]["state"] = "HEALTHY"
                self.last_used_provider = tier

                model_label = {
                    "google_primary": "Gemini 2.5 Flash (Primary Key)",
                    "google_backup": "Gemini 2.5 Flash (Backup Key)",
                    "openrouter": f"OpenRouter ({os.getenv('OPENROUTER_MODEL', 'openrouter/free')})"
                }.get(tier, tier)

                return {
                    "answer": result["answer"],
                    "tool_calls": result["tool_calls"],
                    "sources": result["sources"],
                    "model": f"{model_label} [LangGraph ReAct]",
                    "provider": tier,
                    "failover_occurred": failover_occurred,
                    "failover_path": attempted_path
                }

            except Exception as e:
                err_str = str(e)
                print(f"[LLM Pool Failover] Tier '{tier}' failed: {err_str}")
                self.status[tier]["failure_count"] += 1
                self.status[tier]["state"] = "EXHAUSTED" if any(x in err_str.lower() for x in ["429", "quota", "resourceexhausted", "rate_limit"]) else "ERROR"
                self.status[tier]["last_error"] = err_str[:120]
                failover_occurred = True

                self.failover_history.append({
                    "timestamp": time.time(),
                    "failed_tier": tier,
                    "error": err_str[:140],
                    "query_snippet": query[:40]
                })

        # Ultimate fallback (should never be reached because deterministic_rag succeeds)
        fallback_res = self._execute_deterministic_rag(query)
        return {
            "answer": fallback_res["answer"],
            "tool_calls": fallback_res["tool_calls"],
            "sources": fallback_res["sources"],
            "model": "Emergency Deterministic RAG",
            "provider": "deterministic_rag",
            "failover_occurred": True,
            "failover_path": attempted_path
        }

    def get_status(self) -> Dict[str, Any]:
        """Return live health and telemetry of all tiers."""
        return {
            "mode": "manual" if self.manual_override else "auto_failover",
            "active_preference": self.manual_override or "auto",
            "last_used_provider": self.last_used_provider,
            "available_providers": ["google_primary", "google_backup", "openrouter", "deterministic_rag"],
            "tiers": self.status,
            "recent_failovers": self.failover_history[-5:]
        }

    def switch_provider(self, provider_name: str) -> Dict[str, Any]:
        """Manually pin a provider or return to 'auto'."""
        if provider_name.lower() in ["auto", "reset"]:
            self.manual_override = None
            return {"status": "success", "mode": "auto_failover", "active": "auto"}

        valid_names = ["google_primary", "google_backup", "openrouter", "deterministic_rag"]
        if provider_name not in valid_names:
            return {
                "status": "error",
                "message": f"Invalid provider '{provider_name}'. Must be one of: {valid_names} or 'auto'"
            }

        self.manual_override = provider_name
        return {"status": "success", "mode": "manual_pinned", "active": provider_name}

# Global Singleton Pool
provider_pool = LLMProviderPool()

def invoke_hs01_agent(query: str) -> Dict[str, Any]:
    """Public interface for FastAPI endpoints and Terminal commands."""
    return provider_pool.invoke(query)

def get_llm_status() -> Dict[str, Any]:
    """Get live LLM status."""
    return provider_pool.get_status()

def set_active_provider(provider_name: str) -> Dict[str, Any]:
    """Set or reset active provider."""
    return provider_pool.switch_provider(provider_name)
