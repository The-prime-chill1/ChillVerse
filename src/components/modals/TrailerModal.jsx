import React, { useEffect } from 'react';
import { X, Play, Share2, Bookmark, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TrailerModal({ data, onClose }) {
  const { isBookmarked, toggleBookmark } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  // Real YouTube embed mapping with robust multi-layer resolution
  const getEmbedUrl = () => {
    // 1. Direct YouTube ID
    if (data.youtubeId) {
      return `https://www.youtube-nocookie.com/embed/${data.youtubeId}?autoplay=1&rel=0`;
    }

    // 2. Direct embedUrl (supports youtube-nocookie.com, youtube.com, youtu.be)
    if (data.embedUrl && (data.embedUrl.includes('youtube') || data.embedUrl.includes('youtu.be'))) {
      return data.embedUrl;
    }

    // 3. Extract YouTube ID from thumbnail or backdrop URL
    const imgUrl = data.thumbnail || data.backdrop || data.image || '';
    const imgMatch = imgUrl.match(/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]{11})/);
    if (imgMatch && imgMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${imgMatch[1]}?autoplay=1&rel=0`;
    }

    // 4. Extract YouTube ID from raw video/trailer URL
    const rawUrl = data.trailerUrl || data.videoUrl || data.url || '';
    const urlMatch = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/);
    if (urlMatch && urlMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${urlMatch[1]}?autoplay=1&rel=0`;
    }

    // 5. Title / Known Catalog ID mappings
    const titleLower = (data.title || '').toLowerCase();
    if (titleLower.includes('jurassic')) {
      return 'https://www.youtube-nocookie.com/embed/vn9mMeWcgoM?autoplay=1&rel=0'; // Jurassic World: Fallen Kingdom
    }
    if (titleLower.includes('rebel ridge')) {
      return 'https://www.youtube-nocookie.com/embed/Qp49X0_36jU?autoplay=1&rel=0';
    }
    if (titleLower.includes('carry-on') || titleLower.includes('carry on')) {
      return 'https://www.youtube-nocookie.com/embed/y4vN_4Y9bK4?autoplay=1&rel=0';
    }
    if (titleLower.includes('deadpool')) {
      return 'https://www.youtube-nocookie.com/embed/73_1biulkYk?autoplay=1&rel=0';
    }
    if (titleLower.includes('dune')) {
      return 'https://www.youtube-nocookie.com/embed/Way9Dexny3w?autoplay=1&rel=0';
    }
    if (titleLower.includes('squid game')) {
      return 'https://www.youtube-nocookie.com/embed/lQBmZBJTN4g?autoplay=1&rel=0';
    }
    if (titleLower.includes('extraction')) {
      return 'https://www.youtube-nocookie.com/embed/Y274jZs5s7s?autoplay=1&rel=0';
    }
    if (titleLower.includes('elden ring')) {
      return 'https://www.youtube-nocookie.com/embed/bo4uH4701f8?autoplay=1&rel=0';
    }
    if (titleLower.includes('gta') || titleLower.includes('grand theft auto')) {
      return 'https://www.youtube-nocookie.com/embed/QdBZY2fkU-0?autoplay=1&rel=0';
    }
    if (titleLower.includes('jujutsu')) {
      return 'https://www.youtube-nocookie.com/embed/f7T48i4WaP8?autoplay=1&rel=0';
    }
    if (titleLower.includes('attack on titan')) {
      return 'https://www.youtube-nocookie.com/embed/MGRm4IzK1SQ?autoplay=1&rel=0';
    }
    if (titleLower.includes('gladiator')) {
      return 'https://www.youtube-nocookie.com/embed/4rgYUipGJNo?autoplay=1&rel=0';
    }
    if (titleLower.includes('furiosa') || titleLower.includes('mad max')) {
      return 'https://www.youtube-nocookie.com/embed/XJMuhwVlca4?autoplay=1&rel=0';
    }

    const trailerMap = {
      'ani-0001': 'https://www.youtube-nocookie.com/embed/VQGCKyvzIM4?autoplay=1&rel=0', // Demon Slayer
      'ani-0002': 'https://www.youtube-nocookie.com/embed/f7T48i4WaP8?autoplay=1&rel=0', // Jujutsu Kaisen
      'ani-0003': 'https://www.youtube-nocookie.com/embed/MGRm4IzK1SQ?autoplay=1&rel=0', // Attack on Titan
      'game-0001': 'https://www.youtube-nocookie.com/embed/bo4uH4701f8?autoplay=1&rel=0', // Elden Ring
      'mov-0001': 'https://www.youtube-nocookie.com/embed/jaJuw4kvSCw?autoplay=1&rel=0', // Die Hard
      'mov-0002': 'https://www.youtube-nocookie.com/embed/hEJnMQG9ev8?autoplay=1&rel=0', // Mad Max Fury Road
      'mov-0003': 'https://www.youtube-nocookie.com/embed/vn9mMeWcgoM?autoplay=1&rel=0', // Jurassic World Fallen Kingdom
      'kpop-0001': 'https://www.youtube-nocookie.com/embed/gdZLi9oWNZg?autoplay=1&rel=0'  // BTS Dynamite
    };

    return trailerMap[data.id] || 'https://www.youtube-nocookie.com/embed/vn9mMeWcgoM?autoplay=1&rel=0';
  };

  const bookmarked = isBookmarked(data.id);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container trailer-modal-box" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className={`badge ${data.category === 'music' || data.type === 'music' ? 'badge-green' : 'badge-red'}`} style={{ background: data.category === 'music' || data.type === 'music' ? '#10b981' : undefined }}>
              {data.category === 'music' || data.type === 'music' ? 'MUSIC SANCTUARY AUDIO' : '4K ULTRA HD STREAM'}
            </span>
            <h3 className="modal-title">{data.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Player: Audio Showcase for Music or Video Iframe for Movies/Trailers */}
        {data.category === 'music' || data.type === 'music' ? (
          <div className="music-modal-stage" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(10, 12, 18, 0.98) 75%)' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
              <img 
                src={data.poster || data.artwork || data.thumbnail} 
                alt={data.title} 
                style={{ width: '220px', height: '220px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 16px 40px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.3)', border: '2px solid rgba(255,255,255,0.15)' }} 
              />
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>{data.title}</h4>
            <p style={{ color: '#10b981', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{data.artist} {data.album ? `• ${data.album}` : ''}</p>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <audio 
                src={data.url || data.audioUrl || data.previewUrl} 
                controls 
                autoPlay 
                style={{ width: '100%', borderRadius: '99px', outline: 'none' }} 
              />
            </div>
          </div>
        ) : (
          <div className="video-player-frame-wrapper">
            <iframe
              src={getEmbedUrl()}
              title={data.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
        )}

        {/* Video Meta & Actions */}
        <div className="modal-footer-meta">
          <div className="modal-meta-left">
            <p className="modal-desc">{data.description || 'Exclusive official trailer preview on CHILLVERSE.'}</p>
            <div className="modal-tags">
              {data.tags?.map((tag, idx) => (
                <span key={idx} className="tag-pill">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="modal-actions-right">
            <button 
              onClick={() => toggleBookmark(data)}
              className={`btn-action-icon ${bookmarked ? 'bookmarked' : ''}`}
              title={bookmarked ? 'Remove from Bookmarks' : 'Save to Bookmarks'}
            >
              <Heart size={18} fill={bookmarked ? '#ff3b30' : 'none'} color={bookmarked ? '#ff3b30' : '#ffffff'} />
              <span>{bookmarked ? 'Saved' : 'Add to List'}</span>
            </button>
            <button 
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Trailer link copied to clipboard!");
              }}
              className="btn-action-icon"
              title="Share Trailer"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
