import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Gamepad2, Film, Tv, Mic2, Zap, BookOpen, Music as MusicIcon } from 'lucide-react';

export default function CategoryPillars() {
  const realms = [
    {
      id: 'anime',
      name: 'Anime',
      japanese: 'アニメ',
      desc: 'Shonen battle epics, isekai odysseys, and ufotable/MAPPA visual masterpieces.',
      Icon: Flame,
      stat: '100+ Titles',
      color: '#ff3b30',
      bgImg: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      japanese: 'ゲーム',
      desc: 'Action RPGs, competitive esports, dystopian open worlds, and Soulsborne lore.',
      Icon: Gamepad2,
      stat: '100+ Universes',
      color: '#00e5ff',
      bgImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/library_600x900.jpg'
    },
    {
      id: 'movies',
      name: 'Movies',
      japanese: '映画',
      desc: 'Sci-fi blockbusters, kaiju showdowns, cinematic sagas, and 4K trailer vaults.',
      Icon: Film,
      stat: '100+ Premieres',
      color: '#ff9500',
      bgImg: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg'
    },
    {
      id: 'tv-shows',
      name: 'TV Shows',
      japanese: 'ドラマ',
      desc: 'Prestige serials, streaming thrillers, dark fantasies, and binge-worthy arcs.',
      Icon: Tv,
      stat: '100+ Series',
      color: '#5856d6',
      bgImg: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'
    },
    {
      id: 'music',
      name: 'Music',
      japanese: '音楽',
      desc: 'Global chart-toppers, Billie Eilish hits, Grammy anthems, and audio previews.',
      Icon: MusicIcon,
      stat: '100+ Tracks',
      color: '#10b981',
      bgImg: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg'
    },
    {
      id: 'k-pop',
      name: 'K-Pop',
      japanese: '케이팝',
      desc: 'Global idols, electrifying comebacks, concert lightsticks, and choreography.',
      Icon: Mic2,
      stat: '100+ Groups',
      color: '#ff2d55',
      bgImg: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bf/d4/d2/bfd4d29e-2dbd-6395-5fa2-938b2513f572/22UMGIM78942.rgb.jpg/600x600bb.jpg'
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
