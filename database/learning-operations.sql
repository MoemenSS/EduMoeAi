-- Application operations. Apply with Supabase migration tooling; definitions are kept here for review.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;
create table if not exists public.lesson_completions (
 user_id uuid not null references auth.users(id) on delete cascade,
 lesson_id uuid not null references public.lessons(id) on delete cascade,
 completed_at timestamptz not null default now(), primary key(user_id,lesson_id)
);
alter table public.lesson_completions enable row level security;
grant select on public.lesson_completions to authenticated;
create policy "students read their lesson completions" on public.lesson_completions for select to authenticated using ((select auth.uid())=user_id);
create index if not exists lesson_completions_lesson_idx on public.lesson_completions(lesson_id);
create or replace function private.complete_lesson(lesson_id uuid) returns void language plpgsql security definer set search_path='' as $$
declare student uuid:=auth.uid(); course text; course_key uuid; lesson_title text; total_count integer; done_count integer;
begin
 if student is null then raise exception 'Authentication required'; end if;
 select c.code,c.id,l.title into course,course_key,lesson_title from public.lessons l join public.courses c on c.id=l.course_id where l.id=lesson_id and l.status='published' and c.status='published';
 if course is null then raise exception 'Published lesson not found'; end if;
 insert into public.lesson_completions(user_id,lesson_id) values(student,lesson_id) on conflict do nothing;
 select count(*) into total_count from public.lessons where course_id=course_key and status='published';
 select count(*) into done_count from public.lesson_completions lc join public.lessons l on l.id=lc.lesson_id where lc.user_id=student and l.course_id=course_key and l.status='published';
 insert into public.course_progress(user_id,course_code,current_lesson,percent) values(student,course,lesson_title,least(100,round(100.0*done_count/greatest(total_count,1)))::smallint) on conflict(user_id,course_code) do update set current_lesson=excluded.current_lesson,percent=excluded.percent,updated_at=now();
end $$;
revoke all on function private.complete_lesson(uuid) from public,anon;
grant execute on function private.complete_lesson(uuid) to authenticated;
create or replace function public.complete_lesson(lesson_id uuid) returns void language sql security invoker set search_path='' as $$select private.complete_lesson(lesson_id)$$;
revoke all on function public.complete_lesson(uuid) from public,anon;
grant execute on function public.complete_lesson(uuid) to authenticated;

create table if not exists private.challenge_questions(id text primary key,subject text not null,topic text not null,prompt text not null,options jsonb not null,correct smallint not null check(correct between 0 and 3),explanation text not null);
revoke all on private.challenge_questions from public,anon,authenticated;
create table if not exists public.ranked_challenges(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,subject text not null,question_ids text[] not null,started_at timestamptz not null default now(),expires_at timestamptz not null default now()+interval '5 minutes',completed_at timestamptz,score integer,total integer not null default 10);
alter table public.ranked_challenges enable row level security;
grant select on public.ranked_challenges to authenticated;
create policy "students read own ranked challenges" on public.ranked_challenges for select to authenticated using ((select auth.uid())=user_id);
create index if not exists ranked_challenges_user_idx on public.ranked_challenges(user_id,started_at desc);
create or replace function private.start_challenge(chosen_subject text) returns jsonb language plpgsql security definer set search_path='' as $$
declare student uuid:=auth.uid(); challenge public.ranked_challenges; selected_ids text[]; questions jsonb;
begin
 if student is null then raise exception 'Authentication required'; end if;
 perform pg_advisory_xact_lock(hashtextextended(student::text,0));
 if (select count(*) from public.ranked_challenges where user_id=student and started_at>now()-interval '1 day')>=20 then raise exception 'Daily limit reached. Try practice or return tomorrow.'; end if;
 select * into challenge from public.ranked_challenges where user_id=student and completed_at is null and expires_at>now() order by started_at desc limit 1;
 if challenge.id is null then
  select array_agg(id) into selected_ids from (select id from private.challenge_questions where subject=chosen_subject order by random() limit 10) q;
  if coalesce(array_length(selected_ids,1),0)<10 then raise exception 'This subject is not ready'; end if;
  insert into public.ranked_challenges(user_id,subject,question_ids) values(student,chosen_subject,selected_ids) returning * into challenge;
 end if;
 select jsonb_agg(jsonb_build_object('id',q.id,'prompt',q.prompt,'options',q.options,'topic',q.topic) order by ids.ordinality) into questions from unnest(challenge.question_ids) with ordinality ids(id,ordinality) join private.challenge_questions q on q.id=ids.id;
 return jsonb_build_object('id',challenge.id,'subject',challenge.subject,'expires_at',challenge.expires_at,'questions',questions);
