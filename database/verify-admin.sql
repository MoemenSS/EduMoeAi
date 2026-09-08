-- All accounts and mutations are temporary; ROLLBACK is mandatory.
begin;
select set_config('test.admin',gen_random_uuid()::text,true);
select set_config('test.student',gen_random_uuid()::text,true);
insert into auth.users(id,email,raw_app_meta_data,aud,role) values(current_setting('test.admin')::uuid,'edumoe-admin-test@example.invalid','{"role":"admin"}','authenticated','authenticated'),(current_setting('test.student')::uuid,'edumoe-role-test@example.invalid','{}','authenticated','authenticated');
select set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('test.admin'),'role','authenticated','app_metadata',jsonb_build_object('role','admin'))::text,true);
set local role authenticated;
do $$declare row_id text;begin
 if jsonb_array_length(public.admin_students())<2 then raise exception 'Admin read failed';end if;
 perform public.admin_set_role(current_setting('test.student')::uuid,'admin');
 perform public.admin_set_role(current_setting('test.student')::uuid,'student');
 insert into public.practice_questions(title,subject,topic,options,correct,explanation,status) values('Verification only','Structured Programming','Verification','["a","b","c","d"]',0,'Verification only','draft') returning id into row_id;
 update public.practice_questions set title='Updated verification' where id=row_id;
 if (select count(*) from public.audit_logs where entity_id=row_id)<>2 then raise exception 'Automatic audit failed';end if;
 perform set_config('test.question',row_id,true);
end $$;
reset role;
update auth.users set raw_app_meta_data='{}' where id=current_setting('test.admin')::uuid;
-- JWT still claims admin, but the database must honor the revoked role.
set local role authenticated;
do $$declare changed integer;begin
 update public.practice_questions set title='Should be blocked' where id=current_setting('test.question');
 get diagnostics changed=row_count;
 if changed<>0 then raise exception 'Revoked admin edited question';end if;
 begin perform public.admin_students();raise exception 'Revoked admin read users';exception when raise_exception then if SQLERRM='Revoked admin read users' then raise;end if;end;
end $$;
reset role;
select 'PASS: admin reads, role changes, persistent content writes, automatic audit, and immediate role revocation' as verification;
rollback;
