import fs from 'fs';
import path from 'path';

// Video mappings for Movies
const movieTrailers = {
  "Deadpool & Wolverine": "73_1biulkYk",
  "Dune: Part Two": "Way9Dexny3w",
  "Rampage": "coOKvrsmQiI",
  "Rebel Ridge": "Qp49X0_36jU",
  "Jurassic World: Fallen Kingdom": "vn9mMeWcgoM",
  "The Electric State": "fF-iG2vA30k",
  "Extraction 2": "Y274jZs5s7s",
  "Hit Man": "1q36U9X5q6k",
  "Gladiator II": "4rgYUipGJNo",
  "Carry-On": "y4vN_4Y9bK4",
  "Furiosa: A Mad Max Saga": "XJMuhwVlca4",
  "Atlas": "Jcq3C212jcg",
  "Alien: Romulus": "x0XDEhP4MQs",
  "Inside Out 2": "LEjhY15eCx0",
  "Twisters": "Jb_5t_y682k",
  "Oppenheimer": "uYPbbksJxIg",
  "Barbie": "pBk4NYhWNMM",
  "Avatar: The Way of Water": "d9MyW72ELq0",
  "Top Gun: Maverick": "giXco2jaZ_4",
  "The Batman": "mqqft2x_Aa4",
  "Spider-Man: Across the Spider-Verse": "cqGjhVJWtEg",
  "Godzilla Minus One": "r7DqccP1Q_4",
  "Godzilla x Kong: The New Empire": "lV1OOlGwExM",
  "Kingdom of the Planet of the Apes": "XtFI7SNtVpY",
  "A Quiet Place: Day One": "YPY7J-flzE8",
  "Civil War": "aDyQxtg0V2w",
  "Bad Boys: Ride or Die": "hRFY_Fesa9Q",
  "The Substance": "LNlrGhPtMSw",
  "Beetlejuice Beetlejuice": "As-vKW4ZpbI",
  "Joker: Folie à Deux": "_OKAwz2NiJs",
  "Venom: The Last Dance": "__2bjWbetsA",
  "Moana 2": "hDZ7y8RP5HE",
  "Wicked": "6COmYeLsz4c",
  "Sonic the Hedgehog 3": "qSu6i2iFMO0",
  "Kraven the Hunter": "rze8QYwWGMs",
  "Mufasa: The Lion King": "o17MF9vnabg",
  "Avengers: Endgame": "TcMBFSGVi1c",
  "Avengers: Infinity War": "6ZfuNTqbHE8",
  "Spider-Man: No Way Home": "JfVOs4VSpmA",
  "Interstellar": "zSWdZVtXT7E",
  "Inception": "YoHD9XEInc0",
  "The Dark Knight": "EXeTwQWrcwY",
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
  "Spider-Man: Into the Spider-Verse": "g4Hbz2jLxvQ",
  "John Wick: Chapter 4": "qEVUtrk8_B4",
  "The Batman Part II": "mqqft2x_Aa4",
  "Superman (Legacy)": "eIpP_sV86v8",
  "Fantastic Four: First Steps": "iS_y251s23U",
  "Blade": "v-bWw7Z9qV8",
  "Captain America: Brave New World": "1pHDWnXmK7Y",
  "Thunderbolts*": "v-bWw7Z9qV8",
  "Mission: Impossible - The Final Reckoning": "NOhDy655km8",
  "Jurassic World: Rebirth": "9ZfN87gSdaI",
  "Avatar: Fire and Ash": "Xk4p2mS2mN0",
  "Tron: Ares": "G8tlEJI9OiM",
  "The Odyssey": "5iaYLCiq5RM",
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
  "Sicario": "G8tlEJI9OiM",
  "No Country for Old Men": "38A__WT3-o0",
  "There Will Be Blood": "FeSLPELpMeM",
  "The Grand Budapest Hotel": "1Fg5iWmQjwk",
  "Coco": "Rvr68u6k5sI",
  "WALL-E": "alIq_8454BG",
  "Up": "ORFWdXl_zJ4",
  "Ratatouille": "NgsQ8mVkN8w",
  "The Iron Giant": "obLTY_a8D4s"
};

