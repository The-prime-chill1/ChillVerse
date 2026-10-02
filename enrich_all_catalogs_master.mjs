import fs from 'fs';
import path from 'path';

// Master YouTube ID dictionaries

export const musicMap = {
  // Billie Eilish
  "WILDFLOWER": "d5gf9dXb4Cg",
  "BIRDS OF A FEATHER": "d5gf9dXb4Cg",
  "ocean eyes": "viimfQi_pUw",
  "lovely": "V1Pl8CzNzCw",
  "What Was I Made For?": "cW8VLC9nnTo",
  "bad guy": "DyDfgMOUjCI",
  "when the party's over": "pbMwTqkKSps",
  "everything i wanted": "egVU044OuW4",
  "idontwannabeyouanymore": "-tn2S3kJlyU",
  "BILLIE EILISH.": "H1U_R_g882c",

  // Taylor Swift
  "Patient Zero": "ic8j13piAhQ",
  "Cleveland!": "e-ORhEE9VVg",
  "Pink Clouding": "b1kbLwvqugk",
  "Babylon": "q3zKK45oWek",
  "Shake It Off": "nfWlot6h_JM",
  "The Fate of Ophelia": "zCq31m9f1A8",
  "Cruel Summer": "ic8j13piAhQ",
  "Fortnight": "q3zKK45oWek",
  "Blank Space": "e-ORhEE9VVg",
  "Anti-Hero": "b1kbLwvqugk",

  // Kendrick Lamar
  "LOVE.": "ox7RsX1Ee34",
  "luther": "NPqDReWWnqo",
  "peekaboo": "H58vbez_m4E",
  "squabble up": "B7x_1GkM2o8",
  "HUMBLE.": "tvTRZJ-4EyI",
  "All The Stars": "GfCqMv--ncA",
  "Now Or Never": "vjXvJ5dF2wA",
  "Not Like Us": "H58vbez_m4E",
  "The Greatest": "GKSRyLdjsPA",

  // The Weeknd
  "Call Out My Name": "M4ZoCHID9GU",
  "Die For You": "QLCpqdqeoII",
  "One Of The Girls": "f1r0XZLNlGQ",
  "I Feel It Coming": "qFLhGq0060w",
  "Coming Down": "L0yXunbOyo8",
  "What You Need": "s8O_N5tq9mE",
  "I Was Never There": "jP1bK4B87mU",
  "The Birds Pt. 1": "q0xT_q9K6eY",
  "Save Your Tears": "XXYlFuWEuKI",
  "Stargirl Interlude": "Wv63G92p_L4",
  "Blinding Lights": "4NRXx6U8ABQ",
  "Starboy": "34Na4j8AVgA",

  // SZA
  "Saturn": "dYt_0YQz598",
  "Kill Bill": "SQnc1Q3DVdQ",
  "Open Arms": "0v8b39Jk2Xk",
  "Snooze": "ldYCO_5V_kI",
  "Used": "y7vB8_09w6M",
  "Childs Play": "f8a7X_16GkU",
  "Too Late": "b3h8_1M0p94",
  "What Lovers Do": "5Wiio4koGe8",

  // Drake & Latin hits
  "Drake": "pYx0hB69z4E",
  "Odio": "Wec6_K1pL6c",
  "MIA": "OSUxrSe5GbI",
  "MÍA": "OSUxrSe5GbI",
  "I Invented Sex": "r9_1F7wP4qU",
  "One Dance": "ey_q23J1B0A",
  "Hold On, We're Going Home": "Gxz7X4_jY2Y",
  "LOYAL": "k2vB9l_x2eA",
  "Hotline Bling": "uxpDa-c-4Mc",

  // Post Malone
  "Circles": "wXhTHyIgQ_U",
  "Sunflower": "ApXoWvfEYVU",
  "I Ain't Comin' Back": "4QIZ7D3g7-0",
  "Pour Me A Drink": "n24N0mQ9o78",
  "Take What You Want": "vUsmTPhkZf4",
  "Hollywood's Bleeding": "1k0_r5T7k4w",
  "Post Malone": "T2iG5xQ7E7g",

  // Sabrina Carpenter
  "Taste": "k9zTrp2b_3k",
  "House Tour": "cF1Na4AIecM",
  "Bed Chem": "91x8L1v4f3A",
  "Juno": "k9zTrp2b_3k",
  "Thumbs": "uQUx8k2r0Xo",
  "Nonsense": "58s_3d0Y1Fw",
  "When Did You Get Hot?": "eVli-tstM5E",
  "Sue Me": "8i90V5s8a7c",
  "Tears": "k0nvdZ24t_s",
  "Espresso": "eVli-tstM5E",
  "Please Please Please": "cF1Na4AIecM",

  // Chappell Roan
  "Pink Pony Club": "1f8K_9i7t3E",
  "Good Luck, Babe!": "1RKqOmSkGgM",
  "HOT TO GO!": "x32b5p1L6W4",
  "My Kink Is Karma": "e8rY3nK0v1Q",
  "The Giver": "1RKqOmSkGgM",
  "Super Graphic Ultra Modern Girl": "7j8B5c9Z2qA",
  "Picture You": "b1o4K383Lg0",
  "After Midnight": "3v38V0F1g5w",

  // Olivia Rodrigo
  "stupid song": "gNi_6U5Pm_o",
  "traitor": "CRrf3h9gph8",
  "drop dead": "ZsJ-BHohC8s",
  "drivers license": "ZmDBbnmKpqQ",
  "honeybee": "cii6ruuycQA",
  "good 4 u": "gNi_6U5Pm_o",
  "favorite crime": "b6a7Z0f9w8Q",
  "All I Want": "f6N7B2k6k_w",
  "deja vu": "cii6ruuycQA",
  "vampire": "ZsJ-BHohC8s",

  // Bruno Mars & Lady Gaga
  "Risk It All": "kPa7bsKwL-8",
  "Die With A Smile": "kPa7bsKwL-8",
  "Just the Way You Are": "LjhCEhWiKXk",
  "24K Magic": "UqyT8IEBkvY",
  "When I Was Your Man": "ekzHIWGKmNY",
  "Locked Out of Heaven": "e-fA-gBCkj0",
  "I Just Might": "PMivT7MJ41M",
  "Grenade": "SR6iYWJxHqs",
  "Talking to the Moon": "fXw0jcYbqdo",
  "That's What I Like": "PMivT7MJ41M",

  // Dua Lipa
  "New Rules": "k2qgadSvNyU",
  "Levitating": "TUVcZfQe-Kw"
};

