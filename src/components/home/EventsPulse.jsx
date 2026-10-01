import React, { useState } from 'react';
import { Calendar, MapPin, Users, Check, Sparkles, Clock } from 'lucide-react';

export default function EventsPulse({ events = [] }) {
  const [rsvpd, setRsvpd] = useState({});

  const toggleRsvp = (id) => {
    setRsvpd(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const displayEvents = events.slice(0, 4);

  return (
    <section className="events-pulse-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-eyebrow">
            <Calendar size={15} className="text-orange" />
            <span>GLOBAL WATCH ROOMS & CONVENTIONS</span>
          </div>
          <h2 className="section-main-heading">Fandom Events Pulse</h2>
          <p className="section-sub-heading">
            Synchronize with worldwide watch parties, convention panels, and official season launch rooms.
          </p>
        </div>

        <div className="events-grid">
          {displayEvents.map((evt) => {
            const hasRsvp = rsvpd[evt.id];

            return (
              <div key={evt.id} className="event-card">
                <div className="event-date-badge">
                  <span className="event-month">{evt.date?.slice(5, 7) || 'OCT'}</span>
                  <span className="event-day">{evt.date?.slice(8, 10) || '15'}</span>
                </div>

                <div className="event-content-box">
                  <div className="event-meta-line">
                    <span className="badge badge-cyan">{evt.category}</span>
                    <span className="event-location">
                      <MapPin size={12} className="inline mr-1" />
                      {evt.location}
                    </span>
                  </div>

                  <h3 className="event-title">{evt.title}</h3>
                  <p className="event-desc">{evt.description}</p>

                  <div className="event-action-bar">
                    <button 
                      onClick={() => toggleRsvp(evt.id)}
                      className={`btn-rsvp ${hasRsvp ? 'rsvpd' : ''}`}
                    >
                      {hasRsvp ? (
                        <>
                          <Check size={14} />
                          <span>RSVP Confirmed</span>
                        </>
                      ) : (
                        <>
                          <Users size={14} />
                          <span>RSVP Watch Party</span>
                        </>
                      )}
                    </button>
                    <span className="event-attendees">
                      {hasRsvp ? '4,129 Fans Attending' : '4,128 Fans Attending'}
                    </span>
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
