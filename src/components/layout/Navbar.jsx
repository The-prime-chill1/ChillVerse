import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Bookmark, ShoppingBag, Music, Clock, Users,
  Menu, X, ChevronDown, User, Sparkles, Film, Calendar,
  Flame, Gamepad2, Film as FilmIcon, Tv, Mic2, Zap, BookOpen,
  Info, MapPin, Radio, Plus, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BrandLogo from '../common/BrandLogo';

export default function Navbar() {
  const { 
    visitorCount, currentTime, cartCount, bookmarks, 
    setIsCartOpen, openModal, audioState, toggleAudio, user, dummyLogout 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { id: 'anime',    name: 'Anime',    subtitle: 'Shonen & Masterpieces', Icon: Flame,     color: '#ff3b30', glow: 'rgba(255,59,48,0.15)' },
    { id: 'gaming',   name: 'Gaming',   subtitle: 'RPGs & Esports Lore',   Icon: Gamepad2,  color: '#00e5ff', glow: 'rgba(0,229,255,0.15)' },
    { id: 'movies',   name: 'Movies',   subtitle: 'Blockbusters & Cinema', Icon: FilmIcon,  color: '#ff9500', glow: 'rgba(255,149,0,0.15)' },
    { id: 'tv-shows', name: 'TV Shows', subtitle: 'Prestige Serials',      Icon: Tv,        color: '#a78bfa', glow: 'rgba(167,139,250,0.15)' },
    { id: 'music',    name: 'Music',    subtitle: 'Global Hits & Billie Eilish', Icon: Music, color: '#10b981', glow: 'rgba(16,185,129,0.15)' },
    { id: 'k-pop',    name: 'K-Pop',    subtitle: 'Idols & Comebacks',     Icon: Mic2,      color: '#ff2d55', glow: 'rgba(255,45,85,0.15)' },
    { id: 'comics',   name: 'Comics',   subtitle: 'Multiverse & Origins',  Icon: Zap,       color: '#facc15', glow: 'rgba(250,204,21,0.15)' },
    { id: 'manga',    name: 'Manga',    subtitle: 'Serialized Chapters',   Icon: BookOpen,  color: '#c084fc', glow: 'rgba(192,132,252,0.15)' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Trailers', path: '/media' },
    { label: 'Releases', path: '/calendar' },
    { label: 'Merch Vault', path: '/shop' },
    { label: 'Saved', path: '/bookmarks', badge: bookmarks.length > 0 ? bookmarks.length : null },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  // Lock background scroll and hide background floating elements when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-nav-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-nav-open');
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`navbar-wrapper ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      {/* Main Glass Navbar */}
      <nav className="main-navbar">
        <div className="container nav-content">
          {/* Logo */}
          <Link to="/" className="brand-logo-wrap" aria-label="CHILLVERSE Home" onClick={() => setMobileMenuOpen(false)}>
            <BrandLogo height={38} showSubtitle={false} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}
            >
              <span>Home</span>
            </Link>

            {/* 7 Fandom Hubs Mega Dropdown */}
            <div 
              className="dropdown-container"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button 
                type="button"
                className={`nav-link dropdown-trigger ${location.pathname.startsWith('/category') ? 'active-link' : ''}`}
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                aria-expanded={categoryDropdownOpen}
              >
                <span>Categories</span>
                <ChevronDown size={13} className={`dropdown-arrow ${categoryDropdownOpen ? 'rotated' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="mega-dropdown-menu">
                  <div className="mega-dropdown-header">
                    <Sparkles size={13} className="text-orange" />
                    <span>EXPLORE THE 8 FANDOM REALMS</span>
                  </div>
                  <div className="dropdown-grid">
                    {categories.map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/category/${cat.id}`}
                        className="dropdown-item"
                        onClick={() => setCategoryDropdownOpen(false)}
                      >
                        <div 
                          className="cat-icon-badge" 
                          style={{ background: cat.glow, color: cat.color }}
                        >
                          <cat.Icon size={16} />
                        </div>
                        <div className="cat-info">
                          <span className="cat-name">{cat.name}</span>
                          <span className="cat-subtitle">{cat.subtitle}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            {navLinks.slice(1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active-link' : ''}`}
              >
                <span>{item.label}</span>
                {item.badge != null && (
                  <span className="nav-badge-pill">{item.badge}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Tools: Live Counter, Time, Search, Radio, Cart, User Profile */}
          <div className="nav-actions">
            {/* Live Fan Presence & Real-Time Clock - Desktop Only */}
            <div className="nav-live-indicator-pill nav-desktop-only" title="Global Fandom Network Status">
              <span className="pulse-indicator"></span>
              <span className="nav-live-badge-text">LIVE</span>
              <span className="nav-live-divider">•</span>
              <span className="nav-live-fans">
                <Users size={12} className="text-secondary inline mr-1" />
                <strong>{visitorCount}</strong> {visitorCount === 1 ? 'Fan' : 'Fans'}
              </span>
              <span className="nav-live-divider">•</span>
              <span className="nav-live-clock">
                <Clock size={12} className="text-cyan inline mr-1" />
                <span>{currentTime?.timeStr || '15:49:03'}</span>
              </span>
            </div>

            {/* Search Input - Desktop Only */}
            <form onSubmit={handleSearchSubmit} className="nav-search-wrap nav-desktop-only">
              <Search size={15} className="nav-search-icon" />
              <input 
                type="text" 
                placeholder="Search anime, games, lore..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nav-search-input"
              />
              <span className="nav-search-shortcut">/</span>
            </form>

            {/* Shopping Cart Drawer Trigger - Visible on Desktop & Mobile */}
            <button 
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="action-icon-btn cart-btn"
              title="Open Collector Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="cart-badge-count">{cartCount}</span>
              )}
            </button>

            {/* User Auth Button / Profile Icon */}
            {user ? (
              <div className="user-profile-menu">
                <button 
                  type="button"
                  onClick={dummyLogout}
                  className="user-avatar-icon-btn" 
                  title={`Signed in as ${user.username || 'Fan'}. Click to Sign Out.`}
                >
                  <User size={18} />
                </button>
              </div>
            ) : (
              <>
                <button 
                  type="button"
                  onClick={() => openModal('auth', {})}
                  className="btn-signin-nav nav-desktop-only"
                >
                  <User size={14} />
                  <span>Sign In</span>
                </button>
                <button 
                  type="button"
                  onClick={() => openModal('auth', {})}
                  className="action-icon-btn mobile-signin-icon-btn"
                  title="Sign In to CHILLVERSE"
                  aria-label="Sign In"
                >
                  <User size={18} />
                </button>
              </>
            )}

            {/* Mobile Hamburger Toggle - Visible on Mobile */}
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay (Norse Star / Linear Sleek Design) */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <aside 
            className="mobile-nav-norse-panel" 
            onClick={(e) => e.stopPropagation()} 
            role="dialog" 
            aria-label="Mobile Navigation"
          >
            {/* Header: Brand Logo & Close Action */}
            <div className="norse-drawer-header">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="norse-brand-wrap">
                <BrandLogo height={32} />
              </Link>
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(false)} 
                className="norse-close-btn"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mobile Auth Profile / Sign In Banner */}
            <div className="norse-auth-section">
              {user ? (
                <div className="norse-user-card">
                  <div className="norse-user-avatar">
                    <User size={18} className="text-cyan" />
                  </div>
                  <div className="norse-user-info">
                    <span className="norse-user-name">{user.username || 'Fandom Member'}</span>
                    <span className="norse-user-badge">VIP Fan Pass</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => { dummyLogout(); setMobileMenuOpen(false); }} 
                    className="norse-logout-pill"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={() => { setMobileMenuOpen(false); openModal('auth', {}); }} 
                  className="norse-signin-full-btn"
                >
                  <User size={16} />
                  <span>Sign In / Join Fandom</span>
                </button>
              )}
            </div>

            {/* Quick Rounded Search Input */}
            <form onSubmit={handleSearchSubmit} className="norse-search-bar">
              <Search size={15} className="norse-search-icon" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="norse-search-input"
              />
            </form>

            {/* Quick Action Button: + Explore 4K Player */}
            <button 
              type="button" 
              onClick={() => { setMobileMenuOpen(false); navigate('/media'); }} 
              className="norse-action-btn"
            >
              <div className="norse-plus-circle">
                <Plus size={14} />
              </div>
              <span>Explore 4K Stream</span>
            </button>

            {/* Top Navigation Items */}
            <div className="norse-nav-group">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="norse-nav-link">
                <Sparkles size={16} className="text-orange" />
                <span>Home Sanctuary</span>
              </Link>
              <Link to="/media" onClick={() => setMobileMenuOpen(false)} className="norse-nav-link">
                <Film size={16} className="text-cyan" />
                <span>4K Trailers &amp; Cinema</span>
              </Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="norse-nav-link">
                <ShoppingBag size={16} className="text-amber" />
                <span>Collector Vault</span>
                {cartCount > 0 && <span className="norse-counter-pill">{cartCount}</span>}
              </Link>
              <Link to="/bookmarks" onClick={() => setMobileMenuOpen(false)} className="norse-nav-link">
                <Bookmark size={16} className="text-purple" />
                <span>Saved &amp; Watchlist</span>
                {bookmarks.length > 0 && <span className="norse-counter-pill">{bookmarks.length}</span>}
              </Link>
            </div>

            {/* Section: PINNED REALMS */}
            <div className="norse-section-header">
              <span>PINNED REALMS</span>
            </div>
            <div className="norse-pinned-list">
              {categories.map(c => (
                <Link
                  key={c.id}
                  to={`/category/${c.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="norse-pinned-item"
                >
                  <div className="norse-pinned-left">
                    <c.Icon size={16} style={{ color: c.color }} />
                    <span className="norse-item-label">{c.name}</span>
                  </div>
                  <ChevronRight size={14} className="norse-chevron" />
                </Link>
              ))}
            </div>

            {/* Section: RECENTS & TRENDING */}
            <div className="norse-section-header">
              <span>TRENDING TODAY</span>
            </div>
            <div className="norse-recents-list">
              <div 
                className="norse-recent-item is-featured-pill"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('trailer', {
                    id: 'mus-davido-001',
                    title: 'Unavailable (feat. Musa Keys)',
                    artist: 'Davido',
                    youtubeId: '5j5E7fE1bA4',
                    category: 'music'
                  });
                }}
              >
                <div className="norse-recent-dot pulse"></div>
                <span className="norse-recent-text">Davido - Unavailable (Afrobeats)</span>
              </div>

              <div 
                className="norse-recent-item"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('trailer', {
                    id: 'mov-spider-verse',
                    title: 'Spider-Man: Across the Spider-Verse',
                    youtubeId: 'cqGjhVJWtEg',
                    category: 'movies'
                  });
                }}
              >
                <span className="norse-recent-text">Spider-Man: Across the Spider-Verse</span>
              </div>

              <div 
                className="norse-recent-item"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('trailer', {
                    id: 'mov-deadpool-wolverine',
                    title: 'Deadpool & Wolverine',
                    youtubeId: '73_1biulkYk',
                    category: 'movies'
                  });
                }}
              >
                <span className="norse-recent-text">Deadpool &amp; Wolverine 4K</span>
              </div>

              <div 
                className="norse-recent-item"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('trailer', {
                    id: 'ani-0001',
                    title: 'Demon Slayer: Kimetsu no Yaiba',
                    youtubeId: 'VQGCKyvzIM4',
                    category: 'anime'
                  });
                }}
              >
                <span className="norse-recent-text">Demon Slayer: Infinity Castle</span>
              </div>

              <div 
                className="norse-recent-item"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('trailer', {
                    id: 'game-0001',
                    title: 'Elden Ring',
                    youtubeId: 'bo4uH4701f8',
                    category: 'gaming'
                  });
                }}
              >
                <span className="norse-recent-text">Elden Ring Shadow of the Erdtree</span>
              </div>
            </div>

          </aside>
        </div>
      )}
    </header>
  );
}