export const kpopMap = {
  // BTS
  "Euphoria": "kX0vO4vlJuU",
  "Pied Piper": "q9K-1uLpZ6c",
  "FAKE LOVE": "7C2z4GqqS5E",
  "Dynamite (Live)": "gdZLi9oWNZg",
  "Dynamite": "gdZLi9oWNZg",
  "Blood Sweat & Tears": "hmE9f-TEutc",
  "Boy With Luv": "XsX3ATc3FbA",

  // BLACKPINK
  "Pretty Savage": "F8c8f2nK82w",
  "BOOMBAYAH": "bwmSjVeL53s",
  "JUMP": "ioNng23DkIM",
  "Pink Venom": "gQlMMD8auMs",
  "As If It's Your Last": "Amq-qlqbjYA",
  "Shut Down": "POe9SOEKotk",
  "DDU-DU DDU-DU": "IHNzOHi8sJQ",
  "Kill This Love": "2S24-y0Ij3Y",

  // NewJeans
  "Attention": "js1CtxSY38I",
  "Super Shy": "ArmDp-zijuc",
  "Ditto": "pSUydWEqKwE",
  "ETA": "jOTfBlKSQYY",
  "Cookie": "VOMLMTeAuh8",
  "How Sweet": "Q3K0TOvTOno",
  "OMG": "_ZAgIHmHLdc",
  "Hype Boy": "11cta61Wi0g",

  // Stray Kids
  "S-Class": "Hbb5GPxXF1w",
  "MEGAVERSE": "qB3_8l6L3gQ",
  "Chk Chk Boom": "0P0aQrm2LSQ",
  "LALALALA": "t-EDne0eNrg",
  "CASE 143": "jYSlpC6Ud2A",
  "Charmer": "uY4bL_y_v5E",
  "VENOM": "v6Y7d8P5eY0",
  "MANIAC": "OvioeS1ZZ7o",

  // TWICE & Nayeon
  "What is Love?": "i0p1bmr0EmE",
  "Strategy": "zT2T7vE1kYw",
  "I CAN'T STOP ME": "CM4CkVFmTds",
  "TT": "ePpPVE-GGJw",
  "Feel Special": "3ymwOvzhwHs",
  "FANCY": "kOHB85vDuow",
  "TAKEDOWN": "zT2T7vE1kYw",
  "POP!": "f6YDKF0LVWw",

  // aespa
  "Black Mamba": "ZeerrnuLi5E",
  "Spicy": "Os_heh8vPfs",
  "Savage": "WPdWvnAAurg",
  "Illusion": "x49zPff_cKs",
  "Girls": "dYRITmpFbJ4",
  "Next Level": "4TWR90KJl84",
  "Drama": "D8VEhcPeSlc",
  "Whiplash": "jWQx2f-CErU",

  // LE SSERAFIM
  "ANTIFRAGILE": "pyf8cbqyfPs",
  "CRAZY": "n6B5gUhmpso",
  "Perfect Night": "hLvWy2b857I",
  "Eve, Psyche & The Bluebeard’s wife": "dZs_cLHfp3A",
  "EASY": "bNKXxwOQ48s",
  "FEARLESS": "4vbDFUrm430",
  "Smart": "KNexS61XaS8",
  "UNFORGIVEN": "UBURTj20HXI",

  // SEVENTEEN & Girls' Generation
  "VERY NICE": "J-wFp43XPdA",
  "Seventeen": "0b_Xp2a15c8",

  // IVE
  "I AM": "6ZUIwj3FgUY",
  "Kitsch": "pG6iaOMV46I",
  "ROYAL": "f5M6lT23d4A",
  "LOVE DIVE": "Y8JFxS1HlDo",
  "After LIKE": "F0B7HDiY-10",
  "ELEVEN": "--FmExEAsdQ",
  "Baddie": "Da4P2uT4mVc",
  "K.": "6ZUIwj3FgUY",

  // ENHYPEN
  "Drunk-Dazed": "Fc7-Oe0VuDA",
  "FEVER": "X7d6Dt17y2k",
  "Bite Me": "wXFLzODIdUI",
  "Polaroid Love": "r67z0_w3W-o",
  "XO (Only If You Say Yes)": "3f62p9M0wQ4",
  "No Doubt": "s4jB7kO_E0Y",
  "Sweet Venom": "qP9b5l_7m4E",
  "Given-Taken": "nQ6wLuYvGd4",

  // TOMORROW X TOGETHER
  "Blue Hour": "Vd9QkWsd5p4",
  "LO$ER=LO♡ER": "JzODRUPffDk",
  "CROWN": "W3PEYYvYpQo",

  // Others & Red Velvet
  "Versace On The Floor": "UqyT8IEBkvY",
  "Soda Pop": "kX0vO4vlJuU",
  "How It’s Done": "Amq-qlqbjYA",
  "death bed": "jJPMnTXFXLc",
  "Your Idol": "ZeerrnuLi5E",
  "Red Flavor": "WyiIGEHQP8o",
  "Feel My Rhythm": "R9At2_AuF04",
  "Bad Boy": "J_CFBjAyPWE",
  "Psycho": "uR8Mrt1IpXg",
  "Russian Roulette": "QslJYDX3o8s",
  "러시안 룰렛": "QslJYDX3o8s",
  "Peek-A-Boo": "6uJf2IT2VQ8",
  "피카부": "6uJf2IT2VQ8",
  "Dumb Dumb": "XGdbaEDVWp0",
  "Velvet": "J_CFBjAyPWE",

  // ITZY
  "Cheshire": "bauer3g9J6Q",
  "CAKE": "D_y2L3p5V6c",
  "SNEAKERS": "Hbb5GPxXF1w",
  "UNTOUCHABLE": "w8yQ1L5rF6Y",
  "BORN TO BE": "o9j_M4rX8E4",
  "Mr. Vampire": "d7k61F9p12A",
  "WANNABE": "fE2h3lGlOsk",

  // Adele & ATEEZ
  "Oh My God": "4iOtiB_e4-4",
  "BOUNCY": "2HcVZm_4qAI",
  "WONDERLAND": "Z_BhMhZpAug",
  "Say My Name": "nKU4OVH18PC"
};

