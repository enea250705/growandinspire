-- B6 seed: initial content_items (mirrors the former mock-content.ts).
-- Idempotent-ish: only inserts when the table is empty. Re-run safely.
-- Run in Supabase SQL editor for a fresh project (e.g. B9 production).

insert into content_items (type, title, description, youtube_id, thumbnail_url, is_premium, published_at)
select * from (values
  ('podcast','The New Era of Leadership','Alketa explores what it means to lead in 2026 - vulnerability, vision, and velocity.','qp0HIF3SfI4',null,false,'2026-05-10T10:00:00Z'::timestamptz),
  ('podcast','Building with Purpose','How the most successful Albanian entrepreneurs align mission with profit.','arj7oStGLkU',null,false,'2026-04-22T10:00:00Z'),
  ('podcast','Mindset Before Strategy','Premium episode: the inner work that unlocks outer results.','Ks-_Mh1QhMc',null,true,'2026-04-01T10:00:00Z'),
  ('founder','The Pivot That Changed Everything','Founder of Tirana''s fastest-growing tech startup on his $0 to $2M journey.','c0KYU2j0TM4',null,false,'2026-05-01T10:00:00Z'),
  ('founder','Building a Brand from Scratch','How she turned a personal passion into a regional fashion label.','iCvmsMzlF7o',null,false,'2026-03-15T10:00:00Z'),
  ('artist','Art as a Business','Albanian painter on selling internationally and protecting creative integrity.','H14bBuluwB8',null,false,'2026-04-10T10:00:00Z'),
  ('artist','The Creative Process Unpacked','Premium session: deep dive into how top creatives structure their work.','qp0HIF3SfI4',null,true,'2026-03-20T10:00:00Z'),
  ('business','Scaling in Emerging Markets','Three frameworks for sustainable growth when capital is scarce.','arj7oStGLkU',null,false,'2026-05-05T10:00:00Z'),
  ('business','Financial Literacy for Founders','Premium: cash flow, burn rate, and runway explained for non-CFOs.','Ks-_Mh1QhMc',null,true,'2026-04-18T10:00:00Z'),
  ('revista','Women Redefining Albanian Business','Our annual feature on the women shaping the economy from the inside.',null,null,false,'2026-05-12T10:00:00Z'),
  ('revista','The Future of Tirana','Urban growth, investment corridors, and what it means for entrepreneurs.',null,null,false,'2026-04-05T10:00:00Z'),
  ('exclusive','Confidence Shifts','Members-only coaching session on building unshakeable professional confidence.','c0KYU2j0TM4',null,true,'2026-05-08T10:00:00Z'),
  ('exclusive','The Power of Focus','Deep work strategies from Alketa''s private coaching library.','iCvmsMzlF7o',null,true,'2026-04-25T10:00:00Z'),
  ('exclusive','Business Growth Plan','Step-by-step template walkthrough - live session recording.','H14bBuluwB8',null,true,'2026-03-30T10:00:00Z'),
  ('exclusive','Mindset Shifts','Breaking the patterns that keep smart people stuck.','qp0HIF3SfI4',null,true,'2026-03-10T10:00:00Z')
) as v(type,title,description,youtube_id,thumbnail_url,is_premium,published_at)
where not exists (select 1 from content_items);
