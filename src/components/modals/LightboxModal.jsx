import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2, Sparkles } from 'lucide-react';

export default function LightboxModal({ data, onClose }) {
  const images = data?.images || [data];
  const initialIndex = data?.currentIndex || 0;
  const [index, setIndex] = useState(initialIndex);

  const currentImg = images[index] || {};

  const handlePrev = () => {
    setIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-wrapper" onClick={e => e.stopPropagation()}>
        {/* Top Controls */}
        <div className="lightbox-top-bar">
          <div className="lightbox-counter">
            <span className="badge badge-cyan">
              Image {index + 1} of {images.length}
            </span>
            <span className="lightbox-category-tag">{currentImg.category || 'Fandom Gallery'}</span>
          </div>
          <button className="lightbox-close-btn" onClick={onClose} aria-label="Close Lightbox">
            <X size={22} />
          </button>
        </div>

        {/* Central Display */}
        <div className="lightbox-stage">
          {images.length > 1 && (
            <button 
              className="lightbox-nav-btn prev-btn" 
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <div className="lightbox-img-container">
            <img 
              src={currentImg.url || currentImg.image || currentImg.thumbnail} 
              alt={currentImg.caption || currentImg.title || 'Fandom Gallery View'} 
              className="lightbox-main-img" 
            />
          </div>

          {images.length > 1 && (
            <button 
              className="lightbox-nav-btn next-btn" 
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>

        {/* Bottom Caption Bar */}
        <div className="lightbox-bottom-bar">
          <div className="lightbox-caption-text">
            <h4 className="caption-title">{currentImg.title || currentImg.caption || 'Curated Fandom Visual'}</h4>
            {currentImg.description && (
              <p className="caption-sub">{currentImg.description}</p>
            )}
          </div>
          <div className="lightbox-actions">
            <button 
              onClick={() => {
                window.open(currentImg.url || currentImg.image, '_blank');
              }}
              className="btn-glass"
              title="Open full resolution"
            >
              Full Res
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