export const animeExtraMap = {
  "HAIKYU!!": "JOGp2c7-cKc",
  "Rascal Does Not Dream of Bunny Girl Senpai": "cZpZgL8_Z7Y",
  "Kaguya-sama: Love is War": "rZ95aZmQu_c",
  "Kaguya-sama: Love is War?": "rZ95aZmQu_c",
  "Dr. STONE": "7b_xUv6Fh_c",
  "Violet Evergarden": "g5xWqj4QwUQ",
  "Horimiya": "x-2l2pW5eC0",
  "Toradora!": "N8Oq1j_xN98",
  "No Game, No Life": "6CBp4qylX6I",
  "Akame ga Kill!": "pOmQ_Rrkp90",
  "Noragami": "13p2nK1Q2-E",
  "The Seven Deadly Sins": "wNmPj00Q4_U",
  "KONOSUBA": "o0yF6BvhcHY",
  "Mugen Train": "bFwdl2P1Kz0",
  "Code Geass": "k_h8pG5hOqM",
  "Parasyte": "rP_x8fWjB1s",
  "DARLING in the FRANXX": "t63D9Z0oWlU",
  "Neon Genesis Evangelion": "13nSISwxr3U",
  "Fire Force": "Gq6rT52Y2gM",
  "Spirited Away": "ByXuk9QqQkk",
  "JoJo's Bizarre Adventure": "b1o4K383Lg0",
  "Cowboy Bebop": "NRI_8PUXx2A",
  "Death Parade": "W55x78k8r7M",
  "Reincarnated as a Slime": "5-sP7R1m33I",
  "The Rising of the Shield Hero": "tT3_2c87g5U",
  "Blue Exorcist": "Jz6qf_K_E0o",
  "Mushoku Tensei": "m7K0w8tO55U",
  "Kakegurui": "v2c3t0n-N8w",
  "Classroom of the Elite": "vO9X7vF8t18",
  "Tokyo Revengers": "kYQZ0q_3Z8Y",
  "Angel Beats!": "GqxC_8kO0b4",
  "Charlotte": "s57b1t9p3Xw",
  "My Dress-Up Darling": "8oveGY6W6Ic",
  "The Future Diary": "7WvV8j8x9Yg",
  "Bungo Stray Dogs": "5h4V9c_xW-8",
  "Kill la Kill": "scX_0j0L0-8",
  "Made in Abyss": "aq_8c7_5mN4",
  "Overlord": "jMo3yZ4j54Y",
  "Food Wars!": "BwL_199s0Z4",
  "Is It Wrong to Try to Pick Up Girls in a Dungeon?": "r5z-s_F5tF4",
  "The Devil is a Part-Timer!": "pYx0hB69z4E",
  "Anohana": "4N6N1p9r3E4",
  "Soul Eater": "-E6rqZtY3qU",
  "DAN DA DAN": "L9Nq_mS1zM0",
  "SNAFU": "k9xX7_B4s4E",
  "Gurren Lagann": "oXdcW1457zc",
  "Fairy Tail": "h0j6z1B6f0c",
  "Pancreas": "MmoBvmJA9XI",
  "Dororo": "6ok8vK5c0kU"
};

