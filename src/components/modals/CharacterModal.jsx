import React, { useState, useEffect } from 'react';
import { X, Heart, Shield, Zap, Brain, Flame, Sparkles, MessageSquare, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CharacterModal({ data, onClose }) {
  const { isBookmarked, toggleBookmark, getNote, saveNote } = useApp();
  const [noteText, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    if (data?.id) {
      setNoteText(getNote(data.id) || '');
    }
  }, [data, getNote]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  const bookmarked = isBookmarked(data.id);

  const handleSaveNote = (e) => {
    e.preventDefault();
    saveNote(data.id, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const stats = data.stats || { combat: 90, intellect: 88, agility: 92, grit: 95 };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container character-modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn float-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="character-modal-grid">
          {/* Left Column: Portrait & Stats */}
          <div className="char-portrait-col">
            <div className="char-img-wrapper">
              <img src={data.image || data.thumbnail} alt={data.name} className="char-portrait-img" />
              <div className="char-badge-overlay">
                <span className="badge badge-purple">{data.category}</span>
                <span className="badge badge-cyan">{data.franchise}</span>
              </div>
            </div>

            {/* Combat Metrics */}
            <div className="char-stats-card">
              <h4 className="stats-heading">
                <Flame size={16} className="text-orange" />
                <span>Pantheon Combat Matrix</span>
              </h4>
              
              <div className="stat-row">
                <div className="stat-label">
                  <span>Combat Lethality</span>
                  <span>{stats.combat}%</span>
                </div>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill fill-red" style={{ width: `${stats.combat}%` }}></div>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-label">
                  <span>Strategic Intellect</span>
                  <span>{stats.intellect}%</span>
                </div>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill fill-cyan" style={{ width: `${stats.intellect}%` }}></div>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-label">
                  <span>Agility & Reflexes</span>
                  <span>{stats.agility}%</span>
                </div>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill fill-purple" style={{ width: `${stats.agility}%` }}></div>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-label">
                  <span>Adamantine Grit</span>
                  <span>{stats.grit}%</span>
                </div>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill fill-orange" style={{ width: `${stats.grit}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lore & Info */}
          <div className="char-info-col">
            <div className="char-header">
              <span className="char-alias">{data.alias || 'Legendary Entity'}</span>
              <h2 className="char-name">{data.name}</h2>
              <p className="char-role">{data.role || 'Protagonist & Champion'}</p>
            </div>

            {data.quote && (
              <blockquote className="char-quote">
                "{data.quote}"
              </blockquote>
            )}

            <div className="char-bio-section">
              <h4 className="section-label">Lore & Background</h4>
              <p className="char-bio-text">{data.biography}</p>
            </div>

            {/* Traits & Abilities */}
            <div className="char-traits-section">
              <h4 className="section-label">Signature Abilities & Traits</h4>
              <div className="traits-pills-list">
                {data.traits?.map((trait, i) => (
                  <span key={i} className="trait-pill">
                    <Sparkles size={12} className="inline mr-1 text-cyan" />
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar: Bookmark & Session Note */}
            <div className="char-actions-panel">
              <button 
                onClick={() => toggleBookmark(data)}
                className={`btn-primary-fire ${bookmarked ? 'is-saved' : ''}`}
              >
                <Heart size={16} fill={bookmarked ? '#ffffff' : 'none'} />
                <span>{bookmarked ? 'Bookmarked in Pantheon' : 'Add to My Pantheon'}</span>
              </button>
            </div>

            {/* Session Notes (SRS Section 1.6 Requirement) */}
            <form onSubmit={handleSaveNote} className="char-notes-box">
              <div className="notes-header">
                <MessageSquare size={14} className="text-cyan" />
                <span>Personal Session Note (Browser Session Only)</span>
              </div>
              <textarea 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Attach private thoughts or lore observations for this character..."
                className="session-notes-input"
                rows="2"
              ></textarea>
              <div className="notes-action-row">
                <button type="submit" className="btn-save-note">
                  <Save size={13} />
                  <span>{noteSaved ? 'Saved to Session!' : 'Save Note'}</span>
                </button>
                <span className="notes-tip">Cleared when browser closes</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
