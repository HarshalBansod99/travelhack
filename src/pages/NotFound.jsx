import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container not-found-container">
        <div className="not-found-content">
          <span className="not-found-404">404</span>
          <h1>Looks like this route doesn't exist on our map.</h1>
          <p>We might have taken a wrong turn, or this page has moved.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn--primary btn--lg">
              ← Back to Home
            </Link>
            <Link to="/packages" className="btn btn--secondary btn--lg">
              Browse Packages
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
