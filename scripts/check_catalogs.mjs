import fs from 'fs';
import path from 'path';

const categories = ['movies', 'anime', 'gaming', 'tv-shows', 'music', 'k-pop', 'manga', 'comics'];

categories.forEach(cat => {
  const filePath = path.resolve('public/data/' + cat + '.json');
  if (!fs.existsSync(filePath)) {
    console.log(cat + ': FILE MISSING');
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const items = Array.isArray(data) ? data : (data.items || []);
  let missingPosters = 0;
  let missingYoutube = 0;
  let sampleItem = null;

  items.forEach((it, i) => {
    const poster = it.poster || it.image || it.cover || it.artwork || it.thumbnail;
    if (!poster || poster.trim() === '') missingPosters++;
    const yt = it.youtubeId || it.trailer || it.trailerUrl || it.videoUrl || it.embedUrl;
    if (!yt || yt.trim() === '') missingYoutube++;
    if (i === 0) sampleItem = it;
  });
  console.log(`${cat.padEnd(10)}: total=${items.length}, missingPosters=${missingPosters}, missingYoutube=${missingYoutube}`);
  if (sampleItem) {
    console.log(`  Sample keys for ${cat}:`, Object.keys(sampleItem).join(', '));
  }
});
