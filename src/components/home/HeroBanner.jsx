import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Star, Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HeroBanner() {
  const { openModal, isBookmarked, toggleBookmark } = useApp();

  const heroSlides = [
    {
      id: 'mov-rampage',
      title: 'RAMPAGE',
      subtitle: 'BIGGER MEETS BIGGER',
      category: 'Movies',
      backdrop: 'https://img.youtube.com/vi/coOKvrsmQiI/maxresdefault.jpg',
      youtubeId: 'coOKvrsmQiI',
      duration: '1h 47m',
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      rating: '8.5',
      description: 'When three different animals become infected with a dangerous pathogen, a primatologist and a geneticist team up to stop them from destroying Chicago.',
      tags: ['blockbuster', 'action', 'dwayne johnson']
    },
    {
      id: 'mov-rebel-ridge',
      title: 'REBEL RIDGE',
      subtitle: 'NETFLIX ORIGINAL THRILLER',
      category: 'Movies',
      backdrop: 'https://img.youtube.com/vi/Qp49X0_36jU/maxresdefault.jpg',
      youtubeId: 'Qp49X0_36jU',
      duration: '2h 11m',
      genres: ['Action', 'Crime', 'Thriller'],
      rating: '9.7',
      description: 'An ex-Marine navigates his way through the murky waters of small-town corruption when an attempt to post bail for his cousin escalates into a violent standoff.',
      tags: ['netflix', 'trending', 'action thriller']
    },
    {
      id: 'mov-deadpool-wolverine',
      title: 'DEADPOOL & WOLVERINE',
      subtitle: 'THE ULTIMATE MARVEL TEAM-UP',
      category: 'Movies',
      backdrop: 'https://img.youtube.com/vi/73_1biulkYk/maxresdefault.jpg',
      youtubeId: '73_1biulkYk',
      duration: '2h 08m',
      genres: ['Action', 'Comedy', 'Superhero'],
      rating: '9.9',
      description: 'Wade Wilson and Logan join forces to protect the multiverse from catastrophic collapse in an irreverent, hyper-violent, fourth-wall breaking crusade.',
      tags: ['marvel', 'blockbuster', 'mcu']
    },
    {
      id: 'game-0001',
      title: 'ELDEN RING',
      subtitle: 'SHADOW OF THE ERDTREE',
      category: 'Gaming',
      backdrop: 'https://img.youtube.com/vi/bo4uH4701f8/maxresdefault.jpg',
      youtubeId: 'bo4uH4701f8',
      duration: '40h+ Campaign',
      genres: ['Dark Fantasy', 'Action RPG', 'Souls-like'],
      rating: '9.9',
      description: 'Guided by Empyrean Miquella, the Tarnished enters the Land of Shadow, unravelling dark secrets beneath the suffocating canopy of the Scadutree.',
      tags: ['fromsoftware', 'goty', 'rpg']
    },
    {
      id: 'mov-dune-2',
      title: 'DUNE: PART TWO',
      subtitle: 'THE PROPHECY AWAKENS',
      category: 'Movies',
      backdrop: 'https://img.youtube.com/vi/Way9Dexny3w/maxresdefault.jpg',
      youtubeId: 'Way9Dexny3w',
      duration: '2h 46m',
      genres: ['Sci-Fi', 'Adventure', 'Drama'],
      rating: '9.8',
      description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family in a visionary sci-fi epic.',
      tags: ['sci-fi', 'denis villeneuve', '4k']
    },
    {
      id: 'game-gta-6',
      title: 'GRAND THEFT AUTO VI',
      subtitle: 'VICE CITY REBORN',
      category: 'Gaming',
      backdrop: 'https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg',
      youtubeId: 'QdBZY2fkU-0',
      duration: '100h+ Open World',
      genres: ['Action', 'Open World', 'Crime'],
      rating: '10.0',
      description: 'Lucia and Jason descend into the neon-lit criminal underworld of Vice City and the sprawling state of Leonida in Rockstar Games most ambitious open world ever created.',
      tags: ['rockstar', 'open world', 'vice city']
    },
    {
      id: 'ani-0001',
      title: 'DEMON SLAYER',
      subtitle: 'HASHIRA TRAINING & INFINITY CASTLE',
      category: 'Anime',
      backdrop: 'https://img.youtube.com/vi/VQGCKyvzIM4/maxresdefault.jpg',
      youtubeId: 'VQGCKyvzIM4',
      duration: 'Season 4 • 4K HDR',
      genres: ['Action', 'Supernatural', 'Dark Fantasy'],
      rating: '9.8',
      description: 'Tanjiro and the Hashira undergo grueling physical trials to awaken the Demon Slayer Mark as the final battle against Muzan Kibutsuji looms inside the Infinity Castle.',
      tags: ['ufotable', 'shonen', 'anime']
    },
    {
      id: 'ser-squid-game-2',
      title: 'SQUID GAME: SEASON 2',
      subtitle: 'THE REAL GAME HAS JUST BEGUN',
      category: 'TV Shows',
      backdrop: 'https://img.youtube.com/vi/lQBmZBJTN4g/maxresdefault.jpg',
      youtubeId: 'lQBmZBJTN4g',
      duration: 'Season 2 • Netflix',
      genres: ['Survival Thriller', 'Mystery', 'Drama'],
      rating: '9.9',
      description: 'Player 456 Seong Gi-hun returns with a burning vow of vengeance, diving back into the deadly survival competition to dismantle the shadowy organization from within.',
      tags: ['netflix', 'k-drama', 'survival']
    },
    {
      id: 'mov-extraction-2',
      title: 'EXTRACTION 2',
      subtitle: 'BACK FROM THE BRINK OF DEATH',
      category: 'Movies',
      backdrop: 'https://img.youtube.com/vi/Y274jZs5s7s/maxresdefault.jpg',
      youtubeId: 'Y274jZs5s7s',
      duration: '2h 03m',
      genres: ['Action', 'Thriller'],
      rating: '9.6',
      description: 'Barely surviving his grievous wounds in Bangladesh, black ops mercenary Tyler Rake launches into another lethal clandestine mission behind enemy lines.',
      tags: ['netflix', 'action', 'chris hemsworth']
    },
    {
      id: 'ani-0002',
      title: 'JUJUTSU KAISEN',
      subtitle: 'SHIBUYA INCIDENT ARC',
      category: 'Anime',
      backdrop: 'https://img.youtube.com/vi/f7T48i4WaP8/maxresdefault.jpg',
      youtubeId: 'f7T48i4WaP8',
      duration: 'Season 2 • 23 Eps',
      genres: ['Action', 'Supernatural', 'Dark Fantasy'],
      rating: '9.9',
      description: 'On Halloween night in Shibuya, special grade curse users execute an intricate barrier plan to seal Satoru Gojo, triggering a catastrophic city-wide sorcerer showdown.',
      tags: ['mappa', 'shonen', 'sorcery']
    },
    {
      id: 'mov-gladiator-2',
      title: 'GLADIATOR II',
      subtitle: 'WHAT WE DO IN LIFE ECHOES IN ETERNITY',
      category: 'Movies',
      backdrop: 'https://img.youtube.com/vi/4rgYUipGJNo/maxresdefault.jpg',
      youtubeId: '4rgYUipGJNo',
      duration: '2h 28m',
      genres: ['Action', 'Drama', 'Epic History'],
      rating: '9.7',
      description: 'Lucius enters the Colosseum after his homeland is conquered by the tyrannical Emperors who now lead Rome with an iron fist, seeking glory and redemption.',
      tags: ['cinema', 'ridley scott', 'epic']
    },
    {
      id: 'mov-carry-on',
      title: 'CARRY-ON',
      subtitle: 'NETFLIX HIGH-OCTANE SUSPENSE',
      category: 'Movies',
      backdrop: 'https://img.youtube.com/vi/y4vN_4Y9bK4/maxresdefault.jpg',
      youtubeId: 'y4vN_4Y9bK4',
      duration: '1h 59m',
      genres: ['Action', 'Mystery', 'Thriller'],
      rating: '9.5',
      description: 'A young TSA agent fights to outsmart a mysterious traveler who blackmails him into letting a dangerous package slip through security onto a Christmas Day flight.',
      tags: ['netflix', 'suspense', 'holiday thriller']
    },
    {
      id: 'mov-furiosa',
      title: 'FURIOSA: A MAD MAX SAGA',
      subtitle: 'OUT OF THE WASTELAND',
      category: 'Movies',
      backdrop: 'https://img.youtube.com/vi/XJMuhwVlca4/maxresdefault.jpg',
      youtubeId: 'XJMuhwVlca4',
      duration: '2h 28m',
      genres: ['Action', 'Sci-Fi', 'Post-Apocalyptic'],
      rating: '9.6',
      description: 'As the world falls, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus.',
      tags: ['george miller', 'mad max', 'wasteland']
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const slide = heroSlides[activeIdx];
  const bookmarked = isBookmarked(slide.id);

  // Auto-play hero slider every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="hero-billboard-section">
      {/* Background Cinematic Image with Gradients */}
      <div 
        className="hero-backdrop-image"
        style={{ backgroundImage: `url(${slide.backdrop})` }}
      >
        <div className="hero-gradient-overlay"></div>
        <div className="hero-bottom-fade"></div>
      </div>

      <div className="container hero-content-container">
        <div className="hero-info-box">
          {/* Category & Duration Row */}
          <div className="hero-meta-badges">
            <span className="badge badge-red">{slide.category}</span>
            <span className="hero-meta-item">
              <Clock size={13} className="inline mr-1" />
              {slide.duration}
            </span>
            <div className="hero-stars">
              <Star size={14} fill="#ffb300" color="#ffb300" />
              <span className="rating-num">{slide.rating}</span>
            </div>
            {slide.genres.map((g, i) => (
              <span key={i} className="hero-genre-pill">{g}</span>
            ))}
          </div>

          {/* Titles */}
          <h1 className="hero-main-title">{slide.title}</h1>
          <h3 className="hero-sub-title">{slide.subtitle}</h3>

          {/* Description */}
          <p className="hero-description-text">{slide.description}</p>

          {/* Action Buttons: Watch Trailer & Add to List */}
          <div className="hero-action-buttons">
            <button 
              onClick={() => openModal('trailer', slide)}
              className="btn-hero-watch"
            >
              <Play size={18} fill="white" />
              <span>WATCH TRAILER</span>
            </button>

            <button 
              onClick={() => toggleBookmark(slide)}
              className={`btn-hero-list ${bookmarked ? 'in-list' : ''}`}
            >
              {bookmarked ? (
                <>
                  <Check size={18} />
                  <span>IN MY LIST</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>ADD TO LIST</span>
                </>
              )}
            </button>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="hero-dots-row">
            {heroSlides.map((s, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`hero-dot-btn ${idx === activeIdx ? 'active-pill' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
