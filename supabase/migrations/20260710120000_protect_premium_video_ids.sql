-- Close the premium paywall bypass.
--
-- content_items has a "public read" RLS policy, and the anon key is public by
-- design (it ships inside the browser bundle). Any visitor could therefore run
--
--   GET /rest/v1/content_items?select=youtube_id&is_premium=eq.true
--
-- and receive the YouTube ID of every premium episode. Per INSPIRE_AND_GROW_SPEC
-- line 63 the videos are *unlisted* on YouTube, which means the ID is the access
-- control: knowing it is equivalent to watching the video. Restricting the SELECT
-- list in application code does not help, because the attacker never runs our code.
--
-- Fix at the privilege layer: anon and authenticated lose column access to
-- youtube_id entirely. The server fetches it with the service role only after the
-- membership check passes.
--
-- Note: a table-level GRANT SELECT covers every column, and a column-level REVOKE
-- cannot carve one out of it. The table-level grant must be revoked first, then
-- re-granted column by column.

-- has_video replaces "youtube_id is not null" for callers that may no longer read
-- youtube_id (thumbnails, the featured-episode query, the play-button affordance).
alter table content_items
  add column if not exists has_video boolean
  generated always as (youtube_id is not null) stored;

revoke select on public.content_items from anon, authenticated;

grant select (
  id,
  type,
  title,
  description,
  thumbnail_url,
  is_premium,
  published_at,
  has_video,
  created_at
) on public.content_items to anon, authenticated;

-- RLS policies are unchanged: rows stay publicly readable, the youtube_id column
-- does not. The service_role bypasses both, which is how the admin Content Manager
-- and the post-gate video fetch keep working.
