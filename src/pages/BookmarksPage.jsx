import React, { useState } from 'react';
import { Bookmark, Trash2, MessageSquare, Download, FileText, Edit3, Check, Heart } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useApp } from '../context/AppContext';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, exportBookmarks, sessionNotes, saveNote, getNote, deleteNote } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteInput, setNoteInput] = useState('');

  const contentTypes = ['all', ...new Set(bookmarks.map(b => b.type).filter(Boolean))];

  const filtered = activeTab === 'all'
    ? bookmarks
    : bookmarks.filter(b => b.type === activeTab);

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
          <h1 className="hub-title">Saved Bookmarks & Notes</h1>
          <p className="hub-desc">
            All your bookmarked lore, characters, trailers, and merchandise in one place. Session notes reset when the browser closes.
          </p>
        </div>
      </section>

      <div className="container bookmarks-main-content">
        {/* Header Actions */}
        <div className="bookmarks-actions-bar">
          <div className="bk-type-tabs">
            {contentTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`toolbar-tab-btn ${activeTab === type ? 'active' : ''}`}
              >
                {type.toUpperCase()} ({type === 'all' ? bookmarks.length : bookmarks.filter(b => b.type === type).length})
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

        {/* Empty State */}
        {bookmarks.length === 0 && (
          <div className="text-center py-5">
            <Bookmark size={60} className="text-muted mx-auto mb-3" />
            <h3>No Bookmarks Yet</h3>
            <p className="text-secondary mt-2" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Tap the <Heart size={14} className="text-red" fill="#ff3b30" /> icon on any card, character profile, or event to save it here.
            </p>
          </div>
        )}

        {/* Bookmark Cards */}
        <div className="bookmarks-list">
          {filtered.map((item) => {
            const note = getNote(item.id);
            const isEditingThis = editingNoteId === item.id;

            return (
              <div key={item.id} className="bookmark-item-card">
                {item.thumbnail && (
                  <img src={item.thumbnail} alt={item.title} className="bk-thumb" />
                )}

                <div className="bk-item-info">
                  <div className="bk-meta-row">
                    <span className="badge badge-purple">{item.category}</span>
                    <span className="badge badge-cyan">{item.type}</span>
                    <span className="text-muted text-xs ml-2">
                      Saved {new Date(item.savedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="bk-item-title">{item.title}</h4>
                  <p className="bk-item-desc">{item.description?.slice(0, 120)}...</p>

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
                      <MessageSquare size={13} />
                      <span>Add Session Note</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => removeBookmark(item.id)}
                  className="bk-remove-btn"
                  title="Remove from bookmarks"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
