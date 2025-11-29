Kibriya MediTonic - Supabase Static Site Starter

Files included:
- index.html  -> Customer order form (uploads to 'prescriptions' bucket, inserts into 'orders' table)
- admin.html  -> Simple admin page to view and update orders
- SUPABASE_SETUP.sql -> SQL to create the orders table

Quick setup:
1) In Supabase project:
   - Run SUPABASE_SETUP.sql in SQL Editor.
   - Create Storage bucket named 'prescriptions' (public for demo).
2) Deploy these files (index.html + admin.html) to a static host (Vercel/Netlify) or open index.html via a static server.
3) Admin page uses anon key for demo; secure with RLS for production.

Your Supabase project:
- URL: https://engpvhpzxkfkxldtziql.supabase.co
- (You provided the anon key; keep service_role secret offline.)

