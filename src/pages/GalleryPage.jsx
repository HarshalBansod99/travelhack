import { useState } from 'react';
import { galleryImages } from '../data/gallery';
import './GalleryPage.css';

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const tags = ['All', ...new Set(galleryImages.map(img => img.tag))];

  const filteredImages = activeTag === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.tag === activeTag);

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <span className="section-label">no stock photos here</span>
          <h1>From the Road</h1>
          <p>Real moments from real trips across India.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            {tags.map(tag => (
              <button
                key={tag}
                className={`gallery-filter-btn ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredImages.map((img, i) => (
              <div 
                key={img.id} 
                className="gallery-item"
                style={{ animationDelay: `${(i % 10) * 0.05}s` }}
                onClick={() => setLightboxImg(img)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span>{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg.src} alt={lightboxImg.alt} />
            <div className="lightbox-caption">
              <span>{lightboxImg.alt}</span>
              <span className="lightbox-tag">{lightboxImg.tag}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
