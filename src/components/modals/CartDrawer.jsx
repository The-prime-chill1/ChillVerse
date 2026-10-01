import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export default function CartDrawer() {
  const { 
    isCartOpen, setIsCartOpen, cart, updateCartQty, 
    removeFromCart, clearCart, cartSubtotal, cartTax, cartTotal 
  } = useApp();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!isCartOpen) return null;

  const handleSimulateCheckout = () => {
    // Fire celebration confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff3b30', '#ff5722', '#00e5ff', '#8a2be2']
    });
    setCheckoutModalOpen(true);
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <aside className="cart-drawer-panel" onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-title-row">
            <ShoppingBag size={20} className="text-orange" />
            <h3 className="cart-heading">Session Merch Vault</h3>
            <span className="cart-count-pill">{cart.length} Items</span>
          </div>
          <button 
            className="cart-close-btn" 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-scroll">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={56} className="empty-cart-icon text-muted" />
              <h4 className="empty-title">Your Merch Vault is Empty</h4>
              <p className="empty-desc">
                Explore official anime apparel, gaming collectibles, and K-Pop lightsticks in the Merch Vault!
              </p>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="btn-primary-fire mt-4"
              >
                Browse Fandom Gear
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.variant}-${idx}`} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  
                  <div className="cart-item-details">
                    <span className="cart-item-cat">{item.category}</span>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-variant">{item.variant}</span>
                    <div className="cart-item-price-unit">${item.price.toFixed(2)}</div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-pill">
                      <button 
                        onClick={() => updateCartQty(item.id, -1, item.variant)}
                        className="qty-stepper-btn"
                        title="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQty(item.id, 1, item.variant)}
                        className="qty-stepper-btn"
                        title="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="cart-line-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id, item.variant)}
                      className="btn-remove-item"
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-cost-summary">
              <div className="cost-row">
                <span className="cost-label">Vault Subtotal</span>
                <span className="cost-val">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="cost-row">
                <span className="cost-label">Estimated Tax (8%)</span>
                <span className="cost-val">${cartTax.toFixed(2)}</span>
              </div>
              <div className="cost-row">
                <span className="cost-label">Courier Community Waiver</span>
                <span className="cost-val text-cyan">FREE ($0.00)</span>
              </div>
              <div className="cost-divider"></div>
              <div className="cost-row total-row">
                <span className="total-label">Simulated Total</span>
                <span className="total-val">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-action-buttons">
              <button 
                onClick={handleSimulateCheckout}
                className="btn-primary-fire w-full checkout-trigger-btn"
              >
                <span>Simulate Order Review</span>
                <ArrowRight size={16} />
              </button>

              <button 
                onClick={clearCart}
                className="btn-clear-cart"
              >
                Clear Entire Vault
              </button>
            </div>

            {/* Session Bag Notice */}
            <div className="srs-educational-disclaimer mt-3">
              <AlertCircle size={13} className="text-orange" />
              <span>
                <strong>Session Bag:</strong> Items are stored in your active browser session with real-time tax and courier calculations.
              </span>
            </div>
          </div>
        )}

        {/* Simulated Checkout Success Modal */}
        {checkoutModalOpen && (
          <div className="modal-backdrop sub-modal" onClick={() => setCheckoutModalOpen(false)}>
            <div className="modal-container checkout-summary-box" onClick={e => e.stopPropagation()}>
              <div className="text-center">
                <div className="celebration-icon">
                  <Sparkles size={36} className="text-orange" />
                </div>
                <h3 className="checkout-title">SIMULATED ORDER CONFIRMED!</h3>
                <p className="checkout-subtitle">
                  Order Haul #{Math.floor(100000 + Math.random() * 900000)} has been recorded in your local browser session.
                </p>
                
                <div className="checkout-receipt-box">
                  <div className="receipt-row">
                    <span>Items Count:</span>
                    <strong>{cart.reduce((a, b) => a + b.quantity, 0)} units</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Calculated Total:</span>
                    <strong className="text-orange">${cartTotal.toFixed(2)}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Fulfillment Status:</span>
                    <span className="text-cyan">Simulated Courier Dispatched</span>
                  </div>
                </div>

                <div className="srs-educational-disclaimer my-3 text-left">
                  <AlertCircle size={14} className="text-orange inline mr-1" />
                  <span>
                    <strong>Collector Haul Logged:</strong> Your exclusive preview order has been logged to your local session vault.
                  </span>
                </div>

                <button 
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    clearCart();
                    setIsCartOpen(false);
                  }}
                  className="btn-primary-fire w-full mt-3"
                >
                  Done & Empty Vault
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
