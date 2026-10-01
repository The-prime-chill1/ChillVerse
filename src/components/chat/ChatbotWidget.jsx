import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Key, ExternalLink, Settings, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askGemini } from '../../services/aiService';

const QUICK_PROMPTS = [
  "Recommend a top Anime",
  "What's upcoming on Calendar?",
  "Tell me about Elden Ring",
  "Browse Merch Vault",
  "Contact Team HQ"
];

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('chillverse_gemini_api_key') : '') || '';
  });
  const [hasCustomKey, setHasCustomKey] = useState(() => {
    return Boolean(typeof window !== 'undefined' && localStorage.getItem('chillverse_gemini_api_key'));
  });

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: 'bot', 
      text: "Hello! I'm ChillBot AI, powered by conversational intelligence. Ask me about anime lore, gaming mechanics, 4K movie trailers, upcoming releases, or anything across CHILLVERSE!", 
      link: null, 
      ts: new Date(),
      source: 'gemini'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      localStorage.setItem('chillverse_gemini_api_key', apiKeyInput.trim());
      setHasCustomKey(true);
      setShowKeyModal(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          from: 'bot',
          text: "Google Gemini API key connected successfully! ChillBot is now running directly on Gemini with live conversational reasoning.",
          link: null,
          ts: new Date(),
          source: 'gemini'
        }
      ]);
    } else {
      localStorage.removeItem('chillverse_gemini_api_key');
      setHasCustomKey(false);
      setShowKeyModal(false);
    }
  };

  const sendMessage = async (text = input) => {
    const msg = text.trim();
    if (!msg || isTyping) return;

    const userMsg = { id: Date.now(), from: 'user', text: msg, ts: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askGemini(msg, messages);
      const botMsg = { 
        id: Date.now() + 1, 
        from: 'bot', 
        text: response.text, 
        link: response.link, 
        ts: new Date(),
        source: response.source || 'gemini'
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          from: 'bot', 
          text: "I experienced a brief connection glitch. Feel free to ask me again or check our 7 Fandom Hubs!", 
          link: '/category/anime', 
          ts: new Date(),
          source: 'local-ai'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNavigate = (link) => {
    if (link) {
      navigate(link);
      setIsOpen(false);
    }
  };

  // Helper to render bold markdown
  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#fff' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="chatbot-widget-container" role="complementary" aria-label="ChillBot Assistant">
      {isOpen && (
        <div className="chatbot-window-box" role="dialog" aria-label="ChillBot chat window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="bot-avatar-badge">
              <Bot size={18} className="text-cyan" />
            </div>
            <div className="bot-title-wrap">
              <div className="bot-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>ChillBot AI</span>
                <span className="badge badge-purple" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                  {hasCustomKey ? 'Gemini 1.5' : 'Gemini Core'}
                </span>
              </div>
              <div className="bot-status">
                <span className="online-dot"></span>
                <span>Active • Conversational Intelligence</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button 
                onClick={() => setShowKeyModal(!showKeyModal)} 
                className="bot-close-btn" 
                title="Configure Gemini API Key"
                aria-label="AI Settings"
              >
                <Key size={15} className={hasCustomKey ? 'text-cyan' : 'text-muted'} />
              </button>
              <button onClick={() => setIsOpen(false)} className="bot-close-btn" aria-label="Close chatbot">
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Optional API Key Config Modal */}
          {showKeyModal && (
            <div className="chatbot-api-modal" style={{
              background: '#151722',
              padding: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              fontSize: '0.78rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#00e5ff' }}>Google Gemini API Key</strong>
                <button onClick={() => setShowKeyModal(false)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              </div>
              <p style={{ color: '#a0a6b5', marginBottom: '0.6rem', fontSize: '0.74rem' }}>
                Optionally connect your personal Google Gemini API key to enable live multimodal reasoning.
              </p>
              <form onSubmit={handleSaveApiKey} style={{ display: 'flex', gap: '0.4rem' }}>
                <input 
                  type="password" 
                  placeholder="AIzaSy..." 
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '6px',
                    color: '#fff',
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.76rem'
                  }}
                />
                <button type="submit" className="btn-primary-fire" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}>
                  Save
                </button>
              </form>
            </div>
          )}

          {/* Quick Prompts */}
          <div className="chatbot-quick-prompts">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                disabled={isTyping}
                className="quick-prompt-chip"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="chatbot-messages-body" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-row ${msg.from === 'user' ? 'user-row' : 'bot-row'}`}>
                {msg.from === 'bot' && (
                  <div className="bot-msg-avatar">
                    <Bot size={14} />
                  </div>
                )}
                <div className={`chat-bubble ${msg.from === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <p className="chat-text">{renderFormattedText(msg.text)}</p>
                  
                  {msg.link && (
                    <button
                      onClick={() => handleNavigate(msg.link)}
                      className="chat-action-link"
                    >
                      <span>Explore Portal</span>
                      <ExternalLink size={12} />
                    </button>
                  )}
                  
                  <span className="chat-timestamp">
                    {new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-message-row bot-row">
                <div className="bot-msg-avatar">
                  <Bot size={14} />
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

          {/* Input Bar */}
          <div className="chatbot-input-bar">
            <input
              type="text"
              placeholder="Ask Gemini about anime, gaming, lore..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={isTyping}
              className="chat-input"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="chat-send-btn"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-launcher-btn ${isOpen ? 'active' : ''}`}
        aria-label="Open ChillBot chat assistant"
        aria-expanded={isOpen}
      >
        {!isOpen && <span className="chatbot-pulse-ring"></span>}
        {isOpen
          ? <X size={26} color="#fff" />
          : <Bot size={26} color="#fff" className="bot-icon-glow" />
        }
      </button>
    </div>
  );
}

export default ChatbotWidget;
