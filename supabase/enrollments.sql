-- supabase/enrollments.sql
create table if not exists public.enrollments (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status text not null default 'inactive',
  asaas_customer_id text,
  last_payment_id text,
  updated_at timestamp with time zone default now()
);

-- Security: RLS
alter table public.enrollments enable row level security;

-- Allow owner (the user) to read their own enrollment
create policy "read own" on public.enrollments
  for select using (auth.uid() = user_id);

-- Only service role can write (webhook / server)
create policy "block writes" on public.enrollments
  for all to public using (false) with check (false);
