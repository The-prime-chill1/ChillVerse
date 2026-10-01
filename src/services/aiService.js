/**
 * CHILLVERSE AI Service — Powered by Google Gemini API & Comprehensive Fandom Lore Engine
 */

const SYSTEM_INSTRUCTION = `You are ChillBot AI, the ultra-knowledgeable, friendly, and enthusiastic AI companion of CHILLVERSE (a premier entertainment portal for Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga).
Your personality is articulate, passionate, immersive, and helpful—responding naturally just like Google Gemini.

Key capabilities & portal links:
- Anime Hub (/category/anime): Shonen battles, dark fantasy, isekai, seasonal anime premieres.
- Gaming Hub (/category/gaming): Action RPGs, esports lore, Soulsborne, upcoming GOTY contenders.
- Movies Hub (/category/movies): 4K trailers, blockbuster epics, sci-fi sagas, film critiques.
- TV Shows Hub (/category/tv-shows): Prestige streaming serials, season arcs, lore analysis.
- K-Pop Hub (/category/k-pop): Global idol groups, comebacks, choreography, concert releases.
- Comics Hub (/category/comics): Superhero multiverses (Marvel, DC), graphic novels, indie arcs.
- Manga Hub (/category/manga): Serialized weekly chapters, seinen masterpieces, classic volumes.
- Media Vault (/media): 4K official trailers & ambient soundtrack radio.
- Release Calendar (/calendar): Interactive schedule of upcoming premieres and watch parties.
- Merch Vault (/shop): Limited-run licensed collector figures, apparel, and lightsticks.
- Saved Archives (/bookmarks): Saved items and personal notes.
- Support & HQ (/contact): Team contact, direct phone (+234 913 763 2195), email (lamidiabdulhameedolawale@gmail.com).

Rules:
1. Respond in a warm, knowledgeable, conversational tone with great formatting (use bullet points or bold text where appropriate).
2. When relevant, naturally mention and recommend CHILLVERSE portal sections like "/category/anime" or "/media".
3. Avoid raw emojis—use clean punctuation and professional typography.
4. Keep answers engaging and concise (typically 2-4 sentences or a concise list unless the user asks for deep analysis).`;

const LORE_KNOWLEDGE = {
  anime: [
    "Demon Slayer: Kimetsu no Yaiba follows Tanjiro Kamado's journey with the Demon Slayer Corps and ufotable's breathtaking breathing style animations. You can explore full lore at /category/anime!",
    "Jujutsu Kaisen dives into the brutal clash between modern sorcerers and ancient curses led by Sukuna and Gojo Satoru. Discover character dossiers at /category/anime.",
    "Solo Leveling chronicles Sung Jinwoo's evolution from the weakest E-Rank hunter to the Shadow Monarch. Check the Release Calendar at /calendar for new season arcs!",
    "Attack on Titan represents Hajime Isayama's high-stakes dark fantasy exploration of freedom, warfare, and the Founding Titan across Paradis and Marley."
  ],
  gaming: [
    "From Elden Ring's Lands Between to Cyberpunk 2077's neon-drenched Dogtown, the Gaming Hub (/category/gaming) analyzes mechanics, narrative depth, and community speedruns.",
    "The Legend of Zelda: Breath of the Wild and Tears of the Kingdom transformed physics-driven emergent gameplay across Hyrule.",
    "Red Dead Redemption 2 stands as one of the finest narrative epics in modern gaming, chronicling Arthur Morgan and the Van der Linde gang."
  ],
  movies: [
    "Dune: Part Two and Denis Villeneuve's sci-fi worldbuilding elevated cinema with desert power and Hans Zimmer's score. Watch 4K trailers at /media!",
    "Spider-Man: Across the Spider-Verse revolutionized animation by blending disparate art styles across Earth-65, Nueva York, and Mumbattan.",
    "Oppenheimer explored the moral weight of scientific discovery and the dawn of atomic power through Christopher Nolan's masterful editing."
  ],
  kpop: [
    "From NewJeans' 90s R&B nostalgia in 'Supernatural' to Stray Kids' explosive 'Chk Chk Boom' and BTS/BLACKPINK global milestones, check /category/k-pop for comebacks!",
    "K-Pop combines synchronised choreography, elaborate conceptual lore, and global fanbase streaming cultures. Track comebacks on our /calendar."
  ],
  general: [
    "CHILLVERSE brings together the 7 greatest fan subcultures in a single dark-mode sanctuary. Whether you want to watch trailers (/media), check release dates (/calendar), or explore the Merch Vault (/shop), I'm here to assist!",
    "Looking for recommendations? Tell me your favorite genre—like cyberpunk sci-fi, dark shonen anime, psychological thriller movies, or Soulsborne RPGs!"
  ]
};

