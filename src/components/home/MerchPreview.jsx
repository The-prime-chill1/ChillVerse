import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function MerchPreview({ items = [] }) {
  const { openModal, addToCart } = useApp();
  const displayItems = items.slice(0, 4);

  return (
    <section className="merch-preview-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-eyebrow">
            <ShoppingBag size={15} className="text-orange" />
            <span>OFFICIAL FAN MERCH VAULT</span>
          </div>
          <div className="pantheon-header-row">
            <div>
              <h2 className="section-main-heading">Exclusive Drops & Collectibles</h2>
              <p className="section-sub-heading">
                Authentic apparel, limited scale figures, and licensed concert gear across all 7 universes.
              </p>
            </div>
            <Link to="/shop" className="btn-glass">
              <span>Visit Full Vault</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="merch-grid">
          {displayItems.map((item) => {
            const price = Number(item.price) || 29.99;
            return (
              <div 
                key={item.id} 
                className="merch-card"
                onClick={() => openModal('merch', item)}
              >
                <div className="merch-card-img-wrap">
                  <img src={item.image || item.thumbnail} alt={item.name} className="merch-card-img" loading="lazy" />
                  <span className="badge badge-orange merch-cat-badge">{item.category}</span>
                </div>

                <div className="merch-card-body">
                  <div className="merch-card-rating">
                    <Star size={12} fill="#ffb300" color="#ffb300" />
                    <span>4.9 (Official)</span>
                  </div>
                  <h4 className="merch-card-title">{item.name}</h4>
                  <p className="merch-card-desc">{item.description?.slice(0, 80)}...</p>

                  <div className="merch-card-footer">
                    <span className="merch-card-price">${price.toFixed(2)}</span>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 1, 'Standard Edition');
                      }}
                      className="btn-add-cart-mini"
                      title="Add to temporary cart"
                    >
                      <ShoppingBag size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
