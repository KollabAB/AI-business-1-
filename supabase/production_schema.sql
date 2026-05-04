-- Nexus-Modules Production Database Schema

-- 1. Profiles Table (Extended)
alter table profiles add column if not exists api_key text unique default 'nk_' || encode(gen_random_bytes(16), 'hex');

-- 2. Module Usage Table (Tracking for Analytics)
create table if not exists module_usage (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  module_name text not null, -- 'lead-hunter', 'knowledge-os', 'sentiment-shield'
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Module Usage
alter table module_usage enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Users can view their own usage.') then
    create policy "Users can view their own usage." on module_usage
      for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where policyname = 'Users can insert their own usage.') then
    create policy "Users can insert their own usage." on module_usage
      for insert with check (auth.uid() = user_id);
  end if;
end $$;

-- 3. Leads Table (Lead-Hunter Persistence)
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  domain text not null,
  company_name text,
  size text,
  tech_stack text[],
  score integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Leads
alter table leads enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Users can view their own leads.') then
    create policy "Users can view their own leads." on leads
      for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where policyname = 'Users can manage their own leads.') then
    create policy "Users can manage their own leads." on leads
      for all using (auth.uid() = user_id);
  end if;
end $$;

-- 4. Documents Table (Knowledge-OS Persistence)
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  file_path text not null,
  content_preview text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Documents
alter table documents enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Users can view their own documents.') then
    create policy "Users can view their own documents." on documents
      for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where policyname = 'Users can manage their own documents.') then
    create policy "Users can manage their own documents." on documents
      for all using (auth.uid() = user_id);
  end if;
end $$;

-- 5. Updated handle_new_user function to include API key generation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, api_key)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    'nk_' || encode(gen_random_bytes(16), 'hex')
  );
  return new;
end;
$$ language plpgsql security definer;
