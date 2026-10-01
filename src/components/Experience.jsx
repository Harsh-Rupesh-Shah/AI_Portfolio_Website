import React from 'react';

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="container-max">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div className="section-tag">03 // TRACK RECORD</div>
            <h2 className="section-title">Experience &amp; Engineering DNA</h2>
          </div>
          <p className="section-desc">
            Production systems, agentic workflow redesigns, and backend engineering foundations.
          </p>
        </div>

        {/* Timeline Spine */}
        <div className="timeline-spine">
          {/* Node 1: TIAA */}
          <div className="timeline-node fade-up">
            <div className="timeline-bullet"></div>
            <div className="timeline-card">
              <div className="timeline-card-header">
                <div>
                  <div className="timeline-company-title">
                    <span className="company-name">TIAA</span>
                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                    <span className="role-title">SOFTWARE DEVELOPER, AGENTIC AI &amp; SYSTEMS</span>
                  </div>
                  <div className="timeline-meta">MUMBAI, INDIA · 2025 – PRESENT</div>
                </div>

                <div className="timeline-stats-badge">
                  <span className="stat-chip">
                    CALLS: <strong style={{ color: 'var(--accent-mint)' }}>5 → 2-3</strong>
                  </span>
                  <span className="stat-chip">
                    LATENCY: <strong style={{ color: 'var(--accent-mint)' }}>18s → 8.2s</strong>
                  </span>
                </div>
              </div>

              <p className="timeline-body-text">
                Spearheading the engineering of autonomous agentic workflows and tool-calling infrastructure.
                Architecting resilient backend microservices using FastAPI and LangChain, enabling self-correcting
                task execution across retirement operations. Designed standardized MCP adapters for legacy mainframe
                and modern database queries.
              </p>

              <div className="tech-tag-group" style={{ maxWidth: '100%' }}>
                {['Python', 'FastAPI', 'LangChain', 'Model Context Protocol', 'Docker', 'OpenShift', 'CI/CD Evals'].map((tech, idx) => (
                  <span key={idx} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Node 2: Distributed Systems Foundations */}
          <div className="timeline-node fade-up">
            <div className="timeline-bullet muted"></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>2024</span>
                <span style={{ color: 'var(--text-muted)' }}>/</span>
                <span style={{ fontWeight: 600, color: 'var(--text-ink)', textTransform: 'uppercase' }}>
                  DISTRIBUTED SYSTEMS FOUNDATIONS &amp; CONCURRENCY
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '680px', lineHeight: '1.6' }}>
                Constructed modular microservices, REST interfaces, and async task pipelines.
                Established foundational principles in memory caching models, database query optimization,
                and deterministic testing harnesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
