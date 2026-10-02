import fs from 'fs';

const movies = JSON.parse(fs.readFileSync('public/data/movies.json', 'utf8'));
console.log('Total movies:', movies.length);
movies.forEach((m, i) => {
  console.log(`${i + 1}. ${m.title} (${m.year}) - Poster: ${m.poster ? 'OK' : 'MISSING'}`);
});
