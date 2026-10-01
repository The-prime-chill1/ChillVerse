import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Star, ShieldCheck, AlertCircle, Filter, Check, Plus } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { dataService } from '../services/dataService';
import { useApp } from '../context/AppContext';
import CartDrawer from '../components/modals/CartDrawer';

export default function ShopPage() {
  const { openModal, addToCart, setIsCartOpen } = useApp();
  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    async function load() {
      const merch = await dataService.getMerchandise();
      setProducts(merch);
      setLoading(false);
    }
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filtered = useMemo(() => {
    if (selectedCat === 'all') return products;
    return products.filter(p => p.category?.toLowerCase() === selectedCat.toLowerCase());
  }, [products, selectedCat]);

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    addToCart(item, 1, 'Standard Edition');
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1400);
    setIsCartOpen(true);
  };

  return (
    <div className="shop-page-layout">
      <Breadcrumbs items={[{ label: 'Merch Vault', path: '/shop' }]} />

      <section className="shop-hero-header">
        <div className="container">
          <div className="section-eyebrow">
            <ShoppingBag size={15} className="text-orange" />
            <span>OFFICIAL FAN VAULT • LIMITED DROPS</span>
          </div>
          <h1 className="hub-title">Merch Vault & Fan Gear</h1>
          <p className="hub-desc">
            Authentic, officially licensed collectibles, apparel, scale figures, concert lightsticks, and limited art prints across all 7 fandom universes.
          </p>

          <div className="srs-educational-disclaimer mt-4">
            <AlertCircle size={14} className="text-orange" />
            <span>
              <strong>Collector Catalog:</strong> Interactive session bag with real-time tax and courier estimation. Simulated checkout mode for previewing exclusive merch orders.
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="category-toolbar-section">
        <div className="container">
          <div className="toolbar-flex-row">
            <div className="type-filter-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`toolbar-tab-btn ${selectedCat === cat ? 'active' : ''}`}
                >
                  {cat === 'all' ? 'All Gear' : cat}
                </button>
              ))}
            </div>
            <div className="toolbar-right-controls">
              <span className="text-secondary text-sm">{filtered.length} items in vault</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="shop-main-content">
        <div className="container">
          {loading ? (
            <div className="loading-grid-skeleton">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-card skeleton" style={{ height: '340px' }}></div>
              ))}
            </div>
          ) : (
            <div className="shop-products-grid">
              {filtered.map(item => {
                const price = Number(item.price) || 29.99;
                const wasAdded = addedId === item.id;
                return (
                  <div key={item.id} className="merch-card" onClick={() => openModal('merch', item)}>
                    <div className="merch-card-img-wrap">
                      <img
                        src={item.image || item.thumbnail || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80'}
                        alt={item.name}
                        className="merch-card-img"
                        loading="lazy"
                      />
                      <span className="badge badge-orange merch-cat-badge">{item.category}</span>
                      <div className="merch-guarantee-mini">
                        <ShieldCheck size={12} />
                        <span>Licensed</span>
                      </div>
                    </div>

                    <div className="merch-card-body">
                      <div className="merch-card-rating">
                        <Star size={12} fill="#ffb300" color="#ffb300" />
                        <Star size={12} fill="#ffb300" color="#ffb300" />
                        <Star size={12} fill="#ffb300" color="#ffb300" />
                        <Star size={12} fill="#ffb300" color="#ffb300" />
                        <Star size={12} fill="#ffb300" color="#ffb300" />
                        <span className="text-muted text-xs ml-1">(Official)</span>
                      </div>
                      <h4 className="merch-card-title">{item.name}</h4>
                      <p className="merch-card-desc">{item.description?.slice(0, 75)}...</p>

                      <div className="merch-card-footer">
                        <span className="merch-card-price">${price.toFixed(2)}</span>
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, item)}
                          className={`btn-add-cart-mini ${wasAdded ? 'added' : ''}`}
                        >
                          {wasAdded ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Check size={14} /> Added
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Plus size={14} /> Cart
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Cart Drawer is always rendered globally via App.jsx */}
    </div>
  );
}
