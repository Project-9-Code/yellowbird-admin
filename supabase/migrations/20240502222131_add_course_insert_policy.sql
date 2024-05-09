CREATE POLICY "Public lesson_blocks are viewable by everyone." ON "public"."lesson_blocks" FOR SELECT USING (true);

CREATE POLICY "Public courses can be created by authenticated users." ON "public"."courses" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Public courses can be updated by authenticated users." ON "public"."courses" FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Public lessons can be created by authenticated users." ON "public"."lessons" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Public lessons can be updated by authenticated users." ON "public"."lessons" FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Public lesson blocks can be created by authenticated users." ON "public"."lesson_blocks" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Public lesson blocks can be updated by authenticated users." ON "public"."lesson_blocks" FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Public lesson blocks can be deleted by authenticated users." ON "public"."lesson_blocks" FOR DELETE TO authenticated USING (true);


CREATE POLICY "Public bookmarks can be created by authenticated users." ON "public"."bookmarks" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Public bookmarks can be updated by authenticated users." ON "public"."bookmarks" FOR UPDATE TO authenticated USING (true);

-- this policy will allow authenticated users to insert objects into the "web" bucket
INSERT into storage.buckets (id, name, public) values ('web', 'web', true);
CREATE POLICY "Only authenticated users can upload web assets" ON "storage"."objects" FOR INSERT TO authenticated WITH CHECK (bucket_id = 'web');

create extension if not exists moddatetime schema extensions;
-- this trigger will set the "updated_at" column to the current timestamp for every update

create or replace trigger handle_courses_updated_at before update
on public.courses
for each row execute procedure moddatetime(updated_at);

create or replace trigger handle_lessons_updated_at before update
on public.lessons
for each row execute procedure moddatetime(updated_at);

create or replace trigger handle_bookmarks_updated_at before update
on public.bookmarks
for each row execute procedure moddatetime(updated_at);

create or replace trigger handle_lesson_blocks_updated_at before update
on public.lesson_blocks
for each row execute procedure moddatetime(updated_at);

create or replace trigger handle_profiles_updated_at before update
on public.profiles
for each row execute procedure moddatetime(updated_at);

-- this triger will update course lesson data when a lesson is inserted
create or replace function update_course_lesson_data() returns trigger language plpgsql as $$
begin
  update public.courses 
  set draft_lessons = (select count(status) from public.lessons where course = new.course and status = 'draft'),
      active_lessons = (select count(status) from public.lessons where course = new.course and status = 'published'),
      archived_lessons = (select count(status) from public.lessons where course = new.course and status = 'archived')
  where id = new.course;
  return new;
end;
$$;

create or replace trigger update_course_lesson_data_trigger after insert on public.lessons
for each row execute function update_course_lesson_data();