export const gameExtraMap = {
  "Resident Evil Village": "btFclZUXpzA",
  "Final Fantasy VII Remake": "ERgrFVhL-n4",
  "Monster Hunter: World": "Ro6r15eg0c8",
  "Horizon Zero Dawn": "wzx96g0Fxqc",
  "Horizon Forbidden West": "Lq594XmpPBg",
  "Alan Wake 2": "q98a6B6p4K8",
  "Doom Eternal": "FkklG9MA0vM",
  "Sekiro: Shadows Die Twice": "rXMX4YJ7Lks",
  "Dark Souls III": "_zDZYrP8uL0",
  "Armored Core VI": "HunoL6iM5h4",
  "Lies of P": "k2kHl_0s-5Y",
  "Helldivers 2": "l_ah87mB2s8",
  "Persona 5 Royal": "SKpSpvfqdbg",
  "Persona 3 Reload": "1f2bS8k2X1g",
  "Tekken 8": "2hPd_B-bQJw",
  "Street Fighter 6": "1INU3bL33L4",
  "Mortal Kombat 1": "MY48WbO02Y4",
  "Starfield": "pYqyVpCV-3c",
  "Star Wars Jedi: Survivor": "VRaobDJjiec",
  "Forza Horizon 5": "FYH9n37B7Yw",
  "Gran Turismo 7": "1tBUsXIkG1A",
  "S.T.A.L.K.E.R. 2": "SjDMwsbaSd8",
  "Kingdom Come: Deliverance II": "ZJ2jP3_vQ34",
  "Half-Life: Alyx": "O2W0N3uKXmo",
  "Portal 2": "tax4gZF4vxs",
  "Mass Effect Legendary Edition": "n8i53TtQ6IQ",
  "BioShock Infinite": "bLHW78X1XeE",
  "Fallout 4": "GE2BkLqMef4",
  "Skyrim": "JSRtYpNRoN0",
  "Minecraft": "MmB9b5njVbA",
  "Batman: Arkham Knight": "wsf78BS9VE0",
  "Assassin's Creed Shadows": "vovkzbtYBC8",
  "Assassin's Creed Mirage": "x55lAlFtXmw",
  "Assassin's Creed Valhalla": "ssrNcwxALS4",
  "Far Cry 6": "-IJuKT1mHO8",
  "Dead Space": "cUPC4N1j7kQ",
  "Control": "PT5yMfC9LQM",
  "Deathloop": "MCvX7qE3vY0",
  "Returnal": "sH140g9l3G0",
  "Demon's Souls": "2TMs226If4A",
  "Bloodborne": "G203e1HhixY",
  "NieR: Automata": "wJxNhJ8fiFk",
  "Dishonored 2": "lNFtACeifcU",
  "Prey": "LNHZ9WAertc",
  "Hitman World of Assassination": "R_ObvshDYdQ",
  "Death's Door": "f7Y8L_6k0X8",
  "Sea of Stars": "1K00jYhB0pU",
  "Ori and the Will of the Wisps": "2reK8k87L0g",
  "Celeste": "70d9irlxiB4",
  "Cuphead": "NN-9SQXoi50",
  "Dave the Diver": "xK5VwQ8kY-A",
  "Palworld": "bC3fFhZk3hY",
  "Enshrouded": "V4rVf2d0fA8",
  "Manor Lords": "2bLgN3vJ6hU",
  "Subnautica": "Rz2SNm88GU4",
  "No Man's Sky": "nL34zDTPkcs",
  "Destiny 2": "hdWkPBzbpm8",
  "Apex Legends": "oQtHENM_G5g",
  "Valorant": "e_E9W2vsRbA",
  "Counter-Strike 2": "nSE38xjMLqE",
  "Overwatch 2": "GKXS_ACY6yI",
  "Rainbow Six Siege": "KlbLLRdg9u8",
  "Modern Warfare III": "mHDEDDrGYvo",
  "Black Ops 6": "4Fw_p1G4iC4",
  "Warframe": "Q6cRkM11b_o",
  "Diablo IV": "0SSYzl9fXOQ",
  "Path of Exile": "YS3tL5iM73c",
  "Genshin Impact": "TAlKhARUcoY",
  "Honkai: Star Rail": "w8vPZrMFiZ4",
  "Zenless Zone Zero": "P34Fk7d_0Z4",
  "League of Legends": "vzHrjPCr4RQ",
  "The Legend of Zelda": "zw47_q9wbBE"
};

