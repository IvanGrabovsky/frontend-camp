-- ==============================================================================
-- Frontend Camp Database Schema (Supabase / PostgreSQL)
-- ==============================================================================

-- 1. Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text not null,
  avatar text,
  crystals integer default 100 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on profiles
alter table public.profiles enable row level security;

-- Profiles RLS policies
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- 2. Create lesson_progress table
create table if not exists public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_slug text not null,
  lesson_slug text not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_slug, lesson_slug)
);

-- Enable RLS on lesson_progress
alter table public.lesson_progress enable row level security;

-- Lesson Progress RLS policies
create policy "Users can view their own lesson progress."
  on public.lesson_progress for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own lesson progress."
  on public.lesson_progress for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own lesson progress."
  on public.lesson_progress for delete
  using ( auth.uid() = user_id );

-- 3. Automatic Trigger to create a profile row when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar, crystals)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar', 'https://api.dicebear.com/7.x/bottts/svg?seed=' || new.email),
    100
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
