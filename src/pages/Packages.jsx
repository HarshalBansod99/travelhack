import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { packages, categories, regions } from '../data/packages';
import PackageCard from '../components/PackageCard/PackageCard';
import './Packages.css';

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const activeRegion = searchParams.get('region') || 'all';

  const setCategory = (catId) => {
    setSearchParams((prev) => {
      prev.set('category', catId);
      return prev;
    });
  };

  const setRegion = (regionId) => {
    setSearchParams((prev) => {
      prev.set('region', regionId);
      return prev;
    });
  };

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchCat = activeCategory === 'all' || pkg.category === activeCategory;
      const matchRegion = activeRegion === 'all' || pkg.region === activeRegion;
      return matchCat && matchRegion;
    });
  }, [activeCategory, activeRegion]);

  return (
    <main className="packages-page">
      <section className="packages-hero">
        <div className="packages-hero__bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80)' }} />
        <div className="packages-hero__overlay" />
        <div className="container packages-hero__content">
          <span className="section-label" style={{ color: 'var(--marigold)' }}>where to?</span>
          <h1>Our Travel Routes</h1>
          <p>Carefully crafted itineraries for every kind of traveler. Pick a vibe, pick a region, and let's go.</p>
        </div>
      </section>

      <section className="section packages-main">
        <div className="container">
          {/* Filters */}
          <div className="packages-filters">
            <div className="filter-group">
              <span className="filter-label">Travel Style:</span>
              <div className="filter-tabs">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Region:</span>
              <div className="filter-select-wrapper">
                <select 
                  className="filter-select"
                  value={activeRegion}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {regions.map(reg => (
                    <option key={reg.id} value={reg.id}>{reg.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="packages-grid">
            <AnimatePresence mode="popLayout">
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PackageCard pkg={pkg} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="packages-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>No trips found matching these filters. But we can build it for you!</p>
                  <a
                    href="https://wa.me/918483835171?text=Hi%20TravelHack!%20I%20couldn't%20find%20a%20package%20for%20my%20needs.%20Can%20we%20customize%20one?"
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request Custom Trip
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
