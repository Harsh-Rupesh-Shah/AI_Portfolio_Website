import React, { useEffect, useRef, useState } from 'react';

export default function VideoModal({ video, onClose }) {
  const [useSampleStream, setUseSampleStream] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const videoRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!video) return null;

  const handleVideoError = () => {
    if (!useSampleStream && video.demoSampleUrl) {
      setLoadError(true);
      setUseSampleStream(true);
    }
  };

  const currentVideoSrc = useSampleStream ? video.demoSampleUrl : video.videoSrc;

  return (
    <div 
      className="video-modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="video-modal-container">
        {/* Modal Top Bar */}
        <div className="video-modal-header">
          <div className="video-modal-title-group">
            <span className="video-modal-tag">{video.tag} //</span>
            <h2 id="video-modal-title" className="video-modal-heading">
              {video.title}
            </h2>
          </div>

          <div className="video-modal-actions">
            <span className="video-modal-esc-hint">PRESS [ESC] TO CLOSE</span>
            <button 
              className="video-modal-close-btn" 
              onClick={onClose}
              aria-label="Close video player"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="video-player-frame">
          {video.embedUrl ? (
            <div className="video-embed-wrapper">
              <iframe
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-embed-iframe"
              />
            </div>
          ) : (
            <div className="video-native-wrapper">
              <video
                ref={videoRef}
                key={currentVideoSrc}
                controls
                autoPlay
                playsInline
                poster={video.coverImage}
                onError={handleVideoError}
                className="video-element"
              >
                <source src={currentVideoSrc} type="video/mp4" />
                Your browser does not support HTML5 video streaming.
              </video>

              {loadError && (
                <div className="video-fallback-notice">
                  <div className="fallback-notice-icon">ℹ</div>
                  <div className="fallback-notice-text">
                    <strong>Local recording pending:</strong> <code>{video.videoSrc}</code> was not found in <code>public/videos/</code>. 
                    Streaming cloud architectural demo.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Project Telemetry & Architectural Details */}
        <div className="video-modal-details">
          <div className="video-details-main">
            <div className="video-details-meta">
              <span className="badge-tech">{video.badge}</span>
              <span className="badge-duration">{video.duration}</span>
              {video.githubUrl && (
                <a 
                  href={video.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="video-repo-link"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span>GITHUB REPOSITORY ↗</span>
                </a>
              )}
            </div>

            <p className="video-details-desc">{video.description}</p>

            {video.keyHighlights && (
              <div className="video-highlights-block">
                <span className="video-subheading">KEY ARCHITECTURAL HIGHLIGHTS</span>
                <ul className="video-highlights-list">
                  {video.keyHighlights.map((hl, i) => (
                    <li key={i}>
                      <span className="highlight-bullet">▸</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Metrics Column */}
          {video.metrics && (
            <div className="video-details-metrics">
              <span className="video-subheading">BENCHMARKS & NODES</span>
              <div className="video-metrics-grid">
                {video.metrics.map((m, i) => (
                  <div key={i} className="video-metric-item">
                    <div className="video-metric-value">{m.value}</div>
                    <div className="video-metric-label">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Developer local placement tip */}
              <div className="video-dev-note">
                <span className="dev-note-tag">TIP FOR HARSH:</span>
                <p>
                  To use your own recording, place <code>{video.videoSrc.replace('/videos/', '')}</code> in <code>Portfolio/public/videos/</code> or paste an unlisted YouTube/Loom URL.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
