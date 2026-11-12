import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MessageCircle, Globe, Users, Clock, Home, LogOut } from '../components/Icons';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('custom');
  const [data, setData] = useState({
    customTrips: [],
    contactMessages: [],
    packageEnquiries: []
  });
  const [loading, setLoading] = useState(false);

  // Check active Supabase Auth session or persistent admin session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setIsAuthenticated(true);
          setCurrentUser(session.user.email);
          fetchData();
          return;
        }

        // Fallback: Check stored session in sessionStorage
        const storedAdmin = sessionStorage.getItem('travelhack_admin_session');
        if (storedAdmin) {
          setIsAuthenticated(true);
          setCurrentUser(storedAdmin);
          fetchData();
        }
      } catch (err) {
        console.error('Session check error:', err);
      }
    };

    checkSession();

    // Listen for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setCurrentUser(session.user.email);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setAuthLoading(true);

    const trimmedUser = userId.trim();
    let authSuccess = false;

    try {
      // 1. Try Supabase Auth (Official secure authentication)
      const emailToTry = trimmedUser.includes('@') ? trimmedUser : `${trimmedUser}@travelhack.in`;
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: emailToTry,
        password: password
      });

      if (!authError && authData?.session) {
        authSuccess = true;
        setIsAuthenticated(true);
        setCurrentUser(authData.user.email);
        sessionStorage.setItem('travelhack_admin_session', authData.user.email);
        fetchData();
      } else {
        // Also try direct user input as email if it had no @
        if (!trimmedUser.includes('@')) {
          const { data: directAuth, error: directErr } = await supabase.auth.signInWithPassword({
            email: trimmedUser,
            password: password
          });

          if (!directErr && directAuth?.session) {
            authSuccess = true;
            setIsAuthenticated(true);
            setCurrentUser(directAuth.user.email);
            sessionStorage.setItem('travelhack_admin_session', directAuth.user.email);
            fetchData();
          }
        }

        // 2. Fallback: Query admin_users table in Supabase
        if (!authSuccess) {
          const { data: tableUser, error: tableErr } = await supabase
            .from('admin_users')
            .select('*')
            .or(`username.eq.${trimmedUser},email.eq.${trimmedUser}`)
            .eq('password', password)
            .maybeSingle();

          if (!tableErr && tableUser) {
            authSuccess = true;
            setIsAuthenticated(true);
            const userIdentifier = tableUser.username || tableUser.email || trimmedUser;
            setCurrentUser(userIdentifier);
            sessionStorage.setItem('travelhack_admin_session', userIdentifier);
            fetchData();
          }
        }
      }

      if (!authSuccess) {
        setLoginError('Invalid User ID or password. Please verify your credentials in Supabase.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError(err.message || 'An error occurred during authentication.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error logging out from Supabase:', err);
    }
    sessionStorage.removeItem('travelhack_admin_session');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setPassword('');
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
            <p>Sign in with your Supabase credentials to access the dashboard</p>
          </div>

          {loginError && (
            <div className="admin-login-error">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="text"
              placeholder="User ID or Email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button type="submit" className="btn btn--primary" disabled={authLoading}>
              {authLoading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
          <Link to="/" className="back-to-home">&larr; Back to Site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <Globe size={28} className="admin-logo" />
            <div>
              <h2>TravelHack</h2>
              {currentUser && <span className="admin-user-tag">{currentUser}</span>}
            </div>
            <span className="admin-badge">Admin</span>
          </div>
          <div className="admin-mobile-actions">
            <Link to="/" className="btn btn--sm btn--glass" title="View Site">
              <Home size={16} />
            </Link>
            <button className="btn btn--sm logout-btn-compact" onClick={handleLogout} title="Logout">
              Logout
            </button>
          </div>
        </div>
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            <Globe size={18} />
            <span>Custom Trips</span>
            <span className="count-badge">{data.customTrips.length}</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <Clock size={18} />
            <span>Package Enquiries</span>
            <span className="count-badge">{data.packageEnquiries.length}</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <MessageCircle size={18} />
            <span>Contact Messages</span>
            <span className="count-badge">{data.contactMessages.length}</span>
          </button>
        </nav>
        
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item">
            <Home size={18} />
            <span>View Live Site</span>
          </Link>
          <button className="admin-nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
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
