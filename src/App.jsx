import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/modals/CartDrawer';
import AudioPlayerBar from './components/audio/AudioPlayerBar';
import MobileBottomNav from './components/layout/MobileBottomNav';
import TrailerModal from './components/modals/TrailerModal';
import CharacterModal from './components/modals/CharacterModal';
import MerchModal from './components/modals/MerchModal';
import AuthModal from './components/modals/AuthModal';
import LightboxModal from './components/modals/LightboxModal';
import ChatbotWidget from './components/chat/ChatbotWidget';
import { useApp } from './context/AppContext';
import './styles/theme.css';
import './App.css';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading Skeleton Fallback
function PageLoader() {
  return (
    <div className="page-loader-screen">
      <div className="loader-center">
        <img src="/logo.png" alt="CHILLVERSE" className="loader-logo animate-float" />
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
        <p className="loader-text">Loading Fandom Realm...</p>
      </div>
    </div>
  );
}

// Global Modal Dispatcher (rendered inside AppProvider)
function GlobalModals() {
  const { modalState, closeModal } = useApp();

  if (!modalState.isOpen || !modalState.type) return null;

  switch (modalState.type) {
    case 'trailer':
      return <TrailerModal data={modalState.data} onClose={closeModal} />;
    case 'character':
      return <CharacterModal data={modalState.data} onClose={closeModal} />;
    case 'merch':
      return <MerchModal data={modalState.data} onClose={closeModal} />;
    case 'auth':
      return <AuthModal onClose={closeModal} />;
    case 'lightbox':
      return <LightboxModal data={modalState.data} onClose={closeModal} />;
    default:
      return null;
  }
}

// Main App Shell
function AppShell() {
  const { audioState } = useApp();

  return (
    <div className="app-root">
      <Navbar />

      <main className="main-content-area">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* Global Persistent Widgets */}
      <CartDrawer />
      <AudioPlayerBar />
      <ChatbotWidget />
      <MobileBottomNav />
      <GlobalModals />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  );
}
