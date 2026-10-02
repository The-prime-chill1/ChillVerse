import fs from 'fs';

['music', 'k-pop', 'anime', 'gaming', 'tv-shows'].forEach(cat => {
  const data = JSON.parse(fs.readFileSync(`public/data/${cat}.json`, 'utf8'));
  const missing = data.filter(it => !it.youtubeId);
  console.log(`\n=== ${cat.toUpperCase()} (${missing.length}) ===`);
  missing.forEach((it, i) => {
    console.log(`${i+1}. "${it.title}" ${it.artist ? `by ${it.artist}` : ''}`);
  });
});
