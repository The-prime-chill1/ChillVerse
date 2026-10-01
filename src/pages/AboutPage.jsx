import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Globe, Shield, Zap, 
  Palette, BookOpen, Layers, Radio, CheckCircle2,
  ArrowRight, Mail, Star, Building2, Phone, Award
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function AboutPage() {
  const stats = [
    { label: 'Sacred Fandom Realms', value: '7', change: 'Fully Unified' },
    { label: 'Archived Titles & Media', value: '1,200+', change: 'Curated Lore' },
    { label: 'Live Active Network', value: '140K+', change: 'Global Reach' },
    { label: 'Client Routing Latency', value: '0.0s', change: 'Instant Load' }
  ];

  const pillars = [
    {
      Icon: Globe,
      title: '7 Fandom Ecosystems in One',
      desc: 'Centralizing Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga into a cohesive, distraction-free pop culture universe.',
      tag: 'Universal Portal'
    },
    {
      Icon: Palette,
      title: 'Obsidian Cyber Lumina Design',
      desc: 'An immersive, high-contrast dark-mode interface built with fluid glassmorphism and modern aesthetics that put media content center-stage.',
      tag: 'Visual Identity'
    },
    {
      Icon: BookOpen,
      title: 'Encyclopedic Canon Lore',
      desc: 'Comprehensive character pantheons, canon timelines, official 4K video showcases, and rich multimedia vaults curated for true enthusiasts.',
      tag: 'Curated Content'
    },
    {
      Icon: Zap,
      title: 'Lightning-Fast Experience',
      desc: 'Engineered for zero-lag streaming trailers, instant page transitions, live synchronized active fans, and integrated intelligent assistance.',
      tag: 'High Performance'
    }
  ];

  return (
    <div className="about-page-layout">
      <Breadcrumbs items={[{ label: 'About Platform', path: '/about' }]} />

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-glow"></div>
        <div className="container about-hero-container">
          <div className="section-eyebrow">
            <Sparkles size={14} className="text-orange" />
            <span>ENGINEERED BY CHILLTECH LTD. • PLATFORM OVERVIEW</span>
          </div>
          <h1 className="about-hero-title">Where 7 Fandom Universes <span className="gradient-text-fire">Converge</span></h1>
          <p className="about-hero-subtitle">
            CHILLVERSE is the definitive centralized digital sanctuary for modern pop culture—uniting Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga into a hyper-fast, beautifully crafted entertainment portal.
          </p>

          <div className="about-stats-grid">
            {stats.map((s, idx) => (
              <div key={idx} className="about-stat-card">
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
                <span className="about-stat-change">{s.change}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is CHILLVERSE */}
      <section className="about-section py-5">
        <div className="container">
          <div className="section-title-wrap text-center">
            <div className="section-eyebrow">
              <Layers size={13} className="text-cyan" />
              <span>THE CHILLVERSE EXPERIENCE</span>
            </div>
            <h2 className="section-main-heading">Built for the Modern Enthusiast</h2>
            <p className="section-sub-heading">
              Every pixel, interaction, and data structure has been engineered from the ground up for speed, visual clarity, and fandom reverence.
            </p>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((p, i) => (
              <div key={i} className="about-pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-box">
                    <p.Icon size={22} className="text-orange" />
                  </div>
                  <span className="pillar-tag">{p.tag}</span>
                </div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Operator: ChillTech Ltd. */}
      <section className="about-section py-5">
        <div className="container">
          <div className="section-title-wrap text-center">
            <div className="section-eyebrow">
              <Building2 size={13} className="text-orange" />
              <span>THE COMPANY BEHIND CHILLVERSE</span>
            </div>
            <h2 className="section-main-heading">ChillTech Ltd.</h2>
            <p className="section-sub-heading">
              CHILLVERSE is conceptualized, developed, and operated exclusively by ChillTech Ltd.—an independent digital media and software studio dedicated to modern entertainment experiences.
            </p>
          </div>

          <div className="company-showcase-card">
            <div className="company-showcase-grid">
              <div className="company-main-col">
                <div className="company-brand-badge">
                  <div className="brand-logo-symbol">
                    <span>CT</span>
                  </div>
                  <div>
                    <h3 className="company-title">ChillTech Ltd.</h3>
                    <p className="company-meta">Creator & Operator of CHILLVERSE</p>
                  </div>
                </div>

                <p className="company-description">
                  ChillTech Ltd. is an independent software technology enterprise committed to building unified, blazing-fast, and ad-free entertainment portals. We believe digital pop culture deserves a sanctuary where fans can explore lore, watch trailers, and follow their passions in an elegant, state-of-the-art dark interface.
                </p>

                <div className="company-core-values">
                  <div className="value-chip">
                    <CheckCircle2 size={15} className="text-cyan" />
                    <span>Independent Technology Studio</span>
                  </div>
                  <div className="value-chip">
                    <CheckCircle2 size={15} className="text-cyan" />
                    <span>Zero Intrusive Adverts</span>
                  </div>
                  <div className="value-chip">
                    <CheckCircle2 size={15} className="text-cyan" />
                    <span>High-Performance Media Streaming</span>
                  </div>
                  <div className="value-chip">
                    <CheckCircle2 size={15} className="text-cyan" />
                    <span>Continuous Platform Innovation</span>
                  </div>
                </div>
              </div>

              <div className="company-contact-col">
                <div className="company-contact-box">
                  <h4 className="contact-box-title">Executive Leadership & Contact</h4>
                  <p className="contact-box-desc">
                    Direct communications for partnerships, media inquiries, or official support with ChillTech Ltd.
                  </p>

                  <div className="company-contact-list">
                    <div className="company-contact-item">
                      <span className="contact-item-label">Chief Executive Officer (CEO)</span>
                      <span className="contact-item-value">Lamidi Abdulhameed Olawale</span>
                    </div>

                    <div className="company-contact-item">
                      <span className="contact-item-label">Official Email</span>
                      <a href="mailto:lamidiabdulhameedolawale@gmail.com" className="contact-item-link" title="lamidiabdulhameedolawale@gmail.com">
                        <Mail size={14} className="text-orange" style={{ flexShrink: 0 }} />
                        <span>lamidiabdulhameedolawale@gmail.com</span>
                      </a>
                    </div>

                    <div className="company-contact-item">
                      <span className="contact-item-label">Telephone / WhatsApp</span>
                      <a href="tel:+2349137632195" className="contact-item-link">
                        <Phone size={14} className="text-cyan" style={{ flexShrink: 0 }} />
                        <span>+234 913 763 2195</span>
                      </a>
                    </div>

                    <div className="company-contact-item">
                      <span className="contact-item-label">Entity Status</span>
                      <span className="contact-item-status">
                        <span className="status-dot"></span>
                        Active & Operating Globally
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Manifesto & CTA */}
      <section className="about-manifesto-section my-5">
        <div className="container">
          <div className="manifesto-card">
            <div className="manifesto-eyebrow">
              <Star size={14} className="text-orange" />
              <span>PLATFORM VISION</span>
            </div>
            <blockquote className="manifesto-quote">
              "We believe entertainment communities deserve better than fragmented wikis, noisy ad banners, and slow streaming storefronts. CHILLVERSE was built to set a new standard for modern fandom portals: lightning fast, gorgeously styled, and deeply respectful of the lore we all love."
            </blockquote>
            <div className="manifesto-author">
              <strong>Lamidi Abdulhameed Olawale</strong> — CEO, ChillTech Ltd.
            </div>

            <div className="manifesto-cta-row">
              <Link to="/" className="btn-primary-fire">
                <span>Explore CHILLVERSE</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-glass">
                <span>Contact ChillTech Ltd.</span>
                <Mail size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
