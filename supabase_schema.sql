-- Run this in your Supabase SQL Editor to create the tables

-- 1. Customize Trip Requests
CREATE TABLE custom_trip_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  destinations text NOT NULL,
  duration text NOT NULL,
  travelers text NOT NULL,
  dates text NOT NULL,
  budget text NOT NULL,
  trip_style text NOT NULL,
  special_requests text
);

-- Allow inserting rows anonymously (since users are not logged in)
ALTER TABLE custom_trip_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON custom_trip_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous reads" ON custom_trip_requests FOR SELECT USING (true);


-- 2. Contact Messages
CREATE TABLE contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  message text NOT NULL
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous reads" ON contact_messages FOR SELECT USING (true);


-- 3. Package Enquiries
CREATE TABLE package_enquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  package_id text NOT NULL,
  package_name text NOT NULL,
  message text NOT NULL
);

ALTER TABLE package_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON package_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous reads" ON package_enquiries FOR SELECT USING (true);


-- 4. Admin Authentication
-- You have TWO flexible options to store admin credentials in Supabase:
--
-- OPTION A (Recommended - Official Supabase Auth):
-- Go to your Supabase Dashboard:
-- 1. Click 'Authentication' in the left sidebar.
-- 2. Click 'Users' -> 'Add User' -> 'Create User'.
-- 3. Enter your admin Email and Password (e.g. admin@travelhack.in).
-- 4. That's it! Log in directly on the /admin page with those credentials.
--
-- OPTION B (Table-based admin users):
-- If you prefer managing credentials directly in a database table, run this SQL:

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  username text UNIQUE NOT NULL,
  email text UNIQUE,
  password text NOT NULL
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read for admin authentication" ON admin_users FOR SELECT USING (true);

-- Insert your initial admin user (replace with your desired credentials):
-- INSERT INTO admin_users (username, email, password)
-- VALUES ('admin', 'admin@travelhack.in', 'YourSecurePasswordHere');
