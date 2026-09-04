import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { packages } from '../data/packages';
import './PackageDetail.css';

export default function PackageDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const pkg = packages.find(p => p.slug === slug);

  useEffect(() => {
    if (!pkg) {
      navigate('/404', { replace: true });
    }
    window.scrollTo(0, 0);
  }, [pkg, navigate]);

  if (!pkg) return null;

  const relatedPackages = packages
    .filter(p => p.id !== pkg.id && (p.category === pkg.category || p.region === pkg.region))
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(`Hi TravelHack! I'm interested in the ${pkg.title} package. Can we discuss dates and availability?`);

  return (
    <main className="package-detail">
      {/* Header / Gallery */}
      <section className="detail-header">
        <div className="detail-header__gallery">
          <div className="detail-header__main-img">
            <img src={pkg.gallery[currentImage]} alt={`${pkg.title} view ${currentImage + 1}`} />
          </div>
          <div className="detail-header__thumbs">
            {pkg.gallery.map((img, i) => (
              <button 
                key={i} 
                className={`detail-header__thumb ${i === currentImage ? 'active' : ''}`}
                onClick={() => setCurrentImage(i)}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-header__info container">
          <div className="detail-header__meta">
            <span className="badge badge--category">{pkg.category}</span>
            <span className="badge badge--region">📍 {pkg.region}</span>
          </div>
          <h1>{pkg.title}</h1>
          <div className="detail-header__quick-stats">
            <span>⏱️ {pkg.duration}</span>
            <span>👥 {pkg.groupSize}</span>
            <span>💰 Starts from ₹{pkg.startingPrice?.toLocaleString('en-IN') || 'Custom'}</span>
          </div>
          <p className="detail-header__desc">{pkg.description}</p>
          
          <a 
            href={`https://wa.me/918483835171?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </section>

      <section className="section detail-content container">
        <div className="detail-layout">
          {/* Left Column */}
          <div className="detail-main">
            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div className="detail-section">
                <h2>Trip Highlights</h2>
                <ul className="highlights-list">
                  {pkg.highlights.map((hl, i) => (
                    <li key={i}>✦ {hl}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="detail-section">
                <h2>Day-wise Itinerary</h2>
                <div className="itinerary-accordion">
                  {pkg.itinerary.map((day) => (
                    <div 
                      key={day.day} 
                      className={`accordion-item ${activeDay === day.day ? 'active' : ''}`}
                    >
                      <button 
                        className="accordion-header"
                        onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                      >
                        <span className="day-badge">Day {day.day}</span>
                        <h3>{day.title}</h3>
                        <span className="accordion-icon">{activeDay === day.day ? '−' : '+'}</span>
                      </button>
                      <div className="accordion-content">
                        <p>{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column / Sidebar */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3>Inclusions & Exclusions</h3>
              
              <div className="inc-exc-block">
                <h4 className="inc-title">✅ What's Included</h4>
                <ul className="check-list">
                  {pkg.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}
                </ul>
              </div>

              <div className="inc-exc-block">
                <h4 className="exc-title">❌ What's Not Included</h4>
                <ul className="cross-list">
                  {pkg.exclusions.map((exc, i) => <li key={i}>{exc}</li>)}
                </ul>
              </div>
            </div>

            <div className="sidebar-card pricing-card">
              <h3>Pricing Estimates</h3>
              <ul className="pricing-list">
                {pkg.pricing.map((price, i) => (
                  <li key={i}>
                    <span>{price.type}</span>
                    <strong>{price.price}</strong>
                  </li>
                ))}
              </ul>
              <p className="pricing-note">*Prices may vary during peak season. Contact us for exact dates.</p>
            </div>
            
            {/* Sticky Enquire Block */}
            <div className="sticky-enquire">
              <h4>Ready to book?</h4>
              <p>Skip the forms. Just message us on WhatsApp and we'll sort it out.</p>
              <a 
                href={`https://wa.me/918483835171?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Message Harshal
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="section section--sand related-packages">
          <div className="container">
            <span className="section-label">keep exploring</span>
            <h2>Similar Trips</h2>
            <div className="related-grid">
              {relatedPackages.map(p => (
                <Link to={`/packages/${p.slug}`} key={p.id} className="related-card">
                  <img src={p.image} alt={p.title} />
                  <div className="related-card__info">
                    <h3>{p.title}</h3>
                    <span>₹{p.startingPrice?.toLocaleString('en-IN') || 'Custom'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
