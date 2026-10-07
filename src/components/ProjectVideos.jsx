import React, { useState } from 'react';
import { PROJECT_VIDEOS } from '../services/knowledgeBase';
import VideoModal from './VideoModal';

export default function ProjectVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="videos-section" id="videos">
      <div className="container-max">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div className="section-tag">02 // ARCHITECTURE DEMONSTRATIONS</div>
            <h2 className="section-title">Production Systems in Action</h2>
          </div>
          <p className="section-desc">
            Direct high-definition video walkthroughs showcasing multi-agent LangGraph workflows, real-time token streaming, and deterministic execution.
          </p>
        </div>

        {/* 2-Card Video Grid */}
        <div className="videos-grid">
          {PROJECT_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="video-project-card"
              onClick={() => setSelectedVideo(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedVideo(video);
                }
              }}
            >
              {/* Cover Poster with Overlay and Play Badge */}
              <div className="video-card-thumbnail">
                <img
                  src={video.coverImage}
                  alt={`${video.title} Video Preview`}
                  className="video-card-poster"
                  loading="lazy"
                />
                <div className="video-card-scrim" />

                {/* Badges on Poster */}
                <div className="video-card-badges">
                  <span className="badge-tag-mono">{video.tag}</span>
                  <span className="badge-time-mono">{video.duration}</span>
                </div>

                {/* Central Play Trigger */}
                <div className="video-play-trigger">
                  <div className="video-play-ring">
                    <svg
                      viewBox="0 0 24 24"
                      width="26"
                      height="26"
                      fill="currentColor"
                      className="play-icon-svg"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="play-label-pulse">WATCH IN-SITE DEMO</span>
                </div>

                {/* Architecture pill */}
                <div className="video-card-tech-overlay">
                  <span className="tech-chip-mint">{video.badge}</span>
                </div>
              </div>

              {/* Card Content & Metadata */}
              <div className="video-card-body">
                <div className="video-card-titles">
                  <h3 className="video-card-title">{video.title}</h3>
                  <p className="video-card-subtitle">{video.subtitle}</p>
                </div>

                <p className="video-card-desc">{video.description}</p>

                {/* Tech Tags */}
                <div className="video-tags-row">
                  {video.tags.map((tag, idx) => (
                    <span key={idx} className="video-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Row */}
                <div className="video-card-footer">
                  <button
                    type="button"
                    className="btn-watch-modal"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(video);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>LAUNCH VIDEO PLAYER</span>
                  </button>

                  {video.githubUrl && (
                    <a
                      href={video.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-card-repo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>REPO</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pop-up Video Modal Player */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
