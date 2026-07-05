-- Stores each saved CarLens scan for the authenticated user who created it.
create table if not exists public.scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  image_url text not null,
  vehicle_analysis jsonb not null,
  created_at timestamptz not null default now(),
  thumbnail text
);

alter table public.scans enable row level security;

-- Users can only see scans that belong to their own auth.uid().
create policy "Users can read their own scans"
  on public.scans
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can only insert scan rows for themselves.
create policy "Users can insert their own scans"
  on public.scans
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can only update their own saved scans.
create policy "Users can update their own scans"
  on public.scans
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can only delete their own saved scans.
create policy "Users can delete their own scans"
  on public.scans
  for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists scans_user_id_created_at_idx
  on public.scans (user_id, created_at desc);

-- Public bucket keeps image_url simple for the current UI. Tighten this later
-- with signed URLs if product privacy requirements change.
insert into storage.buckets (id, name, public)
values ('vehicle-scans', 'vehicle-scans', true)
on conflict (id) do nothing;

-- Store objects under a user-id folder, e.g. {auth.uid()}/scan-id.jpg.
create policy "Users can upload their own vehicle scan images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'vehicle-scans'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can read their own vehicle scan images"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'vehicle-scans'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update their own vehicle scan images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'vehicle-scans'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'vehicle-scans'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own vehicle scan images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'vehicle-scans'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
