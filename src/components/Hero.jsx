import React from 'react';
import ThreeCanvas from './ThreeCanvas';
import CopilotDock from './CopilotDock';

export default function Hero({ onSwitchToTerminal }) {
  return (
    <section className="hero-section" id="hero">
      <div className="container-max">
        {/* Main Grid: Identity & 3D Interactive Canvas */}
        <div className="hero-grid">
          {/* Left Column: Mission & Identity */}
          <div className="fade-up">
            {/* System Status Pill */}
            <div className="hero-status-pill">
              <span className="status-dot-pulse"></span>
              <span className="label-mono-sm" style={{ color: 'var(--text-ink)' }}>
                HARSH SHAH // ANALYST - AGENTIC AI DEVELOPER @ TIAA
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="display-hero">
              Architecting systems that think, reason &amp; act.
            </h1>

            {/* Technical Subtext */}
            <p className="hero-subtitle">
              Agentic AI Developer at TIAA specializing in LangGraph multi-agent DAGs,
              Model Context Protocol (MCP), and deterministic evaluation pipelines.
            </p>

            {/* Primary Actions */}
            <div className="hero-ctas">
              <a href="#systems" className="btn-primary">
                <span>EXPLORE ARCHITECTURES</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </a>

              <button
                type="button"
                className="btn-secondary"
                onClick={onSwitchToTerminal}
                title="Switch to CLI Terminal"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--accent-mint)' }}>
                  terminal
                </span>
                <span>TERMINAL [CLI ↗]</span>
              </button>

              <a
                href="/resume.pdf"
                download="Harsh_Shah_Resume.pdf"
                className="btn-secondary"
                style={{ color: 'var(--text-muted)' }}
              >
                <span>RESUME [PDF]</span>
                <span style={{ fontSize: '10px' }}>· DOWNLOAD</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Multi-Agent DAG Simulation */}
          <div className="fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="three-viewport-card">
              {/* HUD Badges */}
              <div className="three-hud-top">
                <div className="three-hud-badge">
                  <span className="dot-mint"></span>
                  <span>LIVE 3D SYNAPSE GRAPH</span>
                </div>
                <div className="three-hud-badge" style={{ color: 'var(--text-muted)' }}>
                  <span>MCP LATTICE</span>
                </div>
              </div>

              <div className="three-hud-bottom">
                <span
                  className="label-mono-xs"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.88)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-hairline)'
                  }}
                >
                  DRAG / PARALLAX ENABLED
                </span>
              </div>

              {/* Three.js Live Canvas */}
              <ThreeCanvas />
            </div>
          </div>
        </div>

        {/* Floating HUD Telemetry Indicators Ribbon */}
        <div className="hero-hud-ribbon">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="telemetry-chip">
              <span className="dot-mint"></span>
              <span>CORE ORCHESTRATOR: <strong>LANGGRAPH</strong></span>
            </div>
            <div className="telemetry-chip">
              <span className="dot-muted"></span>
              <span>TOOL PROTOCOL: <strong>MCP STANDARD</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="telemetry-chip">
              <span>A2A MSG BUS: <strong style={{ color: 'var(--accent-mint)' }}>SYNCHRONIZED</strong></span>
            </div>
            <div className="telemetry-chip">
              <span>LATENCY: <strong style={{ color: 'var(--accent-mint)' }}>~8.2s (2.1x FAST)</strong></span>
            </div>
          </div>
        </div>

        {/* HS-01 Copilot Console Dock */}
        <CopilotDock />
      </div>
    </section>
  );
}
