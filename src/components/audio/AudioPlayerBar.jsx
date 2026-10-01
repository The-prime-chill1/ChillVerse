import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Radio, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AudioPlayerBar() {
  const { audioState, toggleAudio, nextTrack, prevTrack, setVolume, stopAudio } = useApp();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = audioState.currentTrack;

  useEffect(() => {
    if (!audioRef.current || !track?.url) return;
    audioRef.current.src = track.url;
    if (audioState.isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [track]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (audioState.isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [audioState.isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioState.volume;
    }
  }, [audioState.volume]);

  const fmtTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={nextTrack}
        loop={false}
      />

      <div className={`audio-floating-bar ${audioState.isPlaying ? 'is-active' : 'is-active'}`} role="complementary" aria-label="Audio player">
        <div className="audio-bar-content">
          {/* Track Info */}
          <div className="audio-track-info">
            {track?.artwork ? (
              <img 
                src={track.artwork} 
                alt={track.title} 
                className="audio-track-art-thumb" 
                style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} 
              />
            ) : (
              <Radio size={18} className="radio-icon-pulse" />
            )}
            <div>
              <span className="track-title">{track?.title || 'ChillVerse Ambient Radio'}</span>
              <span className="track-sub">{track?.artist || 'Billie Eilish & Global Hits'} • {fmtTime(currentTime)} / {duration ? fmtTime(duration) : '∞'}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="audio-controls-group">
            <button onClick={prevTrack} className="audio-btn-skip" title="Previous track" aria-label="Previous track">
              <SkipBack size={18} />
            </button>
            <button onClick={toggleAudio} className="audio-btn-main" title={audioState.isPlaying ? 'Pause' : 'Play'} aria-label={audioState.isPlaying ? 'Pause' : 'Play'}>
              {audioState.isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button onClick={nextTrack} className="audio-btn-skip" title="Next track" aria-label="Next track">
              <SkipForward size={18} />
            </button>
          </div>

          {/* Volume */}
          <div className="audio-volume-wrap">
            <button
              className="vol-btn"
              onClick={() => setVolume(audioState.volume > 0 ? 0 : 0.7)}
              title={audioState.volume === 0 ? 'Unmute' : 'Mute'}
              aria-label={audioState.volume === 0 ? 'Unmute audio' : 'Mute audio'}
            >
              {audioState.volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioState.volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="volume-slider"
              aria-label="Volume control"
            />
          </div>

          {/* Close */}
          <button onClick={stopAudio} className="vol-btn" title="Close audio player" aria-label="Stop audio">
            <X size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
