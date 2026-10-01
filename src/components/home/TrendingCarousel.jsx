import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Award, Star, Clock } from 'lucide-react';
import ContentCard from '../common/ContentCard';
import { useApp } from '../../context/AppContext';

export default function TrendingCarousel({ items = [] }) {
  const { openModal } = useApp();
  const scrollRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('trends');
  const [activeGenre, setActiveGenre] = useState('All');

  const genres = ['All', 'Action', 'Adventure', 'Animation', 'Dark Fantasy', 'Sci-Fi', 'Comedy', 'Drama'];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const filteredItems = items.filter(item => {
    if (activeGenre === 'All') return true;
    const tagMatch = item.tags?.some(t => t.toLowerCase().includes(activeGenre.toLowerCase()));
    const genreMatch = item.genre?.toLowerCase().includes(activeGenre.toLowerCase());
    return tagMatch || genreMatch;
  });

  return (
    <section className="trending-carousel-section">
      <div className="container">
        {/* Section Header with Tabs */}
        <div className="trending-header-bar">
          <div className="trending-tabs-group">
            <button 
              className={`section-tab-btn ${activeTab === 'trends' ? 'active' : ''}`}
              onClick={() => setActiveTab('trends')}
            >
              <TrendingUp size={18} className="text-orange" />
              <span>Trends Now</span>
            </button>
            <button 
              className={`section-tab-btn ${activeTab === 'popular' ? 'active' : ''}`}
              onClick={() => setActiveTab('popular')}
            >
              <Award size={18} className="text-cyan" />
              <span>Popular</span>
            </button>
            <button 
              className={`section-tab-btn ${activeTab === 'premieres' ? 'active' : ''}`}
              onClick={() => setActiveTab('premieres')}
            >
              <Star size={18} className="text-amber" />
              <span>Premieres</span>
            </button>
            <button 
              className={`section-tab-btn ${activeTab === 'recent' ? 'active' : ''}`}
              onClick={() => setActiveTab('recent')}
            >
              <Clock size={18} className="text-purple" />
              <span>Recently Added</span>
            </button>
          </div>

          {/* Carousel Arrows */}
          <div className="carousel-nav-arrows">
            <button 
              onClick={() => scroll('left')} 
              className="carousel-arrow-btn"
              aria-label="Previous items"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="carousel-arrow-btn"
              aria-label="Next items"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="genre-pills-scroll-row">
          {genres.map((g, i) => (
            <button
              key={i}
              onClick={() => setActiveGenre(g)}
              className={`genre-filter-pill ${activeGenre === g ? 'active-pill' : ''}`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div className="horizontal-cards-track" ref={scrollRef}>
          {filteredItems.length === 0 ? (
            <div className="no-items-inline">No content matches #{activeGenre} currently.</div>
          ) : (
            filteredItems.map((item, idx) => (
              <div key={item.id || idx} className="carousel-card-item">
                <ContentCard 
                  item={item} 
                  onClick={() => openModal('trailer', item)} 
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
