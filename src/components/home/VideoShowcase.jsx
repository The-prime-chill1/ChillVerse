import React, { useState } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, 
  Heart, Plus, Check, Eye, Film, Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function VideoShowcase() {
  const { openModal, isBookmarked, toggleBookmark } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(24); // Percentage

  const featuredVideo = {
    id: 'mov-0003',
    title: 'Jurassic World: Fallen Kingdom',
    year: '2018',
    category: 'Movies',
    duration: '2:08:14',
    elapsed: '23:04',
    backdrop: 'https://img.youtube.com/vi/vn9mMeWcgoM/maxresdefault.jpg',
    youtubeId: 'vn9mMeWcgoM',
    description: 'When the island volcano begins erupting, Owen and Claire mount a perilous campaign to rescue the remaining dinosaurs from extinction.',
    embedUrl: 'https://www.youtube-nocookie.com/embed/vn9mMeWcgoM?autoplay=1'
  };

  const bookmarked = isBookmarked(featuredVideo.id);

  const handleLaunchTrailer = () => {
    openModal('trailer', featuredVideo);
  };

  return (
    <section className="video-showcase-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-eyebrow">
            <Film size={15} className="text-orange" />
            <span>CINEMATIC SHOWCASE & 4K PLAYER</span>
          </div>
          <h2 className="section-main-heading">Fandom Theater Lounge</h2>
        </div>

        {/* 4K Player Mockup Card */}
        <div className="theater-player-card">
          <div 
            className="theater-backdrop-frame"
            style={{ backgroundImage: `url(${featuredVideo.backdrop})` }}
          >
            {/* Overlay Gradient */}
            <div className="theater-dim-overlay"></div>

            {/* Top Info Bar inside player */}
            <div className="player-top-hud">
              <div className="player-title-box">
                <h3 className="player-video-title">
                  {featuredVideo.title} ({featuredVideo.year})
                </h3>
                <span className="player-watching-status">
                  <Eye size={13} className="text-cyan inline mr-1" />
                  Now Streaming in 4K HDR • 3,840 Active Viewers
                </span>
              </div>

              <div className="player-top-actions">
                <button 
                  onClick={() => toggleBookmark(featuredVideo)}
                  className={`hud-icon-btn ${bookmarked ? 'active' : ''}`}
                  title={bookmarked ? 'Saved in list' : 'Add to favorites'}
                >
                  <Heart size={18} fill={bookmarked ? '#ff3b30' : 'none'} color={bookmarked ? '#ff3b30' : '#ffffff'} />
                </button>
                <button 
                  onClick={handleLaunchTrailer}
                  className="hud-icon-btn"
                  title="Launch full trailer stream"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Center Big Play Button */}
            <div className="player-center-trigger">
              <button 
                onClick={handleLaunchTrailer}
                className="big-play-glow-btn"
                aria-label="Play 4K Trailer"
              >
                <Play size={36} fill="white" className="play-triangle" />
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="player-controls-bar">
              {/* Play/Pause & Replay */}
              <div className="ctrl-left-group">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="ctrl-btn play-pause-btn"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
                </button>

                <button 
                  onClick={() => setProgress(Math.max(0, progress - 5))}
                  className="ctrl-btn replay-btn"
                  title="Replay 10s"
                >
                  <RotateCcw size={16} />
                  <span className="replay-sub">10</span>
                </button>

                <span className="timecode-display">
                  {featuredVideo.elapsed}
                </span>
              </div>

              {/* Progress Scrubber */}
              <div className="ctrl-scrubber-wrap">
                <div 
                  className="scrubber-track"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newPct = (clickX / rect.width) * 100;
                    setProgress(Math.min(100, Math.max(0, newPct)));
                  }}
                >
                  <div 
                    className="scrubber-fill-bar"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="scrubber-scrub-head"></div>
                  </div>
                </div>
              </div>

              {/* Total Time & Right Controls */}
              <div className="ctrl-right-group">
                <span className="timecode-display total-time">
                  {featuredVideo.duration}
                </span>

                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="ctrl-btn"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>

                <button 
                  onClick={handleLaunchTrailer}
                  className="ctrl-btn"
                  title="Full Screen Trailer"
                >
                  <Maximize2 size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
