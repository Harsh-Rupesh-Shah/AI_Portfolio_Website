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
            Production agentic AI systems, enterprise workflow optimizations, and full-stack foundations.
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
                    <span className="role-title">ANALYST - AGENTIC AI DEVELOPER</span>
                  </div>
                  <div className="timeline-meta">MUMBAI, INDIA · JULY 2025 – CURRENT</div>
                </div>

                <div className="timeline-stats-badge">
                  <span className="stat-chip">
                    LLM CALLS: <strong style={{ color: 'var(--accent-mint)' }}>5 → 2-3</strong>
                  </span>
                  <span className="stat-chip">
                    LATENCY: <strong style={{ color: 'var(--accent-mint)' }}>17-18s → 8-9s</strong>
                  </span>
                </div>
              </div>

              <div className="timeline-body-text">
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>
                    Built multi-agent AI systems using <strong>LangChain, LangGraph, Model Context Protocol (MCP), and A2A</strong>, orchestrating domain-specific agents across complex enterprise workflows.
                  </li>
                  <li>
                    Optimized agent orchestration through custom Python sequencers, reducing LLM calls from 5 down to 2–3 per request and cutting latency by ~50% (from 17–18s down to 8–9s).
                  </li>
                  <li>
                    Engineered real-time streaming AI applications using <strong>Server-Sent Events (SSE) and WebSockets</strong> for high-perceived responsiveness across conversational workflows.
                  </li>
                  <li>
                    Developed dynamic AI-driven UI experiences with React and Python, enabling context-aware frontend components and real-time rendering based on agent token streams.
                  </li>
                  <li>
                    Implemented enterprise RAG pipelines, semantic search, and containerized deployments via Docker, Jenkins CI/CD, and OpenShift clusters.
                  </li>
                </ul>
              </div>

              <div className="tech-tag-group" style={{ maxWidth: '100%' }}>
                {['LangGraph', 'LangChain', 'Model Context Protocol (MCP)', 'A2A', 'Python', 'FastAPI', 'React', 'SSE', 'Docker', 'OpenShift', 'Jenkins CI/CD'].map((tech, idx) => (
                  <span key={idx} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Node 2: Space Agency */}
          <div className="timeline-node fade-up">
            <div className="timeline-bullet muted"></div>
            <div className="timeline-card" style={{ padding: '1.25rem 1.5rem' }}>
              <div className="timeline-card-header">
                <div>
                  <div className="timeline-company-title">
                    <span className="company-name" style={{ fontSize: '17px' }}>SPACE AGENCY</span>
                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                    <span className="role-title" style={{ fontSize: '12px' }}>FULL STACK DEVELOPER (PART-TIME)</span>
                  </div>
                  <div className="timeline-meta">MUMBAI, INDIA · JUNE 2024 – MAY 2025</div>
                </div>
              </div>

              <p className="timeline-body-text" style={{ fontSize: '13.5px' }}>
                Delivered full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js), JavaScript, and modern CSS. Implemented secure authentication and authorization with JWT, HTTP-only cookies, and encryption protocols for user data protection.
              </p>

              <div className="tech-tag-group" style={{ maxWidth: '100%' }}>
                {['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'JWT Auth'].map((tech, idx) => (
                  <span key={idx} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Node 3: Katapult Technologies & Education */}
          <div className="timeline-node fade-up">
            <div className="timeline-bullet muted"></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {/* Katapult */}
              <div style={{ backgroundColor: 'var(--surface-card)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-hairline)' }}>
                <span className="label-mono-xs" style={{ color: 'var(--accent-mint)' }}>JULY 2021 – SEP 2021 // INTERNSHIP</span>
                <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '14px', marginTop: '2px', textTransform: 'uppercase' }}>
                  KATAPULT TECHNOLOGIES
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  FrontEnd Web Developer Intern in Mumbai. Engineered responsive web interfaces and frontend component libraries.
                </p>
              </div>

              {/* Education */}
              <div style={{ backgroundColor: 'var(--surface-card)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-hairline)' }}>
                <span className="label-mono-xs" style={{ color: 'var(--accent-mint)' }}>2022 – 2025 // ACADEMICS</span>
                <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '14px', marginTop: '2px', textTransform: 'uppercase' }}>
                  DJSCE MUMBAI · B.TECH CSE (CGPA: 8.70)
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  IoT &amp; Cyber Security with Blockchain. Minors: AI, Machine Learning, Deep Learning. Preceded by Diploma from SBMP (92%).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
