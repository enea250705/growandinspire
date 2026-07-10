-- Admin operational tooling: a real 'suspended' membership status.
--
-- isMember() only counts status = 'active', so any other value gates content
-- immediately. 'cancelled' would work mechanically, but it conflates two very
-- different events: the member quit, versus an admin paused them. That
-- distinction matters once Paddle is billing real money — a suspension should
-- be resumable, a cancellation generally should not.

alter table memberships drop constraint if exists memberships_status_check;

alter table memberships add constraint memberships_status_check
  check (status in ('active', 'cancelled', 'past_due', 'trialing', 'suspended'));

-- Remember which tier to restore when a suspension is lifted. Nullable: only
-- set while suspended.
alter table memberships
  add column if not exists suspended_at timestamptz;
