import fs from 'fs';

const cats = ['anime', 'gaming', 'tv-shows', 'music', 'k-pop', 'comics', 'manga', 'catalog'];

for (const c of cats) {
  const file = `public/data/${c}.json`;
  if (!fs.existsSync(file)) continue;
  const items = JSON.parse(fs.readFileSync(file, 'utf8'));
  const missing = items.filter(it => !it.youtubeId && !(it.embedUrl && it.embedUrl.includes('embed/')));
  console.log(`\n=================== ${c.toUpperCase()} Missing YouTube (${missing.length}/${items.length}) ===================`);
  missing.forEach((it, idx) => {
    console.log(`${idx + 1}. [${it.id}] "${it.title}" ${it.artist ? `by ${it.artist}` : ''}`);
  });
}
