async function fetchCyberpunk() {
  const res = await fetch('https://itunes.apple.com/search?term=Cyberpunk+Synthwave&media=music&limit=3');
  const json = await res.json();
  console.log(json.results?.map(r => ({ name: r.trackName, artist: r.artistName, url: r.previewUrl })));
}
fetchCyberpunk();
