import fs from 'fs';
import path from 'path';

const davidoTracks = [
  {
    id: "mus-davido-001",
    title: "Unavailable (feat. Musa Keys)",
    artist: "Davido",
    album: "Timeless",
    category: "music",
    type: "music",
    genre: "Afrobeats",
    year: 2023,
    date: "2023-03-31",
    tags: ["Davido", "Afrobeats", "Amapiano", "Timeless", "Global Hit"],
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    youtubeId: "5j5E7fE1bA4",
    embedUrl: "https://www.youtube-nocookie.com/embed/5j5E7fE1bA4",
    description: "Davido's monumental Grammy-nominated Afrobeats and Amapiano club anthem from the groundbreaking album 'Timeless'.",
    popularity: 100,
    featured: true
  },
  {
    id: "mus-davido-002",
    title: "Feel",
    artist: "Davido",
    album: "Timeless",
    category: "music",
    type: "music",
    genre: "Afrobeats",
    year: 2023,
    date: "2023-03-31",
    tags: ["Davido", "Afrobeats", "Timeless", "Banger"],
    poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    youtubeId: "kC0y6fG2rP0",
    embedUrl: "https://www.youtube-nocookie.com/embed/kC0y6fG2rP0",
    description: "Davido delivers a cinematic Afrobeats masterclass in 'Feel', showcasing his signature rich vocals and buoyant rhythm.",
    popularity: 99,
    featured: true
  },
  {
    id: "mus-davido-003",
    title: "Fall",
    artist: "Davido",
    album: "A Good Time",
    category: "music",
    type: "music",
    genre: "Afrobeats",
    year: 2017,
    date: "2017-06-02",
    tags: ["Davido", "Afrobeats", "Classic", "Billboard"],
    poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    youtubeId: "3IYu_Jb_Z8o",
    embedUrl: "https://www.youtube-nocookie.com/embed/3IYu_Jb_Z8o",
    description: "The historic Afrobeats anthem that became the longest-charting Nigerian pop song in Billboard history.",
    popularity: 99,
    featured: true
  },
  {
    id: "mus-davido-004",
    title: "IF",
    artist: "Davido",
    album: "A Good Time",
    category: "music",
    type: "music",
    genre: "Afrobeats",
    year: 2017,
    date: "2017-02-17",
    tags: ["Davido", "Afrobeats", "30 Billion Gang", "Hit"],
    poster: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    youtubeId: "helEv0kGHd4",
    embedUrl: "https://www.youtube-nocookie.com/embed/helEv0kGHd4",
    description: "The legendary Tekno-produced track featuring the iconic '30 billion for the account' line that conquered world charts.",
    popularity: 98,
    featured: true
  },
  {
    id: "mus-davido-005",
    title: "FEM",
    artist: "Davido",
    album: "A Better Time",
    category: "music",
    type: "music",
    genre: "Afrobeats",
    year: 2020,
    date: "2020-09-10",
    tags: ["Davido", "Afrobeats", "Anthem", "Cultural Movement"],
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    youtubeId: "lta5go9P-go",
    embedUrl: "https://www.youtube-nocookie.com/embed/lta5go9P-go",
    description: "The energetic comeback anthem with an unstoppable hook that became an international cultural rallying cry.",
    popularity: 97,
    featured: true
  },
  {
    id: "mus-davido-006",
    title: "Blow My Mind (feat. Chris Brown)",
    artist: "Davido & Chris Brown",
    album: "A Good Time",
    category: "music",
    type: "music",
    genre: "Afrobeats",
    year: 2019,
    date: "2019-07-26",
    tags: ["Davido", "Chris Brown", "Afrobeats", "Global Collaboration"],
    poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    youtubeId: "iSgEDKjmQ5o",
    embedUrl: "https://www.youtube-nocookie.com/embed/iSgEDKjmQ5o",
    description: "Electrifying cross-continental collaboration blending Afropop grooves with R&B star Chris Brown.",
    popularity: 97,
    featured: true
  },
  {
    id: "mus-davido-007",
    title: "Kante (feat. Fave)",
    artist: "Davido",
    album: "Timeless",
    category: "music",
    type: "music",
    genre: "Afrobeats",
    year: 2023,
    date: "2023-03-31",
    tags: ["Davido", "Fave", "Afrobeats", "Timeless"],
    poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    youtubeId: "5j_5w_8M9_c",
    embedUrl: "https://www.youtube-nocookie.com/embed/5j_5w_8M9_c",
    description: "Smooth, melodic collaboration between Davido and breakout Nigerian vocalist Fave from 'Timeless'.",
    popularity: 96,
    featured: true
  },
  {
    id: "mus-davido-008",
    title: "Jowo",
    artist: "Davido",
    album: "A Better Time",
    category: "music",
    type: "music",
    genre: "Afrobeats",
    year: 2020,
    date: "2020-11-13",
    tags: ["Davido", "Afrobeats", "Romance", "Melody"],
    poster: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/4a/15/4a/4a154a4a-10ce-2b0e-9764-77a80b17173e/mzaf_7137351656885331665.plus.aac.p.m4a",
    youtubeId: "l6QMJniQWxQ",
    embedUrl: "https://www.youtube-nocookie.com/embed/l6QMJniQWxQ",
    description: "A beloved romantic Afropop serenade featuring an unforgettable guitar melody and sweet lyricism.",
    popularity: 96,
    featured: true
  }
];

const DIRS = ['public/data', 'src/data', 'data'];

DIRS.forEach(dir => {
  const fp = path.resolve(dir, 'music.json');
  if (!fs.existsSync(fp)) return;
  const current = JSON.parse(fs.readFileSync(fp, 'utf8'));
  
  // Filter out any prior duplicate davido items
  const filtered = current.filter(it => !it.id.startsWith('mus-davido-'));
  // Prepend Davido tracks to the top of the music catalog!
  const updated = [...davidoTracks, ...filtered];
  
  fs.writeFileSync(fp, JSON.stringify(updated, null, 2), 'utf8');
  console.log(`[Davido] Successfully injected ${davidoTracks.length} tracks into ${fp} (Total: ${updated.length})`);
});
