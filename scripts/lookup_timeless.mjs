import fs from 'fs';

async function lookupTimeless() {
  const url = `https://itunes.apple.com/search?term=Davido+Timeless&entity=album&limit=5`;
  const res = await fetch(url);
  const json = await res.json();
  const album = json.results?.find(a => a.collectionName?.toLowerCase() === 'timeless');
  if (album) {
    console.log(`Album found: ${album.collectionName} (ID: ${album.collectionId})`);
    const trackRes = await fetch(`https://itunes.apple.com/lookup?id=${album.collectionId}&entity=song`);
    const trackJson = await trackRes.json();
    trackJson.results?.forEach(t => {
      if (t.wrapperType === 'track') {
        console.log(`Track ${t.trackNumber}: ${t.trackName} -> ${t.previewUrl}`);
      }
    });
  } else {
    console.log('Album not found', json.results?.map(a => a.collectionName));
  }
}

lookupTimeless();
