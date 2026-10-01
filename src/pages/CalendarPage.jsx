import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { dataService } from '../services/dataService';

export default function CalendarPage() {
  const [releases, setReleases] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    async function load() {
      const [rels, evts] = await Promise.all([
        dataService.getReleases(),
        dataService.getEvents()
      ]);
      setReleases(rels);
      setEvents(evts);
    }
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const allItems = [...releases, ...events];
  const filtered = selectedCat === 'all' ? allItems : allItems.filter(i => i.category?.toLowerCase() === selectedCat);

  const getItemsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filtered.filter(i => (i.date || '').startsWith(dateStr.slice(0, 7)));
  };

  const selectedItems = selectedDate ? getItemsForDate(selectedDate) : [];

  const today = new Date();
  const isToday = (day) => today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

  return (
    <div className="calendar-page-layout">
      <Breadcrumbs items={[{ label: 'Releases & Watch Parties', path: '/calendar' }]} />

      <section className="calendar-hero">
        <div className="container">
          <div className="section-eyebrow">
            <Calendar size={15} className="text-orange" />
            <span>UPCOMING RELEASE PULSE</span>
          </div>
          <h1 className="hub-title">Fandom Release Calendar</h1>
          <p className="hub-desc">Track anime season premieres, game launch dates, movie drops, and K-Pop album comebacks.</p>

          {/* Category Filter */}
          <div className="media-filters-bar mt-4">
            {['all','anime','gaming','movies','k-pop','comics','manga'].map(c => (
              <button key={c} onClick={() => setSelectedCat(c)} className={`toolbar-tab-btn ${selectedCat === c ? 'active' : ''}`}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mt-5 pb-5">
        <div className="calendar-grid-layout">
          {/* Calendar Panel */}
          <div className="calendar-panel">
            {/* Month Navigation */}
            <div className="calendar-month-nav">
              <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="cal-nav-btn">
                <ChevronLeft size={20} />
              </button>
              <h3 className="cal-month-label">{monthNames[month]} {year}</h3>
              <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="cal-nav-btn">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Days Header */}
            <div className="cal-days-header">
              {daysOfWeek.map(d => (
                <div key={d} className="cal-day-name">{d}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="cal-dates-grid">
              {/* Empty cells before first day */}
              {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} className="cal-date-cell empty"></div>)}

              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const items = getItemsForDate(day);
                const isSelected = selectedDate === day;
                return (
                  <div
                    key={day}
                    className={`cal-date-cell ${isToday(day) ? 'today' : ''} ${isSelected ? 'selected-date' : ''} ${items.length > 0 ? 'has-releases' : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <span className="cal-date-number">{day}</span>
                    {items.length > 0 && (
                      <div className="cal-release-dots">
                        {items.slice(0, 3).map((_, idx) => <span key={idx} className="release-dot"></span>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Date Events Panel */}
          <div className="cal-events-panel">
            <h3 className="cal-events-heading">
              {selectedDate ? `Releases for ${monthNames[month]} ${selectedDate}` : 'Select a Date to View Releases'}
            </h3>

            {selectedDate && selectedItems.length === 0 && (
              <div className="cal-no-events">
                <Calendar size={36} className="text-muted" />
                <p>No releases tracked on this date. Check nearby dates!</p>
              </div>
            )}

            <div className="cal-events-list">
              {selectedItems.map((item, i) => (
                <div key={i} className="cal-event-item">
                  <div className="cal-event-dot"></div>
                  <div>
                    <h4 className="cal-event-title">{item.title}</h4>
                    <span className="badge badge-cyan text-xs mt-1">{item.category}</span>
                    <p className="text-secondary text-xs mt-1">{item.description?.slice(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>

            {/* All upcoming releases list */}
            {!selectedDate && (
              <div className="upcoming-list">
                <h4 className="upcoming-list-heading">All Upcoming Drops ({filtered.length})</h4>
                {filtered.slice(0, 10).map((item, i) => (
                  <div key={i} className="upcoming-item-row">
                    <div className="upcoming-date-col">
                      <span className="text-orange font-bold text-sm">{item.date?.slice(5, 10) || 'TBA'}</span>
                    </div>
                    <div>
                      <h5 className="upcoming-item-title">{item.title}</h5>
                      <span className="badge badge-purple text-xs">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
