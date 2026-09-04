import { Link } from 'react-router-dom';
import './PackageCard.css';

export default function PackageCard({ pkg }) {
  return (
    <div className="package-card" id={`pkg-${pkg.slug}`}>
      <div className="package-card__img-wrap">
        <img src={pkg.image} alt={pkg.title} loading="lazy" />
        <div className="package-card__badges">
          <span className="package-card__badge package-card__badge--duration">
            ⏱️ {pkg.duration.split(' / ')[0]}
          </span>
          <span className="package-card__badge package-card__badge--category">
            {pkg.category}
          </span>
        </div>
      </div>
      
      <div className="package-card__content">
        <h3 className="package-card__title">{pkg.title}</h3>
        
        <div className="package-card__meta">
          <span>📍 {pkg.destination}</span>
          <span>👥 {pkg.groupSize}</span>
        </div>
        
        <ul className="package-card__highlights">
          {pkg.highlights.slice(0, 2).map((highlight, index) => (
            <li key={index}>✦ {highlight}</li>
          ))}
        </ul>
        
        <div className="package-card__footer">
          <div className="package-card__price">
            <span className="package-card__price-label">Starts from</span>
            <span className="package-card__price-value">
              ₹{pkg.startingPrice ? pkg.startingPrice.toLocaleString('en-IN') : 'Custom'}
            </span>
          </div>
          
          <div className="package-card__actions">
            <Link to={`/packages/${pkg.slug}`} className="btn btn--secondary btn--sm">
              Details
            </Link>
            <a
              href={`https://wa.me/918483835171?text=Hi%20TravelHack!%20I%20want%20to%20know%20more%20about%20the%20${pkg.title}%20package.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp btn--sm"
            >
              Enquire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
