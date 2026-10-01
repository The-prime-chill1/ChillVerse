import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Gamepad2, Film, Tv, Mic2, Zap, BookOpen } from 'lucide-react';

export default function CategoryPillars() {
  const realms = [
    {
      id: 'anime',
      name: 'Anime',
      japanese: 'アニメ',
      desc: 'Shonen battle epics, isekai odysseys, and ufotable/MAPPA visual masterpieces.',
      Icon: Flame,
      stat: '120+ Titles',
      color: '#ff3b30',
      bgImg: 'https://img.youtube.com/vi/f7T48i4WaP8/maxresdefault.jpg'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      japanese: 'ゲーム',
      desc: 'Action RPGs, competitive esports, dystopian open worlds, and Soulsborne lore.',
      Icon: Gamepad2,
      stat: '95+ Universes',
      color: '#00e5ff',
      bgImg: 'https://img.youtube.com/vi/bo4uH4701f8/maxresdefault.jpg'
    },
    {
      id: 'movies',
      name: 'Movies',
      japanese: '映画',
      desc: 'Sci-fi blockbusters, kaiju showdowns, cinematic sagas, and 4K trailer vaults.',
      Icon: Film,
      stat: '140+ Premieres',
      color: '#ff9500',
      bgImg: 'https://img.youtube.com/vi/Way9Dexny3w/maxresdefault.jpg'
    },
    {
      id: 'tv-shows',
      name: 'TV Shows',
      japanese: 'ドラマ',
      desc: 'Prestige serials, streaming thrillers, dark fantasies, and binge-worthy arcs.',
      Icon: Tv,
      stat: '85+ Series',
      color: '#5856d6',
      bgImg: 'https://img.youtube.com/vi/uLtkt8BonwM/maxresdefault.jpg'
    },
    {
      id: 'k-pop',
      name: 'K-Pop',
      japanese: '케이팝',
      desc: 'Global idols, electrifying comebacks, concert lightsticks, and choreography.',
      Icon: Mic2,
      stat: '60+ Groups',
      color: '#ff2d55',
      bgImg: 'https://img.youtube.com/vi/gdZLi9oWNZg/maxresdefault.jpg'
    },
    {
      id: 'comics',
      name: 'Comics',
      japanese: 'コミック',
      desc: 'Graphic novels, superhero multiverses, dark vigilantes, and indie chronicles.',
      Icon: Zap,
      stat: '75+ Arcs',
      color: '#ffcc00',
      bgImg: 'https://img.youtube.com/vi/cqGjhVJWtEg/maxresdefault.jpg'
    },
    {
      id: 'manga',
      name: 'Manga',
      japanese: 'マンガ',
      desc: 'Original serialized chapters, dark seinen masterpieces, and shonen debuts.',
      Icon: BookOpen,
      stat: '110+ Volumes',
      color: '#af52de',
      bgImg: 'https://img.youtube.com/vi/q15CRdE5Bv0/maxresdefault.jpg'
    }
  ];

  return (
    <section className="category-pillars-section">
      <div className="container">
        <div className="section-title-wrap text-center">
          <div className="section-eyebrow">
            <Sparkles size={14} className="text-orange" />
            <span>THE 7 SACRED FANDOM PILLARS</span>
          </div>
          <h2 className="section-main-heading">Explore Your Sanctuary</h2>
          <p className="section-sub-heading">
            Dive into dedicated, lore-rich category hubs loaded with character profiles, 4K media, and community breakdowns.
          </p>
        </div>

        <div className="pillars-grid">
          {realms.map((realm) => (
            <Link 
              key={realm.id} 
              to={`/category/${realm.id}`} 
              className="pillar-card"
              style={{ '--pillar-accent': realm.color }}
            >
              <div 
                className="pillar-bg-cover" 
                style={{ backgroundImage: `url(${realm.bgImg})` }}
              >
                <div className="pillar-overlay"></div>
              </div>

              <div className="pillar-card-content">
                <div className="pillar-top-row">
                  <span className="pillar-icon">
                    <realm.Icon size={24} />
                  </span>
                  <span className="pillar-stat-pill">{realm.stat}</span>
                </div>

                <div className="pillar-titles">
                  <span className="pillar-sub-jp">{realm.japanese}</span>
                  <h3 className="pillar-name">{realm.name}</h3>
                </div>

                <p className="pillar-desc">{realm.desc}</p>

                <div className="pillar-bottom-action">
                  <span>Enter Hub</span>
                  <ArrowRight size={16} className="pillar-arrow" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
