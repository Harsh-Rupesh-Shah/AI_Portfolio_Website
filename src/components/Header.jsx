import React, { useState, useEffect } from 'react';

export default function Header({ currentMode, onToggleMode }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'systems', 'pipeline', 'experience', 'about', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (currentMode !== 'web') {
      onToggleMode('web');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-root">
      <div className="container-max header-inner">
        {/* Brandmark & Identity */}
        <a 
          href="#hero" 
          className="brand-wrapper"
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <div className="brand-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" fill="none">
              <rect width="40" height="40" rx="8" fill="#121316"/>
              <path d="M12 10V30M28 10V30M12 20H28" stroke="#faf9f6" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="28" cy="12" r="3" fill="#10b981"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">HARSH SHAH</span>
            <span className="brand-subtitle">AI / AGENTIC SYSTEMS</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <a
            href="#hero"
            className={`nav-link ${activeSection === 'hero' && currentMode === 'web' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'hero')}
          >
            OVERVIEW
          </a>
          <a
            href="#systems"
            className={`nav-link ${activeSection === 'systems' && currentMode === 'web' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'systems')}
          >
            SYSTEMS
          </a>
          <a
            href="#pipeline"
            className={`nav-link ${activeSection === 'pipeline' && currentMode === 'web' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'pipeline')}
          >
            PIPELINE
          </a>
          <a
            href="#experience"
            className={`nav-link ${activeSection === 'experience' && currentMode === 'web' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'experience')}
          >
            EXPERIENCE
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === 'about' && currentMode === 'web' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            PHILOSOPHY
          </a>
          <a
            href="#contact"
            className={`nav-link ${activeSection === 'contact' && currentMode === 'web' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            CONTACT
          </a>
        </nav>

        {/* Right Header Actions */}
        <div className="header-actions">
          {/* Segmented Mode Switcher [WEB | TERMINAL] */}
          <div className="segmented-mode-control" role="group" aria-label="Interface Mode">
            <button
              type="button"
              className={`mode-btn ${currentMode === 'web' ? 'active' : ''}`}
              onClick={() => onToggleMode('web')}
              title="Editorial Web Mode"
            >
              WEB
            </button>
            <button
              type="button"
              className={`mode-btn ${currentMode === 'terminal' ? 'active' : ''}`}
              onClick={() => onToggleMode('terminal')}
              title="CLI Terminal Mode"
            >
              TERMINAL
            </button>
          </div>

          <a
            href="#contact"
            className="btn-primary"
            style={{ padding: '0.45rem 0.95rem', fontSize: '11px', display: 'none' }}
            id="headerConnectBtn"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            <span>CONNECT</span>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_outward</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mode-btn"
            style={{ display: 'flex', padding: '6px' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--surface-card)',
            borderBottom: '1px solid var(--border-hairline)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <a href="#hero" className="nav-link" onClick={(e) => handleNavClick(e, 'hero')}>01 // OVERVIEW</a>
          <a href="#systems" className="nav-link" onClick={(e) => handleNavClick(e, 'systems')}>02 // SYSTEMS</a>
          <a href="#pipeline" className="nav-link" onClick={(e) => handleNavClick(e, 'pipeline')}>03 // PIPELINE</a>
          <a href="#experience" className="nav-link" onClick={(e) => handleNavClick(e, 'experience')}>04 // EXPERIENCE</a>
          <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>05 // PHILOSOPHY</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>06 // CONTACT</a>
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-hairline)' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ width: '100%' }}
              onClick={() => {
                onToggleMode(currentMode === 'web' ? 'terminal' : 'web');
                setMobileMenuOpen(false);
              }}
            >
              SWITCH TO {currentMode === 'web' ? 'TERMINAL (CLI)' : 'WEB MODE'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
