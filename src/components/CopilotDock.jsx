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
    setResponse('Synthesizing indexed technical nodes across production repositories...');

    try {
      const res = await queryCopilot(textToRun.trim());
      setResponse(res);
    } catch (err) {
      setResponse(`Error synthesizing query: ${err.message}`);
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
            <span className="copilot-title">HS-01 COGNITIVE RUNTIME</span>
            <span className="copilot-meta"> | GROUNDED IN PRODUCTION REPOSITORIES</span>
          </div>
        </div>
        <div className="copilot-status-indicator">
          <span className="dot-mint"></span>
          <span>DETERMINISTIC · <strong style={{ color: 'var(--accent-mint)' }}>ZERO HALLUCINATION</strong></span>
        </div>
      </div>

      {/* Dynamic Expandable Response Drawer */}
      {isOpen && (
        <div className="copilot-response-drawer">
          <div className="response-header">
            <span className="response-tag">
              <span className="dot-mint"></span>
              {loading ? 'HS-01 // RETRIEVING...' : 'HS-01 // RETRIEVAL VERIFIED'}
            </span>
            <button
              type="button"
              className="btn-close-response"
              onClick={() => setIsOpen(false)}
            >
              ✕ CLOSE
            </button>
          </div>
          <p className="response-body-text">{response}</p>
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
            onClick={() => handleChipClick('Explain RMD workflow')}
          >
            "Explain RMD workflow"
          </button>
          <button
            type="button"
            className="copilot-prompt-chip"
            onClick={() => handleChipClick('Deterministic LLM benchmarks')}
          >
            "Deterministic LLM benchmarks"
          </button>
          <button
            type="button"
            className="copilot-prompt-chip"
            onClick={() => handleChipClick('Multi-agent swarm architecture')}
          >
            "Multi-agent swarm"
          </button>
          <button
            type="button"
            className="copilot-prompt-chip"
            onClick={() => handleChipClick('How to reach Harsh?')}
          >
            "Contact Harsh"
          </button>
        </div>
      </div>
    </div>
  );
}
