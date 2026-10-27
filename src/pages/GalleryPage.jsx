import { useState } from 'react';
import { galleryImages } from '../data/gallery';
import './GalleryPage.css';

export default function GalleryPage() {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <span className="section-label">moments captured</span>
          <h1>Gallery</h1>
          <p>Real moments from real trips.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div 
                key={img.id} 
                className="gallery-item"
                style={{ animationDelay: `${(i % 10) * 0.05}s` }}
                onClick={() => setLightboxImg(img)}
              >
                <img src={img.src} alt="" loading="lazy" className="gallery-img" />
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
            <img src={lightboxImg.src} alt="" className="lightbox-img" />
          </div>
        </div>
      )}
    </main>
  );
}
