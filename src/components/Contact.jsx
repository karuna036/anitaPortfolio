import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential Interior Design',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending with realistic feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleOpenWhatsAppFromForm = () => {
    const text = `Hello Anitha! My name is ${formData.name || 'Client'}.%0AEmail: ${formData.email || 'N/A'}%0APhone: ${formData.phone || 'N/A'}%0AService Interested: ${formData.service}%0AMessage: ${formData.message || 'I would like to discuss an interior project.'}`;
    window.open(`https://wa.me/971569334264?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Let's Connect</div>
          <h2 className="section-title">
            Begin Your <i>Interior Journey</i>
          </h2>
          <p className="section-subtitle">
            Whether you are conceptualizing a new residential villa, modernizing an apartment, or require 3D photorealistic visualization, let's bring your design vision to reality.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Information & Channels */}
          <div className="contact-info-panel">
            <div className="contact-card-item">
              <div className="contact-icon-box">
                <Mail size={22} />
              </div>
              <div>
                <h4>Direct Email</h4>
                <p>
                  <a href={`mailto:${personalInfo.email}`}>
                    {personalInfo.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-box">
                <Phone size={22} />
              </div>
              <div>
                <h4>Phone / Consultation Call</h4>
                <p>
                  <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}>
                    {personalInfo.phoneFormatted}
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-box">
                <MessageSquare size={22} />
              </div>
              <div>
                <h4>WhatsApp Messenger</h4>
                <p>
                  <a
                    href={personalInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#25D366', fontWeight: 600 }}
                  >
                    Quick Chat on WhatsApp →
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-box">
                <MapPin size={22} />
              </div>
              <div>
                <h4>Location</h4>
                <p>{personalInfo.location}</p>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Available for On-Site UAE Projects & Remote Worldwide CGI
                </span>
              </div>
            </div>

            <div
              style={{
                padding: '24px',
                background: 'var(--color-bg-alt)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-accent)' }}>
                <Clock size={18} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Response Time
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Inquiries typically receive a response within 24 hours. For urgent project reviews, feel free to reach out directly via WhatsApp.
              </p>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="contact-form-container">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#EAF7EE',
                    color: '#1F6F3A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}
                >
                  <CheckCircle size={36} />
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
                  Message Received
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                  Thank you, <strong>{formData.name}</strong>. Anitha will review your project details and get in touch shortly.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleOpenWhatsAppFromForm}
                    className="btn-primary"
                  >
                    <MessageSquare size={16} />
                    <span>Send via WhatsApp Now</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'Residential Interior Design',
                        message: ''
                      });
                    }}
                    className="btn-outline"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Al Hashimi"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="service">
                      Desired Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Residential Interior Design">Residential Interior Design</option>
                      <option value="Space Planning">Space Planning</option>
                      <option value="Furniture Layout">Furniture Layout</option>
                      <option value="2D Floor Plans">2D Floor Plans & Elevations</option>
                      <option value="3D Interior Visualization">3D Interior Visualization</option>
                      <option value="Modular Kitchen & Wardrobe">Modular Kitchen & Wardrobe</option>
                      <option value="Material & Laminate Selection">Material & Laminate Selection</option>
                      <option value="Other Consultation">Other Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="message">
                    Project Overview / Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell me about your space, dimensions, style preferences, and target timelines..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ minWidth: '180px' }}
                  >
                    {loading ? (
                      <span>Sending Details...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsAppFromForm}
                    className="btn-outline"
                    style={{ borderColor: '#25D366', color: '#1B8742' }}
                  >
                    <MessageSquare size={16} />
                    <span>Open in WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
