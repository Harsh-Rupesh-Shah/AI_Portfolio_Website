import React, { useState } from 'react';
import { submitContact } from '../services/api';

export default function Contact({ onAskCopilotContact }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await submitContact(formData);
      setStatusMessage({ type: 'success', text: res.message || 'Message transmitted successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: `Failed to transmit message: ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container-max">
        <div className="contact-card-hero fade-up">
          <span className="section-tag" style={{ background: 'var(--accent-mint-soft)', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>
            05 // COLLABORATION
          </span>

          <h2 className="contact-headline">
            Have something worth building?
          </h2>

          <p className="contact-desc">
            Whether you want to discuss agentic architectures, latency reduction,
            MCP tool standards, or engineering opportunities, let's connect.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <a href="mailto:hrsshah04022004@gmail.com" className="btn-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>mail</span>
              <span>EMAIL: HRSSHAH04022004@GMAIL.COM</span>
            </a>

            <a href="tel:+919175366700" className="btn-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>call</span>
              <span>+91 9175366700</span>
            </a>

            <button
              type="button"
              className="btn-secondary"
              onClick={onAskCopilotContact}
            >
              <span className="dot-mint"></span>
              <span>ASK HS-01 HOW TO REACH HARSH</span>
            </button>
          </div>

          {/* Interactive Secure Transmission Form */}
          <form className="contact-form-container" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">NAME</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">EMAIL</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">SYSTEM / TOPIC</label>
              <input
                id="contact-subject"
                type="text"
                className="form-input"
                placeholder="Autonomous Agent Architecture / MCP Implementation"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">TRANSMISSION PAYLOAD</label>
              <textarea
                id="contact-message"
                required
                className="form-textarea"
                placeholder="Detail your engineering inquiry, problem statement, or team context..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {statusMessage && (
              <div className={`form-status-alert ${statusMessage.type}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  {statusMessage.type === 'success' ? 'check_circle' : 'error'}
                </span>
                <span>{statusMessage.text}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%', marginTop: '0.25rem' }}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>sync</span>
                  <span>ENCRYPTING &amp; DISPATCHING...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>send</span>
                  <span>TRANSMIT INQUIRY</span>
                </>
              )}
            </button>
          </form>

          {/* Social Channels Shelf */}
          <div className="contact-channels-shelf">
            <a href="https://github.com/Harsh-Rupesh-Shah" target="_blank" rel="noreferrer" className="channel-link">
              GITHUB ↗
            </a>
            <span>·</span>
            <a href="https://linkedin.com/in/harshshah2004" target="_blank" rel="noreferrer" className="channel-link">
              LINKEDIN ↗
            </a>
            <span>·</span>
            <a href="/resume.pdf" download="Harsh_Shah_Resume.pdf" className="channel-link">
              DOWNLOAD RESUME [PDF]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
