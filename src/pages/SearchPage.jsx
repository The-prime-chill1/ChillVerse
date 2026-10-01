import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, ArrowUpDown, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContentCard from '../components/common/ContentCard';
import { dataService } from '../services/dataService';
import { useApp } from '../context/AppContext';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { openModal } = useApp();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);
  const [catFilter, setCatFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    const timer = setTimeout(async () => {
      const found = await dataService.searchAll(query, catFilter, typeFilter);
      setResults(found);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, catFilter, typeFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localQuery.trim())}`);
    }
  };

  const highlightText = (text = '', q = '') => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase()
        ? <mark key={i} className="search-highlight">{part}</mark>
        : part
    );
  };

  return (
    <div className="search-page-layout">
      <Breadcrumbs items={[{ label: `Search: "${query}"`, path: `/search?q=${query}` }]} />

      <section className="search-hero-section">
        <div className="container">
          <div className="section-eyebrow">
            <SearchIcon size={14} className="text-orange" />
            <span>FANDOM GLOBAL SEARCH</span>
          </div>
          <h1 className="hub-title">Search Across All 7 Universes</h1>

          <form onSubmit={handleSearch} className="search-hero-bar mt-4">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search anime, games, movies, characters, merch..."
              className="search-large-input"
            />
            <button type="submit" className="btn-primary-fire search-large-btn">
              <SearchIcon size={18} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {query && (
        <div className="container search-results-section">
          {/* Filters Row */}
          <div className="search-filters-bar">
            <div className="type-filter-tabs">
              {['all','anime','gaming','movies','tv-shows','k-pop','comics','manga'].map(cat => (
                <button key={cat} onClick={() => setCatFilter(cat)} className={`toolbar-tab-btn ${catFilter === cat ? 'active' : ''}`}>
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>

            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="filter-select-input">
              <option value="all">All Types</option>
              <option value="character">Characters</option>
              <option value="article">Articles</option>
              <option value="merchandise">Merchandise</option>
              <option value="event">Events</option>
            </select>
          </div>

          {/* Results Summary */}
          <div className="search-results-header">
            <h3 className="search-count-label">
              {loading ? 'Searching...' : (
                results.length === 0
                  ? `No results found for "${query}"`
                  : `${results.length} results for "${query}"`
              )}
            </h3>
          </div>

          {/* No Results State */}
          {!loading && results.length === 0 && (
            <div className="no-results-box text-center py-5">
              <SearchIcon size={48} className="text-muted mx-auto mb-3" />
              <h3>No Fandom Content Found</h3>
              <p className="text-secondary mt-2">Try different keywords or explore the 7 hubs directly.</p>
            </div>
          )}

          {/* Results Grid with Highlighted Text */}
          {loading ? (
            <div className="loading-grid-skeleton">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton-card skeleton" style={{ height: '300px' }}></div>
              ))}
            </div>
          ) : (
            <div className="fandom-cards-grid">
              {results.map((item, idx) => (
                <div key={item.id || idx} className="search-result-card" onClick={() => openModal('trailer', item)}>
                  <div className="card-poster-wrapper">
                    <img
                      src={item.thumbnail || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'}
                      alt={item.title}
                      className="card-poster-img"
                      loading="lazy"
                    />
                    <span className="card-badge-pill">{item.category?.toUpperCase()}</span>
                  </div>
                  <div className="card-info-bottom">
                    <h4 className="card-title">{highlightText(item.title, query)}</h4>
                    <p className="text-secondary text-xs mt-1">
                      {highlightText(item.description?.slice(0, 90), query)}...
                    </p>
                    <div className="card-tags-row mt-1">
                      {item.tags?.slice(0, 3).map((tag, ti) => (
                        <span key={ti} className="tag-pill text-xs">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
