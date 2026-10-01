/**
 * CHILLVERSE Data Service
 * Loads, caches, and indexes all 19 JSON datasets from /data/*.json
 * With fallback to static imports if network fetch fails.
 */

// Cache containers
const cache = {};

// Helper to fetch JSON from public /data/
async function fetchDataset(name) {
  if (cache[name]) return cache[name];
  try {
    const res = await fetch(`/data/${name}.json`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    cache[name] = data;
    return data;
  } catch (err) {
    console.warn(`Failed to fetch /data/${name}.json:`, err);
    // Fallback: try dynamic import from src/data
    try {
      const module = await import(`../data/${name}.json`);
      cache[name] = module.default || module;
      return cache[name];
    } catch (importErr) {
      console.error(`Static fallback import failed for ${name}:`, importErr);
      return [];
    }
  }
}

export const dataService = {
  // Preload all critical datasets
  async preloadAll() {
    const datasets = [
      'anime', 'gaming', 'movies', 'tv-shows', 'music', 'k-pop', 'comics', 'manga',
      'characters', 'events', 'videos', 'audio', 'articles', 'merchandise',
      'releases', 'gallery', 'chatbot', 'faq', 'content', 'catalog'
    ];
    await Promise.allSettled(datasets.map(name => fetchDataset(name)));
    return true;
  },

  // Category specific content
  async getCategoryContent(category) {
    const cat = category.toLowerCase();
    const data = await fetchDataset(cat);
    return Array.isArray(data) ? data : (data.items || []);
  },

  // Characters (min 5 per category = 35+)
  async getCharacters(category = null) {
    const data = await fetchDataset('characters');
    const chars = Array.isArray(data) ? data : (data.characters || []);
    if (!category || category === 'all') return chars;
    return chars.filter(c => c.category?.toLowerCase() === category.toLowerCase());
  },

  // Events (mix of past and upcoming, min 3 per category)
  async getEvents(category = null) {
    const data = await fetchDataset('events');
    const events = Array.isArray(data) ? data : (data.events || []);
    if (!category || category === 'all') return events;
    return events.filter(e => e.category?.toLowerCase() === category.toLowerCase());
  },

  // Videos and Trailers
  async getVideos(category = null, type = null) {
    const data = await fetchDataset('videos');
    let videos = Array.isArray(data) ? data : (data.videos || []);
    if (category && category !== 'all') {
      videos = videos.filter(v => v.category?.toLowerCase() === category.toLowerCase());
    }
    if (type && type !== 'all') {
      videos = videos.filter(v => v.type?.toLowerCase() === type.toLowerCase());
    }
    return videos;
  },

  // Audio clips
  async getAudioClips() {
    const data = await fetchDataset('audio');
    return Array.isArray(data) ? data : (data.audioClips || data.tracks || []);
  },

  // Articles
  async getArticles(category = null) {
    const data = await fetchDataset('articles');
    const articles = Array.isArray(data) ? data : (data.articles || []);
    if (!category || category === 'all') return articles;
    return articles.filter(a => a.category?.toLowerCase() === category.toLowerCase());
  },

  async getArticleById(id) {
    const articles = await this.getArticles();
    return articles.find(a => a.id === id) || null;
  },

  // Merchandise
  async getMerchandise(category = null) {
    const data = await fetchDataset('merchandise');
    const merch = Array.isArray(data) ? data : (data.merchandise || data.products || []);
    if (!category || category === 'all') return merch;
    return merch.filter(m => m.category?.toLowerCase() === category.toLowerCase());
  },

  // Releases
  async getReleases(category = null) {
    const data = await fetchDataset('releases');
    const rels = Array.isArray(data) ? data : (data.releases || []);
    if (!category || category === 'all') return rels;
    return rels.filter(r => r.category?.toLowerCase() === category.toLowerCase());
  },

  // Gallery
  async getGallery(category = null) {
    const data = await fetchDataset('gallery');
    const items = Array.isArray(data) ? data : (data.gallery || data.items || []);
    if (!category || category === 'all') return items;
    return items.filter(g => g.category?.toLowerCase() === category.toLowerCase());
  },

  // Chatbot data
  async getChatbotData() {
    return await fetchDataset('chatbot');
  },

  // Unified global search across all categories
  async searchAll(query, categoryFilter = 'all', typeFilter = 'all') {
    if (!query || query.trim() === '') return [];
    const q = query.toLowerCase().trim();
    
    // Gather items from multiple datasets
    const [anime, gaming, movies, tv, kpop, comics, manga, characters, articles, merchandise, events] = await Promise.all([
      this.getCategoryContent('anime'),
      this.getCategoryContent('gaming'),
      this.getCategoryContent('movies'),
      this.getCategoryContent('tv-shows'),
      this.getCategoryContent('k-pop'),
      this.getCategoryContent('comics'),
      this.getCategoryContent('manga'),
      this.getCharacters(),
      this.getArticles(),
      this.getMerchandise(),
      this.getEvents()
    ]);

    const allItems = [
      ...anime.map(i => ({ ...i, category: 'anime', type: i.type || 'series' })),
      ...gaming.map(i => ({ ...i, category: 'gaming', type: i.type || 'game' })),
      ...movies.map(i => ({ ...i, category: 'movies', type: i.type || 'movie' })),
      ...tv.map(i => ({ ...i, category: 'tv-shows', type: i.type || 'series' })),
      ...kpop.map(i => ({ ...i, category: 'k-pop', type: i.type || 'music' })),
      ...comics.map(i => ({ ...i, category: 'comics', type: i.type || 'comic' })),
      ...manga.map(i => ({ ...i, category: 'manga', type: i.type || 'manga' })),
      ...characters.map(c => ({
        id: c.id,
        title: c.name,
        thumbnail: c.image,
        description: c.biography || c.quote || '',
        category: c.category || 'all',
        type: 'character',
        tags: c.traits || [c.franchise]
      })),
      ...articles.map(a => ({
        id: a.id,
        title: a.title,
        thumbnail: a.thumbnail || a.image,
        description: a.summary || a.excerpt || a.description || '',
        category: a.category || 'all',
        type: 'article',
        tags: a.tags || []
      })),
      ...merchandise.map(m => ({
        id: m.id,
        title: m.name,
        thumbnail: m.image,
        description: m.description,
        category: m.category || 'all',
        type: 'merchandise',
        tags: [m.category, 'merch', `$${m.price}`]
      })),
      ...events.map(e => ({
        id: e.id,
        title: e.title,
        thumbnail: e.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
        description: `${e.date} • ${e.location} - ${e.description}`,
        category: e.category || 'all',
        type: 'event',
        tags: [e.category, e.location]
      }))
    ];

    // Filter matching items
    return allItems.filter(item => {
      const matchCat = categoryFilter === 'all' || item.category?.toLowerCase() === categoryFilter.toLowerCase();
      const matchType = typeFilter === 'all' || item.type?.toLowerCase() === typeFilter.toLowerCase();
      if (!matchCat || !matchType) return false;

      const titleMatch = item.title?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const tagsMatch = Array.isArray(item.tags) && item.tags.some(t => String(t).toLowerCase().includes(q));
      
      return titleMatch || descMatch || tagsMatch;
    });
  }
};
