import fs from 'fs';
import https from 'https';
import http from 'http';

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url) return resolve({ status: 'MISSING' });
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve({ url, status: res.statusCode, contentLength: res.headers['content-length'] });
      });
      req.on('error', () => resolve({ url, status: 500 }));
      req.on('timeout', () => { req.destroy(); resolve({ url, status: 408 }); });
      req.end();
    } catch {
      resolve({ url, status: 500 });
    }
  });
}

const checkFiles = ['releases.json', 'events.json', 'articles.json', 'merchandise.json', 'gallery.json', 'characters.json'];

for (const file of checkFiles) {
  const p = 'public/data/' + file;
  if (!fs.existsSync(p)) continue;
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  const items = Array.isArray(raw) ? raw : (raw.releases || raw.events || raw.articles || raw.merchandise || raw.gallery || raw.characters || raw.items || []);
  console.log(`\n=== Checking ${file} (${items.length} items) ===`);
  for (const it of items) {
    const img = it.poster || it.thumbnail || it.image || it.coverImage || it.backdrop;
    const res = await checkUrl(img);
    if (res.status !== 200) {
      console.log(`[${file}] BAD URL: id=${it.id || it.title} status=${res.status} img=${img}`);
    }
  }
}
