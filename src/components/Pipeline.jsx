import React, { useState } from 'react';
import { PIPELINE_STAGES } from '../services/knowledgeBase';

export default function Pipeline() {
  const [activeStageIndex, setActiveStageIndex] = useState(2); // default to 03 // ORCHESTRATE
  const activeStage = PIPELINE_STAGES[activeStageIndex];

  return (
    <section className="pipeline-section" id="pipeline">
      <div className="container-max">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div className="section-tag">02 // METHODOLOGY</div>
            <h2 className="section-title">The 6-Stage Engineering Pipeline</h2>
          </div>
          <p className="section-desc">
            A disciplined framework transforming non-deterministic ideas into robust production software.
          </p>
        </div>

        {/* 6-Stage Grid */}
        <div className="pipeline-grid">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = idx === activeStageIndex;
            return (
              <div
                key={idx}
                className={`pipeline-stage-card ${stage.isCore ? 'stage-core' : ''} ${isSelected ? 'stage-active' : ''}`}
                onClick={() => setActiveStageIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveStageIndex(idx)}
              >
                {stage.isCore && (
                  <div className="node-badge-core" style={{ top: '-8px', right: '8px' }}>
                    CORE
                  </div>
                )}
                <span className="stage-step-tag">{stage.num} //</span>
                <h3 className="stage-title">{stage.title}</h3>
                <p className="stage-desc">{stage.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Deep Inspection Drawer */}
        {activeStage && (
          <div className="pipeline-inspector-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.5rem' }}>
              <span className="label-mono-xs" style={{ color: 'var(--accent-mint)' }}>
                STAGE {activeStage.num} INSPECTOR // {activeStage.title}
              </span>
              <span className="label-mono-xs" style={{ color: 'var(--text-muted)' }}>
                METHODOLOGY TELEMETRY
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '0.25rem' }}>
              <div>
                <span className="label-mono-xs" style={{ color: 'var(--text-muted)' }}>STAGE MANDATE</span>
                <p style={{ fontSize: '13.5px', color: 'var(--text-ink)', marginTop: '4px' }}>
                  {activeStage.desc}
                </p>
              </div>
              <div>
                <span className="label-mono-xs" style={{ color: 'var(--text-muted)' }}>EXECUTION MECHANICS</span>
                <p style={{ fontSize: '13.5px', color: 'var(--text-ink)', marginTop: '4px' }}>
                  {activeStage.detail}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