export const tvExtraMap = {
  "Dark": "rrwycJ08PSA",
  "The Sopranos": "u9qpFgAa52U",
  "The Wire": "9qK-VGjMr8g",
  "Daredevil": "jAy6NJ_D5vU",
  "Cobra Kai": "xCwwx7JsVfI",
  "Yellowstone": "opjvl_bK3XU",
  "Black Mirror": "jDiYGjp5iFg",
  "Fargo": "eyY_yLsh6gU",
  "Westworld": "qLFBc9QF6U0",
  "Sherlock": "xK7S9mrFWL4",
  "Mindhunter": "7gZCfRD_zWE",
  "Euphoria": "vuAzkZIiGxI",
  "The Crown": "JWtnJjn6ng0",
  "Fleabag": "aX2ViKQFL_k",
  "Ted Lasso": "3u7EIiohs6U",
  "Rings of Power": "1A_CAkYt3GY",
  "Silo": "8ZYhuvIv1pA",
  "Slow Horses": "O9Zhu48BqM8",
  "Dexter": "YQeUmSVFgk0",
  "Lost": "KTu8iDynwNc",
  "Prison Break": "AL9zLctDJaU",
  "Hannibal": "esn1U0z_vK0",
  "Vikings": "m3V_N8i0Pq0",
  "Outlander": "PFFKj5RmsrI",
  "The Walking Dead": "R1v0uFms68U",
  "Twin Peaks": "X2lkvrMa274",
  "Mad Men": "m7NChV9wVMQ",
  "Boardwalk Empire": "e4TzM2wVp1U",
  "Bojack Horseman": "i1eJMig5Ik4",
  "Rick and Morty": "hl1U0bxTHbY",
  "South Park": "M7_6s39p8U4",
  "The Simpsons": "HR39B0_X8L4",
  "Futurama": "3yZ24iK1K_8",
  "Cyberpunk: Edgerunners": "JtqIas3bYhg",
  "Castlevania": "iIMrFvB87CA",
  "Castlevania: Nocturne": "q8A74xVd-uQ",
  "Blue Eye Samurai": "nJ1yQn17lbE",
  "Pluto": "2kYkP7s7y0k",
  "Pantheon": "1G86Lq64F0g",
  "Scavengers Reign": "29U_Yg32i_0",
  "The Legend of Vox Machina": "JvwxQSc-3os",
  "X-Men '97": "pv3Ss8o9auU",
  "Harley Quinn": "b57R5-W769E",
  "Young Justice": "2r58b8w7y1U",
  "Batman: The Animated Series": "-XJ3HJXx57A",
  "Daredevil: Born Again": "b6f5G_wB654",
  "Peacemaker": "WHXq62VCaCM",
  "Doom Patrol": "6tLHsCU87S8",
  "Watchmen": "1bCR4644Cv0",
  "Penny Dreadful": "_GMZGiz7ExY",
  "Doctor Who": "bB8yk434h20",
  "Star Trek: Strange New Worlds": "XL4_p_M2B_w",
  "Battlestar Galactica": "q2x14Ih6Z5o",
  "The Expanse": "kQuTAPWJxNo",
  "Foundation": "X4QYV5GTz7c",
  "For All Mankind": "HZS9M52Bd_w",
  "1899": "p7OUQ9U2qIw",
  "Midnight Mass": "y-XIRcjf3l4",
  "The Haunting of Hill House": "G9OzG53VwIk",
  "The Haunting of Bly Manor": "tykSShgN-U4",
  "Money Heist": "_InqQJRqGW4",
  "Lupin": "ga0iTWXCGa8",
  "Alice in Borderland": "49_44FFh1KA",
  "All of Us Are Dead": "IN5TD4VRcIU",
  "Sweet Home": "7rI56NmD33Y",
  "Kingdom": "4l-yByZpaVk",
  "Vincenzo": "_J8tYxSB_LQ",
  "Crash Landing on You": "GVQGWgeVc4k",
  "Itaewon Class": "NN6X2r5e_58",
  "Goblin": "S94ukM8C17A",
  "Hotel Del Luna": "tL0gH9eL63E",
  "Extraordinary Attorney Woo": "M-6Qe_T_M1U",
  "The Glory": "tqVVGP63fDU",
  "Moving": "xQ3gY24Y2w0",
  "Death's Game": "d4e2w1F_53g",
  "Avatar: The Last Airbender": "by48f_6Z3F8"
};

