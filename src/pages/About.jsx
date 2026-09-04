import { Link } from 'react-router-dom';
import { founders } from '../data/founders';
import './About.css';

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero__bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80)' }} />
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <span className="section-label" style={{ color: 'var(--marigold)' }}>our story</span>
          <h1>We build trips we'd want to take.</h1>
        </div>
      </section>

      <section className="section about-story">
        <div className="container about-story__container">
          <div className="about-story__text">
            <h2>It started with a bad group tour.</h2>
            <p>
              A few years ago, we booked a commercial group tour. You know the type — wake up at 5 AM, get rushed through monuments for exactly 12 minutes each, eat buffet food that tastes like cardboard, and get pushed into souvenir shops where the guide gets a cut.
            </p>
            <p>
              We realized that most travel companies don't sell travel. They sell logistics. They move bodies from Point A to Point B.
            </p>
            <p>
              <strong>TravelHack was born because we wanted to do it differently.</strong>
            </p>
            <p>
              We started by taking our friends on road trips. We'd find the homestays with the best views, the dhabas with the spiciest mutton curry, and the mountain passes that didn't have 400 tourist buses parked on them.
            </p>
            <p>
              Today, we do the exact same thing, just for more people. Whether you're booking a honeymoon in Kerala or a 40-person college trip to Goa, our philosophy remains the same: <em>Real experiences, transparent pricing, and trips that feel human.</em>
            </p>
          </div>
          <div className="about-story__images">
            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80" alt="Travel group photo" className="about-img-1" />
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80" alt="Mountain road" className="about-img-2" />
          </div>
        </div>
      </section>

      <section className="section section--sand about-founders" id="founders">
        <div className="container">
          <div className="text-center">
            <span className="section-label">the team</span>
            <h2>Meet the Founders</h2>
            <p className="founders-intro">We're the ones answering your WhatsApp messages, booking your stays, and occasionally guiding the trips ourselves.</p>
          </div>
          
          <div className="founders-grid">
            {founders.map(f => (
              <div className="founder-card" key={f.id}>
                <div className="founder-card__img">
                  {/* Real photos would go here. Using a styled placeholder for now. */}
                  <div className="founder-placeholder">
                    <span>{f.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="founder-card__content">
                  <h3>{f.name}</h3>
                  <span className="founder-role">{f.role}</span>
                  <p>{f.bio}</p>
                  
                  <div className="founder-contact">
                    <a href={`tel:${f.phone}`} className="btn btn--secondary btn--sm">
                      📞 {f.phoneDisplay}
                    </a>
                    <a 
                      href={`${f.whatsapp}?text=Hi%20${f.name.split(' ')[0]}!%20I%20want%20to%20plan%20a%20trip.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--whatsapp btn--sm"
                    >
                      💬 Message
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container text-center">
          <h2>How We Work</h2>
          <div className="values-grid">
            <div className="value-item">
              <span className="value-icon">🤝</span>
              <h4>No Hidden Cuts</h4>
              <p>We don't force you into specific shops or restaurants just to get a commission. Your time is yours.</p>
            </div>
            <div className="value-item">
              <span className="value-icon">📱</span>
              <h4>WhatsApp First</h4>
              <p>No clunky ticketing systems or hold music. You message us, we reply. Simple as that.</p>
            </div>
            <div className="value-item">
              <span className="value-icon">📍</span>
              <h4>Local Expertise</h4>
              <p>We work directly with local drivers and homestays. The money goes where it belongs — into the local economy.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
