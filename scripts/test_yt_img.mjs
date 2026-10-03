import https from 'https';

function check(id) {
  return new Promise(resolve => {
    https.get('https://img.youtube.com/vi/' + id + '/mqdefault.jpg', res => {
      console.log(id, 'status:', res.statusCode);
      resolve({ id, status: res.statusCode });
    }).on('error', err => {
      console.log(id, 'error:', err.message);
      resolve({ id, error: err.message });
    });
  });
}

async function main() {
  await check('wdok0rZdmx4'); // Twisters trailer found from YouTube meta!
  await check('73_1biulkYk'); // Deadpool & Wolverine trailer
}

main();
