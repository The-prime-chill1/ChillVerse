import https from 'https';

const ids = ['1q36U9X5q6k', 'Qp49X0_36jU', 'fF-iG2vA30k', 'Jcq3C212jcg', 'y4vN_4Y9bK4', 'Jb_5t_y682k'];

ids.forEach(id => {
  https.get(`https://img.youtube.com/vi/${id}/hqdefault.jpg`, res => {
    console.log(`${id} hqdefault: ${res.statusCode}`);
  });
});
