import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, X, Send, ExternalLink, Volume2, VolumeX, Mic, MicOff, 
  RotateCcw, Copy, Check, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askGemini } from '../../services/aiService';

const LANGUAGES = [
  { code: 'en', name: 'English', label: 'EN', recognition: 'en-US' },
  { code: 'es', name: 'Español', label: 'ES', recognition: 'es-ES' },
  { code: 'fr', name: 'Français', label: 'FR', recognition: 'fr-FR' },
  { code: 'ja', name: '日本語', label: 'JA', recognition: 'ja-JP' },
  { code: 'ko', name: '한국어', label: 'KO', recognition: 'ko-KR' },
  { code: 'de', name: 'Deutsch', label: 'DE', recognition: 'de-DE' },
  { code: 'yo', name: 'Yorùbá', label: 'YO', recognition: 'yo-NG' }
];

const QUICK_PROMPTS_BY_LANG = {
  en: ["Recommend top Anime", "Play Davido Music", "Tell me about Spider-Man", "Upcoming premieres", "Dune Part Two lore"],
  es: ["Recomiéndame un Anime", "Reproducir música de Davido", "Háblame de Spider-Man", "Estrenos próximos"],
  fr: ["Recommander un Anime", "Jouer la musique de Davido", "Parle-moi de Spider-Man", "Prochaines sorties"],
  ja: ["おすすめのアニメ", "Davidoの曲を再生", "スパイダーマンについて", "今後の公開予定"],
  ko: ["추천 애니메이션", "Davido 음악 재생", "스파이더맨 이야기", "개봉 예정작"],
  de: ["Top-Anime empfehlen", "Davido Musik abspielen", "Erzähl mir von Spider-Man", "Kommende Premieren"],
  yo: ["Dábàá Anime tó dára", "Ta orin Davido", "Sọ nípa Spider-Man", "Àwọn eré tó ń bọ̀"]
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: 'bot', 
      text: "Welcome to CHILLVERSE Intelligence. I am your neural entertainment companion—ready to assist in multiple languages with anime lore, 4K trailers, blockbuster cinema, gaming strategies, and continuous music streaming.", 
      link: null, 
      ts: new Date(),
      source: 'neural-ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const langMenuRef = useRef(null);
  const widgetContainerRef = useRef(null);
  const navigate = useNavigate();

  // Clean Markdown & URLs for natural Speech Synthesis
  const cleanTextForSpeech = (raw) => {
    if (!raw) return '';
    return raw
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\/category\/\S+/g, '')
      .replace(/[\/\\#*_~`]/g, '')
      .trim();
  };

  // Stop any ongoing Speech Synthesis
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingId(null);
    }
  }, []);

  // Close widget when clicking outside on desktop/tablet
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && widgetContainerRef.current && !widgetContainerRef.current.contains(e.target)) {
        setIsOpen(false);
        stopSpeech();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, stopSpeech]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Click outside to close language menu
  useEffect(() => {
    const handleOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [langMenuOpen]);

  // Speak a message using Web Speech API with FEMALE Voice
  const speakMessage = useCallback((text, id) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (currentlySpeakingId === id) {
      stopSpeech();
      return;
    }

    stopSpeech();

    const clean = cleanTextForSpeech(text);
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    
    // Female voice configuration: slightly elevated warm pitch and natural pace
    utterance.pitch = 1.15;
    utterance.rate = 1.0;

    // Search specifically for high-quality FEMALE voices matching the active language
    const voices = window.speechSynthesis.getVoices();
    const langCode = selectedLang.toLowerCase();

    const femaleVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase();
      const isLangMatch = lang.startsWith(langCode);
      const isFemale = name.includes('female') || name.includes('zira') || name.includes('samantha') || 
                       name.includes('karen') || name.includes('victoria') || name.includes('natural') || 
                       name.includes('jenny') || name.includes('aria') || name.includes('eva') || 
                       name.includes('monica') || name.includes('kyoko') || name.includes('yuna') ||
                       name.includes('ayumi') || name.includes('alice') || name.includes('amelie') ||
                       name.includes('conchita') || name.includes('luciana') || name.includes('mariska');
      return isLangMatch && isFemale;
    }) || voices.find(v => v.lang.toLowerCase().startsWith(langCode))
       || voices.find(v => {
         const name = v.name.toLowerCase();
         return name.includes('female') || name.includes('zira') || name.includes('samantha');
       })
       || voices[0];

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => setCurrentlySpeakingId(null);
    utterance.onerror = () => setCurrentlySpeakingId(null);

    setCurrentlySpeakingId(id);
    window.speechSynthesis.speak(utterance);
  }, [currentlySpeakingId, selectedLang, stopSpeech]);

  // Speech Recognition (Voice Input)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const activeLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = activeLangObj.recognition || 'en-US';

        recognition.onresult = (event) => {
          const transcript = event.results[0]?.[0]?.transcript || '';
          if (transcript) {
            setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
            if (inputRef.current) inputRef.current.focus();
          }
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }

    return () => {
      stopSpeech();
    };
  }, [selectedLang, stopSpeech]);

  const toggleVoiceListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input is supported in Chrome, Edge, and Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Recognition start failed', e);
        setIsListening(false);
      }
    }
  };

  // Keyboard and event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        stopSpeech();
      }
    };
    const handleOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-chillbot', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-chillbot', handleOpen);
    };
  }, [isOpen, stopSpeech]);

  const sendMessage = async (text = input) => {
    const msg = text.trim();
    if (!msg || isTyping) return;

    stopSpeech();

    const userMsg = { id: Date.now(), from: 'user', text: msg, ts: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askGemini(msg, messages, selectedLang);
      const botMsgId = Date.now() + 1;
      const botMsg = { 
        id: botMsgId, 
        from: 'bot', 
        text: response.text, 
        link: response.link, 
        ts: new Date(),
        source: response.source || 'neural-ai'
      };
      setMessages(prev => [...prev, botMsg]);

      if (autoSpeak) {
        speakMessage(response.text, botMsgId);
      }
    } catch {
      const fallbackId = Date.now() + 1;
      const fallbackMsg = { 
        id: fallbackId, 
        from: 'bot', 
        text: "I experienced a brief connection glitch. Feel free to rephrase or explore our Fandom Realms directly.", 
        link: '/category/anime', 
        ts: new Date(),
        source: 'neural-ai'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNavigate = (link) => {
    if (link) {
      navigate(link);
      setIsOpen(false);
      stopSpeech();
    }
  };

  const handleCopy = (text, id) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const resetChat = () => {
    stopSpeech();
    setMessages([
      { 
        id: Date.now(), 
        from: 'bot', 
        text: selectedLang === 'es' ? "Conversación reiniciada. ¿Cómo puedo ayudarte hoy en CHILLVERSE?" :
              selectedLang === 'fr' ? "Conversation réinitialisée. Comment puis-je vous aider dans CHILLVERSE ?" :
              selectedLang === 'ja' ? "会話がリセットされました。CHILLVERSEで何をお探しですか？" :
              selectedLang === 'ko' ? "대화가 초기화되었습니다. CHILLVERSE에서 무엇을 도와드릴까요?" :
              selectedLang === 'yo' ? "A ti tun ibaraẹnisọrọ bẹrẹ. Bawo ni mo ṣe le ran ọ lọwọ lori CHILLVERSE?" :
              "Conversation cleared. How can I assist your entertainment journey across CHILLVERSE?", 
        link: null, 
        ts: new Date(),
        source: 'neural-ai'
      }
    ]);
  };

  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#fff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const activeLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];
  const activePrompts = QUICK_PROMPTS_BY_LANG[selectedLang] || QUICK_PROMPTS_BY_LANG.en;

  return (
    <>
      {/* Mobile-only backdrop */}
      {isOpen && (
        <div 
          className="chatbot-mobile-backdrop"
          onClick={() => { setIsOpen(false); stopSpeech(); }}
          aria-hidden="true"
        />
      )}

      <div 
        ref={widgetContainerRef}
        className={`chatbot-widget-container ${isOpen ? 'is-open' : ''}`} 
        role="complementary" 
        aria-label="ChillVerse Intelligence Assistant"
      >
        {isOpen && (
          <div className="chatbot-window-box" role="dialog" aria-label="ChillVerse AI chat window">
            {/* Header */}
            <div className="chatbot-header">
              <div className="bot-avatar-badge">
                <Sparkles size={18} className="bot-sparkle-icon" />
              </div>
              <div className="bot-title-wrap">
                <div className="bot-name">
                  <span>CHILLVERSE AI</span>
                  <span className="bot-ai-badge">FEMALE CORE</span>
                </div>
                <div className="bot-status">
                  <span className="online-dot"></span>
                  <span>Active • Multi-Lingual</span>
                </div>
              </div>

              <div className="bot-header-actions">
                {/* Language Switcher Dropdown */}
                <div className="bot-lang-wrapper" ref={langMenuRef}>
                  <button
                    type="button"
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className="bot-lang-trigger"
                    title={`Language: ${activeLangObj.name}`}
                    aria-label="Change language"
                  >
                    <Globe size={14} className="text-cyan" />
                    <span>{activeLangObj.label}</span>
                  </button>

                  {langMenuOpen && (
                    <div className="bot-lang-menu" role="menu">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => {
                            setSelectedLang(l.code);
                            setLangMenuOpen(false);
                            stopSpeech();
                          }}
                          className={`bot-lang-option ${selectedLang === l.code ? 'selected' : ''}`}
                          role="menuitem"
                        >
                          <span className="bot-lang-code">{l.label}</span>
                          <span className="bot-lang-name">{l.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Auto-Voice Speak Toggle (Female Voice) */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !autoSpeak;
                    setAutoSpeak(next);
                    if (!next) stopSpeech();
                  }}
                  className={`bot-icon-action-btn ${autoSpeak ? 'active' : ''}`}
                  title={autoSpeak ? "Female Voice Enabled (Click to Mute)" : "Enable Female Voice"}
                  aria-label="Toggle female voice response"
                >
                  {autoSpeak ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                {/* Reset Chat */}
                <button 
                  type="button"
                  onClick={resetChat}
                  className="bot-icon-action-btn"
                  title="Clear conversation"
                  aria-label="Clear chat"
                >
                  <RotateCcw size={15} />
                </button>

                {/* Close */}
                <button 
                  type="button"
                  onClick={() => { setIsOpen(false); stopSpeech(); }} 
                  className="bot-close-btn" 
                  aria-label="Close assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Prompts Carousel */}
            <div className="chatbot-quick-prompts">
              {activePrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isTyping}
                  className="quick-prompt-chip"
                >
                  <Sparkles size={11} className="chip-sparkle-icon" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="chatbot-messages-body" ref={scrollRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-message-row ${msg.from === 'user' ? 'user-row' : 'bot-row'}`}>
                  {msg.from === 'bot' && (
                    <div className="bot-msg-avatar">
                      <Sparkles size={13} />
                    </div>
                  )}

                  <div className={`chat-bubble ${msg.from === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                    <p className="chat-text">{renderFormattedText(msg.text)}</p>
                    
                    {msg.link && (
                      <button
                        type="button"
                        onClick={() => handleNavigate(msg.link)}
                        className="chat-action-link"
                      >
                        <span>Explore Hub</span>
                        <ExternalLink size={12} />
                      </button>
                    )}

                    <div className="chat-bubble-footer">
                      <span className="chat-timestamp">
                        {new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>

                      {msg.from === 'bot' && (
                        <div className="bubble-actions">
                          {/* Speak with Female Voice */}
                          <button
                            type="button"
                            onClick={() => speakMessage(msg.text, msg.id)}
                            className={`bubble-btn-icon ${currentlySpeakingId === msg.id ? 'is-speaking' : ''}`}
                            title={currentlySpeakingId === msg.id ? "Stop female voice" : "Listen in female voice"}
                            aria-label="Speak response"
                          >
                            <Volume2 size={13} />
                          </button>

                          {/* Copy button */}
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.text, msg.id)}
                            className="bubble-btn-icon"
                            title="Copy answer"
                            aria-label="Copy text"
                          >
                            {copiedId === msg.id ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="chat-message-row bot-row">
                  <div className="bot-msg-avatar">
                    <Sparkles size={13} />
                  </div>
                  <div className="chat-bubble bot-bubble typing-bubble">
                    <div className="typing-dots">
                      <span className="dot dot-1"></span>
                      <span className="dot dot-2"></span>
                      <span className="dot dot-3"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar with Voice Input */}
            <div className="chatbot-input-bar">
              <input
                ref={inputRef}
                type="text"
                placeholder={isListening ? "Listening... speak now" : `Ask in ${activeLangObj.name}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isTyping}
                className="chat-input-field"
              />

              {/* Microphone / Speech Dictation */}
              <button
                type="button"
                onClick={toggleVoiceListening}
                className={`chat-mic-btn ${isListening ? 'listening' : ''}`}
                title={isListening ? "Listening... Click to stop" : "Speak with microphone"}
                aria-label="Voice input"
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="chat-send-btn"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Clean, Premium Floating Launcher Button WITHOUT orange badge */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (isOpen) stopSpeech();
          }}
          className={`chatbot-launcher-btn ${isOpen ? 'active' : ''}`}
          aria-label={isOpen ? "Close AI Intelligence" : "Open CHILLVERSE AI Intelligence"}
          aria-expanded={isOpen}
        >
          {!isOpen && <span className="chatbot-pulse-ring"></span>}
          {isOpen ? (
            <X size={20} color="#fff" />
          ) : (
            <div className="bot-launcher-inner">
              <Sparkles size={22} className="launcher-sparkle" />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