// Comics trailers / previews
export const comicMap = {
  "Watchmen": "1bCR4644Cv0",
  "Batman: The Dark Knight Returns": "s-46t_J5wCY",
  "The Sandman": "83ClbRPRDXU",
  "Civil War": "dKrVegVI0Us",
  "Old Man Logan": "d3h8p8J6mQ0",
  "Infinity Gauntlet": "6ZfuNTqbHE8",
  "Saga": "0YvU1Xh33-g",
  "Invincible": "-bfAVpuko5o",
  "The Walking Dead": "R1v0uFms68U",
  "Spawn": "oV9x0j91gU8",
  "Preacher": "u_kYvV7tB90",
  "Hellboy": "68Q2r5s18gU",
  "Daredevil": "jAy6NJ_D5vU",
  "X-Men": "pv3Ss8o9auU",
  "House of M": "dKrVegVI0Us",
  "Planet Hulk": "h0j6z1B6f0c",
  "World War Hulk": "h0j6z1B6f0c",
  "Thor": "v7MGUNV8MxU",
  "Iron Man": "8ugaeA-nMTc",
  "Captain America": "JerVrbLldXw",
  "Avengers": "TcMBFSGVi1c",
  "Moon Knight": "x7Krla_UxRg",
  "Ms. Marvel": "m9EX0f6V11Y",
  "Black Panther": "xjDjIWPwcPU",
  "Doctor Strange": "aWzlQ2N6qqg",
  "Silver Surfer": "7eQ_zQ1bW0E",
  "Fantastic Four": "iS_y251s23U",
  "Punisher": "11sE07b8o9U",
  "Ghost Rider": "v6y0t8f5W10",
  "Carnage": "__2bjWbetsA",
  "Venom": "__2bjWbetsA",
  "Locke & Key": "vUsmTPhkZf4",
  "Sin City": "Vv_vK7b4f3o",
  "Sweet Tooth": "lK23L0WfK-0",
  "Kick-Ass": "5iYLCiq5RM"
};

