import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, Trash2, MessageSquare, Download, FileText, Edit3, 
  Check, Heart, Sparkles, Film, Flame, Gamepad2, Music, Play, Plus, ArrowRight
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useApp } from '../context/AppContext';

// Curated starter recommendations if vault is empty
const STARTER_PICKS = [
  {
    id: 'mov-spider-verse',
    title: 'Spider-Man: Across the Spider-Verse',
    category: 'movies',
    type: 'movie',
    year: 2023,
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    thumbnail: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    youtubeId: 'cqGjhVJWtEg',
    description: 'Miles Morales catapults across the Multiverse to encounter the Spider-Society.'
  },
  {
    id: 'mus-davido-001',
    title: 'Unavailable (feat. Musa Keys)',
    category: 'music',
    type: 'music',
    year: 2023,
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    youtubeId: '5j5E7fE1bA4',
    description: "Davido's monumental Grammy-nominated Afrobeats and Amapiano club anthem."
  },
  {
    id: 'ani-0001',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    category: 'anime',
    type: 'anime',
    year: 2024,
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    youtubeId: 'VQGCKyvzIM4',
    description: 'Tanjiro Kamado wages battle against Muzan Kibutsuji with the Demon Slayer Corps.'
  },
  {
    id: 'game-0001',
    title: 'Elden Ring: Shadow of the Erdtree',
    category: 'gaming',
    type: 'gaming',
    year: 2024,
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    youtubeId: 'bo4uH4701f8',
    description: 'Guided by Empyrean Miquella, players set foot into the Land of Shadow.'
  }
];

