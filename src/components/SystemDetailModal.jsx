import React from 'react';

export default function SystemDetailModal({ system, onClose }) {
  if (!system) return null;

  const { title, tag, organization, tech, architectureDetails, dagSteps } = system;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="system-badge-tag">{tag}</span>
            <span className="system-org-tag">{organization}</span>
          </div>
          <h2 className="headline-md" style={{ color: 'var(--text-ink)', textTransform: 'uppercase' }}>
            {title}
          </h2>
          <div className="tech-tag-group" style={{ marginTop: '0.75rem' }}>
            {tech.map((t, idx) => (
              <span key={idx} className="tech-chip">{t}</span>
            ))}
          </div>
        </div>

        {/* Problem Statement */}
        <div>
          <span className="label-mono-xs" style={{ color: 'var(--accent-mint)' }}>01 // THE CHALLENGE</span>
          <p style={{ marginTop: '4px', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '14px' }}>
            {architectureDetails.problemStatement}
          </p>
        </div>

        {/* Solution Architecture */}
        <div>
          <span className="label-mono-xs" style={{ color: 'var(--accent-mint)' }}>02 // ARCHITECTURAL SOLUTION</span>
          <p style={{ marginTop: '4px', color: 'var(--text-ink)', lineHeight: '1.6', fontSize: '14px' }}>
            {architectureDetails.solutionArchitecture}
          </p>
        </div>

        {/* DAG Steps if available */}
        {dagSteps && (
          <div style={{ backgroundColor: 'var(--surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <span className="label-mono-xs" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              PIPELINE EXECUTION NODES
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              {dagSteps.map((step, idx) => (
                <div key={idx} style={{ background: '#fff', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-hairline)' }}>
                  <span className="label-mono-xs" style={{ color: 'var(--text-muted)' }}>{step.step}</span>
                  <div style={{ fontWeight: 600, fontSize: '12px', marginTop: '2px' }}>{step.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Results & Impact */}
        <div>
          <span className="label-mono-xs" style={{ color: 'var(--accent-mint)' }}>03 // PRODUCTION BENCHMARKS</span>
          <ul style={{ marginTop: '6px', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13.5px', color: 'var(--text-ink)' }}>
            {architectureDetails.results.map((res, idx) => (
              <li key={idx} style={{ lineHeight: '1.5' }}>{res}</li>
            ))}
          </ul>
        </div>

        {/* Repository Link if available */}
        {system.githubUrl && (
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href={system.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '0.5rem 1rem' }}
            >
              <span>EXPLORE REPOSITORY ON GITHUB</span>
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>open_in_new</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
