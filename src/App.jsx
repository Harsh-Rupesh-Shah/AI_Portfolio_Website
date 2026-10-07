import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Systems from './components/Systems';
import ProjectVideos from './components/ProjectVideos';
import Experience from './components/Experience';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalView from './components/TerminalView';

export default function App() {
  const [mode, setMode] = useState('web'); // 'web' | 'terminal'

  // Global keyboard shortcut: Cmd+K or Ctrl+K to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setMode((prev) => (prev === 'web' ? 'terminal' : 'web'));
      }
      if (e.key === 'Escape' && mode === 'terminal') {
        setMode('web');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode]);

  const handleAskCopilotContact = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
      // Find copilot input & trigger question
      setTimeout(() => {
        const input = document.querySelector('.copilot-input-field');
        const submitBtn = document.querySelector('.btn-run-query');
        if (input && submitBtn) {
          input.value = 'How to reach Harsh?';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          submitBtn.click();
        }
      }, 500);
    }
  };

  return (
    <div className="main-wrapper">
      <Header
        currentMode={mode}
        onToggleMode={(newMode) => {
          setMode(newMode);
          if (newMode === 'web') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {mode === 'web' ? (
        <main>
          <Hero onSwitchToTerminal={() => setMode('terminal')} />
          <Systems />
          <ProjectVideos />
          <Experience />
          <Philosophy />
          <Contact onAskCopilotContact={handleAskCopilotContact} />
          <Footer />
        </main>
      ) : (
        <TerminalView onExitToWeb={() => setMode('web')} />
      )}
    </div>
  );
}
