import { useState } from 'react';
import { founders } from '../data/founders';
import { supabase } from '../lib/supabase';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save to Supabase
      await supabase.from('contact_messages').insert([{
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message
      }]);
    } catch (error) {
      console.error("Error saving contact message to Supabase:", error);
    }

    const text = `*New Contact Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/918483835171?text=${text}`, '_blank');
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <span className="section-label">we're here</span>
          <h1>Let's Talk Travel</h1>
          <p>No bots, no hold music, no automated replies. You message us, we reply.</p>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-container">
          
          {/* Left: Contact Info */}
          <div className="contact-info">
            <h2>Reach the Founders Directly</h2>
            <p className="contact-intro">Whether you have a quick question about a package or want to build a completely custom itinerary from scratch, give us a call or drop a WhatsApp.</p>
            
            <div className="founders-contact-cards">
              {founders.map(f => (
                <div className="founder-contact-card" key={f.id}>
                  <div className="fcc-avatar">
                    {f.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="fcc-details">
                    <h3>{f.name}</h3>
                    <span>{f.role}</span>
                    <div className="fcc-links">
                      <a href={`tel:${f.phone}`} className="fcc-link">📞 {f.phoneDisplay}</a>
                      <a href={`${f.whatsapp}`} target="_blank" rel="noopener noreferrer" className="fcc-link fcc-link--wa">💬 WhatsApp Me</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="office-info">
              <h3>Office</h3>
              <p>While we're mostly on the road (or on WhatsApp), our official base is in Maharashtra.</p>
              <p><strong>Email:</strong> hello@travelhack.in</p>
              
              {/* Map Placeholder */}
              <div className="map-embed">
                <div className="map-placeholder">
                  📍 Map Embed Area<br/>
                  <span>(Configure with actual Google Maps iframe when address is final)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper">
            <div className="form-card">
              <h3>Send a Message</h3>
              <p>Fill this out and we'll get back to you within a few hours.</p>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number (WhatsApp preferred)</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required placeholder="How can we help you plan?"></textarea>
                </div>
                
                <button type="submit" className="btn btn--primary btn--lg contact-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
