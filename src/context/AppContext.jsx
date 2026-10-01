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
    currentTrackIndex: 0,
    volume: 0.6,
    tracks: [
      {
        id: 'track-1',
        title: 'Cyberpunk Neon Drift (Lofi Beats)',
        artist: 'ChillVerse Sounds',
        category: 'Gaming',
        url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
      },
      {
        id: 'track-2',
        title: 'Spirited Anime Nostalgia',
        artist: 'Ghibli Vibes Collective',
        category: 'Anime',
        url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-lofi-song-8444.mp3'
      },
      {
        id: 'track-3',
        title: 'Seoul City Starlight (Instrumental)',
        artist: 'K-Wave Studio',
        category: 'K-Pop',
        url: 'https://cdn.pixabay.com/download/audio/2021/11/24/audio_c3c3a7008b.mp3?filename=lofi-chill-medium-version-159456.mp3'
      }
    ]
  });

  const toggleAudioPlay = () => {
    setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const toggleAudio = toggleAudioPlay; // alias

  const selectAudioTrack = (index) => {
    setAudioState(prev => ({ ...prev, currentTrackIndex: index, isPlaying: true }));
  };

  const setAudioVolume = (vol) => {
    setAudioState(prev => ({ ...prev, volume: vol }));
  };

  const setVolume = setAudioVolume; // alias

  const nextTrack = () => {
    setAudioState(prev => ({
      ...prev,
      currentTrackIndex: (prev.currentTrackIndex + 1) % prev.tracks.length,
      isPlaying: true
    }));
  };

  const prevTrack = () => {
    setAudioState(prev => ({
      ...prev,
      currentTrackIndex: (prev.currentTrackIndex - 1 + prev.tracks.length) % prev.tracks.length,
      isPlaying: true
    }));
  };

  const stopAudio = () => {
    setAudioState(prev => ({ ...prev, isPlaying: false }));
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
