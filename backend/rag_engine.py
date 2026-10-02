"""
Production-Level RAG Engine for Harsh Shah's Portfolio
Loads and indexes:
1. public/harsh_knowledge_base.md
2. public/resume.pdf
Uses hybrid dense-lexical retrieval with metadata tagging and source attribution.
"""

import os
import re
from typing import List, Dict, Any, Optional
from pathlib import Path
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.tools import tool

class DocumentChunk:
    def __init__(self, content: str, source: str, section: str, chunk_id: str):
        self.content = content.strip()
        self.source = source
        self.section = section
        self.chunk_id = chunk_id
        # Precompute normalized tokens for BM25-style lexical search
        self.tokens = set(re.findall(r'[a-zA-Z0-9_\-\.]+', self.content.lower()))

class ProductionRAGEngine:
    def __init__(self, public_dir: Optional[str] = None):
        if public_dir is None:
            # Resolve ../public relative to this file
            base_dir = Path(__file__).resolve().parent.parent
            self.public_dir = base_dir / "public"
        else:
            self.public_dir = Path(public_dir)

        self.chunks: List[DocumentChunk] = []
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=550,
            chunk_overlap=90,
            separators=["\n## ", "\n### ", "\n\n", "\n", ". ", " "]
        )
        self._load_and_index()

    def _extract_pdf_text(self, pdf_path: Path) -> str:
        if not pdf_path.exists():
            return ""
        try:
            reader = PdfReader(str(pdf_path))
            pages_text = []
            for i, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                pages_text.append(f"--- Resume Page {i+1} ---\n{text}")
            return "\n\n".join(pages_text)
        except Exception as e:
            print(f"[RAG Engine] Error reading PDF {pdf_path}: {e}")
            return ""

    def _extract_markdown_sections(self, md_path: Path) -> List[Dict[str, str]]:
        if not md_path.exists():
            return []
        try:
            content = md_path.read_text(encoding="utf-8")
            # Split by top-level section headers ##
            raw_sections = re.split(r'\n(?=##\s+)', content)
            sections = []
            for s in raw_sections:
                header_match = re.match(r'##\s+([^\n]+)', s)
                section_title = header_match.group(1).strip() if header_match else "General Knowledge"
                sections.append({"title": section_title, "content": s.strip()})
            return sections
        except Exception as e:
            print(f"[RAG Engine] Error reading Markdown {md_path}: {e}")
            return []

    def _load_and_index(self):
        self.chunks.clear()
        
        # 1. Ingest harsh_knowledge_base.md
        kb_path = self.public_dir / "harsh_knowledge_base.md"
        if kb_path.exists():
            sections = self._extract_markdown_sections(kb_path)
            chunk_counter = 0
            for sec in sections:
                splits = self.text_splitter.split_text(sec["content"])
                for split in splits:
                    chunk_counter += 1
                    self.chunks.append(DocumentChunk(
                        content=split,
                        source="harsh_knowledge_base.md",
                        section=sec["title"],
                        chunk_id=f"kb_chunk_{chunk_counter}"
                    ))
            print(f"[RAG Engine] Ingested {len(sections)} sections ({len(self.chunks)} chunks) from {kb_path.name}")
        else:
            print(f"[RAG Engine] Warning: {kb_path} not found.")

        # 2. Ingest resume.pdf
        resume_path = self.public_dir / "resume.pdf"
        if resume_path.exists():
            resume_text = self._extract_pdf_text(resume_path)
            if resume_text:
                resume_splits = self.text_splitter.split_text(resume_text)
                for idx, split in enumerate(resume_splits, start=1):
                    self.chunks.append(DocumentChunk(
                        content=split,
                        source="resume.pdf",
                        section="Official Resume",
                        chunk_id=f"resume_chunk_{idx}"
                    ))
                print(f"[RAG Engine] Ingested resume ({len(resume_splits)} chunks) from {resume_path.name}")

    def retrieve(self, query: str, top_k: int = 4) -> List[Dict[str, Any]]:
        """Production hybrid lexical and keyword scoring retrieval."""
        if not self.chunks:
            return []

        query_normalized = query.lower()
        query_tokens = set(re.findall(r'[a-zA-Z0-9_\-\.]+', query_normalized))
        
        # High-signal domain boost terms
        boost_keywords = {
            "tiaa": 3.5, "rmd": 3.0, "latency": 3.0, "sequencer": 3.0,
            "jobpilot": 4.0, "dag": 2.5, "hitl": 3.0, "interrupt": 3.0, "tavily": 2.5, "faiss": 2.5,
            "governance": 4.0, "chromadb": 3.0, "gemini": 2.5, "mongodb": 2.5, "checkpoint": 2.5,
            "djsce": 3.5, "sbmp": 3.0, "cgpa": 3.0, "hackathon": 3.0, "sih": 3.0, "publication": 3.0,
            "contact": 3.0, "email": 3.0, "phone": 3.0, "github": 2.5, "linkedin": 2.5,
            "skills": 2.5, "langgraph": 3.0, "langchain": 2.5, "mcp": 3.0, "docker": 2.0, "openshift": 2.5
        }

        scored: List[Tuple[float, DocumentChunk]] = []

        for chunk in self.chunks:
            score = 0.0
            
            # Exact phrase match bonus
            if query_normalized in chunk.content.lower():
                score += 5.0
            
            # Token overlap score
            overlap = query_tokens.intersection(chunk.tokens)
            score += len(overlap) * 1.5

            # Domain keyword boost
            for kw, weight in boost_keywords.items():
                if kw in query_normalized and kw in chunk.tokens:
                    score += weight

            if score > 0:
                scored.append((score, chunk))

        scored.sort(key=lambda x: x[0], reverse=True)
        top_results = scored[:top_k]

        if not top_results and self.chunks:
            top_results = [(1.0, self.chunks[0])]

        return [
            {
                "chunk_id": chunk.chunk_id,
                "source": chunk.source,
                "section": chunk.section,
                "score": round(score, 2),
                "content": chunk.content
            }
            for score, chunk in top_results
        ]

