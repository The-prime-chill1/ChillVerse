import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Flame, Gamepad2, Film, Tv, Mic2, Zap, BookOpen, 
  Mail, Phone, Building2, Radio, Globe, ShieldCheck, Clock, Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BrandLogo from '../common/BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { visitorCount, currentTime } = useApp();

  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        {/* Top Brand Section */}
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo-link" aria-label="CHILLVERSE Home">
              <BrandLogo height={46} showSubtitle={true} />
            </Link>
            <p className="footer-brand-desc">
              The premier centralized entertainment hub uniting Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga into a single distraction-free digital sanctuary.
            </p>
            <div className="footer-powered-badge">
              <Sparkles size={14} className="text-orange" />
              <span>Created & Operated by <strong>ChillTech Ltd.</strong></span>
            </div>
          </div>

          {/* 7 Fandom Categories */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">7 Fandom Realms</h4>
            <ul className="footer-links-list">
              <li><Link to="/category/anime" className="flex items-center gap-2"><Flame size={14} className="text-orange" /> Anime Universe</Link></li>
              <li><Link to="/category/gaming" className="flex items-center gap-2"><Gamepad2 size={14} className="text-cyan" /> Gaming Sanctuary</Link></li>
              <li><Link to="/category/movies" className="flex items-center gap-2"><Film size={14} className="text-orange" /> Blockbuster Movies</Link></li>
              <li><Link to="/category/tv-shows" className="flex items-center gap-2"><Tv size={14} className="text-purple" /> Prestige TV Shows</Link></li>
              <li><Link to="/category/k-pop" className="flex items-center gap-2"><Mic2 size={14} className="text-red" /> K-Pop Idol Zone</Link></li>
              <li><Link to="/category/comics" className="flex items-center gap-2"><Zap size={14} className="text-amber" /> Comic Book Multiverse</Link></li>
              <li><Link to="/category/manga" className="flex items-center gap-2"><BookOpen size={14} className="text-purple" /> Manga Chronicles</Link></li>
            </ul>
          </div>

          {/* Quick Portal Features */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Portal Features</h4>
            <ul className="footer-links-list">
              <li><Link to="/media">4K Trailers & Player</Link></li>
              <li><Link to="/calendar">Releases & Watch Parties</Link></li>
              <li><Link to="/shop">Merch Vault & Session Bag</Link></li>
              <li><Link to="/bookmarks">Bookmarks & Personal Vault</Link></li>
              <li><Link to="/search">Global Fandom Search</Link></li>
              <li><Link to="/about">About Platform</Link></li>
              <li><Link to="/contact">Contact Leadership</Link></li>
            </ul>
          </div>

          {/* Operator: ChillTech Ltd. */}
          <div className="footer-links-col footer-operator-col">
            <h4 className="footer-col-title">ChillTech Ltd.</h4>
            <p className="footer-operator-meta">
              Independent digital media laboratory & fandom software enterprise.
            </p>
            <div className="footer-contact-info">
              <p className="footer-ceo-line">
                <span className="text-muted text-xs">CEO: </span>
                <strong className="text-white">Lamidi Abdulhameed Olawale</strong>
              </p>
              <a href="mailto:lamidiabdulhameedolawale@gmail.com" className="footer-contact-link" title="lamidiabdulhameedolawale@gmail.com">
                <Mail size={13} className="text-orange" style={{ flexShrink: 0 }} />
                <span>lamidiabdulhameedolawale@gmail.com</span>
              </a>
              <a href="tel:+2349137632195" className="footer-contact-link">
                <Phone size={13} className="text-cyan" style={{ flexShrink: 0 }} />
                <span>+234 913 763 2195</span>
              </a>
            </div>

            <div className="footer-live-status-pill">
              <div className="footer-live-count">
                <span className="pulse-indicator"></span>
                <span><strong>{visitorCount}</strong> {visitorCount === 1 ? 'Live Fan' : 'Live Fans'} Online</span>
              </div>
              <span className="footer-time-sep">•</span>
              <div className="footer-live-clock">
                <Clock size={12} className="text-cyan" />
                <span>{currentTime?.timeStr || '15:17:33'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {currentYear} <strong>CHILLVERSE</strong> • Engineered by <strong>ChillTech Ltd.</strong> • All rights reserved.
          </div>
          <div className="footer-sub-links">
            <Link to="/about">About Platform</Link>
            <span className="divider">•</span>
            <Link to="/contact">Contact Support</Link>
            <span className="divider">•</span>
            <Link to="/media">4K Player</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
