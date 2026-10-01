import React, { useState } from 'react';
import { SYSTEMS_DATA } from '../services/knowledgeBase';
import SystemDetailModal from './SystemDetailModal';

export default function Systems({ onRunCopilotQuery }) {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const flagship = SYSTEMS_DATA[0];
  const secondarySystems = SYSTEMS_DATA.slice(1);

  return (
    <section className="systems-section" id="systems">
      <div className="container-max">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div className="section-tag">01 // PRODUCTION ARCHITECTURES</div>
            <h2 className="section-title">Systems I've Built</h2>
          </div>
          <p className="section-desc">
            Architected for determinism, low latency, and autonomous multi-tool execution.
          </p>
        </div>

        {/* FEATURED FLAGSHIP SYSTEM 01 */}
        <div className="flagship-system-card fade-up">
          {/* Top Bar */}
          <div className="flagship-topbar">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="system-badge-tag">{flagship.tag}</span>
                <span className="system-org-tag">{flagship.organization}</span>
              </div>
              <h3 className="flagship-title">{flagship.title}</h3>
              <p className="flagship-summary">{flagship.summary}</p>
            </div>

            <div className="tech-tag-group">
              {flagship.tech.map((t, idx) => (
                <span key={idx} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>

          {/* Telemetry Engineering Strip */}
          <div className="telemetry-strip-grid">
            {flagship.telemetry.map((item, idx) => (
              <div key={idx} className="telemetry-cell">
                <span className="telemetry-cell-label">{item.label}</span>
                <div className={`telemetry-cell-value ${item.highlight ? 'mint' : ''}`}>
                  {item.previous && <span className="line-through" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.previous}</span>}
                  <span>{item.val}</span>
                </div>
                <span className="label-mono-xs" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  {item.note}
                </span>
              </div>
            ))}
          </div>

          {/* Stateful DAG Flow Graphic */}
          <div className="dag-flow-wrapper">
            <div className="dag-flow-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="dot-mint"></span> GRAPH EXECUTION PIPELINE
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-ink)' }}>STATEFUL DAG FLOW</span>
            </div>

            <div className="dag-nodes-grid">
              {flagship.dagSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`dag-node-card ${step.isCore ? 'core-node' : ''}`}
                >
                  {step.isCore && <div className="node-badge-core">CORE</div>}
                  <span className="node-step">{step.step}</span>
                  <div className="node-title">{step.title}</div>
                  <div className="node-desc">{step.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedSystem(flagship)}
              >
                <span>INSPECT ARCHITECTURAL TRACE</span>
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>open_in_new</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECONDARY SYSTEMS DUO GRID */}
        <div className="systems-grid-duo">
          {secondarySystems.map((system) => (
            <div key={system.id} className="secondary-system-card fade-up">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="system-badge-tag" style={{ background: 'var(--surface-subtle)', color: 'var(--accent-mint)', border: '1px solid var(--border-hairline)' }}>
                    {system.tag}
                  </span>
                  <span className="label-mono-xs" style={{ color: 'var(--text-muted)' }}>
                    {system.organization}
                  </span>
                </div>

                <div>
                  <h3 className="headline-sm" style={{ textTransform: 'uppercase', color: 'var(--text-ink)' }}>
                    {system.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.6' }}>
                    {system.summary}
                  </p>
                </div>

                {/* Swarm Topology or Benchmark progress visual */}
                {system.topology ? (
                  <div className="topology-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      <span>SWARM TOPOLOGY</span>
                      <span style={{ color: 'var(--accent-mint)', fontWeight: 600 }}>CONTEXT COMPRESSION 4.8x</span>
                    </div>
                    <div className="topology-flow-row">
                      {system.topology.map((t, idx) => (
                        <React.Fragment key={idx}>
                          <span className={`topology-node ${t.active ? 'active' : ''}`}>{t.role}</span>
                          {idx < system.topology.length - 1 && (
                            <span style={{ color: 'var(--accent-mint)', fontWeight: 'bold' }}>⇄</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ) : system.progress ? (
                  <div className="topology-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      <span>{system.progress.title}</span>
                      <span style={{ color: 'var(--accent-mint)', fontWeight: 600 }}>{system.progress.percentage} PASS RATE</span>
                    </div>
                    <div className="progress-bar-rail">
                      <div className="progress-bar-fill" style={{ width: system.progress.percentage }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {system.progress.tags.map((tag, idx) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Metrics Duo Row */}
                <div className="metrics-duo-row">
                  {system.metrics.map((m, idx) => (
                    <div key={idx} className="metric-cell-pill">
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{m.label}</span>
                      <strong style={{ fontSize: '13px', marginTop: '2px', color: m.highlight ? 'var(--accent-mint)' : 'var(--text-ink)' }}>
                        {m.val}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="card-action-footer">
                <span style={{ textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {system.tech.slice(0, 3).join(' · ')}
                </span>
                <button
                  type="button"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-ink)', fontWeight: 600 }}
                  onClick={() => setSelectedSystem(system)}
                >
                  <span>VIEW DETAILS</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <SystemDetailModal
          system={selectedSystem}
          onClose={() => setSelectedSystem(null)}
        />
      </div>
    </section>
  );
}
