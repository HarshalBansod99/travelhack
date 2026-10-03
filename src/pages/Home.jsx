import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone, MessageCircle, Star, ArrowDown,
  ArrowRight, MapPin, Calendar, Clock, CheckCircle, XCircle, Users, Mountain, Sun, Snowflake, Tent, Music
} from '../components/Icons';
import { testimonials } from '../data/testimonials';
import { packages } from '../data/packages';
import { galleryImages } from '../data/gallery';

import './Home.css';

const manaliPkg = packages[0];

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1600&q=80', alt: 'Manali valley with snow-capped mountains' },
  { image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80', alt: 'Solang Valley snow activities' },
  { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80', alt: 'Kasol mountain peaks' },
  { image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80', alt: 'Manikaran golden hour mountains' },
];

const experienceHighlights = [
  { icon: '🏔️', title: 'Solang Valley', desc: 'Snow activities & Atal Tunnel' },
  { icon: '🛕', title: 'Hadimba Temple', desc: 'Ancient temple in deodar forest' },
  { icon: '🏕️', title: 'Kasol Camping', desc: 'Riverside camps with bonfire' },
  { icon: '🎶', title: 'DJ Night', desc: 'Music under the mountain stars' },
  { icon: '🌊', title: 'River Rafting', desc: 'Adventure at Kullu rapids' },
  { icon: '♨️', title: 'Manikaran Springs', desc: 'Sacred hot water spring' },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const whatsappMessage = encodeURIComponent('Hi TravelHack! I\'m interested in the Manali – Solang, Atal Tunnel, Kasol, Manikaran trip. Can we discuss dates and availability?');

  return (
    <main className="home">
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero__slides">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`hero__slide ${i === currentSlide ? 'hero__slide--active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.alt}
            />
          ))}
        </div>
        <div className="hero__overlay" />
        <div className="hero__content container">
          <motion.div
            className="hero__badge-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="hero__trip-badge">🏔️ Nagpur → Delhi → Manali → Kasol → Nagpur</span>
          </motion.div>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Manali – Solang, Atal Tunnel,
            <br />
            <em>Kasol & Manikaran</em>
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Snow-capped peaks, ancient temples, riverside camping, and mountain adventures. 
            7 days from Nagpur — starting at just ₹8,999/person.
          </motion.p>
          <motion.div
            className="hero__quick-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="hero__info-chip"><Calendar size={16} /> 6D/5N</div>
            <div className="hero__info-chip"><MapPin size={16} /> From Nagpur</div>
            <div className="hero__info-chip"><Users size={16} /> Group Tour</div>
            <div className="hero__info-chip hero__info-chip--price">₹8,999/person</div>
          </motion.div>
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <a
              href={`https://wa.me/918483835171?text=${whatsappMessage}`}
              className="btn btn--warm btn--lg"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-book"
            >
              <Phone size={20} /> Book This Trip
            </a>
            <a href="#itinerary" className="btn btn--hero-browse btn--lg hero__cta-browse" id="hero-cta-itinerary">
              View Itinerary <ArrowDown size={18} />
            </a>
          </motion.div>
          <div className="hero__indicators">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`hero__indicator ${i === currentSlide ? 'hero__indicator--active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll to explore</span>
          <div className="hero__scroll-arrow"><ArrowDown size={18} /></div>
        </div>
      </section>

      {/* ===== EXPERIENCE HIGHLIGHTS ===== */}
      <section className="section experience-highlights" id="highlights">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">what awaits you</span>
            <h2>6 Unforgettable Experiences</h2>
            <p className="experience-highlights__subtitle">From snow-covered valleys to sacred hot springs — each day brings something extraordinary.</p>
          </AnimatedSection>
          <div className="experience-highlights__grid">
            {experienceHighlights.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="exp-card" id={`exp-card-${i}`}>
                  <div className="exp-card__icon">{item.icon}</div>
                  <h3 className="exp-card__title">{item.title}</h3>
                  <p className="exp-card__desc">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DAY-WISE ITINERARY ===== */}
      <section className="section section--sand itinerary-section" id="itinerary">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">the journey</span>
            <h2>Day-wise Itinerary</h2>
            <p className="itinerary-section__note">
              <strong>Note:</strong> The cover page states "6D/5N". However, the detailed itinerary spans Day 1 through Day 7 (7 calendar days from Nagpur departure to Nagpur return).
            </p>
          </AnimatedSection>
          <div className="itinerary-timeline">
            {manaliPkg.itinerary.map((day, i) => (
              <AnimatedSection key={day.day} delay={i * 0.06}>
                <div
                  className={`timeline-item ${activeDay === day.day ? 'timeline-item--active' : ''}`}
                  id={`itinerary-day-${day.day}`}
                >
                  <button
                    className="timeline-item__header"
                    onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                  >
                    <div className="timeline-item__day-badge">Day {day.day}</div>
                    <h3 className="timeline-item__title">{day.title}</h3>
                    <span className="timeline-item__toggle">{activeDay === day.day ? '−' : '+'}</span>
                  </button>
                  <div className={`timeline-item__content ${activeDay === day.day ? 'timeline-item__content--open' : ''}`}>
                    <p>{day.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="section pricing-section" id="pricing">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">transparent pricing</span>
            <h2>Choose Your Room Sharing</h2>
            <p className="pricing-section__subtitle">All prices are per person. No hidden charges, no surprise surcharges.</p>
          </AnimatedSection>
          <div className="pricing-cards">
            {manaliPkg.pricing.map((tier, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`price-card ${i === 0 ? 'price-card--popular' : ''}`} id={`price-card-${i}`}>
                  {i === 0 && <div className="price-card__badge">Best Value</div>}
                  <h3 className="price-card__type">{tier.type}</h3>
                  <div className="price-card__amount">{tier.price.split('/')[0]}</div>
                  <span className="price-card__per">per person</span>
                  <ul className="price-card__features">
                    <li>2 nights Manali 3-star hotel</li>
                    <li>1 night Kasol camp</li>
                    <li>6 meals included</li>
                    <li>Trip captain (Delhi to Delhi)</li>
                    <li>Camping + DJ night + bonfire</li>
                    <li>24×7 assistance</li>
                  </ul>
                  <a
                    href={`https://wa.me/918483835171?text=${encodeURIComponent(`Hi TravelHack! I want to book the Manali trip with ${tier.type}. Let's discuss!`)}`}
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} /> Book Now
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INCLUSIONS & EXCLUSIONS ===== */}
      <section className="section section--sand inc-exc-section" id="inclusions">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">what's covered</span>
            <h2>Inclusions & Exclusions</h2>
          </AnimatedSection>
          <div className="inc-exc-grid">
            <AnimatedSection delay={0}>
              <div className="inc-exc-card inc-exc-card--inc">
                <h3><CheckCircle size={22} /> What's Included</h3>
                <ul>
                  {manaliPkg.inclusions.map((item, i) => (
                    <li key={i}><span className="inc-icon">✓</span> {item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="inc-exc-card inc-exc-card--exc">
                <h3><XCircle size={22} /> What's Not Included</h3>
                <ul>
                  {manaliPkg.exclusions.map((item, i) => (
                    <li key={i}><span className="exc-icon">✕</span> {item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section gallery-strip" id="gallery-strip">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">glimpses from manali</span>
            <h2>What Awaits You</h2>
          </AnimatedSection>
        </div>
        <div className="gallery-strip__masonry">
          {galleryImages.slice(0, 8).map((img, i) => (
            <div className="gallery-strip__item" key={img.id} style={{ animationDelay: `${i * 0.1}s` }}>
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-strip__item-overlay">
                <span>{img.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section section--sand testimonials-section" id="testimonials">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">real stories from manali</span>
            <h2>What Our Travelers Say</h2>
          </AnimatedSection>
          <div className="testimonials__scroll">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.08}>
                <div className="testimonial-card" id={`testimonial-${t.id}`}>
                  <div className="testimonial-card__stars">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={idx < t.rating ? 'star-filled' : 'star-empty'}
                        fill={idx < t.rating ? 'var(--marigold)' : 'none'}
                        stroke={idx < t.rating ? 'var(--marigold)' : 'var(--light-gray)'}
                      />
                    ))}
                  </div>
                  <p className="testimonial-card__quote">"{t.quote}"</p>
                  <div className="testimonial-card__author">
                    <img src={t.image} alt={t.name} loading="lazy" />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.trip} · {t.city}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TERMS & CONDITIONS ===== */}
      <section className="section terms-section" id="terms">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">good to know</span>
            <h2>Terms & Conditions</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="terms-card">
              <ul className="terms-list">
                {manaliPkg.termsAndConditions.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>
              <div className="terms-note">
                <strong>⚠️ Important:</strong> {manaliPkg.importantNote}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner" id="cta-banner">
        <div className="cta-banner__bg" style={{ backgroundImage: `url('/images/Atal Tunnel/SUR_0096.JPG')` }} />
        <div className="cta-banner__overlay" />
        <div className="cta-banner__content container">
          <AnimatedSection>
            <span className="cta-banner__label">ready for manali?</span>
            <h2>Book Your Manali Adventure Now</h2>
            <p>Starting at just ₹8,999/person. Message us on WhatsApp — no forms, no waiting.</p>
            <div className="cta-banner__contact-numbers">
              <a href="tel:+918483835171" className="cta-banner__phone">📞 8483835171</a>
              <a href="tel:+917798664788" className="cta-banner__phone">📞 7798664788</a>
              <a href="tel:+919359918573" className="cta-banner__phone">📞 9359918573</a>
            </div>
            <div className="cta-banner__buttons">
              <a
                href={`https://wa.me/918483835171?text=${whatsappMessage}`}
                className="btn btn--warm btn--lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} /> Book on WhatsApp
              </a>
              <a
                href="https://instagram.com/travelhack4"
                className="btn btn--glass btn--lg cta-banner__btn-alt"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow @travelhack4 <ArrowRight size={18} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
