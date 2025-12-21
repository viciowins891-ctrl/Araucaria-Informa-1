-- Database Setup for Jacaré do Corte
-- Execute este script no SQL Editor do Supabase para criar a estrutura do banco de dados

-- 1. Profiles Table (Extends Supabase Auth)
-- Armazena dados adicionais do usuário e sincroniza automaticamente com auth.users
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Políticas de Segurança para Profiles
create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

-- Function to handle new user signup automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Barbers Table
create table if not exists public.barbers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  avatar_url text,
  specialty text,
  created_at timestamptz default now()
);

alter table public.barbers enable row level security;

create policy "Barbers are viewable by everyone" on barbers
  for select using (true);

-- 3. Services Table
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  duration_minutes integer default 30,
  description text,
  created_at timestamptz default now()
);

alter table public.services enable row level security;

create policy "Services are viewable by everyone" on services
  for select using (true);

-- 4. Appointments Table
create table if not exists public.appointments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  barber_id uuid references public.barbers(id) not null,
  service_id uuid references public.services(id) not null,
  start_time timestamptz not null,
  status text check (status in ('scheduled', 'completed', 'cancelled')) default 'scheduled',
  created_at timestamptz default now()
);

alter table public.appointments enable row level security;

create policy "Users can view their own appointments" on appointments
  for select using (auth.uid() = user_id);

create policy "Users can create their own appointments" on appointments
  for insert with check (auth.uid() = user_id);

create policy "Users can update (cancel) their own appointments" on appointments
  for update using (auth.uid() = user_id);

-- 5. Seed Data (Dados Iniciais)
-- Inserir barbeiros apenas se a tabela estiver vazia
insert into public.barbers (name, avatar_url, specialty)
select 'Sr. Zeca', 'https://i.pravatar.cc/150?u=zeca', 'Corte Clássico e Barba'
where not exists (select 1 from public.barbers);

insert into public.barbers (name, avatar_url, specialty)
select 'Sr. Mora', 'https://i.pravatar.cc/150?u=mora', 'Corte Moderno e Degradê'
where not exists (select 1 from public.barbers where name = 'Sr. Mora');

insert into public.barbers (name, avatar_url, specialty)
select 'Dona Maria', 'https://i.pravatar.cc/150?u=maria', 'Pé e Mão, Sobrancelha'
where not exists (select 1 from public.barbers where name = 'Dona Maria');

-- Inserir serviços apenas se a tabela estiver vazia
insert into public.services (name, price, duration_minutes, description)
select 'Corte de Cabelo', 40.00, 30, 'Corte tradicional ou moderno'
where not exists (select 1 from public.services);

insert into public.services (name, price, duration_minutes, description)
select 'Barba', 30.00, 20, 'Barba com toalha quente'
where not exists (select 1 from public.services where name = 'Barba');

insert into public.services (name, price, duration_minutes, description)
select 'Corte + Barba', 60.00, 50, 'Combo completo'
where not exists (select 1 from public.services where name = 'Corte + Barba');

insert into public.services (name, price, duration_minutes, description)
select 'Pé + Mão Express', 40.00, 30, 'Manicure e pedicure rápida'
where not exists (select 1 from public.services where name = 'Pé + Mão Express');
