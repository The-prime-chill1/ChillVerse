import fs from 'fs';
import path from 'path';

const fixesVideos = {
  'vid-1': {
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'VQGCKyvzIM4'
  },
  'vid-2': {
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'kfXdf997k_Y'
  },
  'vid-3': {
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'os2rgjyUG88'
  },
  'vid-7': {
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'q15CRdE5Bv0'
  }
};

const fixesReleases = {
  'rel-1': {
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
  },
  'rel-3': {
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  }
};

const DIRS = ['public/data', 'src/data', 'data'];

for (const dir of DIRS) {
  // Fix videos.json
  const vp = path.resolve(dir, 'videos.json');
  if (fs.existsSync(vp)) {
    const raw = JSON.parse(fs.readFileSync(vp, 'utf8'));
    const list = Array.isArray(raw) ? raw : (raw.videos || []);
    list.forEach(v => {
      if (fixesVideos[v.id]) {
        v.thumbnail = fixesVideos[v.id].thumbnail;
        if (fixesVideos[v.id].youtubeId) v.youtubeId = fixesVideos[v.id].youtubeId;
      }
    });
    fs.writeFileSync(vp, JSON.stringify(raw, null, 2), 'utf8');
    console.log(`Updated ${vp}`);
  }

  // Fix releases.json
  const rp = path.resolve(dir, 'releases.json');
  if (fs.existsSync(rp)) {
    const raw = JSON.parse(fs.readFileSync(rp, 'utf8'));
    const list = Array.isArray(raw) ? raw : (raw.releases || []);
    list.forEach(r => {
      if (fixesReleases[r.id]) {
        r.thumbnail = fixesReleases[r.id].thumbnail;
      }
    });
    fs.writeFileSync(rp, JSON.stringify(raw, null, 2), 'utf8');
    console.log(`Updated ${rp}`);
  }
}
