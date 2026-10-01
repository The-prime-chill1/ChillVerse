import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import TrendingCarousel from '../components/home/TrendingCarousel';
import CategoryPillars from '../components/home/CategoryPillars';
import CharacterPantheon from '../components/home/CharacterPantheon';
import VideoShowcase from '../components/home/VideoShowcase';
import EventsPulse from '../components/home/EventsPulse';
import MerchPreview from '../components/home/MerchPreview';
import { dataService } from '../services/dataService';

export default function HomePage() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [events, setEvents] = useState([]);
  const [merchandise, setMerchandise] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [anime, movies, chars, evts, merch] = await Promise.all([
          dataService.getCategoryContent('anime'),
          dataService.getCategoryContent('movies'),
          dataService.getCharacters(),
          dataService.getEvents(),
          dataService.getMerchandise()
        ]);

        const combined = [...anime.slice(0, 6), ...movies.slice(0, 6)];
        setTrendingItems(combined);
        setCharacters(chars);
        setEvents(evts);
        setMerchandise(merch);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div className="home-page-layout">
      {/* 1. Cinematic Hero Billboard */}
      <HeroBanner />

      {/* 2. Trends Now Carousel */}
      <TrendingCarousel items={trendingItems} />

      {/* 3. 7 Fandom Universe Pillars */}
      <CategoryPillars />

      {/* 4. Character Pantheon Tier Ranking */}
      <CharacterPantheon characters={characters} />

      {/* 5. 4K Video Player Showcase */}
      <VideoShowcase />

      {/* 6. Fandom Events Pulse */}
      <EventsPulse events={events} />

      {/* 7. Merch Vault Preview */}
      <MerchPreview items={merchandise} />
    </div>
  );
}
