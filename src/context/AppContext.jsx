import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Real-time Active Fans Presence Tracker (Live across tabs/windows)
  const [visitorCount, setVisitorCount] = useState(1);

  useEffect(() => {
    const tabId = 'tab_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    const CHANNEL_NAME = 'chillverse_live_presence';
    const STORAGE_KEY = 'chillverse_active_tabs';
    let channel;

    const getActiveCount = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const tabs = raw ? JSON.parse(raw) : {};
        const now = Date.now();
        // Keep only tabs that sent heartbeat within last 5 seconds
        const active = {};
        for (const [id, ts] of Object.entries(tabs)) {
          if (now - ts < 5000) {
            active[id] = ts;
          }
        }
        active[tabId] = now;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(active));
        return Math.max(1, Object.keys(active).length);
      } catch {
        return 1;
      }
    };

    const broadcastHeartbeat = () => {
      const count = getActiveCount();
      setVisitorCount(count);
      if (channel) {
        try { channel.postMessage({ type: 'HEARTBEAT', tabId, count }); } catch {}
      }
    };

    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel(CHANNEL_NAME);
        channel.onmessage = (event) => {
          if (event.data?.type === 'HEARTBEAT' || event.data?.type === 'TAB_CLOSED') {
            const count = getActiveCount();
            setVisitorCount(count);
          }
        };
      }
    } catch {}

    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        const count = getActiveCount();
        setVisitorCount(count);
      }
    };
    window.addEventListener('storage', onStorage);

    // Initial heartbeat
    broadcastHeartbeat();
    const interval = setInterval(broadcastHeartbeat, 2500);

    const cleanup = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const tabs = JSON.parse(raw);
          delete tabs[tabId];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
        }
        if (channel) {
          channel.postMessage({ type: 'TAB_CLOSED', tabId });
          channel.close();
        }
      } catch {}
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  // 2. Real-time Clock (Updates every 1000ms)
  const [currentTime, setCurrentTime] = useState({
    timeStr: '',
    utcStr: '',
    dateStr: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime({
        timeStr: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        utcStr: now.toUTCString().slice(17, 25) + ' UTC',
        dateStr: now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
      });
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Temporary Shopping Cart (Stored in sessionStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = sessionStorage.getItem('chillverse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem('chillverse_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to sessionStorage', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1, variant = 'Standard Edition') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.variant === variant);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, {
        id: product.id,
        name: product.name || product.title,
        price: Number(product.price) || 29.99,
        image: product.image || product.thumbnail,
        category: product.category,
        variant,
        quantity
      }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta, variant) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && (!variant || item.variant === variant)) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id, variant) => {
    setCart(prev => prev.filter(item => !(item.id === id && (!variant || item.variant === variant))));
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartTax = cartSubtotal * 0.08; // 8% Estimated Fan Vault Tax
  const cartTotal = cartSubtotal + cartTax;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 4. Content Bookmarking System (Stored in localStorage)
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('chillverse_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chillverse_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const toggleBookmark = (item) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === item.id);
      if (exists) {
        return prev.filter(b => b.id !== item.id);
      }
      return [...prev, {
        id: item.id,
        title: item.title || item.name,
        thumbnail: item.thumbnail || item.image,
        category: item.category || 'all',
        type: item.type || 'content',
        description: item.description || item.biography || '',
        savedAt: new Date().toISOString()
      }];
    });
  };

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  // 5. Personal Session Notes attached to Bookmarks (Session-only in sessionStorage)
  const [sessionNotes, setSessionNotes] = useState(() => {
    try {
      const saved = sessionStorage.getItem('chillverse_session_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('chillverse_session_notes', JSON.stringify(sessionNotes));
    } catch (e) {
      console.error('Failed to save session notes to sessionStorage', e);
    }
  }, [sessionNotes]);

  const saveNote = (id, noteText) => {
    setSessionNotes(prev => ({
      ...prev,
      [id]: noteText
    }));
  };

  const getNote = (id) => sessionNotes[id] || '';

  const deleteNote = (id) => {
    setSessionNotes(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Export Bookmarks as a formatted text file download
  const exportBookmarks = () => {
    if (bookmarks.length === 0) {
      alert("You have no saved bookmarks to export yet!");
      return;
    }
    let content = `=================================================\n`;
    content += `   CHILLVERSE - SAVED FANDOM HAUL & BOOKMARKS    \n`;
    content += `   Exported on: ${new Date().toLocaleString()}     \n`;
    content += `   Built & Powered by ChillTechLtd.com            \n`;
    content += `=================================================\n\n`;

    bookmarks.forEach((item, index) => {
      content += `[${index + 1}] ${item.title.toUpperCase()}\n`;
      content += `    Category: ${item.category} | Type: ${item.type}\n`;
      content += `    Summary: ${item.description.slice(0, 150)}...\n`;
      if (sessionNotes[item.id]) {
        content += `    Personal Session Note: "${sessionNotes[item.id]}"\n`;
      }
      content += `-------------------------------------------------\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chillverse-bookmarks-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 6. Global Modals (Trailer, Character, Merch, Auth, Lightbox)
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'trailer', 'character', 'merch', 'auth', 'lightbox'
    data: null
  });

  const openModal = (type, data) => setModalState({ isOpen: true, type, data });
  const closeModal = () => setModalState({ isOpen: false, type: null, data: null });

  // 7. Ambient Audio Lounge Player
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    hasStarted: false,
    currentTrackIndex: 0,
    volume: 0.6,
    tracks: [
      {
        id: 'track-davido-unavailable',
        title: 'Unavailable (feat. Musa Keys)',
        artist: 'Davido',
        album: 'Timeless',
        category: 'Afrobeats',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/6a/08/f8/6a08f8f4-05ac-fe83-68b9-85e4f8cac8b1/mzaf_11447656297166015034.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f2/6f/40/f26f409e-958b-0b9f-adce-395673632c18/196871414814.jpg/600x600bb.jpg',
        youtubeId: '5j5E7fE1bA4',
        embedUrl: 'https://www.youtube-nocookie.com/embed/5j5E7fE1bA4'
      },
      {
        id: 'track-davido-feel',
        title: 'Feel',
        artist: 'Davido',
        album: 'Timeless',
        category: 'Afrobeats',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/89/ec/07/89ec07d6-bc49-9e37-7eb2-98cf384ece2c/mzaf_757461899043186347.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/40/12/87/4012878d-d267-09b8-7fe0-8c3fd8fdf169/886449553617.jpg/600x600bb.jpg',
        youtubeId: 'kC0y6fG2rP0',
        embedUrl: 'https://www.youtube-nocookie.com/embed/kC0y6fG2rP0'
      },
      {
        id: 'track-davido-fall',
        title: 'Fall',
        artist: 'Davido',
        album: 'A Good Time',
        category: 'Afrobeats',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/43/26/76/43267638-733c-c6e6-2252-9d6f448d3061/mzaf_9692574823920042259.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/25/10/e825104f-95ac-5638-38bf-a3a3563ac24b/886446558943.jpg/600x600bb.jpg',
        youtubeId: '3IYu_Jb_Z8o',
        embedUrl: 'https://www.youtube-nocookie.com/embed/3IYu_Jb_Z8o'
      },
      {
        id: 'track-davido-if',
        title: 'IF',
        artist: 'Davido',
        album: 'A Good Time',
        category: 'Afrobeats',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/dd/9c/2a/dd9c2a05-e9e7-6ea9-f04f-948f3e2cf81a/mzaf_9657912625387707820.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/48/9b/e9/489be9d2-4e64-90c4-ad49-beec27fdde3d/886446379210.jpg/600x600bb.jpg',
        youtubeId: 'helEv0kGHd4',
        embedUrl: 'https://www.youtube-nocookie.com/embed/helEv0kGHd4'
      },
      {
        id: 'track-davido-fem',
        title: 'FEM',
        artist: 'Davido',
        album: 'A Better Time',
        category: 'Afrobeats',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c1/8d/3a/c18d3a14-eb98-a7f4-b94c-2dabdd6b8a90/mzaf_15758329392578752168.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/01/60/0f/01600f6f-35ec-2d0a-bca6-670ed9aba76c/886448741688.jpg/600x600bb.jpg',
        youtubeId: 'lta5go9P-go',
        embedUrl: 'https://www.youtube-nocookie.com/embed/lta5go9P-go'
      },
      {
        id: 'track-be-1739659142',
        title: 'BIRDS OF A FEATHER',
        artist: 'Billie Eilish',
        album: 'HIT ME HARD AND SOFT',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/34/31/d3/3431d34e-847f-5d66-df83-0bce688d997e/mzaf_18106743962423782018.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg'
      },
      {
        id: 'track-be-1450695739',
        title: 'bad guy',
        artist: 'Billie Eilish',
        album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c3/87/1f/c3871f7e-3260-d615-1c66-5fdca2c3a48f/mzaf_10721331211699880949.plus.aac.p.m4a',
        artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'track-be-1689239800',
        title: 'What Was I Made For?',
        artist: 'Billie Eilish',
        album: 'Barbie The Album',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/16/69/77/16697701-c8c4-6d9c-4491-7423e3fde6e8/mzaf_13139724549993369958.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c0/54/97/c05497aa-c19f-bf4f-de29-71edf30fbefb/075679688767.jpg/600x600bb.jpg'
      },
      {
        id: 'track-be-1739659140',
        title: 'LUNCH',
        artist: 'Billie Eilish',
        album: 'HIT ME HARD AND SOFT',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9d/3e/43/9d3e43aa-682a-7979-8547-d339956c409b/mzaf_710286407585135494.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg'
      },
      {
        id: 'track-be-1739659141',
        title: 'CHIHIRO',
        artist: 'Billie Eilish',
        album: 'HIT ME HARD AND SOFT',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/30/41/6b/30416b6a-a895-a8e5-0b92-6206fff0bb0a/mzaf_12575392156288065852.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg'
      },
      {
        id: 'track-be-1739659144',
        title: 'WILDFLOWER',
        artist: 'Billie Eilish',
        album: 'HIT ME HARD AND SOFT',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/de/c3/e8/dec3e884-7237-9622-718a-12c5f48c5ca2/mzaf_3134455671785145822.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg'
      },
      {
        id: 'track-be-1440899467',
        title: 'ocean eyes',
        artist: 'Billie Eilish',
        album: 'dont smile at me',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d6/59/2b/d6592b0b-1e7e-4743-b2e4-f2af038fd783/mzaf_7697277787797935735.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/02/1d/30/021d3036-5503-3ed3-df00-882f2833a6ae/17UM1IM17026.rgb.jpg/600x600bb.jpg'
      },
      {
        id: 'track-be-1584262469',
        title: 'Happier Than Ever',
        artist: 'Billie Eilish',
        album: 'Happier Than Ever',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8c/6b/20/8c6b203a-cadc-25b3-1c91-2a8e77210e31/mzaf_9684961884676177661.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d5/0c/53/d50c5343-58d1-9dfa-22ea-b6ea25b6327b/21UMGIM36684.rgb.jpg/600x600bb.jpg'
      },
      {
        id: 'track-be-1369380479',
        title: 'lovely',
        artist: 'Billie Eilish & Khalid',
        album: 'lovely - Single',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1e/d8/8d/1ed88d91-fb06-b3f2-5391-afd732cc2ff9/mzaf_18444937225262929488.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/27/94/d4/2794d4fc-c3e2-2373-3e6c-dd82fd5aefe6/18UMGIM18200.rgb.jpg/600x600bb.jpg'
      },
      {
        id: 'track-be-1450695872',
        title: "when the party's over",
        artist: 'Billie Eilish',
        album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
        category: 'Pop / Alternative',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2a/ba/44/2aba4410-ba71-89ce-e075-10120409c31c/mzaf_16887001963655152332.plus.aac.p.m4a',
        artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/600x600bb.jpg'
      },
      {
        id: 'track-ambient-1',
        title: 'Cyberpunk Neon Drift (Lofi Beats)',
        artist: 'ChillVerse Sounds',
        album: 'Night City Vibes',
        category: 'Gaming',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/81/a6/20/81a62065-8ffd-8e43-653f-0aebcd7ede8a/mzaf_10500050305620563985.plus.aac.p.m4a',
        artwork: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'track-ambient-2',
        title: 'Spirited Anime Nostalgia',
        artist: 'Ghibli Vibes Collective',
        album: 'Floating Lanterns',
        category: 'Anime',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2a/ba/44/2aba4410-ba71-89ce-e075-10120409c31c/mzaf_16887001963655152332.plus.aac.p.m4a',
        artwork: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'track-ambient-3',
        title: 'Seoul City Starlight (Instrumental)',
        artist: 'K-Wave Studio',
        album: 'Seoul Moonlight',
        category: 'K-Pop',
        url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a4/39/71/a4397190-0168-cb2a-bbba-da96cd1fe2c0/mzaf_10010426081667198393.plus.aac.p.m4a',
        artwork: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
      }
    ]
  });

  const toggleAudioPlay = () => {
    setAudioState(prev => ({ 
      ...prev, 
      isPlaying: !prev.isPlaying,
      hasStarted: true 
    }));
  };

  const toggleAudio = toggleAudioPlay; // alias

  const selectAudioTrack = (index) => {
    setAudioState(prev => ({ 
      ...prev, 
      currentTrackIndex: index, 
      isPlaying: true,
      hasStarted: true 
    }));
  };

  const playTrack = (track) => {
    if (!track) return;
    setAudioState(prev => {
      const existingIdx = prev.tracks.findIndex(t => 
        t.id === track.id || 
        (t.title && track.title && t.title.toLowerCase() === track.title.toLowerCase())
      );
      if (existingIdx !== -1) {
        return { 
          ...prev, 
          currentTrackIndex: existingIdx, 
          isPlaying: true,
          hasStarted: true 
        };
      }
      const resolvedUrl = track.url || track.audioUrl || track.previewUrl || prev.tracks[0]?.url;
      const newTrack = {
        id: track.id || `track-${Date.now()}`,
        title: track.title,
        artist: track.artist || 'Featured Artist',
        album: track.album || 'ChillVerse Music',
        category: track.category || 'Music',
        url: resolvedUrl,
        audioUrl: resolvedUrl,
        artwork: track.poster || track.artwork || track.thumbnail
      };
      return {
        ...prev,
        tracks: [newTrack, ...prev.tracks],
        currentTrackIndex: 0,
        isPlaying: true,
        hasStarted: true
      };
    });
  };

  const setAudioVolume = (vol) => {
    setAudioState(prev => ({ ...prev, volume: vol }));
  };

  const setVolume = setAudioVolume; // alias

  const nextTrack = () => {
    setAudioState(prev => ({
      ...prev,
      currentTrackIndex: (prev.currentTrackIndex + 1) % prev.tracks.length,
      isPlaying: true,
      hasStarted: true
    }));
  };

  const prevTrack = () => {
    setAudioState(prev => ({
      ...prev,
      currentTrackIndex: (prev.currentTrackIndex - 1 + prev.tracks.length) % prev.tracks.length,
      isPlaying: true,
      hasStarted: true
    }));
  };

  const stopAudio = () => {
    setAudioState(prev => ({ ...prev, isPlaying: false, hasStarted: false }));
  };

  // 8. Auth State (Dummy UI Only)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('chillverse_dummy_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const dummyLogin = (username) => {
    const newUser = {
      username: username || 'NeoChiller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      badge: 'VIP Chiller'
    };
    setUser(newUser);
    localStorage.setItem('chillverse_dummy_user', JSON.stringify(newUser));
    closeModal();
  };

  const dummyLogout = () => {
    setUser(null);
    localStorage.removeItem('chillverse_dummy_user');
  };

  // Expose computed currentTrack from audioState
  const enrichedAudioState = {
    ...audioState,
    currentTrack: audioState.tracks[audioState.currentTrackIndex]
  };

  return (
    <AppContext.Provider value={{
      visitorCount,
      currentTime,
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      cartSubtotal,
      cartTax,
      cartTotal,
      cartCount,
      bookmarks,
      isBookmarked,
      toggleBookmark,
      removeBookmark,
      exportBookmarks,
      sessionNotes,
      saveNote,
      getNote,
      deleteNote,
      modalState,
      openModal,
      closeModal,
      audioState: enrichedAudioState,
      toggleAudioPlay,
      toggleAudio,
      selectAudioTrack,
      playTrack,
      setAudioVolume,
      setVolume,
      nextTrack,
      prevTrack,
      stopAudio,
      user,
      dummyLogin,
      dummyLogout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