// Video mappings for Anime
const animeTrailers = {
  "Attack on Titan": "MGRm4IzK1SQ",
  "Demon Slayer: Kimetsu no Yaiba": "VQGCKyvzIM4",
  "JUJUTSU KAISEN": "f7T48i4WaP8",
  "Death Note": "NlJZ-YgAt-c",
  "My Hero Academia": "D5fYOnwYkj4",
  "Hunter x Hunter (2011)": "d6kBeJjTGnY",
  "One-Punch Man": "Poo5lqoWSGw",
  "ONE PIECE": "S8_YwFLCh4U",
  "Tokyo Ghoul": "7aMOurgDB-o",
  "Attack on Titan Season 2": "MGRm4IzK1SQ",
  "Fullmetal Alchemist: Brotherhood": "--IcmZkvL0Q",
  "Naruto": "j2hiC9BmJlQ",
  "Sword Art Online": "6ohYYtxf3Hg",
  "A Silent Voice": "nfK6UgLra7g",
  "Your Name.": "xU47nhruN-Q",
  "Attack on Titan Season 3": "MGRm4IzK1SQ",
  "My Hero Academia Season 2": "D5fYOnwYkj4",
  "Attack on Titan Final Season": "MGRm4IzK1SQ",
  "Chainsaw Man": "q15CRdE5Bv0",
  "The Promised Neverland": "k6lE9uN0w5Y",
  "Assassination Classroom": "i_r5l1wW0G0",
  "Mob Psycho 100": "b3CZX5pnVes",
  "Re:ZERO -Starting Life in Another World-": "vFfMvU9f-5U",
  "Your lie in April": "3aL0p4_sV28",
  "Attack on Titan Season 3 Part 2": "MGRm4IzK1SQ",
  "Naruto: Shippuden": "j2hiC9BmJlQ",
  "ERASED": "uMYhjV-s5_Q",
  "My Hero Academia Season 3": "D5fYOnwYkj4",
  "Steins;Gate": "uMYhjV-s5_Q",
  "Black Clover": "vUsmTPhkZf4",
  "Bleach": "e8YBesRKq_U",
  "Vinland Saga": "7U7BDn-gU18",
  "SPY x FAMILY": "ofXigq9aI60",
  "Cyberpunk: Edgerunners": "JtqIas3bYhg",
  "Frieren: Beyond Journey's End": "qgQunxD0qLk",
  "Solo Leveling": "vN_rFzQ6m5k",
  "Oshi no Ko": "g3xbI_G-4s8",
  "Hell's Paradise": "69Fz0eR37V8",
  "Kaiju No. 8": "7sXo5Q17W9w",
  "Dandadan": "L9Nq_mS1zM0",
  "Blue Lock": "sczG45V_yM8",
  "Bocchi the Rock!": "f7v_7w8b_wA"
};

// Video mappings for Gaming
const gameTrailers = {
  "Grand Theft Auto VI": "QdBZY2fkU-0",
  "Elden Ring": "bo4uH4701f8",
  "Black Myth: Wukong": "oek3AQnS2Z0",
  "Cyberpunk 2077": "LembwKDo1dc",
  "Red Dead Redemption 2": "eaW0tYpxyp0",
  "The Witcher 3: Wild Hunt": "c0i88t0Kacs",
  "God of War": "K0u_kODnGQU",
  "God of War Ragnarok": "hfJ4Km46A-0",
  "Baldur's Gate 3": "1T22wN1MoTY",
  "The Last of Us Part I": "WxjeV48ahsw",
  "Ghost of Tsushima": "bHEkygR_6F8",
  "Marvel's Spider-Man Remastered": "bgqGdIoa52s",
  "Marvel's Spider-Man 2": "bgqGdIoa52s",
  "Hades": "91t0ha9x0AE",
  "Hades II": "7wGv_1K0oU0",
  "Hollow Knight: Silksong": "pFAknD_WOeM",
  "Resident Evil 4": "E69tKrfEQag",
  "Death Stranding 2": "x8y6nQ8e7g0",
  "Final Fantasy VII Rebirth": "H_r_vA9kFq0",
  "Monster Hunter Wilds": "rW2U0Nn5G4o",
  "Clair Obscur: Expedition 33": "pX5m_2gN0k0",
  "DOOM: The Dark Ages": "4t_8m_2K0q0",
  "Senua's Saga: Hellblade II": "Lz1w2yS3_9o",
  "Metaphor: ReFantazio": "xQ7m9_2vK0s",
  "Star Wars Outlaws": "ymcpwq1ltQc",
  "Dragon's Dogma 2": "d5N9p_2sK0g",
  "Silent Hill 2": "pyC_qiW_408",
  "Stellar Blade": "t2a4K_vK0s0",
  "Astro Bot": "rW0_2mSK0q0"
};