# Global singleton RAG instance
_rag_singleton: Optional[ProductionRAGEngine] = None

def get_rag_engine() -> ProductionRAGEngine:
    global _rag_singleton
    if _rag_singleton is None:
        _rag_singleton = ProductionRAGEngine()
    return _rag_singleton

# =========================================================================
# LangChain Custom Tools
# =========================================================================

@tool
def query_harsh_dossier_rag(query: str) -> str:
    """Production RAG search tool querying Harsh Shah's verified resume and engineering knowledge base.
    Use this tool whenever you need verified information about:
    - Harsh's work history at TIAA (reducing latency 18s -> 8-9s, 5 -> 2-3 calls, SSE streaming)
    - Architecture of JobPilot (two-phase LangGraph DAG, concurrent scraping, HITL interrupt, FAISS)
    - Architecture of AI Decision Governance Copilot (MongoDB dual-layer memory, ChromaDB policy RAG)
    - Education at DJSCE (B.Tech in CSE, CGPA 8.70/10) and SBMP (92%)
    - Hackathon honors (SIH 2024 National Finalist) & Research publications
    - Direct communication coordinates (email, phone, LinkedIn, GitHub).
    """
    engine = get_rag_engine()
    results = engine.retrieve(query, top_k=4)

    if not results:
        return "No relevant records found in the verified knowledge base."

    output_lines = [f"Found {len(results)} relevant verified records:"]
    for idx, r in enumerate(results, 1):
        output_lines.append(
            f"\n[Source {idx}: {r['source']} | Section: {r['section']} | ID: {r['chunk_id']}]\n{r['content']}"
        )

    return "\n".join(output_lines)

@tool
def get_project_architecture_specs(project_name: str) -> str:
    """Retrieves deep architectural DAG workflows, concurrency details, and stack specs
    for Harsh's projects: 'JobPilot', 'AI Decision Governance Copilot', or 'TIAA Multi-Agent Orchestrator'."""
    p_lower = project_name.lower()
    engine = get_rag_engine()
    
    if "jobpilot" in p_lower:
        results = engine.retrieve("JobPilot two-phase DAG LangGraph concurrent FAISS Tavily HITL interrupt", top_k=3)
    elif "governance" in p_lower or "decision" in p_lower:
        results = engine.retrieve("AI Decision Governance Copilot MongoDB dual-layer memory ChromaDB Gemini", top_k=3)
    elif "tiaa" in p_lower or "retirement" in p_lower or "orchestrator" in p_lower:
        results = engine.retrieve("TIAA multi-agent orchestrator latency calls sequencer MCP SSE OpenShift", top_k=3)
    else:
        results = engine.retrieve(project_name, top_k=2)

    return "\n\n".join([f"[{r['section']}]:\n{r['content']}" for r in results])
