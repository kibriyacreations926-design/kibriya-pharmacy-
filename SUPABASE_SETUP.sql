-- Supabase SQL to run (use SQL editor in Supabase Project)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text,
  phone text,
  address text,
  items text,
  delivery_type text,
  payment_method text,
  prescription_url text,
  delivery_charge int,
  status text default 'pending',
  created_at timestamptz default now()
);