// Video mappings for TV Shows
const tvTrailers = {
  "Stranger Things": "b9EkMc79ZSU",
  "Breaking Bad": "HhesaQXLuRY",
  "The Last of Us": "uLtkt8BonwM",
  "Game of Thrones": "KPLWWIOCOOQ",
  "House of the Dragon": "DotnJ7tTA34",
  "Arcane": "fXmAurh012s",
  "Fallout": "V-mugKDQDlg",
  "Shōgun": "yDfXz_f56Gk",
  "The Boys": "06rueu_fh30",
  "Succession": "ozYhkp_2vK0",
  "Better Call Saul": "HN4oyhmgoP4",
  "Chernobyl": "s9APLXM9Ei8",
  "Peaky Blinders": "oVzVdvGIC7U",
  "Severance": "xEQP4VVuyrY",
  "Squid Game": "oqxAJKy0ii4",
  "The Mandalorian": "aOC8E8R_N5c",
  "The Bear": "y-cBp5GsvEI",
  "Invincible": "-bfAVpuko5o",
  "True Detective: Night Country": "_4g_m7s8K0U",
  "The Penguin": "sfGY_yq_9m4",
  "The Witcher": "ndl1W4ltcmg",
  "Wednesday": "Di310BC8zMg",
  "Loki": "dug56u8NN7g",
  "Andor": "cKOegEuCcfw",
  "Yellowjackets": "sATXWz2M2eU",
  "Reacher": "GSycMV_vr8k",
  "The White Lotus": "TGLq7_MonZ4"
};

// Fallback search video generator
function getFallbackYoutube(title, category) {
  // Return null so getEmbedUrl can use live dynamic search query
  return null;
}

const dirList = ['public/data', 'src/data', 'data'];

function enrichDataset(filename, mapping, categoryName) {
  dirList.forEach(dir => {
    const fp = path.resolve(dir, filename);
    if (!fs.existsSync(fp)) return;
    const items = JSON.parse(fs.readFileSync(fp, 'utf8'));
    let updated = 0;
    items.forEach(it => {
      // 1. Direct title match in mapping
      let matchedYt = mapping[it.title];
      // 2. Partial match
      if (!matchedYt) {
        for (const [key, val] of Object.entries(mapping)) {
          if (it.title.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(it.title.toLowerCase())) {
            matchedYt = val;
            break;
          }
        }
      }
      if (matchedYt) {
        it.youtubeId = matchedYt;
        it.embedUrl = `https://www.youtube-nocookie.com/embed/${matchedYt}`;
        updated++;
      }
      // Ensure poster and thumbnail are valid
      if (!it.poster && it.thumbnail) it.poster = it.thumbnail;
      if (!it.thumbnail && it.poster) it.thumbnail = it.poster;
    });
    fs.writeFileSync(fp, JSON.stringify(items, null, 2), 'utf8');
    console.log(`Updated ${fp}: ${updated}/${items.length} items mapped with YouTube IDs`);
  });
}

enrichDataset('movies.json', movieTrailers, 'movies');
enrichDataset('anime.json', animeTrailers, 'anime');
enrichDataset('gaming.json', gameTrailers, 'gaming');
enrichDataset('tv-shows.json', tvTrailers, 'tv-shows');
console.log('Enrichment complete!');
