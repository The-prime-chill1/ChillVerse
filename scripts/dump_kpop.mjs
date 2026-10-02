import fs from 'fs';

const kpop = JSON.parse(fs.readFileSync('public/data/k-pop.json', 'utf8'));
console.log('=== ALL 100 K-POP TRACKS ===');
kpop.forEach((m, i) => {
  console.log(`${i+1}|${m.id}|${m.title}|${m.artist}`);
});
