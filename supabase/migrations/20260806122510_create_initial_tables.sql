create table team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  linkedin text,
  phone text,
  created_at timestamp with time zone default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  event_date date,
  venue text,
  organizer text,
  sponsor text,
  created_at timestamp with time zone default now()
);

create table internships (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  type text,
  description text,
  duration text,
  location text,
  stipend text,
  deadline date,
  created_at timestamp with time zone default now()
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  details text,
  created_at timestamp with time zone default now()
);