import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Phone } from '../Icons';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navClass = `navbar ${scrolled || !isHome ? 'navbar--solid' : ''} ${menuOpen ? 'navbar--menu-open' : ''}`;

  return (
    <nav className={navClass} id="main-nav">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" id="nav-logo">
          <span className="navbar__logo-icon"><Compass size={20} /></span>
          <span className="navbar__logo-text">TravelHack</span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`} id="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/packages" className={location.pathname.startsWith('/packages') ? 'active' : ''}>Packages</Link></li>
          <li><Link to="/customize" className={location.pathname === '/customize' ? 'active' : ''}>Customize</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
          <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
          <li className="navbar__links-cta-mobile">
            <a
              href="https://wa.me/918483835171?text=Hi%20TravelHack!%20I%27d%20like%20to%20plan%20a%20trip."
              className="btn btn--primary btn--sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={14} /> Plan My Trip
            </a>
          </li>
        </ul>

        <a
          href="https://wa.me/918483835171?text=Hi%20TravelHack!%20I%27d%20like%20to%20plan%20a%20trip."
          className="btn btn--primary btn--sm navbar__cta"
          target="_blank"
          rel="noopener noreferrer"
          id="nav-cta"
        >
          Plan My Trip
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          id="nav-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}
