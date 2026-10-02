import fs from 'fs';

['gaming', 'tv-shows'].forEach(cat => {
  const data = JSON.parse(fs.readFileSync(`public/data/${cat}.json`, 'utf8'));
  console.log(`\n=== ${cat.toUpperCase()} (${data.length}) ===`);
  data.slice(0, 15).forEach((d, i) => console.log(`${i+1}. ${d.title}`));
});
