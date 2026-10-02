import fs from 'fs';
import https from 'https';
import http from 'http';

function checkUrl(url) {
  return new Promise((resolve) => {
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

const vids = JSON.parse(fs.readFileSync('public/data/videos.json', 'utf8')).videos;
console.log('Checking videos.json thumbnails...');
for (const v of vids) {
  const res = await checkUrl(v.thumbnail);
  console.log(`${v.id} (${v.title.slice(0, 30)}...): status=${res.status} len=${res.contentLength}`);
}
