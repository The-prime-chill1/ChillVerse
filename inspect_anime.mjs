import fs from 'fs';

const anime = JSON.parse(fs.readFileSync('public/data/anime.json', 'utf8'));
console.log('Total anime:', anime.length);
anime.slice(0, 30).forEach((a, i) => {
  console.log(`${i + 1}. ${a.title} - Poster: ${a.poster ? 'OK' : 'MISSING'}`);
});
