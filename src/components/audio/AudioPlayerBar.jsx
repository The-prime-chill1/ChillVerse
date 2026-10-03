import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// High-availability fallback audio streams in case primary network stream is blocked
const VERIFIED_FALLBACK_URLS = [
  'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/6a/08/f8/6a08f8f4-05ac-fe83-68b9-85e4f8cac8b1/mzaf_11447656297166015034.plus.aac.p.m4a',
  'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/89/ec/07/89ec07d6-bc49-9e37-7eb2-98cf384ece2c/mzaf_757461899043186347.plus.aac.p.m4a',
  'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/43/26/76/43267638-733c-c6e6-2252-9d6f448d3061/mzaf_9692574823920042259.plus.aac.p.m4a'
];

export default function AudioPlayerBar() {
  const { audioState, toggleAudio, nextTrack, prevTrack, setVolume, stopAudio } = useApp();
  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errorRetries, setErrorRetries] = useState(0);
  const [isSynthActive, setIsSynthActive] = useState(false);

  const track = audioState.currentTrack;

  // Resolve active audio source
  const getAudioUrl = useCallback((t) => {
    if (!t) return null;
    return t.url || t.audioUrl || t.previewUrl || null;
  }, []);

  // Web Audio Synthesizer fallback if all remote network audio streams are blocked
  const startSynthFallback = useCallback(() => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Harmonic ambient chord generator (Lofi chill chord progression)
      const chordFreqs = [220, 261.63, 329.63, 392]; // A minor 7
      chordFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
        lfo.connect(lfoGain);

        gain.gain.setValueAtTime(0.04 * (audioState.volume || 0.7), ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        lfo.start();

        setTimeout(() => {
          try {
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 8);
            setTimeout(() => osc.stop(), 8000);
          } catch {}
        }, 12000);
      });

      setIsSynthActive(true);
      setDuration(30);
    } catch (e) {
      console.warn('Synth fallback exception:', e);
    }
  }, [audioState.volume]);

  // Load and play track whenever track or isPlaying changes
  useEffect(() => {
    if (!audioRef.current || !track) return;

    setErrorRetries(0);
    setIsSynthActive(false);

    const sourceUrl = getAudioUrl(track);
    if (sourceUrl) {
      audioRef.current.src = sourceUrl;
      audioRef.current.load();

      if (audioState.isPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play was prevented by browser policy until user interacts
        });
      }
    } else {
      // Fallback directly if no URL is provided
      const fallback = VERIFIED_FALLBACK_URLS[0];
      audioRef.current.src = fallback;
      if (audioState.isPlaying) audioRef.current.play().catch(() => {});
    }
  }, [track, getAudioUrl, audioState.isPlaying]);

  // Sync isPlaying state
  useEffect(() => {
    if (!audioRef.current) return;
    if (audioState.isPlaying) {
      if (audioRef.current.paused && audioRef.current.src) {
        audioRef.current.play().catch(() => {
          if (!isSynthActive) startSynthFallback();
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [audioState.isPlaying, isSynthActive, startSynthFallback]);

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioState.volume;
    }
  }, [audioState.volume]);

  // Handle Audio Error: Seamlessly switch to fallback stream or synth
  const handleAudioError = () => {
    console.warn('Audio playback error on track:', track?.title);
    if (!audioRef.current) return;

    if (errorRetries < VERIFIED_FALLBACK_URLS.length) {
      const nextFallback = VERIFIED_FALLBACK_URLS[errorRetries];
      setErrorRetries(prev => prev + 1);
      audioRef.current.src = nextFallback;
      if (audioState.isPlaying) {
        audioRef.current.play().catch(() => {
          startSynthFallback();
        });
      }
    } else {
      // If all network audio fails (e.g. firewall/offline), start pleasant synth harmonic audio
      startSynthFallback();
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    if (duration > 0 && audioRef.current) {
      const newTime = pct * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const fmtTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  // Only render when music is actively playing or started
  if (!audioState.hasStarted && !audioState.isPlaying) {
    return null;
  }

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 30)}
        onEnded={nextTrack}
        onError={handleAudioError}
        loop={false}
      />

      <div className={`audio-floating-bar ${audioState.isPlaying ? 'is-active' : ''}`} role="complementary" aria-label="Audio player">
        {/* Scrubbable Progress Line */}
        <div 
          className="audio-timeline-track" 
          onClick={handleSeek}
          title="Click to seek"
          role="slider"
          aria-valuenow={currentTime}
          aria-valuemin="0"
          aria-valuemax={duration || 30}
          tabIndex={0}
        >
          <div className="audio-timeline-progress" style={{ width: `${progressPct}%` }}></div>
        </div>

        <div className="audio-bar-content">
          {/* Track Info */}
          <div className="audio-track-info">
            {track?.artwork || track?.poster || track?.thumbnail ? (
              <img 
                src={track.artwork || track.poster || track.thumbnail} 
                alt={track.title || 'Track Art'} 
                className="audio-track-art-thumb"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80';
                }}
              />
            ) : (
              <div className="audio-default-icon-art">
                <Music size={18} className="text-orange" />
              </div>
            )}
            <div className="audio-text-meta">
              <span className="track-title">{track?.title || 'ChillVerse Audio Anthem'}</span>
              <span className="track-sub">
                <span className="track-artist">{track?.artist || 'Featured Artist'}</span>
                <span className="track-time-stamp"> • {fmtTime(currentTime)} / {duration ? fmtTime(duration) : '0:30'}</span>
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="audio-controls-group">
            <button 
              type="button"
              onClick={prevTrack} 
              className="audio-btn-skip audio-skip-prev" 
              title="Previous track" 
              aria-label="Previous track"
            >
              <SkipBack size={17} />
            </button>
            <button 
              type="button"
              onClick={toggleAudio} 
              className="audio-btn-main" 
              title={audioState.isPlaying ? 'Pause' : 'Play'} 
              aria-label={audioState.isPlaying ? 'Pause' : 'Play'}
            >
              {audioState.isPlaying ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <button 
              type="button"
              onClick={nextTrack} 
              className="audio-btn-skip" 
              title="Next track" 
              aria-label="Next track"
            >
              <SkipForward size={17} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="audio-volume-wrap audio-desktop-only">
            <button
              type="button"
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
          <button 
            type="button"
            onClick={stopAudio} 
            className="vol-btn audio-btn-close" 
            title="Close audio player" 
            aria-label="Stop audio"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
