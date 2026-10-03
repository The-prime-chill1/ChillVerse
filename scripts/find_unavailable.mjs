import fs from 'fs';

async function findOriginalUnavailable() {
  const url = `https://itunes.apple.com/search?term=Davido+Timeless+UNAVAILABLE&media=music&entity=song&limit=10`;
  const res = await fetch(url);
  const json = await res.json();
  json.results?.forEach((r, i) => {
    console.log(`[${i}] ${r.trackName} | ${r.collectionName} | ${r.artistName}`);
    console.log(`     previewUrl: ${r.previewUrl}`);
  });
}

findOriginalUnavailable();
