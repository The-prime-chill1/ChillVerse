import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Star, ShieldCheck, Truck, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MerchModal({ data, onClose }) {
  const { addToCart } = useApp();
  const [selectedVariant, setSelectedVariant] = useState('Standard Edition');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  const variants = data.variants || ['Standard Edition', 'Collector Foil Box', 'Autographed Run'];
  const price = Number(data.price) || 29.99;

  const handleAddToCart = () => {
    addToCart(data, quantity, selectedVariant);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container merch-modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn float-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="merch-modal-grid">
          {/* Product Image */}
          <div className="merch-img-col">
            <img src={data.image || data.thumbnail} alt={data.name} className="merch-large-img" />
            <div className="merch-guarantee-pill">
              <ShieldCheck size={14} className="text-cyan" />
              <span>100% Officially Licensed Merchandise</span>
            </div>
          </div>

          {/* Product Info & Options */}
          <div className="merch-details-col">
            <span className="badge badge-orange">{data.category} Fandom Gear</span>
            <h2 className="merch-modal-title">{data.name}</h2>

            <div className="merch-rating-row">
              <div className="stars-wrap">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#ffb300" color="#ffb300" />
                ))}
              </div>
              <span className="rating-score">4.9 / 5.0 (2,410 Reviews)</span>
            </div>

            <div className="merch-pricing-box">
              <span className="merch-current-price">${price.toFixed(2)}</span>
              {data.priceMax && (
                <span className="merch-range-price">MSRP: ${data.priceMax}</span>
              )}
              <span className="merch-stock-badge">In Stock • Limited Drop</span>
            </div>

            <p className="merch-modal-desc">{data.description}</p>

            {/* Variant Selector */}
            <div className="merch-option-group">
              <label className="option-label">Select Edition / Size:</label>
              <div className="variant-buttons-row">
                {variants.map((v, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`variant-pill-btn ${selectedVariant === v ? 'active' : ''}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="merch-option-group">
              <label className="option-label">Quantity:</label>
              <div className="qty-stepper">
                <button 
                  type="button" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  type="button" 
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add To Cart CTA */}
            <div className="merch-cta-wrap">
              <button 
                onClick={handleAddToCart}
                disabled={addedToast}
                className="btn-primary-fire w-full"
              >
                {addedToast ? (
                  <>
                    <Check size={18} />
                    <span>Added to Session Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Temporary Cart • ${(price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Collector Bag Notice */}
            <div className="srs-educational-disclaimer">
              <AlertCircle size={14} className="text-orange" />
              <span>
                <strong>Collector Catalog:</strong> Interactive session bag calculations with live taxes and shipping discounts applied.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
