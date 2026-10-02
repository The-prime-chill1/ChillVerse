import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Filter, ArrowUpDown, Image, Users, FileText, Film, 
  Calendar, ShoppingBag, Sparkles, BookOpen, Layers, ChevronDown 
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContentCard from '../components/common/ContentCard';
import { dataService } from '../services/dataService';
import { useApp } from '../context/AppContext';

export default function CategoryPage() {
  const { id } = useParams();
  const categoryId = (id || 'anime').toLowerCase();
  const { openModal, playTrack } = useApp();

  const [contentItems, setContentItems] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Sorting state
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [sortOrder, setSortOrder] = useState('desc');

  const categoryMeta = {
    anime: { title: 'Anime Sanctuary', jp: 'アニメ', desc: 'Epic battles, supernatural sorcery, legendary animation, and seasonal simulcasts.', color: '#ff3b30' },
    gaming: { title: 'Gaming Sanctuary', jp: 'ゲーム', desc: 'AAA blockbusters, competitive esports, RPG lore, and Soulsborne boss mechanics.', color: '#00e5ff' },
    movies: { title: 'Movie Multiverse', jp: '映画', desc: 'Hollywood spectacles, kaiju wars, sci-fi sagas, and 4K cinema trailers.', color: '#ff9500' },
    'tv-shows': { title: 'Prestige TV Shows', jp: 'ドラマ', desc: 'Dark fantasy sagas, streaming serials, dystopian arcs, and episodic discussions.', color: '#5856d6' },
    music: { title: 'Music Sanctuary', jp: '音楽', desc: 'Global chart-toppers, Billie Eilish hits, Grammy anthems, Billboard hot 100, and audio previews.', color: '#10b981' },
    'k-pop': { title: 'K-Pop Idol Zone', jp: '케이팝', desc: 'Global chart-toppers, comeback schedules, lightstick culture, and choreography.', color: '#ff2d55' },
    comics: { title: 'Comic Multiverse', jp: 'コミック', desc: 'Graphic novel legends, superhero origins, dark vigilantes, and indie chronicles.', color: '#ffcc00' },
    manga: { title: 'Manga Chronicles', jp: 'マンガ', desc: 'Serialized weekly chapters, shonen legends, and dark seinen masterpieces.', color: '#af52de' }
  };

  const currentMeta = categoryMeta[categoryId] || categoryMeta.anime;

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const [items, chars, gall] = await Promise.all([
          dataService.getCategoryContent(categoryId),
          dataService.getCharacters(categoryId),
          dataService.getGallery(categoryId)
        ]);
        setContentItems(items);
        setCharacters(chars);
        setGallery(gall);
      } catch (err) {
        console.error('Failed to load category data:', err);
      } finally {
        setLoading(false);
      }
    }
    setSelectedType('all');
    setSelectedTag('all');
    loadCategoryData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryId]);

  // Extract unique tags for filtering
  const availableTags = useMemo(() => {
    const tagSet = new Set();
    contentItems.forEach(item => {
      if (Array.isArray(item.tags)) item.tags.forEach(t => tagSet.add(t));
    });
    return Array.from(tagSet);
  }, [contentItems]);

  // Category specific filter tabs
  const realmTabs = {
    music: [
      { id: 'all', label: 'All Anthems' },
      { id: 'afrobeats', label: 'Afrobeats' },
      { id: 'davido', label: 'Davido Hits' },
      { id: 'pop', label: 'Global Pop' },
      { id: 'hip-hop', label: 'Hip-Hop' },
      { id: 'billie eilish', label: 'Billie Eilish' }
    ],
    'k-pop': [
      { id: 'all', label: 'All Idols' },
      { id: 'bts', label: 'BTS' },
      { id: 'blackpink', label: 'BLACKPINK' },
      { id: 'newjeans', label: 'NewJeans' },
      { id: 'stray kids', label: 'Stray Kids' }
    ],
    anime: [
      { id: 'all', label: 'All Anime' },
      { id: 'shonen', label: 'Shonen' },
      { id: 'dark fantasy', label: 'Dark Fantasy' },
      { id: 'action', label: 'Action' },
      { id: 'movie', label: 'Movies' }
    ],
    gaming: [
      { id: 'all', label: 'All Games' },
      { id: 'rpg', label: 'Action RPG' },
      { id: 'soulsborne', label: 'Soulsborne' },
      { id: 'open world', label: 'Open World' }
    ],
    movies: [
      { id: 'all', label: 'All Movies' },
      { id: 'action', label: 'Action' },
      { id: 'sci-fi', label: 'Sci-Fi' },
      { id: 'marvel', label: 'Marvel / DC' }
    ],
    'tv-shows': [
      { id: 'all', label: 'All Series' },
      { id: 'drama', label: 'Drama' },
      { id: 'fantasy', label: 'Fantasy' },
      { id: 'sci-fi', label: 'Sci-Fi' }
    ],
    manga: [
      { id: 'all', label: 'All Manga' },
      { id: 'shonen', label: 'Shonen' },
      { id: 'seinen', label: 'Seinen' },
      { id: 'action', label: 'Action' }
    ],
    comics: [
      { id: 'all', label: 'All Comics' },
      { id: 'marvel', label: 'Marvel' },
      { id: 'dc', label: 'DC Universe' },
      { id: 'batman', label: 'Batman Lore' }
    ]
  };

  const activeTabs = realmTabs[categoryId] || [
    { id: 'all', label: 'All Catalog' },
    { id: 'popular', label: 'Popular' },
    { id: 'featured', label: 'Featured' }
  ];

  // Filter & Sort logic
  const filteredAndSorted = useMemo(() => {
    let list = [...contentItems];

    if (selectedType !== 'all') {
      const q = selectedType.toLowerCase();
      list = list.filter(item => {
        const itemType = (item.type || '').toLowerCase();
        const itemGenre = (item.genre || '').toLowerCase();
        const itemArtist = (item.artist || '').toLowerCase();
        const itemFormat = (item.format || '').toLowerCase();
        const itemTags = Array.isArray(item.tags) ? item.tags.map(t => t.toLowerCase()) : [];
        const itemTitle = (item.title || item.name || '').toLowerCase();

        return (
          itemType === q ||
          itemGenre.includes(q) ||
          itemArtist.includes(q) ||
          itemFormat.includes(q) ||
          itemTitle.includes(q) ||
          itemTags.some(t => t.includes(q))
        );
      });
    }

    if (selectedTag !== 'all') {
      list = list.filter(item => item.tags?.includes(selectedTag));
    }

    list.sort((a, b) => {
      if (sortBy === 'title') {
        const titleA = (a.title || a.name || '').toLowerCase();
        const titleB = (b.title || b.name || '').toLowerCase();
        return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      } else if (sortBy === 'newest') {
        const dateA = new Date(a.date || a.year || '2020').getTime();
        const dateB = new Date(b.date || b.year || '2020').getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        // Popularity / Featured
        const popA = a.popularity || (a.featured ? 99 : 50);
        const popB = b.popularity || (b.featured ? 99 : 50);
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }
    });

    return list;
  }, [contentItems, selectedType, selectedTag, sortBy, sortOrder]);

  const breadcrumbs = [
    { label: currentMeta.title, path: `/category/${categoryId}` }
  ];

  return (
    <div className="category-hub-page">
      <Breadcrumbs items={breadcrumbs} />

      {/* Universe Hero Header */}
      <section className="category-hero-header" style={{ '--hub-accent': currentMeta.color }}>
        <div className="container">
          <div className="category-header-box">
            <span className="hub-jp-tag">{currentMeta.jp}</span>
            <h1 className="hub-title">{currentMeta.title}</h1>
            <p className="hub-desc">{currentMeta.desc}</p>
            <div className="hub-stats-row">
              <span className="badge badge-orange">{contentItems.length} Lore Items</span>
              <span className="badge badge-purple">{characters.length} Character Profiles</span>
              <span className="badge badge-cyan">{gallery.length} Gallery Artworks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Sort Toolbar */}
      <div className="category-toolbar-section">
        <div className="container">
          <div className="toolbar-flex-row">
            {/* Filter by Type Tabs */}
            <div className="type-filter-tabs">
              {activeTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id)}
                  className={`toolbar-tab-btn ${selectedType === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-tags and Sorting Controls */}
            <div className="toolbar-right-controls">
              {/* Tag Selector */}
              {availableTags.length > 0 && (
                <div className="filter-select-wrapper">
                  <select 
                    value={selectedTag} 
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="filter-select-input"
                    aria-label="Filter by Tag"
                  >
                    <option value="all">All Sub-Tags</option>
                    {availableTags.map(tag => (
                      <option key={tag} value={tag}>#{tag}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="filter-select-chevron" />
                </div>
              )}

              {/* Sort By Dropdown */}
              <div className="filter-select-wrapper">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select-input"
                  aria-label="Sort by Criteria"
                >
                  <option value="popularity">Most Popular / Featured</option>
                  <option value="newest">Newest Release</option>
                  <option value="title">Alphabetical</option>
                </select>
                <ChevronDown size={14} className="filter-select-chevron" />
              </div>

              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="btn-glass sort-order-btn"
                title={`Sort Order: ${sortOrder.toUpperCase()}`}
              >
                <ArrowUpDown size={15} />
                <span>{sortOrder === 'asc' ? 'A-Z / Asc' : 'Z-A / Desc'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Catalog Grid */}
      <main className="category-main-content">
        <div className="container">
          {loading ? (
            <div className="loading-grid-skeleton">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-card skeleton" style={{ height: '320px' }}></div>
              ))}
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <div className="no-results-box text-center py-5">
              <Layers size={48} className="text-muted mx-auto mb-3" />
              <h3>No items found matching your filters</h3>
              <p className="text-secondary">Try switching sub-tags or clearing type filters.</p>
              <button 
                onClick={() => { setSelectedType('all'); setSelectedTag('all'); }}
                className="btn-primary-fire mt-3"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="fandom-cards-grid">
              {filteredAndSorted.map((item) => (
                <ContentCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => {
                    if (item.category === 'music' || item.type === 'music' || item.audioUrl || item.previewUrl) {
                      playTrack(item);
                    }
                    openModal('trailer', item);
                  }}
                />
              ))}
            </div>
          )}

          {/* Character Profiles Showcase for this category */}
          {characters.length > 0 && (
            <section className="category-characters-showcase mt-5">
              <div className="section-title-wrap">
                <div className="section-eyebrow">
                  <Users size={14} className="text-cyan" />
                  <span>CHARACTER VAULT</span>
                </div>
                <h3 className="section-main-heading">{currentMeta.title} Champions</h3>
              </div>

              <div className="char-strip-grid">
                {characters.map(char => (
                  <div 
                    key={char.id} 
                    className="char-strip-card"
                    onClick={() => openModal('character', char)}
                  >
                    <img src={char.image || char.thumbnail} alt={char.name} className="char-strip-img" loading="lazy" />
                    <div className="char-strip-info">
                      <h4 className="char-strip-name">{char.name}</h4>
                      <span className="char-strip-role">{char.franchise}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Visual Gallery with Lightbox for this category */}
          {gallery.length > 0 && (
            <section className="category-gallery-showcase mt-5">
              <div className="section-title-wrap">
                <div className="section-eyebrow">
                  <Image size={14} className="text-purple" />
                  <span>VISUAL LIGHTBOX VAULT</span>
                </div>
                <h3 className="section-main-heading">Curated Artwork & Stills</h3>
              </div>

              <div className="gallery-mosaic-grid">
                {gallery.map((img, idx) => (
                  <div 
                    key={img.id || idx} 
                    className="gallery-mosaic-item"
                    onClick={() => openModal('lightbox', { images: gallery, currentIndex: idx })}
                  >
                    <img src={img.url || img.image || img.thumbnail} alt={img.title || 'Gallery'} loading="lazy" />
                    <div className="gallery-hover-caption">
                      <span>{img.title || 'Inspect High-Res'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
