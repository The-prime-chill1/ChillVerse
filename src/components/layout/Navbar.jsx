import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Bookmark, ShoppingBag, Music, Clock, Users,
  Menu, X, ChevronDown, User, Sparkles, Film, Calendar,
  Flame, Gamepad2, Film as FilmIcon, Tv, Mic2, Zap, BookOpen,
  Info, MapPin, Radio, Plus, ChevronRight, Bot
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

            {/* Desktop Only: Shopping Cart Drawer Trigger */}
            <button 
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="action-icon-btn cart-btn nav-desktop-only"
              title="Open Collector Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="cart-badge-count">{cartCount}</span>
              )}
            </button>

            {/* Desktop Only: User Auth Button / Profile */}
            {user ? (
              <div className="user-profile-menu nav-desktop-only">
                <button 
                  type="button"
                  onClick={dummyLogout}
                  className="btn-signin-nav nav-desktop-only" 
                  title={`Signed in as ${user.username || 'Fan'}. Click to Sign Out.`}
                >
                  <User size={14} />
                  <span>{user.username || 'Fan'}</span>
                </button>
              </div>
            ) : (
              <button 
                type="button"
                onClick={() => openModal('auth', {})}
                className="btn-signin-nav nav-desktop-only"
              >
                <User size={14} />
                <span>Sign In</span>
              </button>
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

            {/* Primary Fandom Quick Actions: Sign In, Cart, ChillBot AI */}
            <div className="norse-quick-actions">
              {/* 1. Sign In / User Profile */}
              {user ? (
                <div className="drawer-quick-card drawer-user-card">
                  <div className="drawer-card-icon-wrap user-icon-wrap logged-in">
                    <User size={18} />
                  </div>
                  <div className="drawer-card-info">
                    <span className="drawer-card-title">{user.username || 'Fandom Member'}</span>
                    <span className="drawer-card-sub">VIP Fan Pass Active</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => { dummyLogout(); setMobileMenuOpen(false); }} 
                    className="drawer-logout-btn"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={() => { setMobileMenuOpen(false); openModal('auth', {}); }} 
                  className="drawer-quick-card drawer-auth-card"
                >
                  <div className="drawer-card-icon-wrap user-icon-wrap">
                    <User size={18} />
                  </div>
                  <div className="drawer-card-info">
                    <span className="drawer-card-title">Sign In / Join Fandom</span>
                    <span className="drawer-card-sub">Access your VIP fan vault</span>
                  </div>
                  <ChevronRight size={16} className="drawer-card-arrow" />
                </button>
              )}

              {/* 2. Shopping Cart Action */}
              <button 
                type="button" 
                onClick={() => { setMobileMenuOpen(false); setIsCartOpen(true); }} 
                className="drawer-quick-card drawer-cart-card"
              >
                <div className="drawer-card-icon-wrap cart-icon-wrap">
                  <ShoppingBag size={18} />
                </div>
                <div className="drawer-card-info">
                  <span className="drawer-card-title">Shopping Cart</span>
                  <span className="drawer-card-sub">
                    {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''} in cart` : 'Bag is empty'}
                  </span>
                </div>
                {cartCount > 0 ? (
                  <span className="drawer-pill-badge cart-count-pill">{cartCount}</span>
                ) : (
                  <span className="drawer-card-tag">Open</span>
                )}
              </button>

              {/* 3. ChillBot AI Assistant */}
              <button 
                type="button" 
                onClick={() => { setMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('open-chillbot')); }} 
                className="drawer-quick-card drawer-ai-card"
              >
                <div className="drawer-card-icon-wrap ai-icon-wrap">
                  <Bot size={18} />
                </div>
                <div className="drawer-card-info">
                  <span className="drawer-card-title">Ask ChillBot AI</span>
                  <span className="drawer-card-sub">Multiverse smart fandom guide</span>
                </div>
                <span className="drawer-pill-badge ai-badge-pill">24/7 AI</span>
              </button>
            </div>

            {/* Quick Rounded Search Input */}
            <form onSubmit={handleSearchSubmit} className="norse-search-bar">
              <Search size={15} className="norse-search-icon" />
              <input 
                type="text" 
                placeholder="Search anime, games, lore..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="norse-search-input"
              />
            </form>

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
              </Link>
              <Link to="/bookmarks" onClick={() => setMobileMenuOpen(false)} className="norse-nav-link">
                <Bookmark size={16} className="text-purple" />
                <span>Saved &amp; Watchlist</span>
                {bookmarks.length > 0 && <span className="norse-counter-pill">{bookmarks.length}</span>}
              </Link>
              <Link to="/calendar" onClick={() => setMobileMenuOpen(false)} className="norse-nav-link">
                <Calendar size={16} className="text-green" />
                <span>Releases Calendar</span>
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