export default function BookmarksPage() {
  const { 
    bookmarks, 
    removeBookmark, 
    toggleBookmark, 
    isBookmarked, 
    exportBookmarks, 
    sessionNotes, 
    saveNote, 
    getNote, 
    deleteNote, 
    openModal 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteInput, setNoteInput] = useState('');

  // Watchlist Scratchpad state (persists to localStorage)
  const [scratchpad, setScratchpad] = useState(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('chillverse_user_scratchpad') : '') || '';
  });
  const [savedScratchStatus, setSavedScratchStatus] = useState(false);

  const handleSaveScratchpad = () => {
    localStorage.setItem('chillverse_user_scratchpad', scratchpad);
    setSavedScratchStatus(true);
    setTimeout(() => setSavedScratchStatus(false), 2500);
  };

  const handleAddScratchItem = (text) => {
    const updated = scratchpad ? `${scratchpad}\n• ${text}` : `• ${text}`;
    setScratchpad(updated);
    localStorage.setItem('chillverse_user_scratchpad', updated);
  };

  const contentTypes = ['all', ...new Set(bookmarks.map(b => b.type || b.category).filter(Boolean))];

  const filtered = activeTab === 'all'
    ? bookmarks
    : bookmarks.filter(b => (b.type || b.category) === activeTab);

  const handleStartNote = (id) => {
    setEditingNoteId(id);
    setNoteInput(getNote(id) || '');
  };

  const handleSaveNote = (id) => {
    saveNote(id, noteInput);
    setEditingNoteId(null);
  };

  return (
    <div className="bookmarks-page-layout">
      <Breadcrumbs items={[{ label: 'Bookmarks & Session Notes', path: '/bookmarks' }]} />

      <section className="bookmarks-hero">
        <div className="container">
          <div className="section-eyebrow">
            <Bookmark size={15} className="text-orange" />
            <span>YOUR PERSONAL FANDOM ARCHIVE</span>
          </div>
          <h1 className="hub-title">Saved Bookmarks &amp; Notes</h1>
          <p className="hub-desc">
            Your personal command sanctuary for saved 4K movies, Davido music hits, anime lore, and real-time watchlist session notes.
          </p>
        </div>
      </section>

      <div className="container bookmarks-main-content">
        {/* Header Actions Toolbar */}
        <div className="bookmarks-actions-bar">
          <div className="bk-type-tabs">
            {contentTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`toolbar-tab-btn ${activeTab === type ? 'active' : ''}`}
              >
                {type.toUpperCase()} ({type === 'all' ? bookmarks.length : bookmarks.filter(b => (b.type || b.category) === type).length})
              </button>
            ))}
          </div>

          <button
            onClick={exportBookmarks}
            disabled={bookmarks.length === 0}
            className="btn-primary-fire"
            title="Export all bookmarks as .txt file"
          >
            <Download size={16} />
            <span>Export Bookmarks (.txt)</span>
          </button>
        </div>

        {/* Empty State: Rich, Glowing & Actionable */}
        {bookmarks.length === 0 && (
          <div className="bookmarks-empty-sanctuary">
            <div className="empty-sanctuary-icon-glow">
              <Bookmark size={40} className="text-orange" />
            </div>
            <h3 className="empty-sanctuary-title">Your Fandom Vault Awaits</h3>
            <p className="empty-sanctuary-desc">
              You haven't bookmarked any lore or trailers yet. Tap the <Heart size={14} className="text-red inline mx-1" fill="#ff3b30" /> icon on any card across CHILLVERSE to save it here.
            </p>

            {/* Quick Realm Links */}
            <div className="empty-realm-shortcuts">
              <Link to="/category/movies" className="realm-shortcut-pill">
                <Film size={14} className="text-orange" />
                <span>4K Movies</span>
              </Link>
              <Link to="/category/music" className="realm-shortcut-pill">
                <Music size={14} className="text-cyan" />
                <span>Davido &amp; Music</span>
              </Link>
              <Link to="/category/anime" className="realm-shortcut-pill">
                <Flame size={14} className="text-orange" />
                <span>Anime Universe</span>
              </Link>
              <Link to="/category/gaming" className="realm-shortcut-pill">
                <Gamepad2 size={14} className="text-cyan" />
                <span>Gaming Sanctuary</span>
              </Link>
              <Link to="/media" className="realm-shortcut-pill">
                <Play size={14} className="text-purple" />
                <span>4K Cinema Player</span>
              </Link>
            </div>

            {/* Starter Recommendations Grid */}
            <div className="starter-picks-section">
              <div className="starter-picks-header">
                <Sparkles size={16} className="text-orange" />
                <h4>Recommended Vault Curations</h4>
              </div>

              <div className="starter-picks-grid">
                {STARTER_PICKS.map((item) => {
                  const saved = isBookmarked(item.id);
                  return (
                    <div key={item.id} className="starter-pick-card">
                      <div className="starter-card-thumb-wrap" onClick={() => openModal('trailer', item)}>
                        <img src={item.poster} alt={item.title} className="starter-card-img" />
                        <div className="starter-play-overlay">
                          <Play size={24} fill="#fff" />
                        </div>
                      </div>

                      <div className="starter-card-info">
                        <span className="starter-card-badge">{item.category.toUpperCase()}</span>
                        <h5 className="starter-card-title">{item.title}</h5>
                        <p className="starter-card-desc">{item.description}</p>
                        
                        <div className="starter-card-actions">
                          <button 
                            type="button"
                            onClick={() => openModal('trailer', item)}
                            className="btn-starter-play"
                          >
                            <Play size={13} fill="currentColor" />
                            <span>Play Trailer</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => toggleBookmark(item)}
                            className={`btn-starter-bookmark ${saved ? 'bookmarked' : ''}`}
                            title={saved ? 'Remove Bookmark' : 'Add to Vault'}
                          >
                            <Heart size={14} fill={saved ? '#ff3b30' : 'none'} color={saved ? '#ff3b30' : '#ffffff'} />
                            <span>{saved ? 'Saved' : 'Save'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Bookmark Cards (When Bookmarks Exist) */}
        {bookmarks.length > 0 && (
          <div className="bookmarks-list">
            {filtered.map((item) => {
              const note = getNote(item.id);
              const isEditingThis = editingNoteId === item.id;
              const thumb = item.poster || item.thumbnail || item.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';

              return (
                <div key={item.id} className="bookmark-item-card">
                  <div className="bk-thumb-container" onClick={() => openModal('trailer', item)}>
                    <img src={thumb} alt={item.title} className="bk-thumb" />
                    <div className="bk-thumb-hover">
                      <Play size={20} fill="#fff" />
                    </div>
                  </div>

                  <div className="bk-item-info">
                    <div className="bk-meta-row">
                      <span className="badge badge-purple">{item.category}</span>
                      <span className="badge badge-cyan">{item.type || 'fandom'}</span>
                      <span className="text-muted text-xs ml-2">
                        Saved {new Date(item.savedAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="bk-item-title" onClick={() => openModal('trailer', item)}>
                      {item.title}
                    </h4>
                    <p className="bk-item-desc">{item.description?.slice(0, 140)}...</p>

                    {/* Quick Trailer Button */}
                    <div className="bk-quick-actions">
                      <button 
                        type="button"
                        onClick={() => openModal('trailer', item)}
                        className="btn-play-mini"
                      >
                        <Play size={12} fill="currentColor" />
                        <span>Watch Trailer</span>
                      </button>
                    </div>

                    {/* Session Note Display / Edit */}
                    {isEditingThis ? (
                      <div className="note-editor-box">
                        <textarea
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          className="session-notes-input"
                          placeholder="Attach your personal fandom observation..."
                          rows="2"
                          autoFocus
                        />
                        <div className="notes-action-row">
                          <button onClick={() => handleSaveNote(item.id)} className="btn-save-note">
                            <Check size={13} />
                            <span>Save Note</span>
                          </button>
                          <button onClick={() => setEditingNoteId(null)} className="btn-glass text-xs">
                            Cancel
                          </button>
                          {note && (
                            <button onClick={() => { deleteNote(item.id); setEditingNoteId(null); }} className="btn-glass text-xs text-red">
                              Delete Note
                            </button>
                          )}
                        </div>
                      </div>
                    ) : note ? (
                      <div className="note-display-box">
                        <MessageSquare size={12} className="text-cyan inline mr-1" />
                        <span className="note-text-display">"{note}"</span>
                        <button onClick={() => handleStartNote(item.id)} className="note-edit-btn ml-2">
                          <Edit3 size={12} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleStartNote(item.id)} className="btn-add-note">
                        <Edit3 size={12} />
                        <span>Add Fan Note</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => removeBookmark(item.id)}
                    className="btn-remove-bk"
                    title="Remove from bookmarks"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Live Watchlist & Fan Notes Scratchpad Section */}
        <section className="fandom-scratchpad-card">
          <div className="scratchpad-header">
            <div className="scratchpad-title-group">
              <FileText size={18} className="text-cyan" />
              <div>
                <h4 className="scratchpad-title">Watchlist &amp; Fandom Scratchpad</h4>
                <p className="scratchpad-sub">Jot down upcoming releases, music track queues, or gaming notes. Auto-saves locally.</p>
              </div>
            </div>

            <div className="scratchpad-actions">
              {savedScratchStatus && <span className="text-emerald text-xs flex items-center gap-1"><Check size={13} /> Saved!</span>}
              <button 
                onClick={handleSaveScratchpad}
                className="btn-save-scratchpad"
              >
                Save Scratchpad
              </button>
            </div>
          </div>

          <textarea
            value={scratchpad}
            onChange={(e) => setScratchpad(e.target.value)}
            placeholder="Type your personal watch queues, notes, or fan theories here..."
            className="scratchpad-textarea"
            rows="4"
          />

          <div className="scratchpad-quick-suggestions">
            <span className="text-xs text-muted">Quick ideas:</span>
            <button 
              type="button" 
              onClick={() => handleAddScratchItem('Spider-Man: Across the Spider-Verse 4K stream')}
              className="scratch-suggestion-pill"
            >
              + Spider-Man 4K
            </button>
            <button 
              type="button" 
              onClick={() => handleAddScratchItem('Davido - Unavailable & Timeless bangers')}
              className="scratch-suggestion-pill"
            >
              + Davido Timeless
            </button>
            <button 
              type="button" 
              onClick={() => handleAddScratchItem('Demon Slayer Infinity Castle Trilogy release')}
              className="scratch-suggestion-pill"
            >
              + Demon Slayer Trilogy
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
