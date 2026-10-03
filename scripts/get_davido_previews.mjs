import fs from 'fs';

async function fetchDavidoPreviews() {
  const songs = [
    { title: 'Unavailable (feat. Musa Keys)', query: 'Davido Unavailable' },
    { title: 'Feel', query: 'Davido Feel' },
    { title: 'Fall', query: 'Davido Fall' },
    { title: 'IF', query: 'Davido IF' },
    { title: 'FEM', query: 'Davido FEM' },
    { title: 'Kante (feat. Fave)', query: 'Davido Kante' },
    { title: 'Jowo', query: 'Davido Jowo' },
    { title: 'Over Dem', query: 'Davido Over Dem' }
  ];

  const results = {};

  for (const s of songs) {
    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(s.query)}&media=music&entity=song&limit=5`;
      const res = await fetch(url);
      const json = await res.json();
      const match = json.results?.find(r => 
        r.artistName.toLowerCase().includes('davido') &&
        r.trackName.toLowerCase().includes(s.query.split(' ')[1].toLowerCase())
      ) || json.results?.[0];

      if (match) {
        results[s.title] = {
          title: match.trackName,
          artist: match.artistName,
          album: match.collectionName,
          previewUrl: match.previewUrl,
          artwork: match.artworkUrl100?.replace('100x100bb', '600x600bb')
        };
        console.log(`FOUND ${s.title}: ${match.trackName} -> ${match.previewUrl}`);
      } else {
        console.log(`NOT FOUND ${s.title}`);
      }
    } catch (e) {
      console.error(`Error fetching ${s.title}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/davido_found.json', JSON.stringify(results, null, 2));
}

fetchDavidoPreviews();
