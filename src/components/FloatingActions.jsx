import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function FloatingActions() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-actions-container">
      {/* Floating WhatsApp Action */}
      <a
        href={personalInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="float-whatsapp-btn"
        aria-label="Direct WhatsApp Chat"
        title="Chat with Anitha on WhatsApp"
      >
        <MessageSquare size={24} />
      </a>

      {/* Back to top Button */}
      <button
        onClick={scrollToTop}
        className={`float-top-btn ${showTopBtn ? 'visible' : ''}`}
        aria-label="Scroll to top"
        title="Scroll to Top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
