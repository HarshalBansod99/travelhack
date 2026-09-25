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

