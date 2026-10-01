import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-page text-center">
      <div className="container py-5">
        <div className="not-found-glow-number">404</div>
        <h2 className="hub-title mt-3">Realm Not Found</h2>
        <p className="hub-desc mt-2">
          This dimension of the CHILLVERSE portal doesn't exist — yet. The lore architects may be working on it.
        </p>
        <div className="not-found-ctas mt-5">
          <Link to="/" className="btn-primary-fire">
            <Home size={18} />
            <span>Return to Home Portal</span>
          </Link>
          <Link to="/category/anime" className="btn-glass">
            <Compass size={18} />
            <span>Explore 7 Fandom Hubs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
