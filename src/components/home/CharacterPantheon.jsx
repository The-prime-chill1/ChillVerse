import React from 'react';
import { Flame, Star, Shield, Zap, Sparkles, ChevronRight, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CharacterPantheon({ characters = [] }) {
  const { openModal, isBookmarked, toggleBookmark } = useApp();

  // Pick top 6 powerhouse characters
  const pantheonList = characters.slice(0, 6);

  return (
    <section className="character-pantheon-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-eyebrow">
            <Flame size={15} className="text-orange" />
            <span>COMMUNITY TIER S-RANK</span>
          </div>
          <div className="pantheon-header-row">
            <div>
              <h2 className="section-main-heading">The Fan Pantheon</h2>
              <p className="section-sub-heading">
                Weekly community-voted power rankings across all 7 universes with verified lethality metrics.
              </p>
            </div>
            <button 
              onClick={() => openModal('character', pantheonList[0])}
              className="btn-glass"
            >
              <span>Inspect Tier #1</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="pantheon-grid">
          {pantheonList.map((char, index) => {
            const bookmarked = isBookmarked(char.id);
            const stats = char.stats || { combat: 95, intellect: 90, agility: 92, grit: 96 };

            return (
              <div 
                key={char.id || index}
                className="pantheon-card"
                onClick={() => openModal('character', char)}
              >
                {/* Ranking Tag */}
                <div className="pantheon-rank-badge">
                  <span>#{index + 1}</span>
                </div>

                <div className="pantheon-portrait-wrap">
                  <img 
                    src={char.image || char.thumbnail} 
                    alt={char.name} 
                    className="pantheon-img"
                    loading="lazy"
                  />
                  <div className="pantheon-gradient"></div>
                  
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(char);
                    }}
                    className={`pantheon-bookmark-btn ${bookmarked ? 'active' : ''}`}
                    title={bookmarked ? 'Remove' : 'Bookmark'}
                  >
                    <Heart size={16} fill={bookmarked ? '#ff3b30' : 'none'} color={bookmarked ? '#ff3b30' : '#ffffff'} />
                  </button>
                </div>

                <div className="pantheon-info-box">
                  <div className="pantheon-tags-line">
                    <span className="badge badge-purple">{char.category}</span>
                    <span className="pantheon-franchise">{char.franchise}</span>
                  </div>

                  <h3 className="pantheon-name">{char.name}</h3>
                  <p className="pantheon-alias">{char.alias || char.role}</p>

                  {/* Mini Stat Bars */}
                  <div className="pantheon-stat-row">
                    <span className="stat-name">Combat</span>
                    <div className="mini-stat-bar">
                      <div className="mini-stat-fill fill-red" style={{ width: `${stats.combat}%` }}></div>
                    </div>
                    <span className="stat-val">{stats.combat}%</span>
                  </div>

                  <div className="pantheon-stat-row">
                    <span className="stat-name">Intellect</span>
                    <div className="mini-stat-bar">
                      <div className="mini-stat-fill fill-cyan" style={{ width: `${stats.intellect}%` }}></div>
                    </div>
                    <span className="stat-val">{stats.intellect}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
