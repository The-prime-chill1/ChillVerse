import React from 'react';
import { Star, Heart, Play, Eye, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ContentCard({ item, onClick }) {
  const { isBookmarked, toggleBookmark } = useApp();

  if (!item) return null;

  const bookmarked = isBookmarked(item.id);
  const rating = item.rating || (item.popularity ? (item.popularity / 20).toFixed(1) : '4.8');
  const year = item.year || (item.date ? item.date.slice(0, 4) : '2024');

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmark(item);
  };

  return (
    <div className="fandom-card" onClick={onClick}>
      {/* Poster Image Container */}
      <div className="card-poster-wrapper">
        <img 
          src={item.poster || item.thumbnail || item.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'} 
          alt={item.title || item.name} 
          className="card-poster-img"
          loading="lazy"
          onError={(e) => {
            if (item.thumbnail && e.currentTarget.src !== item.thumbnail) {
              e.currentTarget.src = item.thumbnail;
            }
          }}
        />
        
        {/* Type / Category Badge */}
        <div className="card-top-badges">
          <span className="card-badge-pill">
            {item.category?.toUpperCase() || 'LORE'}
          </span>
          {item.featured && (
            <span className="card-badge-featured">HOT</span>
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

          <div className="card-inspect-cta">
            {item.type === 'video' || item.embedUrl ? (
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
        <h4 className="card-title" title={item.title || item.name}>
          {item.title || item.name}
        </h4>
        
        <div className="card-meta-row">
          <span className="card-year">{year}</span>
          <div className="card-rating">
            <Star size={13} fill="#ffb300" color="#ffb300" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
