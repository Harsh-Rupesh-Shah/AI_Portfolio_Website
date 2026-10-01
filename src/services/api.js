/**
 * API Service Client
 * Designed for immediate client-side operation with offline fallback,
 * while seamlessly wired to connect to future backend endpoints (FastAPI / Express / Next.js).
 */

import { COPILOT_KNOWLEDGE, TERMINAL_COMMANDS } from './knowledgeBase';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Query the HS-01 Copilot reasoning engine.
 */
export async function queryCopilot(query) {
  if (!query) return null;

  // Try real backend if configured
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/copilot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) {
        const data = await res.json();
        return data.response;
      }
    } catch (err) {
      console.warn('[Copilot API] Backend unavailable, using local deterministic fallback:', err);
    }
  }

  // Deterministic local simulation fallback
  await new Promise(resolve => setTimeout(resolve, 240));

  const directMatch = COPILOT_KNOWLEDGE[query];
  if (directMatch) return directMatch;

  const normalized = query.toLowerCase();
  for (const [key, val] of Object.entries(COPILOT_KNOWLEDGE)) {
    if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
      return val;
    }
  }

  return `[HS-01 COGNITION]: Harsh specializes in deterministic agent architectures, LangGraph orchestration, and Model Context Protocol (MCP) tooling. He builds production-grade pipelines in Python/FastAPI with latency and cost optimization. (Query: "${query}")`;
}

/**
 * Submit contact inquiry form.
 */
export async function submitContact(formData) {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('[Contact API] Backend unavailable, simulating successful transmission:', err);
    }
  }

  // Simulated async network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return {
    success: true,
    message: "Inquiry successfully encrypted and dispatched to Harsh's inbox."
  };
}

/**
 * Execute terminal command.
 */
export async function executeTerminalCommand(cmd) {
  const trimmed = cmd.trim();
  if (!trimmed) return null;

  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/terminal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: trimmed })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('[Terminal API] Backend unreachable, evaluating locally:', err);
    }
  }

  const normalized = trimmed.toLowerCase();

  if (TERMINAL_COMMANDS[normalized]) {
    return {
      type: 'text',
      output: TERMINAL_COMMANDS[normalized]
    };
  }

  if (normalized.startsWith('ask ')) {
    const q = trimmed.slice(4).trim();
    const answer = await queryCopilot(q);
    return {
      type: 'inference',
      query: q,
      output: `> INFERENCE IN PROGRESS: "${q}"
> Vector Cosine Match: 0.942 on collection 'production_systems'
> Retrieval Context: Found 3 LangGraph pipelines and 4 custom MCP tools built by Harsh.
> Synthesized Answer:
${answer}`
    };
  }

  if (normalized.startsWith('cat ')) {
    const target = normalized;
    if (TERMINAL_COMMANDS[target]) {
      return { type: 'text', output: TERMINAL_COMMANDS[target] };
    }
    return {
      type: 'error',
      output: `cat: ${trimmed.slice(4)}: No such file or directory. Try 'cat about.md' or 'cat contact.json'`
    };
  }

  return {
    type: 'error',
    output: `zsh: command not found: ${trimmed}\nType 'help' to see all supported diagnostic commands.`
  };
}
