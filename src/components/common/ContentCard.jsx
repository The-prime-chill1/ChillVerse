import React from 'react';
import { Star, Heart, Play, Eye, BookOpen, Music2, Disc } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ContentCard({ item, onClick }) {
  const { isBookmarked, toggleBookmark, playTrack, audioState } = useApp();

  if (!item) return null;

  const bookmarked = isBookmarked(item.id);
  const rating = item.rating || (item.popularity ? (item.popularity / 20).toFixed(1) : '4.8');
  const year = item.year || (item.date ? item.date.slice(0, 4) : '2024');
  const isMusic = item.category === 'music' || item.category === 'k-pop' || Boolean(item.artist) || Boolean(item.audioUrl);
  const isCurrentlyPlaying = isMusic && audioState?.currentTrack?.id === item.id && audioState?.isPlaying;

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmark(item);
  };

  const handleQuickPlay = (e) => {
    e.stopPropagation();
    if (isMusic) {
      playTrack(item);
    } else if (onClick) {
      onClick();
    }
  };

  const getFallbackPoster = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'anime':
        return 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';
      case 'gaming':
        return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80';
      case 'movies':
        return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80';
      case 'tv-shows':
      case 'tv':
        return 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80';
      case 'music':
        return 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';
      case 'k-pop':
        return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
      case 'comics':
        return 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80';
      case 'manga':
        return 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80';
      default:
        return 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';
    }
  };

  const initialPoster = item.poster || item.thumbnail || item.image || item.backdrop || getFallbackPoster(item.category);

  return (
    <div className={`fandom-card ${isMusic ? 'fandom-card-music' : ''}`} onClick={onClick}>
      {/* Poster Image Container */}
      <div className={`card-poster-wrapper ${isMusic ? 'card-poster-square' : ''}`}>
        <img 
          src={initialPoster} 
          alt={item.title || item.name} 
          className="card-poster-img"
          loading="lazy"
          onError={(e) => {
            const fb = getFallbackPoster(item.category);
            if (e.currentTarget.src !== fb) {
              e.currentTarget.src = fb;
            }
          }}
        />
        
        {/* Type / Category Badge */}
        <div className="card-top-badges">
          <span className="card-badge-pill">
            {isMusic && item.genre ? item.genre.toUpperCase() : (item.category?.toUpperCase() || 'LORE')}
          </span>
          {item.featured && (
            <span className="card-badge-featured">HOT</span>
          )}
          {isCurrentlyPlaying && (
            <span className="card-badge-playing pulse">PLAYING</span>
          )}
        </div>

        {/* Quick Action Overlay */}
        <div className="card-hover-overlay">
          <button 
            type="button"
            className={`card-bookmark-btn ${bookmarked ? 'active' : ''}`}
            onClick={handleBookmarkClick}
            title={bookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
          >
            <Heart size={16} fill={bookmarked ? '#ff3b30' : 'none'} color={bookmarked ? '#ff3b30' : '#ffffff'} />
          </button>

          <div className="card-inspect-cta" onClick={handleQuickPlay} title={isMusic ? "Play Audio Preview" : "Explore Title"}>
            {isMusic ? (
              <div className="card-music-play-circle">
                <Play size={18} fill="#ffffff" className="cta-icon-pulse" />
              </div>
            ) : item.type === 'video' || item.embedUrl ? (
              <Play size={20} className="cta-icon-pulse" />
            ) : item.type === 'character' ? (
              <Eye size={20} className="cta-icon-pulse" />
            ) : (
              <BookOpen size={20} className="cta-icon-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Card Info Bottom */}
      <div className="card-info-bottom">
        {isMusic && item.artist && (
          <span className="card-artist-label" title={item.artist}>
            {item.artist}
          </span>
        )}
        <h4 className="card-title" title={item.title || item.name}>
          {item.title || item.name}
        </h4>
        
        <div className="card-meta-row">
          <span className="card-year">{isMusic && item.album ? item.album : year}</span>
          <div className="card-rating">
            {isMusic ? (
              <div className="flex items-center gap-1 text-cyan text-xs">
                <Disc size={12} className={isCurrentlyPlaying ? 'animate-spin' : ''} />
                <span>Audio</span>
              </div>
            ) : (
              <>
                <Star size={13} fill="#ffb300" color="#ffb300" />
                <span>{rating}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
