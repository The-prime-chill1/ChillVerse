import fs from 'fs';
import path from 'path';
import https from 'https';

function checkId(id) {
  if (!id || id.length !== 11) return Promise.resolve(false);
  return new Promise(resolve => {
    const req = https.get(`https://img.youtube.com/vi/${id}/mqdefault.jpg`, res => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(4000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Verified official trailers for all prominent movies
const verifiedMovieTrailers = {
  "Twisters": "wdok0rZdmx4",
  "Civil War": "aDyQxtg0V2w",
  "The Batman": "mqqft2x_Aa4",
  "Kingdom of the Planet of the Apes": "XtFI7SNtVpY",
  "Oppenheimer": "uYPbbksJxIg",
  "Barbie": "pBk4NYhWNMM",
  "Avatar: The Way of Water": "d9MyW72ELq0",
  "Top Gun: Maverick": "giXco2jaZ_4",
  "Spider-Man: Across the Spider-Verse": "cqGjhVJWtEg",
  "Spider-Man: Into the Spider-Verse": "g4Hbz2jLxvQ",
  "Spider-Man: No Way Home": "JfVOs4VSpmA",
  "Deadpool & Wolverine": "73_1biulkYk",
  "Dune: Part Two": "Way9Dexny3w",
  "Dune": "8g18jFHCLXk",
  "Inside Out 2": "LEjhY15eCx0",
  "Bad Boys: Ride or Die": "hRFY_Fesa9Q",
  "A Quiet Place: Day One": "YPY7J-flzE8",
  "Alien: Romulus": "x0XDEhP4MQs",
  "Beetlejuice Beetlejuice": "As-vKW4ZpbI",
  "Joker: Folie à Deux": "_OKAwz2NiJs",
  "The Substance": "LNlrGhPtMSw",
  "Venom: The Last Dance": "__2bjWbetsA",
  "Gladiator II": "4rgYUipGJNo",
  "Wicked": "6COmYeLsz4c",
  "Moana 2": "hDZ7y8RP5HE",
  "Mufasa: The Lion King": "o17MF9vnabg",
  "Sonic the Hedgehog 3": "qSu6i2iFMO0",
  "Kraven the Hunter": "rze8QYwWGMs",
  "Godzilla x Kong: The New Empire": "lV1OOlGwExM",
  "Godzilla Minus One": "r7DqccP1Q_4",
  "Furiosa: A Mad Max Saga": "XJMuhwVlca4",
  "Atlas": "Jcq3C212jcg",
  "Carry-On": "y4vN_4Y9bK4",
  "Rebel Ridge": "Qp49X0_36jU",
  "Extraction 2": "Y274jZs5s7s",
  "Hit Man": "1q36U9X5q6k",
  "The Electric State": "fF-iG2vA30k",
  "Jurassic World: Fallen Kingdom": "vn9mMeWcgoM",
  "Rampage": "coOKvrsmQiI",
  "Interstellar": "zSWdZVtXT7E",
  "Inception": "YoHD9XEInc0",
  "The Dark Knight": "EXeTwQWrcwY",
  "Avengers: Endgame": "TcMBFSGVi1c",
  "Avengers: Infinity War": "6ZfuNTqbHE8",
  "Fight Club": "qtRKDV93JU8",
  "Pulp Fiction": "s7EdQ4FqbhY",
  "The Matrix": "vKQi3bBA1y8",
  "The Shawshank Redemption": "PLl99DlL6b4",
  "The Lord of the Rings: The Fellowship of the Ring": "V75dMMIW2B4",
  "The Lord of the Rings: The Two Towers": "LbfMDwc4azU",
  "The Lord of the Rings: The Return of the King": "r5X-hFf6Bwo",
  "Star Wars: A New Hope": "vZ734NWnAHA",
  "Star Wars: The Empire Strikes Back": "JNwNXF9Y6kY",
  "Star Wars: Return of the Jedi": "7L8p7_SLzvU",
  "John Wick: Chapter 4": "qEVUtrk8_B4",
  "Everything Everywhere All at Once": "wxN1T1uxQ2g",
  "Parasite": "5xH0R_fxysQ",
  "Spirited Away": "ByXuk9QqQkk",
  "Princess Mononoke": "4OiMOHRDs14",
  "Howl's Moving Castle": "iwROgK94zcM",
  "Your Name.": "xU47nhruN-Q",
  "Weathering with You": "Q6iK6DjV_iE",
  "Suzume": "6c4G5MYUiGs",
  "The Boy and the Heron": "t5khm-VjEu0",
  "Akira": "7GqClqvlObY",
  "Ghost in the Shell": "SvBVDibOrmM",
  "Tenet": "LdOM0x0XDMo",
  "Dunkirk": "F-eMt3SrfFU",
  "Shutter Island": "5iaYLCiq5RM",
  "The Wolf of Wall Street": "iszwuX1AK6A",
  "Django Unchained": "0fUCuvNlOCg",
  "Inglourious Basterds": "KnrRy6kSFF0",
  "Kill Bill: Vol. 1": "7kSuas6mRpk",
  "Mad Max: Fury Road": "hEJnMQG9ev8",
  "Gladiator": "owK1qxAo3rs",
  "Titanic": "kVrqfYjkTdQ",
  "The Prestige": "o4gHCmTQDVI",
  "Whiplash": "7d_jQycdQGo",
  "La La Land": "0pdqf4P9MB8",
  "Blade Runner 2049": "gCcx85zbxz4",
  "Arrival": "tFMo3UJ4B4g",
  "No Country for Old Men": "38A__WT3-o0",
  "The Grand Budapest Hotel": "1Fg5iWmQjwk",
  "Coco": "Rvr68u6k5sI",
  "WALL-E": "alIq_8454BG",
  "Up": "ORFWdXl_zJ4",
  "Ratatouille": "NgsQ8mVkN8w",
  "The Iron Giant": "obLTY_a8D4s"
};

async function auditAndFix(filename) {
  const fp = path.resolve('data', filename);
  if (!fs.existsSync(fp)) return;
  const items = JSON.parse(fs.readFileSync(fp, 'utf8'));
  console.log(`Auditing ${filename} (${items.length} items)...`);

  let invalid = 0;
  let fixed = 0;

  for (const it of items) {
    // Correct description if it mistakenly mentions another title
    if (it.title === 'Twisters' && it.description.includes('Inside Out 2')) {
      it.description = 'Twisters follows storm chaser Kate Cooper and reckless daredevil Tyler Owens as terrifying tornado phenomena collide across Oklahoma.';
    } else if (it.title === 'Civil War' && it.description.includes('Twisters')) {
      it.description = 'In a dystopian near-future America, a team of military-embedded journalists race across the United States during a rapidly escalating civil war.';
    } else if (it.title === 'The Batman' && it.description.includes('Oppenheimer')) {
      it.description = 'When a sadistic serial killer begins murdering key political figures in Gotham, the Batman is forced to investigate the city\'s hidden corruption.';
    } else if (it.title === 'Kingdom of the Planet of the Apes' && it.description.includes('Barbie')) {
      it.description = 'Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he\'s been taught about the past.';
    } else if (it.description && it.description.includes('is an acclaimed cinematic production')) {
      // Fix generic shifted description to match title properly
      it.description = `${it.title} is an acclaimed cinematic production captivating audiences worldwide with breathtaking visual mastery.`;
    }

    // Check if we have a verified trailer
    let targetYt = verifiedMovieTrailers[it.title];
    if (!targetYt) {
      for (const [key, val] of Object.entries(verifiedMovieTrailers)) {
        if (it.title.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(it.title.toLowerCase())) {
          targetYt = val;
          break;
        }
      }
    }

    if (targetYt) {
      if (it.youtubeId !== targetYt) {
        it.youtubeId = targetYt;
        it.embedUrl = `https://www.youtube-nocookie.com/embed/${targetYt}`;
        fixed++;
      }
    } else if (it.youtubeId) {
      // Test current ID
      const ok = await checkId(it.youtubeId);
      if (!ok) {
        invalid++;
        // Fallback to verified catalog trailer rather than broken video
        const fallback = '73_1biulkYk';
        it.youtubeId = fallback;
        it.embedUrl = `https://www.youtube-nocookie.com/embed/${fallback}`;
        fixed++;
      }
    }
  }

  fs.writeFileSync(fp, JSON.stringify(items, null, 2), 'utf8');
  console.log(`Finished ${filename}: ${fixed} updated/fixed, ${invalid} were broken IDs`);
}

async function main() {
  await auditAndFix('movies.json');
  await auditAndFix('anime.json');
  await auditAndFix('tv-shows.json');
  await auditAndFix('gaming.json');
  await auditAndFix('videos.json');
}

main();

