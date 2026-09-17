create extension if not exists pgcrypto;

create type transaction_type as enum ('deposit','withdrawal');
create type transaction_status as enum ('pending','approved','rejected','completed','cancelled');

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete restrict,
  type transaction_type not null,
  amount numeric(20,2) not null check (amount > 0),
  currency text not null default 'USD',
  status transaction_status not null default 'pending',
  reference text,
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table transactions enable row level security;
alter table audit_log enable row level security;

-- Production note:
-- Add policies that allow a signed-in user to read only their own profile/transactions,
-- and allow admins to read/review transactions. Do NOT expose the service-role key to browsers.

create index if not exists transactions_user_id_idx on transactions(user_id);
create index if not exists transactions_status_idx on transactions(status);
create index if not exists audit_log_entity_idx on audit_log(entity_type, entity_id);


create table if not exists portfolio_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete restrict,
  snapshot_date date not null,
  total_value numeric(20,2) not null check (total_value >= 0),
  cash_value numeric(20,2) not null default 0 check (cash_value >= 0),
  created_at timestamptz not null default now(),
  unique(user_id, snapshot_date)
);

alter table portfolio_snapshots enable row level security;
create index if not exists portfolio_snapshots_user_date_idx
  on portfolio_snapshots(user_id, snapshot_date desc);

-- Production RLS:
-- Users may read only their own snapshots; authorized server jobs/admins
-- may insert snapshots. Never accept arbitrary portfolio values from the browser.
