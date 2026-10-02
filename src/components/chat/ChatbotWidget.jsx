import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askGemini } from '../../services/aiService';

const QUICK_PROMPTS = [
  "Recommend a top Anime",
  "Play Davido Music",
  "Tell me about Spider-Man",
  "What's upcoming on Calendar?",
  "Browse Merch Vault"
];

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: 'bot', 
      text: "Hello! I'm ChillBot AI, your personal entertainment guide. Ask me about anime lore, gaming mechanics, 4K movie trailers, Davido music hits, or anything across CHILLVERSE!", 
      link: null, 
      ts: new Date(),
      source: 'neural-ai'
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

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    const handleOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-chillbot', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-chillbot', handleOpen);
    };
  }, [isOpen]);

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
        source: response.source || 'neural-ai'
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          from: 'bot', 
          text: "I experienced a brief connection glitch. Feel free to ask me again or check our 8 Fandom Realms!", 
          link: '/category/anime', 
          ts: new Date(),
          source: 'neural-ai'
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
    <>
      {/* Mobile Backdrop when open */}
      {isOpen && (
        <div 
          className="chatbot-mobile-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={`chatbot-widget-container ${isOpen ? 'is-open' : ''}`} role="complementary" aria-label="ChillBot Assistant">
        {isOpen && (
          <div className="chatbot-window-box" role="dialog" aria-label="ChillBot chat window">
            {/* Header */}
            <div className="chatbot-header">
              <div className="bot-avatar-badge">
                <Bot size={18} className="text-cyan" />
              </div>
              <div className="bot-title-wrap">
                <div className="bot-name">
                  <span>ChillBot AI</span>
                  <span className="bot-ai-badge">NEURAL CORE</span>
                </div>
                <div className="bot-status">
                  <span className="online-dot"></span>
                  <span>Active • 24/7 Fandom Intelligence</span>
                </div>
              </div>

              <div className="bot-header-actions">
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="bot-close-btn" 
                  aria-label="Close chatbot"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Quick Prompts Chips */}
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
                        <span>Explore Realm</span>
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
                placeholder="Ask ChillBot about anime, movies, Davido, games..."
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

        {/* Sleek, Non-Intrusive Launcher Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`chatbot-launcher-btn ${isOpen ? 'active' : ''}`}
          aria-label={isOpen ? "Close ChillBot" : "Open ChillBot AI assistant"}
          aria-expanded={isOpen}
        >
          {!isOpen && <span className="chatbot-pulse-ring"></span>}
          {isOpen ? (
            <X size={20} color="#fff" />
          ) : (
            <div className="bot-launcher-inner">
              <Bot size={20} color="#fff" />
              <span className="launcher-ai-label">AI</span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}

export default ChatbotWidget;
