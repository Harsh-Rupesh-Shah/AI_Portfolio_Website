import React, { useState } from 'react';
import { SKILLS_CATEGORIES } from '../services/knowledgeBase';

export default function Philosophy() {
  const categories = Object.keys(SKILLS_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="philosophy-section" id="about">
      <div className="container-max">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div className="section-tag">04 // PERSPECTIVE &amp; FOUNDATION</div>
            <h2 className="section-title">Engineering Grounded in Reality</h2>
          </div>
          <p className="section-desc">
            Deterministic agentic workflows, distributed concurrency, and auditable production systems.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="philosophy-grid">
          {/* Portrait Column */}
          <div className="portrait-card fade-up">
            <img
              src="/portrait.jpg"
              alt="Portrait of Harsh Shah, Agentic AI Developer"
              className="portrait-img"
              loading="lazy"
            />
            <div className="portrait-caption">
              <span style={{ fontWeight: 700, color: 'var(--text-ink)', textTransform: 'uppercase' }}>HARSH SHAH</span>
              <span style={{ color: 'var(--accent-mint)', fontWeight: 600 }}>MUMBAI, INDIA</span>
            </div>
            <div style={{ padding: '0.5rem', borderTop: '1px solid var(--border-hairline)', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <div>ANALYST - AGENTIC AI @ TIAA</div>
              <div style={{ marginTop: '2px', color: 'var(--text-ink)' }}>DJSCE B.TECH (CGPA: 8.70 / 10)</div>
            </div>
          </div>

          {/* Essay & Ethos */}
          <div className="editorial-content fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="editorial-lead">
              I build AI systems not as speculative chatbots, but as <strong>deterministic distributed state machines</strong> that enterprise workflows can rely upon with surgical predictability.
            </p>

            <p style={{ color: 'var(--text-muted)' }}>
              Currently an Analyst &amp; Agentic AI Developer at <strong>TIAA</strong>, I specialize in designing multi-agent graphs (LangGraph, LangChain) and Model Context Protocol (MCP) integrations. My focus is cutting LLM hops, reducing round-trip latency by ~50%, and building streaming interfaces with Server-Sent Events (SSE) and WebSockets.
            </p>

            <p style={{ color: 'var(--text-muted)' }}>
              Beyond enterprise systems, I created <strong>JobPilot</strong> (a concurrent two-phase LangGraph system with Human-in-the-Loop interrupts) and the <strong>AI Decision Governance Copilot</strong> (a stateful governance graph with dual-layer MongoDB checkpointing and ChromaDB policy RAG).
            </p>

            {/* Ethos Matrix */}
            <div className="ethos-matrix-row">
              <div>
                <span className="ethos-col-label">PRIMARY ETHOS</span>
                <p className="ethos-col-val">DETERMINISM OVER DRIFT</p>
              </div>
              <div>
                <span className="ethos-col-label">TOOL STANDARD</span>
                <p className="ethos-col-val">MODEL CONTEXT PROTOCOL</p>
              </div>
              <div>
                <span className="ethos-col-label">ACADEMIC HONORS</span>
                <p className="ethos-col-val">SIH '24 FINALIST · IJARSCT PUB</p>
              </div>
            </div>

            {/* Interactive Tech Stack Matrix */}
            <div className="skills-matrix-wrapper">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="label-mono-xs" style={{ color: 'var(--accent-mint)' }}>
                  05 // VERIFIED TECH STACK
                </span>
                <span className="label-mono-xs" style={{ color: 'var(--text-muted)' }}>
                  PRODUCTION PROFICIENCIES
                </span>
              </div>

              {/* Tab Buttons */}
              <div className="skills-tab-bar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`skills-tab-btn ${cat === activeCategory ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Chips */}
              <div className="skills-chips-grid">
                {SKILLS_CATEGORIES[activeCategory].map((skill, idx) => (
                  <div key={idx} className="skill-pill">
                    <span className="dot-mint" style={{ width: '4px', height: '4px' }}></span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
