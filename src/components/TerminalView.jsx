import React, { useState, useEffect, useRef } from 'react';
import { executeTerminalCommand } from '../services/api';
import { TERMINAL_COMMANDS } from '../services/knowledgeBase';

const INITIAL_LOGS = [
  "[RPC]  GET /mcp/v1/schemas/retirement 200 OK (32ms)",
  "[EVAL] Deterministic schema assertion: OK (deviation 0.000)",
  "[INFO] Routing sub-task to agent_id='tax_code_auditor'",
  "[STATE] Checkpointing LangGraph session to persistent store",
  "[A2A]  P2P message received from worker_cluster_03",
  "[HEALTH] Memory telemetry: Heap 412MB / Resident 618MB",
  "[SEC]  mTLS connection established: remote_addr=10.4.0.12:8443",
  "[DAEMON] Node verification passed. Emitting event token."
];

export default function TerminalView({ onExitToWeb }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      cmd: 'help',
      output: TERMINAL_COMMANDS.help,
      type: 'text'
    }
  ]);
  const [commandHistory, setCommandHistory] = useState(['help']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [fontSizeIndex, setFontSizeIndex] = useState(0);

  const fontSizes = ['13px', '14px', '15px', '12px'];
  const terminalBodyRef = useRef(null);
  const logStreamRef = useRef(null);
  const inputRef = useRef(null);

  // Streaming Daemon Log Generator
  useEffect(() => {
    const sampleLogs = [
      "[RPC]  GET /mcp/v1/schemas/retirement 200 OK (32ms)",
      "[EVAL] Deterministic schema assertion: OK (deviation 0.000)",
      "[INFO] Routing sub-task to agent_id='tax_code_auditor'",
      "[STATE] Checkpointing LangGraph session to persistent store",
      "[A2A]  P2P message received from worker_cluster_03",
      "[HEALTH] Memory telemetry: Heap 412MB / Resident 618MB",
      "[SEC]  mTLS connection established: remote_addr=10.4.0.12:8443",
      "[DAEMON] Node verification passed. Emitting event token."
    ];

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const randomLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
      const formatted = `[${timeStr}] ${randomLog}`;

      setLogs((prev) => {
        const next = [...prev, formatted];
        return next.slice(-20);
      });
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll terminal on new history
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleRunCommand = async (rawCmd) => {
    const cmd = (rawCmd !== undefined ? rawCmd : inputVal).trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      setHistoryIndex(-1);
      return;
    }

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const result = await executeTerminalCommand(cmd);

    setHistory((prev) => [
      ...prev,
      {
        cmd,
        output: result.output,
        type: result.type
      }
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRunCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = inputVal.trim().toLowerCase();
      if (!val) return;
      const matches = Object.keys(TERMINAL_COMMANDS).filter((k) => k.startsWith(val));
      if (matches.length === 1) {
        setInputVal(matches[0]);
      }
    }
  };

  return (
    <div className="terminal-view-root">
      {/* Top Bar Navigation */}
      <div style={{ maxWidth: 'var(--max-w-content)', margin: '0 auto 1.5rem auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="dot-mint" style={{ width: '8px', height: '8px' }}></span>
          <span style={{ color: 'var(--terminal-accent)', fontWeight: 600, letterSpacing: '0.08em', fontSize: '11px' }}>
            HS-01 DAEMON ACTIVE // WORKSTATION (PTY/2)
          </span>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={onExitToWeb}
          style={{ backgroundColor: 'var(--surface-paper)', color: 'var(--text-ink)', border: '1px solid var(--border-hairline)', fontSize: '11px', padding: '0.45rem 0.95rem' }}
        >
          <span>EXIT TERMINAL / [WEB MODE ↗]</span>
        </button>
      </div>

      {/* Terminal Window Card */}
      <div className="terminal-window-card">
        {/* Title Bar */}
        <div className="terminal-titlebar">
          <div className="window-dots">
            <span className="dot-control red" title="Close Shell" onClick={() => setHistory([])}></span>
            <span className="dot-control yellow" title="Minimize"></span>
            <span className="dot-control green" title="Fullscreen Shell"></span>
            <span className="terminal-session-label" style={{ marginLeft: '0.5rem' }}>
              zsh — harsh@hs-01-workstation: ~ (pty/2)
            </span>
          </div>

          <div className="terminal-titlebar-tools">
            <button
              type="button"
              className="terminal-tool-btn"
              onClick={() => setHistory([])}
              title="Clear Terminal Output"
            >
              [CLEAR]
            </button>
            <button
              type="button"
              className="terminal-tool-btn"
              onClick={() => setFontSizeIndex((prev) => (prev + 1) % fontSizes.length)}
              title="Toggle Font Size"
            >
              FONT: {fontSizes[fontSizeIndex]}
            </button>
          </div>
        </div>

        {/* Quick Command Ribbon */}
        <div className="terminal-command-ribbon">
          <span style={{ fontSize: '10px', color: 'var(--text-on-dark-muted)', marginRight: '4px' }}>EXECUTE:</span>
          {['help', 'projects', 'telemetry', 'mcp', 'experience', 'skills', 'benchmarks', 'contact'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="cmd-quick-chip"
              onClick={() => handleRunCommand(cmd)}
            >
              [{cmd.toUpperCase()}]
            </button>
          ))}
        </div>

        {/* Streaming Daemon Log Box */}
        <div className="terminal-daemon-stream" ref={logStreamRef}>
          {logs.map((log, idx) => (
            <div key={idx} className="log-entry-row">
              <span style={{ color: 'var(--text-on-dark-muted)' }}>{log.slice(0, 14)}</span>
              <span style={{ color: 'var(--terminal-accent)', fontWeight: 600 }}>{log.slice(15, 23)}</span>
              <span style={{ color: 'var(--text-on-dark)' }}>{log.slice(23)}</span>
            </div>
          ))}
        </div>

        {/* Terminal Body */}
        <div
          className="terminal-body"
          ref={terminalBodyRef}
          style={{ fontSize: fontSizes[fontSizeIndex] }}
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          {/* History List */}
          <div className="terminal-history-list">
            {history.map((item, idx) => (
              <div key={idx} className="terminal-row-item">
                <div className="terminal-prompt-prefix">
                  <span className="terminal-user-tag">harsh@portfolio</span>
                  <span className="terminal-path-tag">~ %</span>
                  <span className="terminal-command-string">{item.cmd}</span>
                </div>
                <pre
                  className="terminal-output-block"
                  style={{
                    color: item.type === 'error' ? 'var(--error)' : 'var(--text-on-dark)',
                    borderLeftColor: item.type === 'inference' ? 'var(--terminal-accent)' : undefined
                  }}
                >
                  {item.output}
                </pre>
              </div>
            ))}
          </div>

          {/* Active Command Input Form */}
          <form className="terminal-cli-form" onSubmit={(e) => { e.preventDefault(); handleRunCommand(); }}>
            <div className="terminal-prompt-prefix">
              <span className="terminal-user-tag">harsh@portfolio</span>
              <span className="terminal-path-tag">~ %</span>
            </div>
            <input
              ref={inputRef}
              type="text"
              className="terminal-cli-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Type command ('help', 'projects', 'ask <query>', 'mcp')..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