export async function askGemini(prompt, conversationHistory = []) {
  // Check for configured API Key in localStorage or env
  const apiKey = (typeof window !== 'undefined' ? localStorage.getItem('chillverse_gemini_api_key') : null) 
    || import.meta.env.VITE_GEMINI_API_KEY 
    || '';

  // If API key is available, call Google Gemini 1.5 Flash REST API
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const contents = [];
      
      // Add previous conversation turns
      conversationHistory.slice(-6).forEach(msg => {
        contents.push({
          role: msg.from === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        });
      });

      // Add current user prompt
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
              topP: 0.95
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          // Detect recommended portal link
          let link = null;
          if (candidate.includes('/category/anime')) link = '/category/anime';
          else if (candidate.includes('/category/gaming')) link = '/category/gaming';
          else if (candidate.includes('/category/movies')) link = '/category/movies';
          else if (candidate.includes('/category/k-pop')) link = '/category/k-pop';
          else if (candidate.includes('/media')) link = '/media';
          else if (candidate.includes('/shop')) link = '/shop';
          else if (candidate.includes('/calendar')) link = '/calendar';
          else if (candidate.includes('/contact')) link = '/contact';

          return { text: candidate, link, source: 'gemini' };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to neural lore engine:', err);
    }
  }

  // High-accuracy natural language fallback engine
  const lower = prompt.toLowerCase();

  if (lower.match(/\b(hi|hello|hey|greetings|morning|evening)\b/)) {
    return {
      text: "Greetings, fandom explorer! I'm ChillBot AI, your intelligent guide across Anime, Gaming, Movies, TV, K-Pop, Comics, and Manga. What universe are we diving into today?",
      link: null,
      source: 'local-ai'
    };
  }

  if (lower.includes('anime') || lower.includes('manga') || lower.includes('jujutsu') || lower.includes('demon slayer') || lower.includes('titan') || lower.includes('shonen')) {
    const quote = LORE_KNOWLEDGE.anime[Math.floor(Math.random() * LORE_KNOWLEDGE.anime.length)];
    return {
      text: `${quote} Would you like to browse the Anime Universe or inspect character profiles?`,
      link: '/category/anime',
      source: 'local-ai'
    };
  }

  if (lower.includes('game') || lower.includes('gaming') || lower.includes('elden ring') || lower.includes('zelda') || lower.includes('rdr2') || lower.includes('playstation') || lower.includes('xbox')) {
    const quote = LORE_KNOWLEDGE.gaming[Math.floor(Math.random() * LORE_KNOWLEDGE.gaming.length)];
    return {
      text: `${quote} You can check out active community watch parties and video reviews in the Gaming Hub.`,
      link: '/category/gaming',
      source: 'local-ai'
    };
  }

  if (lower.includes('movie') || lower.includes('film') || lower.includes('trailer') || lower.includes('cinema') || lower.includes('dune') || lower.includes('batman')) {
    const quote = LORE_KNOWLEDGE.movies[Math.floor(Math.random() * LORE_KNOWLEDGE.movies.length)];
    return {
      text: `${quote} Watch official 4K trailers and cinematic cuts directly in our Media Lounge (/media).`,
      link: '/media',
      source: 'local-ai'
    };
  }

  if (lower.includes('k-pop') || lower.includes('kpop') || lower.includes('idol') || lower.includes('bts') || lower.includes('blackpink') || lower.includes('newjeans')) {
    const quote = LORE_KNOWLEDGE.kpop[Math.floor(Math.random() * LORE_KNOWLEDGE.kpop.length)];
    return {
      text: `${quote} Visit the K-Pop Hub to explore discographies and lightsticks.`,
      link: '/category/k-pop',
      source: 'local-ai'
    };
  }

  if (lower.includes('cart') || lower.includes('shop') || lower.includes('merch') || lower.includes('buy') || lower.includes('price')) {
    return {
      text: "The Merchandise Vault features authentic scale figures, concert gear, apparel, and limited-edition collector prints with real-time tax and courier calculation.",
      link: '/shop',
      source: 'local-ai'
    };
  }

  if (lower.includes('calendar') || lower.includes('date') || lower.includes('release') || lower.includes('schedule') || lower.includes('premiere')) {
    return {
      text: "Our Release Calendar tracks seasonal anime premieres, AAA game launches, and Hollywood cinema dates. Filter by month or click any date for full details.",
      link: '/calendar',
      source: 'local-ai'
    };
  }

  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('support') || lower.includes('hq') || lower.includes('developer')) {
    return {
      text: "You can reach our team directly at lamidiabdulhameedolawale@gmail.com or call / WhatsApp +234 913 763 2195. Our full interactive HQ map and contact form are available on the Contact page.",
      link: '/contact',
      source: 'local-ai'
    };
  }

  if (lower.includes('recommend') || lower.includes('what should i watch') || lower.includes('best')) {
    return {
      text: "For a dark fantasy masterwork, start with Jujutsu Kaisen or Attack on Titan. If you crave groundbreaking cinema, explore Dune: Part Two and Blade Runner 2049 in the Movies Hub. And for open-world gaming, nothing surpasses Elden Ring.",
      link: '/category/anime',
      source: 'local-ai'
    };
  }

  // Default intelligent response
  return {
    text: `That is an intriguing question about ${prompt.length < 30 ? prompt : 'entertainment lore'}. In CHILLVERSE, you can find full breakdowns across our 7 Fandom Hubs, inspect official 4K trailers (/media), or track upcoming releases (/calendar). Ask me about specific titles like Demon Slayer, Elden Ring, or Dune!`,
    link: '/category/anime',
    source: 'local-ai'
  };
}
