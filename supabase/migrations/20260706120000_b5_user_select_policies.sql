-- B5: let authenticated users read their own submitted rows (matched by email).
-- The public INSERT policies from B1 stay untouched; these only add SELECT
-- for the authenticated role so "My Applications / Events" can render.

create policy "auth reads own dinner apps" on dinner_applications
  for select to authenticated
  using (auth.jwt() ->> 'email' = email);

create policy "auth reads own applications" on applications
  for select to authenticated
  using (auth.jwt() ->> 'email' = email);

create policy "auth reads own registrations" on event_registrations
  for select to authenticated
  using (auth.uid() = user_id or auth.jwt() ->> 'email' = email);

