-- Make a user an admin. Run once in the Supabase SQL editor.
-- Replace the email with the account that should have admin access
-- (that account must have signed up first).

insert into admins (user_id)
select id from auth.users where email = 'growandinspir4e@admin.com'
on conflict (user_id) do nothing;

-- Verify:
-- select u.email from admins a join auth.users u on u.id = a.user_id;
