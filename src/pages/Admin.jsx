import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MessageCircle, Globe, Users, Clock, Home } from '../components/Icons';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('custom');
  const [data, setData] = useState({
    customTrips: [],
    contactMessages: [],
    packageEnquiries: []
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'travelhack2026') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [customRes, contactRes, packageRes] = await Promise.all([
        supabase.from('custom_trip_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('package_enquiries').select('*').order('created_at', { ascending: false })
      ]);

      setData({
        customTrips: customRes.data || [],
        contactMessages: contactRes.data || [],
        packageEnquiries: packageRes.data || []
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-glass">
          <div className="admin-login-header">
            <Globe size={40} className="admin-login-icon" />
            <h2>Admin Portal</h2>
            <p>Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn--primary">Access Dashboard</button>
          </form>
          <Link to="/" className="back-to-home">← Back to Site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Globe size={32} className="admin-logo" />
          <h2>TravelHack</h2>
          <span className="admin-badge">Admin</span>
        </div>
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            <Globe size={20} />
            Custom Trips
            <span className="count-badge">{data.customTrips.length}</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <Clock size={20} />
            Package Enquiries
            <span className="count-badge">{data.packageEnquiries.length}</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <MessageCircle size={20} />
            Contact Messages
            <span className="count-badge">{data.contactMessages.length}</span>
          </button>
        </nav>
        
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item">
            <Home size={20} />
            View Live Site
          </Link>
          <button className="admin-nav-item logout-btn" onClick={() => setIsAuthenticated(false)}>
            <Users size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>Dashboard Overview</h1>
            <p className="admin-subtitle">Manage all your incoming leads and requests here.</p>
          </div>
          <button className="btn btn--secondary btn--sm" onClick={fetchData}>
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </header>

        <div className="admin-content-area">
          {activeTab === 'custom' && (
            <div className="admin-table-container fade-in">
              <h3>Custom Trip Requests</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Destinations</th>
                      <th>Duration</th>
                      <th>Travelers</th>
                      <th>Budget</th>
                      <th>Style</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.customTrips.map(trip => (
                      <tr key={trip.id}>
                        <td>{new Date(trip.created_at).toLocaleDateString()}</td>
                        <td className="fw-600">{trip.destinations}</td>
                        <td>{trip.duration}</td>
                        <td>{trip.travelers}</td>
                        <td><span className="price-tag">{trip.budget}</span></td>
                        <td>{trip.trip_style}</td>
                        <td className="notes-col">{trip.special_requests || '-'}</td>
                      </tr>
                    ))}
                    {data.customTrips.length === 0 && (
                      <tr><td colSpan="7" className="empty-state">No requests yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div className="admin-table-container fade-in">
              <h3>Package Enquiries</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Package Name</th>
                      <th>Initial Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.packageEnquiries.map(enq => (
                      <tr key={enq.id}>
                        <td>{new Date(enq.created_at).toLocaleDateString()}</td>
                        <td className="fw-600">{enq.package_name}</td>
                        <td className="notes-col">{enq.message}</td>
                      </tr>
                    ))}
                    {data.packageEnquiries.length === 0 && (
                      <tr><td colSpan="3" className="empty-state">No enquiries yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="admin-table-container fade-in">
              <h3>Contact Messages</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.contactMessages.map(msg => (
                      <tr key={msg.id}>
                        <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                        <td className="fw-600">{msg.name}</td>
                        <td>{msg.phone}</td>
                        <td>{msg.email}</td>
                        <td className="notes-col">{msg.message}</td>
                      </tr>
                    ))}
                    {data.contactMessages.length === 0 && (
                      <tr><td colSpan="5" className="empty-state">No messages yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