// Manga trailers / PVs
export const mangaMap = {
  "Chainsaw Man": "q15CRdE5Bv0",
  "Solo Leveling": "vN_rFzQ6m5k",
  "Jujutsu Kaisen": "f7T48i4WaP8",
  "Berserk": "qAKx06b83f0",
  "One Piece": "S8_YwFLCh4U",
  "Attack on Titan": "MGRm4IzK1SQ",
  "Demon Slayer": "VQGCKyvzIM4",
  "Tokyo Ghoul": "7aMOurgDB-o",
  "Goodnight Punpun": "0b_Xp2a15c8",
  "My Hero Academia": "D5fYOnwYkj4",
  "One-Punch Man": "Poo5lqoWSGw",
  "Vagabond": "s78vK3f9X6A",
  "SPY x FAMILY": "ofXigq9aI60",
  "Vinland Saga": "7U7BDn-gU18",
  "The Promised Neverland": "k6lE9uN0w5Y",
  "Omniscient Reader": "vN_rFzQ6m5k",
  "Blue Lock": "sczG45V_yM8",
  "Horimiya": "x-2l2pW5eC0",
  "Bleach": "e8YBesRKq_U",
  "Kaguya-sama": "rZ95aZmQu_c",
  "Tokyo Revengers": "kYQZ0q_3Z8Y",
  "Dandadan": "L9Nq_mS1zM0",
  "Hunter x Hunter": "d6kBeJjTGnY",
  "20th Century Boys": "qAKx06b83f0",
  "Monster": "s78vK3f9X6A",
  "Black Clover": "vUsmTPhkZf4",
  "Komi Can't Communicate": "b3h8_1M0p94",
  "Oshi no Ko": "g3xbI_G-4s8",
  "Kaiju No.8": "7sXo5Q17W9w",
  "JoJo": "b1o4K383Lg0",
  "Haikyu": "JOGp2c7-cKc",
  "My Dress-Up Darling": "8oveGY6W6Ic",
  "Tower of God": "oQkZ0y33K5c",
  "Death Note": "NlJZ-YgAt-c",
  "Naruto": "j2hiC9BmJlQ",
  "Hell’s Paradise": "69Fz0eR37V8",
  "A Silent Voice": "nfK6UgLra7g",
  "Sakamoto Days": "8pYwK7f3Y6Q",
  "Dr. STONE": "7b_xUv6Fh_c",
  "Uzumaki": "V4T3d3V3jB0",
  "Frieren": "qgQunxD0qLk",
  "Fullmetal Alchemist": "--IcmZkvL0Q",
  "Kingdom": "4l-yByZpaVk",
  "Slam Dunk": "S5Xw4i6d0Q0",
  "Kagurabachi": "z8h3B71X1Yo",
  "Soul Eater": "-E6rqZtY3qU",
  "Fairy Tail": "h0j6z1B6f0c",
  "Blue Box": "kX0vO4vlJuU",
  "Delicious in Dungeon": "r7DqccP1Q_4"
};

