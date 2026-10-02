import https from 'https';

const testUrls = [
  { name: 'Substance', url: 'https://image.tmdb.org/t/p/w500/lQfdytwNsHbOlltLfqkdr3mU12C.jpg' },
  { name: 'Beetlejuice', url: 'https://image.tmdb.org/t/p/w500/kKgQzkUCUm0me03pqNT8nBqK6nn.jpg' },
  { name: 'Joker', url: 'https://image.tmdb.org/t/p/w500/aciP8Km0waTLAc1v0Li8M9GKeAc.jpg' },
  { name: 'Venom', url: 'https://image.tmdb.org/t/p/w500/aosm8vhfqLlPXGihM2vWk8r5Bf9.jpg' },
  { name: 'Moana 2', url: 'https://image.tmdb.org/t/p/w500/m0SbwFNCa9epW1EG5Ac2vZ1hgIR.jpg' }
];

testUrls.forEach(t => {
  https.get(t.url, res => {
    console.log(t.name, res.statusCode);
  }).on('error', err => console.log(t.name, err.message));
});
