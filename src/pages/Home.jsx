import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone, MessageCircle, Star, Compass, ArrowDown,
  Users, Heart, GraduationCap, Home as HomeIcon, Gem, Sparkles, Globe,
  ArrowRight
} from '../components/Icons';
import { destinations } from '../data/destinations';
import { testimonials } from '../data/testimonials';
import { categories } from '../data/packages';
import { founders } from '../data/founders';
import { galleryImages } from '../data/gallery';
import './Home.css';

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80', alt: 'Snow-capped mountains at golden hour' },
  { image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=80', alt: 'Tropical beach sunset' },
  { image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&q=80', alt: 'Hawa Mahal, Rajasthan' },
  { image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=80', alt: 'Kerala backwaters' },
];

// Map icon names from data to Lucide components
const iconMap = {
  Globe, Users, Heart, GraduationCap, Home: HomeIcon, Gem, Sparkles,
};

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

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
          <motion.span
            className="hero__label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            curated tours across India
          </motion.span>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            We've road-tripped India more times than we can count.
            <br />
            <em>Let us plan yours.</em>
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Group trips, couple getaways, family vacations, college tours, honeymoons — or something completely custom. From Ladakh to Kerala, we've got the routes, the guides, and the chai stops.
          </motion.p>
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <a
              href="https://wa.me/918483835171?text=Hi%20TravelHack!%20I%27d%20like%20to%20plan%20a%20trip%20🏔️"
              className="btn btn--warm btn--lg"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-plan"
            >
              <Phone size={20} /> Plan My Trip
            </a>
            <Link to="/packages" className="btn btn--secondary btn--lg hero__cta-browse" id="hero-cta-browse">
              Browse Packages <ArrowRight size={18} />
            </Link>
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

      {/* ===== TRIP TYPE SELECTOR ===== */}
      <section className="section trip-types" id="trip-types">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">what kind of trip?</span>
            <h2 className="trip-types__heading">Pick Your Travel Style</h2>
          </AnimatedSection>
          <div className="trip-types__grid">
            {categories.filter(c => c.id !== 'all').map((cat, i) => {
              const IconComponent = iconMap[cat.icon];
              return (
                <AnimatedSection key={cat.id} delay={i * 0.08}>
                  <Link to={`/packages?category=${cat.id}`} className="trip-type-card" id={`trip-type-${cat.id}`}>
                    <span className="trip-type-card__icon">
                      {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                    </span>
                    <h3 className="trip-type-card__title">{cat.label}</h3>
                    <p className="trip-type-card__desc">{cat.description}</p>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED DESTINATIONS ===== */}
      <section className="section section--sand destinations" id="destinations">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">where next?</span>
            <h2>Popular Destinations</h2>
            <p className="destinations__subtitle">From snow-capped passes to palm-fringed backwaters — here's where India calls the loudest.</p>
          </AnimatedSection>
          <div className="destinations__grid">
            {destinations.map((dest, i) => (
              <AnimatedSection key={dest.id} delay={i * 0.06}>
                <Link to={`/packages?region=${dest.region}`} className="dest-card" id={`dest-${dest.id}`}>
                  <div className="dest-card__img-wrap">
                    <img src={dest.image} alt={dest.name} loading="lazy" />
                    <div className="dest-card__badge">{dest.days} days</div>
                  </div>
                  <div className="dest-card__info">
                    <h3>{dest.name}</h3>
                    <p className="dest-card__tagline">{dest.tagline}</p>
                    <span className="dest-card__price">From ₹{dest.startingPrice.toLocaleString('en-IN')}</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY TRAVELHACK ===== */}
      <section className="section why-us" id="why-us">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">why us?</span>
            <h2>Why People Travel With Us</h2>
          </AnimatedSection>
          <div className="why-us__grid">
            <AnimatedSection delay={0}>
              <div className="why-card">
                <div className="why-card__number">01</div>
                <h3>We've Actually Been There</h3>
                <p>Every trip we sell, we've done ourselves first. We know which guesthouse has the best view in Kaza, which beach in Goa is actually quiet, and where to find the best momos in Leh. No copy-pasting from other travel sites.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="why-card">
                <div className="why-card__number">02</div>
                <h3>Your Trip, Not a Template</h3>
                <p>Hate crowded tourist spots? Want to spend an extra day at a waterfall? Traveling with grandparents who need a slower pace? We customize everything — dates, budget, pace, activities. No rigid "Day 1, Day 2" that everyone gets.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="why-card">
                <div className="why-card__number">03</div>
                <h3>Transparent Pricing, Always</h3>
                <p>We quote you a price, and that's the price. No "convenience fees" at checkout, no surprise surcharges, no "oh, the hotel upgrade is actually mandatory." If something's extra, we say so upfront.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="why-card">
                <div className="why-card__number">04</div>
                <h3>Call Us, Literally Anytime</h3>
                <p>Both founders' personal numbers are on this website. We don't hide behind a ticketing system. If something goes wrong at 11 PM during your trip, you're calling the same guys who planned it — not a random customer care bot.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section section--sand testimonials-section" id="testimonials">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">real stories</span>
            <h2>What Travelers Say</h2>
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

      {/* ===== GALLERY STRIP ===== */}
      <section className="section gallery-strip" id="gallery-strip">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">from the road</span>
            <h2>Moments From Our Trips</h2>
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
        <div className="container" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/gallery" className="btn btn--secondary">View Full Gallery <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* ===== FOUNDERS PREVIEW ===== */}
      <section className="section section--sand founders-preview" id="founders-preview">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">the humans behind this</span>
            <h2>Meet the Founders</h2>
            <p className="founders-preview__intro">TravelHack isn't a faceless company — it's two guys who love India and want you to see it the way they have. Road-tested, chai-fueled, and personally invested in every trip.</p>
          </AnimatedSection>
          <div className="founders-preview__cards">
            {founders.map((f, i) => (
              <AnimatedSection key={f.id} delay={i * 0.15}>
                <div className="founder-preview-card">
                  <div className="founder-preview-card__avatar">
                    <span>{f.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3>{f.name}</h3>
                  <span className="founder-preview-card__role">{f.role}</span>
                  <p className="founder-preview-card__bio">{f.bio}</p>
                  <div className="founder-preview-card__links">
                    <a href={`tel:${f.phone}`} className="btn btn--sm btn--secondary">
                      <Phone size={14} /> Call
                    </a>
                    <a
                      href={`${f.whatsapp}?text=Hi%20${f.name.split(' ')[0]}!%20I%20want%20to%20plan%20a%20trip%20with%20TravelHack.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--sm btn--whatsapp"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/about" className="btn btn--secondary">Read Our Story <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner" id="cta-banner">
        <div className="cta-banner__bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80)` }} />
        <div className="cta-banner__overlay" />
        <div className="cta-banner__content container">
          <AnimatedSection>
            <span className="cta-banner__label">ready?</span>
            <h2>Have a destination in mind?</h2>
            <p>Tell us where you want to go, and we'll build you an itinerary you'll actually be excited about.</p>
            <div className="cta-banner__buttons">
              <a
                href="https://wa.me/918483835171?text=Hi%20TravelHack!%20I%20have%20a%20trip%20idea%20and%20want%20to%20discuss%20it."
                className="btn btn--warm btn--lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
              <Link to="/customize" className="btn btn--secondary btn--lg cta-banner__btn-alt">
                Build My Itinerary <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
