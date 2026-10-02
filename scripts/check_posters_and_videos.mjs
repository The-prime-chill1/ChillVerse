import fs from 'fs';

const files = [
  'movies.json', 'anime.json', 'gaming.json', 'tv-shows.json', 
  'music.json', 'k-pop.json', 'comics.json', 'manga.json', 
  'catalog.json', 'videos.json', 'characters.json', 'releases.json'
];

for (const f of files) {
  const p = 'public/data/' + f;
  if (!fs.existsSync(p)) continue;
  let raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  let items = Array.isArray(raw) ? raw : (raw.items || raw.videos || raw.characters || raw.releases || raw.events || raw.articles || raw.tracks || []);
  let ytMax = 0, tmdb = 0, unsplash = 0, other = 0, missing = 0, noYt = 0;
  items.forEach(it => {
    const post = it.poster || it.thumbnail || it.artwork || it.image || it.coverImage || it.backdrop;
    if (!post) missing++;
    else if (post.includes('img.youtube.com')) ytMax++;
    else if (post.includes('tmdb.org') || post.includes('themoviedb.org')) tmdb++;
    else if (post.includes('unsplash.com')) unsplash++;
    else other++;

    if (!it.youtubeId && !it.embedUrl && !it.url?.includes('youtube') && !it.videoUrl) {
      noYt++;
    }
  });
  console.log(`${f.padEnd(16)}: total=${String(items.length).padEnd(4)} ytThumb=${String(ytMax).padEnd(4)} tmdb=${String(tmdb).padEnd(4)} unsplash=${String(unsplash).padEnd(4)} other=${String(other).padEnd(4)} missingPosters=${String(missing).padEnd(3)} missingYt=${noYt}`);
}
