create table if not exists public.content_records (
 id uuid primary key default gen_random_uuid(),
 kind text not null check(kind in ('announcement','schedule','resource','question','setting')),
 title text not null check(length(title) between 1 and 200),
 body text not null default '',
 course_code text,
 status text not null default 'draft' check(status in ('draft','published','archived')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.content_records enable row level security;
grant select,insert,update on public.content_records to authenticated;
grant select on public.content_records to anon;
create policy "published student resources or admin" on public.content_records for select to anon,authenticated using ((status='published' and kind in ('announcement','schedule','resource')) or ((select auth.jwt())->'app_metadata'->>'role')='admin');
create policy "admin content inserts" on public.content_records for insert to authenticated with check(((select auth.jwt())->'app_metadata'->>'role')='admin');
create policy "admin content edits" on public.content_records for update to authenticated using(((select auth.jwt())->'app_metadata'->>'role')='admin') with check(((select auth.jwt())->'app_metadata'->>'role')='admin');
create or replace function private.audit_content() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.audit_logs(actor_id,action,entity_type,entity_id,details) values(auth.uid(),TG_OP,TG_TABLE_NAME,coalesce(to_jsonb(NEW)->>'id',to_jsonb(OLD)->>'id'),jsonb_build_object('before',case when TG_OP='INSERT' then null else to_jsonb(OLD) end,'after',case when TG_OP='DELETE' then null else to_jsonb(NEW) end));
 if TG_OP='DELETE' then return OLD; end if; return NEW;
end $$;
revoke all on function private.audit_content() from public,anon,authenticated;
create trigger audit_course_changes after insert or update or delete on public.courses for each row execute function private.audit_content();
create trigger audit_lesson_changes after insert or update or delete on public.lessons for each row execute function private.audit_content();
create trigger audit_record_changes after insert or update or delete on public.content_records for each row execute function private.audit_content();
create or replace function private.admin_students() returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from auth.users where id=auth.uid() and raw_app_meta_data->>'role'='admin') then raise exception 'Admin access required'; end if;
 return coalesce((select jsonb_agg(row) from (select u.id,u.email,coalesce(p.display_name,'Student') as display_name,coalesce(u.raw_app_meta_data->>'role','student') as role,u.created_at,u.last_sign_in_at from auth.users u left join public.profiles p on p.user_id=u.id order by u.created_at desc limit 500) row),'[]'::jsonb);
end $$;
revoke all on function private.admin_students() from public,anon;
grant execute on function private.admin_students() to authenticated;
create or replace function public.admin_students() returns jsonb language sql security invoker set search_path='' as $$select private.admin_students()$$;
revoke all on function public.admin_students() from public,anon;
grant execute on function public.admin_students() to authenticated;
create or replace function private.admin_set_role(target_user uuid,new_role text) returns void language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from auth.users where id=auth.uid() and raw_app_meta_data->>'role'='admin') then raise exception 'Admin access required'; end if;
 if new_role not in ('student','admin') then raise exception 'Invalid role'; end if;
 if target_user=auth.uid() then raise exception 'You cannot change your own administrator role'; end if;
 update auth.users set raw_app_meta_data=coalesce(raw_app_meta_data,'{}'::jsonb)||jsonb_build_object('role',new_role) where id=target_user;
 if not found then raise exception 'Student not found'; end if;
 insert into public.audit_logs(actor_id,action,entity_type,entity_id,details) values(auth.uid(),'SET_ROLE','users',target_user::text,jsonb_build_object('role',new_role));
end $$;
revoke all on function private.admin_set_role(uuid,text) from public,anon;
grant execute on function private.admin_set_role(uuid,text) to authenticated;
create or replace function public.admin_set_role(target_user uuid,new_role text) returns void language sql security invoker set search_path='' as $$select private.admin_set_role(target_user,new_role)$$;
revoke all on function public.admin_set_role(uuid,text) from public,anon;
grant execute on function public.admin_set_role(uuid,text) to authenticated;
-- Fresh role checks protect direct database writes after a role is revoked.
create or replace function private.is_admin() returns boolean language sql stable security definer set search_path='' as $$select exists(select 1 from auth.users where id=auth.uid() and raw_app_meta_data->>'role'='admin')$$;
revoke all on function private.is_admin() from public,anon;
grant execute on function private.is_admin() to authenticated;
create policy "fresh admin role for course writes" on public.courses as restrictive for all to authenticated using(status='published' or (select private.is_admin())) with check((select private.is_admin()));
create policy "fresh admin role for lesson writes" on public.lessons as restrictive for all to authenticated using(status='published' or (select private.is_admin())) with check((select private.is_admin()));
create policy "fresh admin role for record writes" on public.content_records as restrictive for all to authenticated using((status='published' and kind in ('announcement','schedule','resource')) or (select private.is_admin())) with check((select private.is_admin()));
create policy "fresh admin deletes courses" on public.courses as restrictive for delete to authenticated using((select private.is_admin()));
create policy "fresh admin deletes lessons" on public.lessons as restrictive for delete to authenticated using((select private.is_admin()));
create policy "fresh admin reads audit" on public.audit_logs as restrictive for select to authenticated using((select private.is_admin()));
create policy "fresh admin writes audit" on public.audit_logs as restrictive for insert to authenticated with check((select private.is_admin()));
