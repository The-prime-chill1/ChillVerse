import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Bookmark, ShoppingBag, Music, Clock, Users,
  Menu, X, ChevronDown, User, Sparkles, Film, Calendar,
  Flame, Gamepad2, Film as FilmIcon, Tv, Mic2, Zap, BookOpen,
  Info, MapPin, Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BrandLogo from '../common/BrandLogo';

export default function Navbar() {
  const { 
    visitorCount, currentTime, cartCount, bookmarks, 
    setIsCartOpen, openModal, audioState, toggleAudioPlay, user, dummyLogout 
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

  return (
    <header className="navbar-wrapper">
      {/* Main Glass Navbar */}
      <nav className="main-navbar">
        <div className="container nav-content">
          {/* Logo */}
          <Link to="/" className="brand-logo-wrap" aria-label="CHILLVERSE Home">
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
                <span>7 Fandom Hubs</span>
                <ChevronDown size={13} className={`dropdown-arrow ${categoryDropdownOpen ? 'rotated' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="mega-dropdown-menu">
                  <div className="mega-dropdown-header">
                    <Sparkles size={13} className="text-orange" />
                    <span>EXPLORE THE 7 FANDOM REALMS</span>
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
            {/* Live Fan Presence & Real-Time Clock */}
            <div className="nav-live-indicator-pill" title="Global Fandom Network Status">
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

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="nav-search-wrap">
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


            {/* Shopping Cart Drawer Trigger */}
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
              <button 
                type="button"
                onClick={() => openModal('auth', {})}
                className="btn-signin-nav"
              >
                <User size={14} />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <Search size={16} className="text-secondary" />
              <input 
                type="text"
                placeholder="Search anime, games, lore..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input"
              />
              <button type="submit" className="btn-primary-fire">Search</button>
            </form>

            <div className="mobile-links-list">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                Home
              </Link>
              
              <div className="mobile-section-title">7 FANDOM REALMS</div>
              <div className="mobile-categories-grid">
                {categories.map(c => (
                  <Link
                    key={c.id}
                    to={`/category/${c.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-cat-pill"
                    style={{ borderColor: c.color + '40' }}
                  >
                    <c.Icon size={14} style={{ color: c.color }} />
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mobile-section-title">PORTAL EXPLORATION</div>
              <Link to="/media" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                <Film size={15} className="inline mr-2 text-orange" /> Trailers &amp; 4K Player
              </Link>
              <Link to="/calendar" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                <Calendar size={15} className="inline mr-2 text-cyan" /> Releases &amp; Schedule
              </Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                <ShoppingBag size={15} className="inline mr-2 text-amber" /> Merch Vault ({cartCount})
              </Link>
              <Link to="/bookmarks" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                <Bookmark size={15} className="inline mr-2 text-purple" /> Saved &amp; Notes ({bookmarks.length})
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                <Info size={15} className="inline mr-2 text-secondary" /> About Platform
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                <MapPin size={15} className="inline mr-2 text-secondary" /> Contact &amp; HQ
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
