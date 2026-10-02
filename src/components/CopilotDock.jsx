import React, { useState } from 'react';
import { queryCopilot } from '../services/api';

export default function CopilotDock({ onCommandSelect }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleExecute = async (qText) => {
    const textToRun = qText || query;
    if (!textToRun.trim()) return;

    setLoading(true);
    setIsOpen(true);
    setResponse({
      text: 'Invoking LangChain ReAct Agent with Production RAG Tool...',
      sources: [],
      toolCalls: ['query_harsh_dossier_rag'],
      model: 'gemini-2.5-flash'
    });

    try {
      const res = await queryCopilot(textToRun.trim());
      setResponse(res);
    } catch (err) {
      setResponse({
        text: `Error synthesizing query: ${err.message}`,
        sources: [],
        toolCalls: [],
        model: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (chipText) => {
    setQuery(chipText);
    handleExecute(chipText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleExecute();
    }
  };

  return (
    <div className="copilot-dock-card">
      {/* Topbar Info & Status */}
      <div className="copilot-topbar">
        <div className="copilot-id-badge">
          <div className="copilot-avatar-icon">
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>smart_toy</span>
          </div>
          <div>
            <span className="copilot-title">HS-01 LANGCHAIN AGENTIC RUNTIME</span>
            <span className="copilot-meta"> | PRODUCTION RAG: KNOWLEDGE_BASE.MD + RESUME.PDF</span>
          </div>
        </div>
        <div className="copilot-status-indicator">
          <span className="dot-mint"></span>
          <span>DETERMINISTIC · <strong style={{ color: 'var(--accent-mint)' }}>GEMINI 2.5 FLASH</strong></span>
        </div>
      </div>

      {/* Dynamic Expandable Response Drawer */}
      {isOpen && (
        <div className="copilot-response-drawer">
          <div className="response-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="response-tag">
                <span className="dot-mint"></span>
                {loading ? 'HS-01 // EXECUTING RAG TOOL...' : 'HS-01 // RAG GROUNDED'}
              </span>

              {response?.toolCalls?.length > 0 && (
                <span
                  style={{
                    backgroundColor: 'rgba(29, 158, 117, 0.1)',
                    color: 'var(--accent-mint)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontSize: '9.5px',
                    fontWeight: 600
                  }}
                >
                  TOOL: [{response.toolCalls.join(', ')}]
                </span>
              )}

              {response?.sources?.length > 0 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>
                  SOURCES: [{response.sources.join(', ')}]
                </span>
              )}
            </div>

            <button
              type="button"
              className="btn-close-response"
              onClick={() => setIsOpen(false)}
            >
              ✕ CLOSE
            </button>
          </div>
          <p className="response-body-text">{response?.text || response}</p>
        </div>
      )}

      {/* Controls: Input + Quick Prompt Chips */}
      <div className="copilot-controls-row">
        <div className="copilot-input-container">
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
            terminal
          </span>
          <input
            type="text"
            className="copilot-input-field"
            placeholder="Ask HS-01 about latency benchmarks, MCP routing, or architecture..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="btn-run-query"
            onClick={() => handleExecute()}
            disabled={loading}
          >
            {loading ? 'RUNNING...' : 'RUN'}
          </button>
        </div>

        {/* Quick Prompt Chips */}
        <div className="copilot-chips-shelf">
          <button
            type="button"
            className="copilot-prompt-chip"
            onClick={() => handleChipClick('Tell me about Harsh and what he built at TIAA')}
          >
            "TIAA Agentic Systems"
          </button>
          <button
            type="button"
            className="copilot-prompt-chip"
            onClick={() => handleChipClick('How does JobPilot use LangGraph?')}
          >
            "JobPilot Architecture"
          </button>
          <button
            type="button"
            className="copilot-prompt-chip"
            onClick={() => handleChipClick('How does AI Governance Copilot handle memory and policy?')}
          >
            "AI Governance Copilot"
          </button>
          <button
            type="button"
            className="copilot-prompt-chip"
            onClick={() => handleChipClick('How can I contact or hire Harsh?')}
          >
            "Contact Harsh"
          </button>
        </div>
      </div>
    </div>
  );
}
