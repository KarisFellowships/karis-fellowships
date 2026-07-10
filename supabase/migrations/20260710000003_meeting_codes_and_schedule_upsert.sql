-- Applied to project afeaatpzvpdlttqyspdd on 2026-07-10.
--
-- 1. meeting_codes: admin-editable dial-in codes, replacing values that were
--    hardcoded across 6 pages (KF Sun/Mon/Tue, NHG Saturday + Weekend Intensive,
--    Romans, HPKP, and the shared phone number). Read by any logged-in member;
--    writes happen only through the service-role admin API.
-- 2. A unique index on kf_schedule (lesson_number, year) so the admin Schedule
--    uploader can upsert the parsed KF Date Projection.xlsx instead of duplicating.

create table if not exists public.meeting_codes (
  id uuid primary key default gen_random_uuid(),
  section text not null,          -- kf | nhg | romans | hpkp | general
  label text not null,            -- e.g. 'Sunday', 'Saturday AM', 'Access Code', 'Phone'
  time_label text,                -- e.g. '8:00 am CST' (KF meetings); null otherwise
  code text not null,             -- '548-008-425#' or the phone number
  sort integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.meeting_codes enable row level security;

drop policy if exists "meeting_codes_read" on public.meeting_codes;
create policy "meeting_codes_read" on public.meeting_codes
  for select to authenticated using (true);

insert into public.meeting_codes (section, label, time_label, code, sort)
select * from (values
  ('general', 'Phone',              null::text,     '(701) 801-1220', 0),
  ('kf',      'Sunday',             '8:00 am CST',  '548-008-425#',   1),
  ('kf',      'Monday',             '10:00 am CST', '591-492-083#',   2),
  ('kf',      'Tuesday',            '7:30 pm CST',  '209-466-826#',   3),
  ('nhg',     'Saturday AM',        null,           '226-621-530#',   1),
  ('nhg',     'Weekend Intensive',  null,           '546-213-115#',   2),
  ('romans',  'Access Code',        null,           '158-890-796#',   1),
  ('hpkp',    'Access Code',        null,           '903-351-258#',   1)
) as v(section, label, time_label, code, sort)
where not exists (select 1 from public.meeting_codes);

create unique index if not exists kf_schedule_lesson_year_uidx
  on public.kf_schedule (lesson_number, year);
