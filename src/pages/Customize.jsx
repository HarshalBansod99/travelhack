import { useState } from 'react';
import './Customize.css';

export default function Customize() {
  const [formData, setFormData] = useState({
    destinations: '',
    duration: '',
    travelers: '',
    dates: '',
    budget: '',
    tripStyle: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `*New Custom Trip Request*%0A%0A` +
      `*Where to:* ${formData.destinations}%0A` +
      `*Duration:* ${formData.duration}%0A` +
      `*Travelers:* ${formData.travelers}%0A` +
      `*Dates:* ${formData.dates}%0A` +
      `*Budget:* ${formData.budget}%0A` +
      `*Vibe:* ${formData.tripStyle}%0A` +
      `*Notes:* ${formData.specialRequests || 'None'}`;
      
    window.open(`https://wa.me/918483835171?text=${message}`, '_blank');
  };

  return (
    <main className="customize-page">
      <section className="customize-hero">
        <div className="container">
          <span className="section-label">your trip, your way</span>
          <h1>Build Your Itinerary</h1>
          <p>Tell us what you're dreaming of. We'll stitch it together into a route that actually works, fits your budget, and doesn't feel like a cookie-cutter tour.</p>
        </div>
      </section>

      <section className="section customize-form-section">
        <div className="container">
          <div className="customize-container">
            <div className="customize-info">
              <h3>How it works</h3>
              <ul className="how-it-works">
                <li>
                  <div className="step-num">1</div>
                  <div>
                    <h4>Tell us what you want</h4>
                    <p>Fill out this quick form. Be as vague ("somewhere cold") or specific ("I want to eat momos in Spiti") as you like.</p>
                  </div>
                </li>
                <li>
                  <div className="step-num">2</div>
                  <div>
                    <h4>We chat on WhatsApp</h4>
                    <p>Harshal or Nikhil will ping you directly to refine the plan. No automated bots.</p>
                  </div>
                </li>
                <li>
                  <div className="step-num">3</div>
                  <div>
                    <h4>Review your itinerary</h4>
                    <p>We send you a detailed day-by-day plan with clear, upfront pricing.</p>
                  </div>
                </li>
                <li>
                  <div className="step-num">4</div>
                  <div>
                    <h4>Pack your bags</h4>
                    <p>Once you approve, we book the stays, the cabs, and the experiences. You just show up.</p>
                  </div>
                </li>
              </ul>
            </div>

            <form className="custom-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="destinations">Where do you want to go?</label>
                <input 
                  type="text" 
                  id="destinations" 
                  name="destinations" 
                  placeholder="e.g. Rajasthan, or just 'Mountains'"
                  value={formData.destinations}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="duration">How many days?</label>
                  <input 
                    type="text" 
                    id="duration" 
                    name="duration" 
                    placeholder="e.g. 5 days, or 'A week'"
                    value={formData.duration}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="travelers">How many people?</label>
                  <input 
                    type="text" 
                    id="travelers" 
                    name="travelers" 
                    placeholder="e.g. 2 adults, 1 kid"
                    value={formData.travelers}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dates">When are you planning to travel?</label>
                  <input 
                    type="text" 
                    id="dates" 
                    name="dates" 
                    placeholder="e.g. Mid-October, or exact dates"
                    value={formData.dates}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Approximate budget (per person)?</label>
                  <select 
                    id="budget" 
                    name="budget" 
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="Under ₹15k">Under ₹15,000</option>
                    <option value="₹15k - ₹25k">₹15,000 - ₹25,000</option>
                    <option value="₹25k - ₹40k">₹25,000 - ₹40,000</option>
                    <option value="₹40k+ (Luxury)">₹40,000+ (Premium/Luxury)</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>What's the vibe of this trip?</label>
                <div className="radio-group">
                  {['Relaxed/Leisure', 'Adventure-heavy', 'Cultural/Sightseeing', 'Party/Nightlife', 'Mix of everything'].map(vibe => (
                    <label key={vibe} className="radio-label">
                      <input 
                        type="radio" 
                        name="tripStyle" 
                        value={vibe}
                        checked={formData.tripStyle === vibe}
                        onChange={handleChange}
                        required
                      />
                      <span>{vibe}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Any must-haves or special requests?</label>
                <textarea 
                  id="specialRequests" 
                  name="specialRequests" 
                  rows="4" 
                  placeholder="e.g. Need vegetarian food, want to do scuba diving, traveling with a pet..."
                  value={formData.specialRequests}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn--primary btn--lg submit-btn">
                Send Request via WhatsApp 💬
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
