create table public.practice_questions(id text primary key default gen_random_uuid()::text,title text not null,subject text not null,topic text not null,options jsonb not null check(jsonb_typeof(options)='array' and jsonb_array_length(options)=4),correct smallint not null check(correct between 0 and 3),explanation text not null,status text not null default 'draft' check(status in ('draft','published','archived')),created_at timestamptz not null default now(),updated_at timestamptz not null default now());
alter table public.practice_questions enable row level security;
grant select on public.practice_questions to anon,authenticated;
grant insert,update on public.practice_questions to authenticated;
create policy "published practice readable" on public.practice_questions for select to anon using(status='published');
create policy "students read published and admins read drafts" on public.practice_questions for select to authenticated using(status='published' or (select private.is_admin()));
create policy "admins create questions" on public.practice_questions for insert to authenticated with check((select private.is_admin()));
create policy "admins edit questions" on public.practice_questions for update to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create trigger audit_question_changes after insert or update on public.practice_questions for each row execute function private.audit_content();
