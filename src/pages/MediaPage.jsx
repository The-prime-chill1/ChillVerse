import React, { useState, useEffect } from 'react';
import { Film, Play, Mic, Music, Filter, Sparkles, Volume2 } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { dataService } from '../services/dataService';
import { useApp } from '../context/AppContext';

export default function MediaPage() {
  const { openModal, selectAudioTrack, audioState } = useApp();

  const [videos, setVideos] = useState([]);
  const [audioClips, setAudioClips] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMediaData() {
      try {
        const [vids, auds] = await Promise.all([
          dataService.getVideos(),
          dataService.getAudioClips()
        ]);
        setVideos(vids);
        setAudioClips(auds);
      } catch (err) {
        console.error('Failed to load media:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMediaData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredVideos = videos.filter(v => {
    const matchCat = selectedCat === 'all' || v.category?.toLowerCase() === selectedCat.toLowerCase();
    const matchType = selectedType === 'all' || v.type?.toLowerCase() === selectedType.toLowerCase();
    return matchCat && matchType;
  });

  const breadcrumbs = [
    { label: 'Media & 4K Trailers', path: '/media' }
  ];

  return (
    <div className="media-page-layout">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header Banner */}
      <section className="media-hero-header">
        <div className="container">
          <div className="section-eyebrow">
            <Film size={15} className="text-orange" />
            <span>THEATER & PODCAST LOUNGE</span>
          </div>
          <h1 className="hub-title">4K Trailers, Audio Waves & Clips</h1>
          <p className="hub-desc">
            Stream high-fidelity theatrical trailers, creator roundtables, and ambient soundtrack podcasts directly in the browser.
          </p>

          {/* Filter Pills */}
          <div className="media-filters-bar mt-4">
            <div className="filter-pill-group">
              <span className="filter-group-label">Category:</span>
              {['all', 'anime', 'gaming', 'movies', 'k-pop'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`toolbar-tab-btn ${selectedCat === cat ? 'active' : ''}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="filter-pill-group">
              <span className="filter-group-label">Format:</span>
              {['all', 'trailer', 'interview', 'podcast'].map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`toolbar-tab-btn ${selectedType === t ? 'active' : ''}`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="media-videos-section">
        <div className="container">
          <div className="section-title-wrap">
            <h3 className="section-main-heading">Theatrical Releases ({filteredVideos.length})</h3>
          </div>

          <div className="fandom-cards-grid">
            {filteredVideos.map((vid, idx) => (
              <div 
                key={vid.id || idx} 
                className="fandom-card media-trailer-card"
                onClick={() => openModal('trailer', vid)}
              >
                <div className="card-poster-wrapper">
                  <img 
                    src={vid.thumbnail || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80'} 
                    alt={vid.title} 
                    className="card-poster-img"
                    loading="lazy"
                  />
                  <div className="play-hover-badge">
                    <Play size={24} fill="white" />
                  </div>
                  <span className="badge badge-red trailer-cat-badge">{vid.category}</span>
                </div>

                <div className="card-info-bottom">
                  <span className="badge badge-cyan text-xs">{vid.type?.toUpperCase()}</span>
                  <h4 className="card-title mt-1">{vid.title}</h4>
                  <p className="text-secondary text-xs mt-1">{vid.description?.slice(0, 70)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Lounge Section */}
      <section className="media-audio-section mt-5">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-eyebrow">
              <Music size={15} className="text-cyan" />
              <span>SOUNDTRACK LOUNGE</span>
            </div>
            <h3 className="section-main-heading">Ambient Fandom Waves</h3>
            <p className="section-sub-heading">Click any track to tune the persistent background audio player.</p>
          </div>

          <div className="audio-tracks-grid">
            {audioState.tracks.map((track, i) => (
              <div 
                key={track.id} 
                className={`audio-track-card ${audioState.currentTrackIndex === i && audioState.isPlaying ? 'active' : ''}`}
                onClick={() => selectAudioTrack(i)}
              >
                <div className="audio-card-left">
                  <div className="audio-play-circle">
                    <Volume2 size={18} />
                  </div>
                  <div>
                    <h4 className="audio-title">{track.title}</h4>
                    <span className="audio-artist">{track.artist} • {track.category}</span>
                  </div>
                </div>

                <button className="btn-glass text-xs">
                  {audioState.currentTrackIndex === i && audioState.isPlaying ? 'Playing Now' : 'Play Track'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
