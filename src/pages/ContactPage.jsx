import React, { useState, useRef } from 'react';
import { MapPin, Send, Phone, Mail, Globe, Navigation, AlertCircle, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [gpsStatus, setGpsStatus] = useState('idle'); // idle | loading | success | denied

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.includes('@')) errs.email = 'Valid email required';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('denied');
      return;
    }
    setGpsStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGpsStatus(`success:${latitude.toFixed(4)},${longitude.toFixed(4)}`);
      },
      () => {
        setGpsStatus('denied');
      }
    );
  };

  return (
    <div className="contact-page-layout">
      <Breadcrumbs items={[{ label: 'Contact & Map', path: '/contact' }]} />

      <section className="contact-hero">
        <div className="container">
          <div className="section-eyebrow">
            <MapPin size={15} className="text-orange" />
            <span>SUPPORT SANCTUARY & TEAM HQ</span>
          </div>
          <h1 className="hub-title">Contact ChillVerse Team</h1>
          <p className="hub-desc">
            Reach the ChillTechLtd.com team for partnership inquiries, fan submissions, or technical support.
          </p>
        </div>
      </section>

      <div className="container contact-body-grid">
        {/* Left: Contact Info + Map */}
        <div className="contact-info-col">
          <div className="contact-info-cards">
            <div className="contact-info-item">
              <MapPin size={20} className="text-orange" />
              <div>
                <h4>Headquarters</h4>
                <p>ChillTechLtd.com Tower, 42 Fandom Lane, Lagos, Nigeria</p>
              </div>
            </div>
            <div className="contact-info-item">
              <Phone size={20} className="text-cyan" />
              <div>
                <h4>Direct Phone / WhatsApp</h4>
                <a href="tel:+2349137632195" className="contact-link" style={{ color: '#00e5ff', textDecoration: 'none' }}>
                  +234 913 763 2195
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <Mail size={20} className="text-purple" />
              <div>
                <h4>Official Email</h4>
                <a href="mailto:lamidiabdulhameedolawale@gmail.com" className="contact-link" style={{ color: '#bf5af2', textDecoration: 'none' }}>
                  lamidiabdulhameedolawale@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <Globe size={20} className="text-orange" />
              <div>
                <h4>Website</h4>
                <p>www.chillverse.chilltechltd.com</p>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="map-embed-wrapper">
            <iframe
              title="ChillVerse HQ Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46895390475!2d3.1438731!3d6.5480348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1698765432100!5m2!1sen!2sng"
              className="map-iframe"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* GPS Button */}
          <div className="gps-button-section mt-4">
            <button onClick={handleGetLocation} className="btn-primary-fire">
              <Navigation size={16} />
              <span>Get My GPS Location</span>
            </button>

            {gpsStatus === 'loading' && (
              <p className="gps-status text-secondary">Requesting your location...</p>
            )}
            {gpsStatus === 'denied' && (
              <p className="gps-status text-orange" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={16} /> Location access was denied. Please allow GPS in your browser settings.
              </p>
            )}
            {gpsStatus.startsWith('success') && (
              <div className="gps-result-box">
                <p className="text-cyan" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} /> Your GPS Coordinates: {gpsStatus.replace('success:', '')}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${gpsStatus.replace('success:', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass mt-2"
                >
                  Get Directions to ChillVerse HQ →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-form-col">
          <h3 className="form-heading">Send Us a Message</h3>

          {submitted ? (
            <div className="form-success-box text-center py-5">
              <Sparkles size={48} className="text-orange mx-auto mb-3" />
              <h3>Message Received!</h3>
              <p className="text-secondary mt-2">
                This is a client-side demo. No actual server transmission occurred, but your message has been validated successfully.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-primary-fire mt-4">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="contact-form">
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your fandom name' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@chillfandom.io' },
                { key: 'subject', label: 'Subject', type: 'text', placeholder: 'Partnership / Support / Press' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className={`auth-input ${errors[key] ? 'input-error' : ''}`}
                  />
                  {errors[key] && <span className="form-error-text">{errors[key]}</span>}
                </div>
              ))}

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your inquiry, feedback, or fan submission idea..."
                  className={`auth-input ${errors.message ? 'input-error' : ''}`}
                  rows="5"
                ></textarea>
                {errors.message && <span className="form-error-text">{errors.message}</span>}
              </div>

              <div className="srs-educational-disclaimer my-3">
                <AlertCircle size={13} className="text-orange" />
                <span>Direct inquiries will be forwarded immediately to our team inboxes.</span>
              </div>

              <button type="submit" className="btn-primary-fire w-full">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
