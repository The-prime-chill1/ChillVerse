import fs from 'fs';
import path from 'path';

async function testVideo(id) {
  if (!id || id.length !== 11) return false;
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

async function checkCatalog(filename) {
  const fp = path.resolve('data', filename);
  if (!fs.existsSync(fp)) return;
  const items = JSON.parse(fs.readFileSync(fp, 'utf8'));
  console.log(`\nChecking ${filename} (${items.length} items)...`);
  
  let validCount = 0;
  let invalidCount = 0;
  const invalidItems = [];

  for (let i = 0; i < Math.min(items.length, 30); i++) {
    const it = items[i];
    const id = it.youtubeId;
    const ok = await testVideo(id);
    if (ok) {
      validCount++;
    } else {
      invalidCount++;
      invalidItems.push({ index: i, id: it.id, title: it.title, youtubeId: id });
    }
  }

  console.log(`Sample results: ${validCount} valid, ${invalidCount} invalid out of 30`);
  if (invalidItems.length > 0) {
    console.log('Sample invalid items:', invalidItems.slice(0, 10));
  }
}

async function main() {
  await checkCatalog('movies.json');
  await checkCatalog('anime.json');
  await checkCatalog('tv-shows.json');
}

main();
