import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Compass, Film, ShoppingBag, Bookmark, X,
  Flame, Gamepad2, Film as FilmIcon, Tv, Music, Mic2, Zap, BookOpen,
  ChevronRight, Sparkles, Calendar, FileText, Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MobileBottomNav() {
  const { cartCount, bookmarks } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);

  const categories = [
    { id: 'anime',    name: 'Anime',    subtitle: 'Shonen & Masterpieces', Icon: Flame,     color: '#ff3b30', glow: 'rgba(255,59,48,0.18)' },
    { id: 'gaming',   name: 'Gaming',   subtitle: 'RPGs & Esports Lore',   Icon: Gamepad2,  color: '#00e5ff', glow: 'rgba(0,229,255,0.18)' },
    { id: 'movies',   name: 'Movies',   subtitle: 'Blockbusters & Cinema', Icon: FilmIcon,  color: '#ff9500', glow: 'rgba(255,149,0,0.18)' },
    { id: 'tv-shows', name: 'TV Shows', subtitle: 'Prestige Serials',      Icon: Tv,        color: '#a78bfa', glow: 'rgba(167,139,250,0.18)' },
    { id: 'music',    name: 'Music',    subtitle: 'Global Hits & Tracks',  Icon: Music,     color: '#10b981', glow: 'rgba(16,185,129,0.18)' },
    { id: 'k-pop',    name: 'K-Pop',    subtitle: 'Idols & Comebacks',     Icon: Mic2,      color: '#ff2d55', glow: 'rgba(255,45,85,0.18)' },
    { id: 'comics',   name: 'Comics',   subtitle: 'Multiverse & Origins',  Icon: Zap,       color: '#facc15', glow: 'rgba(250,204,21,0.18)' },
    { id: 'manga',    name: 'Manga',    subtitle: 'Serialized Chapters',   Icon: BookOpen,  color: '#c084fc', glow: 'rgba(192,132,252,0.18)' }
  ];

  const handleCategorySelect = (catId) => {
    setCategorySheetOpen(false);
    navigate(`/category/${catId}`);
  };

  const isCategoryActive = location.pathname.startsWith('/category');

  // Close category sheet if resized above mobile breakpoint
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && categorySheetOpen) {
        setCategorySheetOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categorySheetOpen]);

  return (
    <>
      {/* Native App-Style Mobile Bottom Tab Bar */}
      <nav className="mobile-bottom-tab-bar" aria-label="Mobile Navigation">
        {/* Tab 1: Home */}
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `mobile-tab-btn ${isActive ? 'is-active' : ''}`}
        >
          <Home size={20} className="mobile-tab-icon" />
          <span className="mobile-tab-label">Home</span>
        </NavLink>

        {/* Tab 2: Categories (Sheet Trigger) */}
        <button
          type="button"
          onClick={() => setCategorySheetOpen(!categorySheetOpen)}
          className={`mobile-tab-btn ${isCategoryActive || categorySheetOpen ? 'is-active' : ''}`}
          aria-expanded={categorySheetOpen}
        >
          <Compass size={20} className="mobile-tab-icon" />
          <span className="mobile-tab-label">Realms</span>
        </button>

        {/* Tab 3: Trailers */}
        <NavLink 
          to="/media" 
          className={({ isActive }) => `mobile-tab-btn ${isActive ? 'is-active' : ''}`}
        >
          <Film size={20} className="mobile-tab-icon" />
          <span className="mobile-tab-label">Trailers</span>
        </NavLink>

        {/* Tab 4: Shop */}
        <NavLink 
          to="/shop" 
          className={({ isActive }) => `mobile-tab-btn ${isActive ? 'is-active' : ''}`}
        >
          <div className="mobile-tab-icon-wrap">
            <ShoppingBag size={20} className="mobile-tab-icon" />
            {cartCount > 0 && (
              <span className="mobile-tab-badge">{cartCount}</span>
            )}
          </div>
          <span className="mobile-tab-label">Vault</span>
        </NavLink>

        {/* Tab 5: Bookmarks / Saved */}
        <NavLink 
          to="/bookmarks" 
          className={({ isActive }) => `mobile-tab-btn ${isActive ? 'is-active' : ''}`}
        >
          <div className="mobile-tab-icon-wrap">
            <Bookmark size={20} className="mobile-tab-icon" />
            {bookmarks.length > 0 && (
              <span className="mobile-tab-badge">{bookmarks.length}</span>
            )}
          </div>
          <span className="mobile-tab-label">Saved</span>
        </NavLink>
      </nav>

      {/* Slide-Up Category Bottom Sheet */}
      {categorySheetOpen && (
        <div 
          className="mobile-sheet-backdrop"
          onClick={() => setCategorySheetOpen(false)}
        >
          <div 
            className="mobile-sheet-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Select Fandom Category"
          >
            {/* Sheet Handle */}
            <div className="mobile-sheet-drag-handle">
              <span className="drag-indicator-bar"></span>
            </div>

            {/* Sheet Header */}
            <div className="mobile-sheet-header">
              <div className="mobile-sheet-title-wrap">
                <Sparkles size={16} className="text-orange" />
                <h3 className="mobile-sheet-title">8 FANDOM REALMS</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setCategorySheetOpen(false)}
                className="mobile-sheet-close-btn"
                aria-label="Close categories"
              >
                <X size={18} />
              </button>
            </div>

            {/* Categories Grid */}
            <div className="mobile-sheet-grid">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleCategorySelect(c.id)}
                  className={`mobile-sheet-card ${location.pathname === `/category/${c.id}` ? 'is-current' : ''}`}
                  style={{ '--cat-color': c.color, '--cat-glow': c.glow }}
                >
                  <div className="mobile-sheet-icon" style={{ background: c.glow, color: c.color }}>
                    <c.Icon size={20} />
                  </div>
                  <div className="mobile-sheet-info">
                    <span className="mobile-sheet-name">{c.name}</span>
                    <span className="mobile-sheet-sub">{c.subtitle}</span>
                  </div>
                  <ChevronRight size={14} className="mobile-sheet-chevron" />
                </button>
              ))}
            </div>

            {/* Quick Portal Links Row */}
            <div className="mobile-sheet-portal-row">
              <button 
                type="button" 
                onClick={() => { setCategorySheetOpen(false); navigate('/calendar'); }} 
                className="mobile-sheet-portal-link"
              >
                <Calendar size={13} className="portal-link-icon" />
                <span>Schedule</span>
              </button>
              <button 
                type="button" 
                onClick={() => { setCategorySheetOpen(false); navigate('/about'); }} 
                className="mobile-sheet-portal-link"
              >
                <FileText size={13} className="portal-link-icon" />
                <span>Manifesto</span>
              </button>
              <button 
                type="button" 
                onClick={() => { setCategorySheetOpen(false); navigate('/contact'); }} 
                className="mobile-sheet-portal-link"
              >
                <Building2 size={13} className="portal-link-icon" />
                <span>Team HQ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
