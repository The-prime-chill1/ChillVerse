import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AuthModal({ onClose }) {
  const { dummyLogin } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please provide both username and password.');
      return;
    }
    setError('');
    setSuccess(true);
    setTimeout(() => {
      dummyLogin(username.trim());
    }, 900);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container auth-modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn float-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Brand Crest */}
        <div className="auth-header text-center">
          <div className="auth-badge-icon">
            <Sparkles size={24} className="text-orange" />
          </div>
          <h2 className="auth-title">CHILLVERSE FAN PASS</h2>
          <p className="auth-subtitle">Access fan tier leaderboards, sync bookmarks, and personalize your hub.</p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs-row">
          <button 
            type="button"
            className={`auth-tab-btn ${isLoginTab ? 'active' : ''}`}
            onClick={() => { setIsLoginTab(true); setError(''); }}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`auth-tab-btn ${!isLoginTab ? 'active' : ''}`}
            onClick={() => { setIsLoginTab(false); setError(''); }}
          >
            Create VIP Pass
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="auth-success-box text-center">
            <CheckCircle2 size={48} className="text-cyan mx-auto mb-3" />
            <h3 className="text-white mb-2">Welcome aboard, {username}!</h3>
            <p className="text-secondary text-sm">Simulated VIP session initialized. Enjoy the sanctuary!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form-wrap">
            {error && (
              <div className="auth-error-banner">
                <ShieldAlert size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Chiller Handle / Username</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. SatoruFan99"
                  className="auth-input"
                  required
                />
              </div>
            </div>

            {!isLoginTab && (
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@chillfandom.io"
                    className="auth-input"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Passcode</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="auth-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary-fire w-full mt-4">
              {isLoginTab ? 'Initialize Fan Session' : 'Claim Free Fan Pass'}
            </button>
          </form>
        )}

        {/* Privacy & Member Session Notice */}
        <div className="srs-educational-disclaimer mt-4">
          <ShieldAlert size={14} className="text-orange" />
          <span>
            <strong>Portal Pass:</strong> Quick sign-in unlocks customized watchlist curation, personal session notes, and VIP fan badge privileges.
          </span>
        </div>
      </div>
    </div>
  );
}
