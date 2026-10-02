import fs from 'fs';

const music = JSON.parse(fs.readFileSync('public/data/music.json', 'utf8'));
console.log('=== ALL 100 MUSIC TRACKS ===');
music.forEach((m, i) => {
  console.log(`${i+1}|${m.id}|${m.title}|${m.artist}`);
});
