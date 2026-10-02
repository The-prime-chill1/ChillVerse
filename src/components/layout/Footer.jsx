import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Flame, Gamepad2, Film, Tv, Mic2, Zap, BookOpen, Music,
  Mail, Phone, Send, CheckCircle2, ShieldCheck, Heart
} from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        {/* Top Brand Section */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo-link" aria-label="CHILLVERSE Home">
              <BrandLogo height={44} showSubtitle={true} />
            </Link>
            <p className="footer-brand-desc">
              The premier centralized entertainment hub uniting Anime, Gaming, Movies, TV Shows, Music, K-Pop, Comics, and Manga into a single distraction-free digital sanctuary.
            </p>

            {/* Newsletter Dispatch */}
            <div className="footer-newsletter-wrap">
              <span className="footer-newsletter-title">FANDOM DISPATCH</span>
              <p className="footer-newsletter-sub">Get weekly drop alerts, trailer releases &amp; vault updates.</p>
              {newsletterSubscribed ? (
                <div className="footer-newsletter-success">
                  <CheckCircle2 size={16} className="text-cyan" />
                  <span>Welcome to the Inner Sanctum! Dispatch confirmed.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
                  <input 
                    type="email"
                    placeholder="Enter fan email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="footer-newsletter-input"
                  />
                  <button type="submit" className="footer-newsletter-btn" aria-label="Subscribe">
                    <Send size={14} />
                    <span>Join</span>
                  </button>
                </form>
              )}
            </div>

            <div className="footer-powered-badge">
              <Sparkles size={14} className="text-orange" />
              <span>Created &amp; Operated by <a href="https://chilltechltd.com" target="_blank" rel="noopener noreferrer" className="footer-chilltech-link" title="Visit ChillTech Ltd. Official Website"><strong>ChillTech Ltd.</strong> ↗</a></span>
            </div>
          </div>

          {/* 8 Fandom Realms */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">8 Fandom Realms</h4>
            <ul className="footer-links-list">
              <li><Link to="/category/anime" className="flex items-center gap-2"><Flame size={14} className="text-orange" /> Anime Universe</Link></li>
              <li><Link to="/category/gaming" className="flex items-center gap-2"><Gamepad2 size={14} className="text-cyan" /> Gaming Sanctuary</Link></li>
              <li><Link to="/category/movies" className="flex items-center gap-2"><Film size={14} className="text-orange" /> Blockbuster Movies</Link></li>
              <li><Link to="/category/tv-shows" className="flex items-center gap-2"><Tv size={14} className="text-purple" /> Prestige TV Shows</Link></li>
              <li><Link to="/category/music" className="flex items-center gap-2"><Music size={14} className="text-cyan" /> Music Sanctuary</Link></li>
              <li><Link to="/category/k-pop" className="flex items-center gap-2"><Mic2 size={14} className="text-red" /> K-Pop Idol Zone</Link></li>
              <li><Link to="/category/comics" className="flex items-center gap-2"><Zap size={14} className="text-amber" /> Comic Book Multiverse</Link></li>
              <li><Link to="/category/manga" className="flex items-center gap-2"><BookOpen size={14} className="text-purple" /> Manga Chronicles</Link></li>
            </ul>
          </div>

          {/* Quick Portal Features */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Portal Vault</h4>
            <ul className="footer-links-list">
              <li><Link to="/media">4K Trailers &amp; Cinema Player</Link></li>
              <li><Link to="/calendar">Releases &amp; Watch Parties</Link></li>
              <li><Link to="/shop">Merch Vault &amp; Session Bag</Link></li>
              <li><Link to="/bookmarks">Bookmarks &amp; Personal Vault</Link></li>
              <li><Link to="/search">Global Fandom Search</Link></li>
              <li><Link to="/about">About Platform &amp; Manifesto</Link></li>
              <li><Link to="/contact">Contact Leadership HQ</Link></li>
            </ul>
          </div>

          {/* Operator: ChillTech Ltd. */}
          <div className="footer-links-col footer-operator-col">
            <h4 className="footer-col-title">
              <a href="https://chilltechltd.com" target="_blank" rel="noopener noreferrer" className="footer-chilltech-heading-link" title="Visit ChillTech Ltd. Official Website">
                ChillTech Ltd. HQ ↗
              </a>
            </h4>
            <p className="footer-operator-meta">
              Independent digital media laboratory &amp; fandom software enterprise powering the next generation of entertainment discovery.
            </p>
            <div className="footer-contact-info">
              <p className="footer-ceo-line">
                <span className="text-muted text-xs">CEO &amp; Founder: </span>
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
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {currentYear} <strong>CHILLVERSE</strong> • Engineered with <Heart size={12} className="inline text-red mx-1" fill="#ff3b30" /> by <a href="https://chilltechltd.com" target="_blank" rel="noopener noreferrer" className="footer-chilltech-link"><strong>ChillTech Ltd.</strong></a> • All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
