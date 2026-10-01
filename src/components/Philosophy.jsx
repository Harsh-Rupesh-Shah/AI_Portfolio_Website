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
            <div className="section-tag">04 // PERSPECTIVE</div>
            <h2 className="section-title">Engineering Grounded in Reality</h2>
          </div>
          <p className="section-desc">
            Deterministic systems over superficial AI hype.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="philosophy-grid">
          {/* Portrait Column */}
          <div className="portrait-card fade-up">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgybpDTQLJf7khMm78uE8Nth_qOFMts0G1VMpkIVe2xS9R3djR46IuGgnZ0UghW2Hpaq8wleubChwQoMk1BSUEk88xGASWhMSPS8lkX-4pPIpw-FE6F1MYEtseYpvnIgfLt_z7KLrMD5QKfMsUNiOyTCdcj2zKiOo2vnln-CIUxsPdSMvTRph0pREJBZRxgZxL0cCYlJP-oD7fIlfymedqLcLeegIpoDQ-vwYUNNLAstiiW_5oqHY"
              alt="Monochromatic portrait of Harsh Shah, AI systems engineer"
              className="portrait-img"
              loading="lazy"
            />
            <div className="portrait-caption">
              <span style={{ fontWeight: 700, color: 'var(--text-ink)', textTransform: 'uppercase' }}>HARSH SHAH</span>
              <span style={{ color: 'var(--accent-mint)', fontWeight: 600 }}>MUMBAI, IN</span>
            </div>
          </div>

          {/* Essay & Ethos */}
          <div className="editorial-content fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="editorial-lead">
              I approach AI engineering not as prompt artistry or speculative science fiction,
              but as an evolution of <strong>reliable distributed systems</strong>.
            </p>

            <p style={{ color: 'var(--text-muted)' }}>
              While the popular tech conversation oscillates between existential dread and superficial hype,
              my daily work focuses on something concrete: making non-deterministic large language models
              behave with surgical predictability in enterprise workflows.
            </p>

            <p style={{ color: 'var(--text-muted)' }}>
              My foundation lies in robust backend architecture—writing clean Python and FastAPI microservices,
              enforcing strict Pydantic schema validation, and ensuring containerized services run predictably under load.
              When an LLM enters an enterprise pipeline, it must function as a reasoned cognitive node bound by strict
              execution safety rails, deterministic fallback channels, and verifiable benchmarks.
            </p>

            {/* Ethos Matrix */}
            <div className="ethos-matrix-row">
              <div>
                <span className="ethos-col-label">PRIMARY ETHOS</span>
                <p className="ethos-col-val">DETERMINISM FIRST</p>
              </div>
              <div>
                <span className="ethos-col-label">TOOL INTERFACE</span>
                <p className="ethos-col-val">OPEN PROTOCOLS (MCP)</p>
              </div>
              <div>
                <span className="ethos-col-label">LOCATION FOCUS</span>
                <p className="ethos-col-val">MUMBAI, INDIA (GLOBAL)</p>
              </div>
            </div>

            {/* Interactive Tech Stack Matrix */}
            <div className="skills-matrix-wrapper">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="label-mono-xs" style={{ color: 'var(--accent-mint)' }}>
                  05 // TECH STACK MATRIX
                </span>
                <span className="label-mono-xs" style={{ color: 'var(--text-muted)' }}>
                  AUDITED PROFICIENCIES
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
