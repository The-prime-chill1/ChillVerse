import https from 'https';

const testWiki = [
  { id: 'mov-028', title: 'The Substance', url: 'https://upload.wikimedia.org/wikipedia/en/e/ec/The_Substance_poster.jpg' },
  { id: 'mov-029', title: 'Beetlejuice Beetlejuice', url: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Beetlejuice_Beetlejuice_poster.jpg' },
  { id: 'mov-030', title: 'Joker: Folie à Deux', url: 'https://upload.wikimedia.org/wikipedia/en/3/30/Joker_Folie_%C3%A0_Deux_poster.jpg' },
  { id: 'mov-031', title: 'Venom: The Last Dance', url: 'https://upload.wikimedia.org/wikipedia/en/1/17/Venom_The_Last_Dance_Poster.jpg' },
  { id: 'mov-032', title: 'Moana 2', url: 'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg' },
  { id: 'mov-033', title: 'Wicked', url: 'https://upload.wikimedia.org/wikipedia/en/9/90/Wicked_%282024_film%29_poster.jpg' },
  { id: 'mov-034', title: 'Sonic the Hedgehog 3', url: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Sonic_the_Hedgehog_3_poster.jpg' },
  { id: 'mov-035', title: 'Kraven the Hunter', url: 'https://upload.wikimedia.org/wikipedia/en/9/97/Kraven_the_Hunter_poster.jpg' }
];

testWiki.forEach(t => {
  https.get(t.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(t.title, res.statusCode);
  }).on('error', err => console.log(t.title, err.message));
});