end $$;
revoke all on function private.start_challenge(text) from public,anon;
grant execute on function private.start_challenge(text) to authenticated;
create or replace function public.start_challenge(chosen_subject text) returns jsonb language sql security invoker set search_path='' as $$select private.start_challenge(chosen_subject)$$;
revoke all on function public.start_challenge(text) from public,anon;
grant execute on function public.start_challenge(text) to authenticated;
create or replace function private.submit_challenge(challenge_id uuid,choices jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare student uuid:=auth.uid(); challenge public.ranked_challenges; verified_score integer; review jsonb;
begin
 if student is null then raise exception 'Authentication required'; end if;
 select * into challenge from public.ranked_challenges where id=challenge_id and user_id=student for update;
 if challenge.id is null then raise exception 'Challenge not found'; end if;
 if challenge.completed_at is not null then return jsonb_build_object('score',challenge.score,'total',challenge.total,'already_submitted',true); end if;
 if now()>challenge.expires_at then raise exception 'Challenge expired. Start a fresh round.'; end if;
 if jsonb_typeof(choices)<>'array' or jsonb_array_length(choices)<>challenge.total then raise exception 'Submit exactly one answer per question'; end if;
 if exists(select 1 from jsonb_array_elements(choices) c where jsonb_typeof(c)<>'number' or (c::text)::numeric not between 0 and 3 or trunc((c::text)::numeric)<>(c::text)::numeric) then raise exception 'Invalid answer'; end if;
 select count(*) filter(where (choices->>((ids.ordinality-1)::integer))::integer=q.correct),jsonb_agg(jsonb_build_object('id',q.id,'correct',q.correct,'explanation',q.explanation) order by ids.ordinality) into verified_score,review from unnest(challenge.question_ids) with ordinality ids(id,ordinality) join private.challenge_questions q on q.id=ids.id;
 update public.ranked_challenges set completed_at=now(),score=verified_score where id=challenge.id;
 return jsonb_build_object('score',verified_score,'total',challenge.total,'review',review);
end $$;
revoke all on function private.submit_challenge(uuid,jsonb) from public,anon;
grant execute on function private.submit_challenge(uuid,jsonb) to authenticated;
create or replace function public.submit_challenge(challenge_id uuid,choices jsonb) returns jsonb language sql security invoker set search_path='' as $$select private.submit_challenge(challenge_id,choices)$$;
revoke all on function public.submit_challenge(uuid,jsonb) from public,anon;
grant execute on function public.submit_challenge(uuid,jsonb) to authenticated;
create or replace function private.challenge_leaderboard() returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Authentication required'; end if;
 return coalesce((select jsonb_agg(row) from (select coalesce(nullif(p.display_name,''),'Student') as name,max(c.score) as best_score,count(*) as rounds from public.ranked_challenges c join public.profiles p on p.user_id=c.user_id and p.is_public where c.completed_at is not null group by c.user_id,p.display_name order by max(c.score) desc,count(*) desc limit 20) row),'[]'::jsonb);
end $$;
revoke all on function private.challenge_leaderboard() from public,anon;
grant execute on function private.challenge_leaderboard() to authenticated;
create or replace function public.challenge_leaderboard() returns jsonb language sql security invoker set search_path='' as $$select private.challenge_leaderboard()$$;
revoke all on function public.challenge_leaderboard() from public,anon;
grant execute on function public.challenge_leaderboard() to authenticated;