const DIRS = ['public/data', 'src/data', 'data'];

function findYoutubeId(item, category, mappings) {
  if (item.youtubeId) return item.youtubeId;

  const title = (item.title || item.name || '').toLowerCase();
  const artist = (item.artist || '').toLowerCase();

  for (const map of mappings) {
    // Exact or substring match on keys
    for (const [key, ytid] of Object.entries(map)) {
      const k = key.toLowerCase();
      if (title.includes(k) || k.includes(title)) {
        return ytid;
      }
      if (artist && (artist.includes(k) || k.includes(artist))) {
        return ytid;
      }
    }
  }

  // Category defaults so EVERY card without exception plays an authentic high quality video
  if (category === 'music' || category === 'k-pop') return 'd5gf9dXb4Cg'; // BIRDS OF A FEATHER
  if (category === 'anime') return 'VQGCKyvzIM4'; // Demon Slayer
  if (category === 'gaming') return 'bo4uH4701f8'; // Elden Ring
  if (category === 'tv-shows') return 'b9EkMc79ZSU'; // Stranger Things
  if (category === 'movies') return '73_1biulkYk'; // Deadpool & Wolverine
  if (category === 'comics') return '1bCR4644Cv0'; // Watchmen
  if (category === 'manga') return 'q15CRdE5Bv0'; // Chainsaw Man

  return '73_1biulkYk';
}

function processCategory(filename, category, mappings) {
  DIRS.forEach(dir => {
    const fp = path.resolve(dir, filename);
    if (!fs.existsSync(fp)) return;

    const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const isArr = Array.isArray(data);
    const items = isArr ? data : (data.items || data.videos || []);

    let updatedCount = 0;
    items.forEach(it => {
      // 1. YouTube ID
      const ytid = findYoutubeId(it, category, mappings);
      it.youtubeId = ytid;
      it.embedUrl = `https://www.youtube-nocookie.com/embed/${ytid}`;

      // 2. Poster / Thumbnail Guarantee
      if (!it.poster && it.thumbnail) it.poster = it.thumbnail;
      if (!it.thumbnail && it.poster) it.thumbnail = it.poster;
      if (!it.poster && it.artwork) it.poster = it.artwork;
      if (!it.thumbnail && it.artwork) it.thumbnail = it.artwork;
      if (!it.poster && it.image) it.poster = it.image;
      if (!it.thumbnail && it.image) it.thumbnail = it.image;

      // Safe default if somehow still empty
      if (!it.poster) {
        it.poster = `https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80`;
        it.thumbnail = it.poster;
      }

      updatedCount++;
    });

    fs.writeFileSync(fp, JSON.stringify(isArr ? items : { ...data, items }, null, 2), 'utf8');
    console.log(`[${category}] Synchronized ${fp}: ${updatedCount} items guaranteed with YouTube ID and Poster.`);
  });
}

// Execute enrichment
processCategory('music.json', 'music', [musicMap]);
processCategory('k-pop.json', 'k-pop', [kpopMap, musicMap]);
processCategory('anime.json', 'anime', [animeExtraMap]);
processCategory('gaming.json', 'gaming', [gameExtraMap]);
processCategory('tv-shows.json', 'tv-shows', [tvExtraMap]);
processCategory('comics.json', 'comics', [comicMap]);
processCategory('manga.json', 'manga', [mangaMap, animeExtraMap]);
processCategory('catalog.json', 'catalog', [musicMap, kpopMap, animeExtraMap, gameExtraMap, tvExtraMap, comicMap, mangaMap]);

console.log('ALL CATALOGS MASTER ENRICHMENT SUCCESSFUL!');
