-- Transaction-only verification: all fixture accounts and activity are rolled back.
begin;
select set_config('test.student',gen_random_uuid()::text,true);
select set_config('test.other',gen_random_uuid()::text,true);
insert into auth.users(id,email,raw_app_meta_data,raw_user_meta_data,aud,role) values(current_setting('test.student')::uuid,'edumoe-verification-student@example.invalid','{}','{}','authenticated','authenticated'),(current_setting('test.other')::uuid,'edumoe-verification-other@example.invalid','{}','{}','authenticated','authenticated');
select set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('test.student'),'role','authenticated','app_metadata','{}'::jsonb)::text,true);
set local role authenticated;
do $$declare l uuid; a jsonb;begin
 select id into l from public.lessons where status='published' limit 1;
 perform public.complete_lesson(l); perform public.complete_lesson(l);
 if (select count(*) from public.lesson_completions where lesson_id=l)<>1 then raise exception 'Completion not idempotent'; end if;
 if exists(select 1 from public.course_progress where percent<0 or percent>100) then raise exception 'Invalid progress'; end if;
 a:=public.start_challenge('Structured Programming');
 if jsonb_array_length(a->'questions')<>10 then raise exception 'Wrong question count'; end if;
 if exists(select 1 from jsonb_array_elements(a->'questions') q where q ? 'correct' or q ? 'explanation') then raise exception 'Answer key leaked'; end if;
 perform set_config('test.challenge',a->>'id',true);
 if public.start_challenge('Logic Design')->>'id'<>a->>'id' then raise exception 'Multiple active challenges'; end if;
 begin perform public.admin_students(); raise exception 'Student accessed admin data'; exception when raise_exception then if SQLERRM='Student accessed admin data' then raise; end if; end;
end $$;
reset role;
select set_config('test.answers',(select jsonb_agg(q.correct order by ids.ordinality)::text from public.ranked_challenges c cross join lateral unnest(c.question_ids) with ordinality ids(id,ordinality) join private.challenge_questions q on q.id=ids.id where c.id=current_setting('test.challenge')::uuid),true);
set local role authenticated;
do $$declare score jsonb;begin
 score:=public.submit_challenge(current_setting('test.challenge')::uuid,current_setting('test.answers')::jsonb);
 if (score->>'score')::integer<>10 then raise exception 'Server scoring failed'; end if;
 score:=public.submit_challenge(current_setting('test.challenge')::uuid,'[]'::jsonb);
 if not (score->>'already_submitted')::boolean then raise exception 'Replay protection failed'; end if;
end $$;
reset role;
select set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('test.other'),'role','authenticated')::text,true);
set local role authenticated;
do $$begin
 if exists(select 1 from public.lesson_completions) then raise exception 'Cross-user completion access'; end if;
 if exists(select 1 from public.ranked_challenges) then raise exception 'Cross-user challenge access'; end if;
 begin perform public.submit_challenge(current_setting('test.challenge')::uuid,current_setting('test.answers')::jsonb);raise exception 'Cross-user submission accepted';exception when raise_exception then if SQLERRM='Cross-user submission accepted' then raise;end if;end;
end $$;
reset role;
select 'PASS: completion idempotence, private keys, server scoring, replay protection, ownership boundaries, and admin denial' as verification;
rollback;
