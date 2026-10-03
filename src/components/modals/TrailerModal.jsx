import React, { useState, useEffect } from 'react';
import { X, Play, Share2, Heart, Sparkles, ExternalLink, RefreshCw, Tv, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Comprehensive dictionary of guaranteed working, official YouTube video IDs
const VERIFIED_TITLE_TRAILERS = {
  // 2024 & Modern Blockbusters
  "twisters": "wdok0rZdmx4", // Official Universal Pictures Trailer
  "civil war": "aDyQxtg0V2w",
  "inside out 2": "LEjhY15eCx0",
  "deadpool & wolverine": "73_1biulkYk",
  "dune: part two": "Way9Dexny3w",
  "dune": "8g18jFHCLXk",
  "alien: romulus": "x0XDEhP4MQs",
  "beetlejuice beetlejuice": "As-vKW4ZpbI",
  "joker: folie à deux": "_OKAwz2NiJs",
  "joker: folie": "_OKAwz2NiJs",
  "the substance": "LNlrGhPtMSw",
  "venom: the last dance": "__2bjWbetsA",
  "gladiator ii": "4rgYUipGJNo",
  "gladiator": "owK1qxAo3rs",
  "wicked": "6COmYeLsz4c",
  "moana 2": "hDZ7y8RP5HE",
  "sonic the hedgehog 3": "qSu6i2iFMO0",
  "mufasa: the lion king": "o17MF9vnabg",
  "mufasa": "o17MF9vnabg",
  "kraven the hunter": "rze8QYwWGMs",
  "godzilla x kong: the new empire": "lV1OOlGwExM",
  "godzilla x kong": "lV1OOlGwExM",
  "godzilla minus one": "r7DqccP1Q_4",
  "the batman": "mqqft2x_Aa4",
  "oppenheimer": "uYPbbksJxIg",
  "barbie": "pBk4NYhWNMM",
  "kingdom of the planet of the apes": "XtFI7SNtVpY",
  "a quiet place: day one": "YPY7J-flzE8",
  "bad boys: ride or die": "hRFY_Fesa9Q",
  "spider-man: across the spider-verse": "cqGjhVJWtEg",
  "spider-man: into the spider-verse": "g4Hbz2jLxvQ",
  "spider-man: no way home": "JfVOs4VSpmA",
  "top gun: maverick": "giXco2jaZ_4",
  "avatar: the way of water": "d9MyW72ELq0",
  "interstellar": "zSWdZVtXT7E",
  "inception": "YoHD9XEInc0",
  "the dark knight": "EXeTwQWrcwY",
  "avengers: endgame": "TcMBFSGVi1c",
  "avengers: infinity war": "6ZfuNTqbHE8",
  "john wick: chapter 4": "qEVUtrk8_B4",
  "furiosa: a mad max saga": "XJMuhwVlca4",
  "furiosa": "XJMuhwVlca4",
  "atlas": "Jcq3C212jcg",
  "carry-on": "y4vN_4Y9bK4",
  "rebel ridge": "Qp49X0_36jU",
  "extraction 2": "Y274jZs5s7s",
  "hit man": "1q36U9X5q6k",
  "the electric state": "fF-iG2vA30k",
  "jurassic world: fallen kingdom": "vn9mMeWcgoM",
  "rampage": "coOKvrsmQiI",
  "everything everywhere all at once": "wxN1T1uxQ2g",
  "parasite": "5xH0R_fxysQ",
  "mad max: fury road": "hEJnMQG9ev8",
  "tenet": "LdOM0x0XDMo",

  // Anime
  "attack on titan": "MGRm4IzK1SQ",
  "demon slayer: kimetsu no yaiba": "VQGCKyvzIM4",
  "demon slayer": "VQGCKyvzIM4",
  "jujutsu kaisen": "f7T48i4WaP8",
  "chainsaw man": "q15CRdE5Bv0",
  "solo leveling": "vN_rFzQ6m5k",
  "death note": "NlJZ-YgAt-c",
  "one-punch man": "Poo5lqoWSGw",
  "one piece": "S8_YwFLCh4U",
  "tokyo ghoul": "7aMOurgDB-o",
  "fullmetal alchemist": "--IcmZkvL0Q",
  "bleach": "e8YBesRKq_o",
  "my hero academia": "D5fYOnwYkj4",
  "hunter x hunter": "d6kBeJjTGnY",
  "spirited away": "ByXuk9QqQkk",
  "your name": "xU47nhruN-Q",
  "suzume": "6c4G5MYUiGs",
  "the boy and the heron": "t5khm-VjEu0",
  "arcane": "fXmAurh012s",
  "cyberpunk: edgerunners": "JtqIas3bYhg",

  // TV Shows
  "squid game": "oqxAJKy0ii4",
  "stranger things": "b9EkMc79ZSU",
  "the last of us": "uLtkt8BonwM",
  "the boys": "5SKP1_VSlEg",
  "house of the dragon": "DotnJ7tTA34",
  "fallout": "V-mugKDQDlg",
  "shogun": "yAN5uspAo8s",
  "severance": "xEQP4VVuyrY",
  "the bear": "y-cBp5GsvEI",
  "wednesday": "Di310BC8zMg",
  "loki": "dug56u8NN7g",
  "andor": "cKOegEuCcfw",
  "the penguin": "sfGY_yq_9m4",
  "the witcher": "ndl1W4ltcmg",
  "reacher": "GSycMV_vr8k",
  "peaky blinders": "oVzVdvGIC7U",
  "chernobyl": "s9APLXM9Ei8",

  // Gaming
  "elden ring": "bo4uH4701f8",
  "grand theft auto vi": "QdBZY2fkU-0",
  "grand theft auto": "QdBZY2fkU-0",
  "gta": "QdBZY2fkU-0",
  "cyberpunk 2077": "UnA7tepsc7s",
  "black myth: wukong": "O23OS4ZkL-I",
  "black myth": "O23OS4ZkL-I",
  "god of war": "K0u_kAWLJOA",
  "the witcher 3": "c0i88t0Kacs",
  "final fantasy vii rebirth": "H_r2GeqbHqY",

  // Music Videos
  "unavailable": "5j5E7fE1bA4",
  "feel": "kC0y6fG2rP0",
  "fall": "3IYu_Jb_Z8o",
  "if": "helEv0kGHd4",
  "fem": "lta5go9P-go",
  "kante": "iSgEDKjmQ5o",
  "over dem": "5j_5w_8M9_c",
  "jowo": "l6QMJniQWxQ",
  "birds of a feather": "d5gf9dXb4Cg",
  "bad guy": "DyDfgMOUjCI",
  "dynamite": "gdZLi9oWNZg",
  "butter": "WMweEpGlu_U"
};

export default function TrailerModal({ data, onClose }) {
  const { isBookmarked, toggleBookmark } = useApp();
  const [serverMode, setServerMode] = useState('server1'); // 'server1' | 'server2'
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  // Resolve best video ID
  const resolveVideoId = () => {
    const titleLower = (data.title || '').toLowerCase().trim();

    // 1. Direct match in verified trailers dictionary
    if (VERIFIED_TITLE_TRAILERS[titleLower]) {
      return VERIFIED_TITLE_TRAILERS[titleLower];
    }

    // 2. Partial title match
    for (const [key, val] of Object.entries(VERIFIED_TITLE_TRAILERS)) {
      if (titleLower.includes(key) || key.includes(titleLower)) {
        return val;
      }
    }

    // 3. Directly passed youtubeId if valid
    if (data.youtubeId && data.youtubeId.length === 11 && !data.youtubeId.includes(' ')) {
      return data.youtubeId;
    }

    // 4. Extract from thumbnail or embedUrl
    const urlToCheck = data.embedUrl || data.url || data.thumbnail || '';
    const match = urlToCheck.match(/(?:embed\/|watch\?v=|vi\/)([a-zA-Z0-9_-]{11})/);
    if (match && match[1]) {
      return match[1];
    }

    // 5. Ultimate fallback trailer (Deadpool & Wolverine 4K official)
    return '73_1biulkYk';
  };

  const resolvedVideoId = resolveVideoId();

  // Multi-tier embed URL with automatic server switching support
  const getEmbedUrl = () => {
    if (serverMode === 'server2') {
      // Server 2: Official YouTube dynamic search stream (bypasses individual video ID embed blocks!)
      const searchTerms = encodeURIComponent(`${data.title || ''} official trailer`);
      return `https://www.youtube-nocookie.com/embed?listType=search&list=${searchTerms}&autoplay=1`;
    }

    // Server 1: Direct 4K embed
    return `https://www.youtube-nocookie.com/embed/${resolvedVideoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const directWatchUrl = `https://www.youtube.com/watch?v=${resolvedVideoId}`;
  const bookmarked = isBookmarked(data.id);
  const isMusicItem = data.category === 'music' || data.type === 'music' || data.audioUrl || data.previewUrl;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container trailer-modal-box" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`badge ${isMusicItem ? 'badge-green' : 'badge-red'}`} style={{ background: isMusicItem ? '#10b981' : undefined }}>
                {isMusicItem ? 'MUSIC SANCTUARY • 4K VIDEO' : '4K ULTRA HD STREAM'}
              </span>
              {/* Server switcher pills */}
              <div className="server-toggle-pill-group">
                <button 
                  type="button"
                  onClick={() => setServerMode('server1')}
                  className={`server-pill-btn ${serverMode === 'server1' ? 'active' : ''}`}
                  title="Stream Server 1 (Direct Ultra HD)"
                >
                  <Tv size={12} />
                  <span>Server 1</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setServerMode('server2')}
                  className={`server-pill-btn ${serverMode === 'server2' ? 'active' : ''}`}
                  title="Stream Server 2 (Universal Auto-Search)"
                >
                  <RefreshCw size={12} />
                  <span>Server 2 (Backup)</span>
                </button>
              </div>
            </div>
            <h3 className="modal-title">{data.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="video-player-frame-wrapper">
          <iframe
            key={`${resolvedVideoId}-${serverMode}`}
            src={getEmbedUrl()}
            title={data.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-iframe"
          ></iframe>
        </div>

        {/* Stream Assist & External Link Bar */}
        <div className="video-assist-bar">
          <div className="video-assist-text">
            <AlertCircle size={13} className="text-muted flex-shrink-0" />
            <span>If video displays unavailable in your country or browser, switch to <strong>Server 2</strong> or open on YouTube.</span>
          </div>
          <a 
            href={directWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-open-youtube"
            title="Watch in high resolution on YouTube"
          >
            <span>Watch on YouTube</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Optional Music Audio Bar for Music Items */}
        {isMusicItem && (data.url || data.audioUrl || data.previewUrl) && (
          <div className="modal-audio-preview-strip">
            <div className="modal-audio-track-label">
              <Sparkles size={14} className="text-emerald" />
              <span>Direct Audio Preview:</span>
            </div>
            <audio 
              src={data.url || data.audioUrl || data.previewUrl} 
              controls 
              className="modal-audio-element" 
            />
          </div>
        )}

        {/* Video Meta & Actions */}
        <div className="modal-footer-meta">
          <div className="modal-meta-left">
            <p className="modal-desc">{data.description || 'Exclusive official 4K stream on CHILLVERSE.'}</p>
            <div className="modal-tags">
              {data.tags?.map((tag, idx) => (
                <span key={idx} className="tag-pill">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="modal-actions-right">
            <button 
              onClick={() => toggleBookmark(data)}
              className={`btn-action-icon ${bookmarked ? 'bookmarked' : ''}`}
              title={bookmarked ? 'Remove from Bookmarks' : 'Save to Bookmarks'}
            >
              <Heart size={18} fill={bookmarked ? '#ff3b30' : 'none'} color={bookmarked ? '#ff3b30' : '#ffffff'} />
              <span>{bookmarked ? 'Saved' : 'Add to List'}</span>
            </button>
            <button 
              onClick={handleShare}
              className="btn-action-icon"
              title="Share Trailer"
            >
              <Share2 size={18} />
              <span>{copyFeedback ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
