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

  const [isExecuting, setIsExecuting] = useState(false);
  const [showMobileLogs, setShowMobileLogs] = useState(false);

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
    if (isExecuting) return;

    const cmd = (rawCmd !== undefined ? rawCmd : inputVal).trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      setHistoryIndex(-1);
      return;
    }

    // Immediately clear input and record command history
    setInputVal('');
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setIsExecuting(true);

    const tempId = Date.now() + Math.random();

    // Show immediate execution row
    setHistory((prev) => [
      ...prev,
      {
        id: tempId,
        cmd,
        output: 'Executing HS-01 runtime...',
        type: 'loading',
        isLoading: true
      }
    ]);

    try {
      const result = await executeTerminalCommand(cmd);
      const outputText = result?.output || `[RUNTIME]: Command '${cmd}' finished with code 0.`;
      const outputType = result?.type || 'text';

      setHistory((prev) =>
        prev.map((item) =>
          item.id === tempId
            ? {
                ...item,
                output: outputText,
                type: outputType,
                isLoading: false
              }
            : item
        )
      );
    } catch (err) {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === tempId
            ? {
                ...item,
                output: `Execution error: ${err.message || String(err)}`,
                type: 'error',
                isLoading: false
              }
            : item
        )
      );
    } finally {
      setIsExecuting(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
    }
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
      <div className="terminal-top-nav">
        <div className="terminal-status-badge">
          <span className="dot-mint" style={{ width: '8px', height: '8px' }}></span>
          <span className="terminal-status-desktop">
            HS-01 DAEMON ACTIVE // WORKSTATION (PTY/2)
          </span>
          <span className="terminal-status-mobile">
            HS-01 RUNTIME
          </span>
        </div>

        <div className="terminal-top-actions">
          <button
            type="button"
            className="terminal-mobile-logs-btn"
            onClick={() => setShowMobileLogs((prev) => !prev)}
            title="Toggle Streaming Daemon Logs"
          >
            {showMobileLogs ? '[HIDE LOGS]' : '[SHOW LOGS]'}
          </button>

          <button
            type="button"
            className="btn-primary terminal-exit-btn"
            onClick={onExitToWeb}
          >
            <span className="desktop-text">EXIT TERMINAL / [WEB MODE ↗]</span>
            <span className="mobile-text">WEB MODE ↗</span>
          </button>
        </div>
      </div>

      {/* Terminal Window Card */}
      <div className="terminal-window-card">
        {/* Title Bar */}
        <div className="terminal-titlebar">
          <div className="window-dots">
            <span className="dot-control red" title="Clear Shell" onClick={() => setHistory([])}></span>
            <span className="dot-control yellow" title="Toggle Font" onClick={() => setFontSizeIndex((prev) => (prev + 1) % fontSizes.length)}></span>
            <span className="dot-control green" title="Clear Shell" onClick={() => setHistory([])}></span>
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
              className="terminal-tool-btn terminal-font-btn"
              onClick={() => setFontSizeIndex((prev) => (prev + 1) % fontSizes.length)}
              title="Toggle Font Size"
            >
              FONT: {fontSizes[fontSizeIndex]}
            </button>
          </div>
        </div>

        {/* Quick Command Ribbon */}
        <div className="terminal-command-ribbon">
          <span className="terminal-ribbon-tag">EXECUTE:</span>
          <div className="terminal-ribbon-scroll">
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
        </div>

        {/* Streaming Daemon Log Box */}
        <div className={`terminal-daemon-stream ${showMobileLogs ? 'mobile-visible' : ''}`} ref={logStreamRef}>
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
              <div key={item.id || idx} className="terminal-row-item">
                <div className="terminal-prompt-prefix">
                  <span className="terminal-user-tag">harsh@portfolio</span>
                  <span className="terminal-path-tag">~ %</span>
                  <span className="terminal-command-string">{item.cmd}</span>
                </div>
                {item.output ? (
                  <pre
                    className="terminal-output-block"
                    style={{
                      color: item.type === 'error' ? 'var(--error)' : 'var(--text-on-dark)',
                      borderLeftColor: item.type === 'inference' ? 'var(--terminal-accent)' : undefined,
                      opacity: item.isLoading ? 0.75 : 1
                    }}
                  >
                    {item.isLoading ? (
                      <span style={{ color: 'var(--terminal-accent)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span className="dot-mint" style={{ width: '7px', height: '7px' }}></span>
                        <span>{item.output}</span>
                      </span>
                    ) : (
                      item.output
                    )}
                  </pre>
                ) : null}
              </div>
            ))}
          </div>

          {/* Active Command Input Form */}
          <form
            className="terminal-cli-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleRunCommand();
            }}
          >
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
              disabled={isExecuting}
              autoFocus
              placeholder={isExecuting ? "Executing runtime command..." : "Type 'help', 'projects', or ask HS-01..."}
            />
          </form>

          {/* Mobile One-Tap Quick Bar */}
          <div className="terminal-mobile-quickbar">
            <span style={{ fontSize: '10px', color: 'var(--text-on-dark-muted)' }}>QUICK:</span>
            <button type="button" className="mobile-quick-btn" onClick={() => handleRunCommand('help')}>[HELP]</button>
            <button type="button" className="mobile-quick-btn" onClick={() => handleRunCommand('projects')}>[PROJECTS]</button>
            <button type="button" className="mobile-quick-btn" onClick={() => handleRunCommand('ask who is harsh?')}>[WHO IS HARSH?]</button>
            <button type="button" className="mobile-quick-btn" onClick={() => handleRunCommand('clear')}>[CLEAR]</button>
          </div>
        </div>
      </div>
    </div>
  );
}
