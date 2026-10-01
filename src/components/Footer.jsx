import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="container-max footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-ink)' }}>HARSH SHAH</span>
          <span>— AGENTIC AI &amp; SYSTEMS ENGINEER</span>
        </div>

        <div>
          <span>MUMBAI, INDIA · LAT 19.0760° N, LONG 72.8777° E</span>
        </div>

        <div style={{ color: 'var(--text-dim)', fontSize: '10px' }}>
          <span>© {new Date().getFullYear()} // DETERMINISTIC AGENTIC SYSTEMS</span>
        </div>
      </div>
    </footer>
  );
}
