create type "public"."block_type" as enum ('TEXT', 'MEDIA', 'VIDEO', 'CHOICE', 'MULTI_CHOICE', 'MULTI_SELECT', 'FILL_IN_BLANK');
create type "public"."status" as enum ('PUBLISHED', 'DRAFT', 'ARCHIVED');

create table "public"."bookmarks" (
    "id" uuid not null default gen_random_uuid(),
    "lesson_id" uuid not null,
    "user_id" uuid,
    "attempts" bigint default '0'::bigint,
    "points" bigint default '0'::bigint,
    "completed" boolean default false,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."bookmarks" enable row level security;

create table "public"."courses" (
    "id" uuid not null default gen_random_uuid(),
    "title" text,
    "description" text,
    "cover_photo_url" text,
    "active_lessons" bigint,
    "archived_lessons" bigint,
    "draft_lessons" bigint,
    "status" status default 'DRAFT',
    "is_intro" boolean default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "created_by" uuid default auth.uid(),
    "updated_by" uuid default auth.uid()
);


alter table "public"."courses" enable row level security;

create table "public"."lesson_blocks" (
    "id" uuid not null default gen_random_uuid(),
    "lesson" uuid,
    "type" block_type default 'TEXT',
    "media_url" text,
    "screen_content" text,
    "question" text,
    "answers" text[],
    "answer_options" text[],
    "points" bigint,
    "status" status default 'PUBLISHED',
    "order" bigint default '0'::bigint,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "created_by" uuid,
    "updated_by" uuid
);


alter table "public"."lesson_blocks" enable row level security;

create table "public"."lessons" (
    "id" uuid not null default gen_random_uuid(),
    "course" uuid,
    "author" uuid,
    "title" text,
    "description" text,
    "order" bigint default '0'::bigint,
    "recap" text,
    "status" status default 'DRAFT',
    "created_by" uuid,
    "updated_by" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "tags" text[]
);


alter table "public"."lessons" enable row level security;

create table "public"."profiles" (
    "id" uuid not null default auth.uid(),
    "email" text,
    "full_name" text,
    "avatar_url" text,
    "website" text,
    "phone" text,
    "organization" text,
    "bio" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX "Bookmarks_pkey" ON public.bookmarks USING btree (id);

CREATE UNIQUE INDEX courses_pkey ON public.courses USING btree (id);

CREATE UNIQUE INDEX lesson_blocks_pkey ON public.lesson_blocks USING btree (id);

CREATE UNIQUE INDEX lessons_pkey ON public.lessons USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

alter table "public"."bookmarks" add constraint "Bookmarks_pkey" PRIMARY KEY using index "Bookmarks_pkey";

alter table "public"."courses" add constraint "courses_pkey" PRIMARY KEY using index "courses_pkey";

alter table "public"."lesson_blocks" add constraint "lesson_blocks_pkey" PRIMARY KEY using index "lesson_blocks_pkey";

alter table "public"."lessons" add constraint "lessons_pkey" PRIMARY KEY using index "lessons_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."bookmarks" add constraint "public_Bookmarks_lesson_id_fkey" FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bookmarks" validate constraint "public_Bookmarks_lesson_id_fkey";

alter table "public"."bookmarks" add constraint "public_Bookmarks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bookmarks" validate constraint "public_Bookmarks_user_id_fkey";

alter table "public"."courses" add constraint "public_courses_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."courses" validate constraint "public_courses_created_by_fkey";

alter table "public"."courses" add constraint "public_courses_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."courses" validate constraint "public_courses_updated_by_fkey";

alter table "public"."lesson_blocks" add constraint "public_lesson_blocks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."lesson_blocks" validate constraint "public_lesson_blocks_created_by_fkey";

alter table "public"."lesson_blocks" add constraint "public_lesson_blocks_lesson_fkey" FOREIGN KEY (lesson) REFERENCES lessons(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."lesson_blocks" validate constraint "public_lesson_blocks_lesson_fkey";

alter table "public"."lesson_blocks" add constraint "public_lesson_blocks_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."lesson_blocks" validate constraint "public_lesson_blocks_updated_by_fkey";

alter table "public"."lessons" add constraint "public_lessons_author_fkey" FOREIGN KEY (author) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."lessons" validate constraint "public_lessons_author_fkey";

alter table "public"."lessons" add constraint "public_lessons_course_fkey" FOREIGN KEY (course) REFERENCES courses(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."lessons" validate constraint "public_lessons_course_fkey";

alter table "public"."lessons" add constraint "public_lessons_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."lessons" validate constraint "public_lessons_created_by_fkey";

alter table "public"."lessons" add constraint "public_lessons_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."lessons" validate constraint "public_lessons_updated_by_fkey";

alter table "public"."profiles" add constraint "public_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "public_profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

grant delete on table "public"."bookmarks" to "anon";

grant insert on table "public"."bookmarks" to "anon";

grant references on table "public"."bookmarks" to "anon";

grant select on table "public"."bookmarks" to "anon";

grant trigger on table "public"."bookmarks" to "anon";

grant truncate on table "public"."bookmarks" to "anon";

grant update on table "public"."bookmarks" to "anon";

grant delete on table "public"."bookmarks" to "authenticated";

grant insert on table "public"."bookmarks" to "authenticated";

grant references on table "public"."bookmarks" to "authenticated";

grant select on table "public"."bookmarks" to "authenticated";

grant trigger on table "public"."bookmarks" to "authenticated";

grant truncate on table "public"."bookmarks" to "authenticated";

grant update on table "public"."bookmarks" to "authenticated";

grant delete on table "public"."bookmarks" to "service_role";

grant insert on table "public"."bookmarks" to "service_role";

grant references on table "public"."bookmarks" to "service_role";

grant select on table "public"."bookmarks" to "service_role";

grant trigger on table "public"."bookmarks" to "service_role";

grant truncate on table "public"."bookmarks" to "service_role";

grant update on table "public"."bookmarks" to "service_role";

grant delete on table "public"."courses" to "anon";

grant insert on table "public"."courses" to "anon";

grant references on table "public"."courses" to "anon";

grant select on table "public"."courses" to "anon";

grant trigger on table "public"."courses" to "anon";

grant truncate on table "public"."courses" to "anon";

grant update on table "public"."courses" to "anon";

grant delete on table "public"."courses" to "authenticated";

grant insert on table "public"."courses" to "authenticated";

grant references on table "public"."courses" to "authenticated";

grant select on table "public"."courses" to "authenticated";

grant trigger on table "public"."courses" to "authenticated";

grant truncate on table "public"."courses" to "authenticated";

grant update on table "public"."courses" to "authenticated";

grant delete on table "public"."courses" to "service_role";

grant insert on table "public"."courses" to "service_role";

grant references on table "public"."courses" to "service_role";

grant select on table "public"."courses" to "service_role";

grant trigger on table "public"."courses" to "service_role";

grant truncate on table "public"."courses" to "service_role";

grant update on table "public"."courses" to "service_role";

grant delete on table "public"."lesson_blocks" to "anon";

grant insert on table "public"."lesson_blocks" to "anon";

grant references on table "public"."lesson_blocks" to "anon";

grant select on table "public"."lesson_blocks" to "anon";

grant trigger on table "public"."lesson_blocks" to "anon";

grant truncate on table "public"."lesson_blocks" to "anon";

grant update on table "public"."lesson_blocks" to "anon";

grant delete on table "public"."lesson_blocks" to "authenticated";

grant insert on table "public"."lesson_blocks" to "authenticated";

grant references on table "public"."lesson_blocks" to "authenticated";

grant select on table "public"."lesson_blocks" to "authenticated";

grant trigger on table "public"."lesson_blocks" to "authenticated";

grant truncate on table "public"."lesson_blocks" to "authenticated";

grant update on table "public"."lesson_blocks" to "authenticated";

grant delete on table "public"."lesson_blocks" to "service_role";

grant insert on table "public"."lesson_blocks" to "service_role";

grant references on table "public"."lesson_blocks" to "service_role";

grant select on table "public"."lesson_blocks" to "service_role";

grant trigger on table "public"."lesson_blocks" to "service_role";

grant truncate on table "public"."lesson_blocks" to "service_role";

grant update on table "public"."lesson_blocks" to "service_role";

grant delete on table "public"."lessons" to "anon";

grant insert on table "public"."lessons" to "anon";

grant references on table "public"."lessons" to "anon";

grant select on table "public"."lessons" to "anon";

grant trigger on table "public"."lessons" to "anon";

grant truncate on table "public"."lessons" to "anon";

grant update on table "public"."lessons" to "anon";

grant delete on table "public"."lessons" to "authenticated";

grant insert on table "public"."lessons" to "authenticated";

grant references on table "public"."lessons" to "authenticated";

grant select on table "public"."lessons" to "authenticated";

grant trigger on table "public"."lessons" to "authenticated";

grant truncate on table "public"."lessons" to "authenticated";

grant update on table "public"."lessons" to "authenticated";

grant delete on table "public"."lessons" to "service_role";

grant insert on table "public"."lessons" to "service_role";

grant references on table "public"."lessons" to "service_role";

grant select on table "public"."lessons" to "service_role";

grant trigger on table "public"."lessons" to "service_role";

grant truncate on table "public"."lessons" to "service_role";

grant update on table "public"."lessons" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";


create function "public"."handle_new_user"() returns "trigger"
    language "plpgsql" security DEFINER
    AS $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, organization)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'organization');
  return new;
end;
$$;

alter function "public"."handle_new_user"() owner to "postgres";

create function "public"."update_course_lesson_data"() returns "trigger"
    language "plpgsql"
    AS $$
begin
  with draft_lessons as (select count(status) from public.lessons where course = new.course and status = 'DRAFT'),
      active_lessons as (select count(status) from public.lessons where course = new.course and status = 'PUBLISHED'),
      archived_lessons as (select count(status) from public.lessons where course = new.course and status = 'ARCHIVED')
  update public.courses
  set draft_lessons = (select * from draft_lessons),
      active_lessons = (select * from active_lessons),
      archived_lessons = (select * from archived_lessons)
  where id = new.course;
  return new;
end;
$$;

CREATE TRIGGER "on_auth_user_created" AFTER INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();

CREATE TRIGGER "insert_course_lesson_data_trigger" AFTER INSERT ON "public"."lessons" FOR EACH ROW EXECUTE FUNCTION "public"."update_course_lesson_data"();
CREATE TRIGGER "update_course_lesson_data_trigger" AFTER UPDATE ON "public"."lessons" FOR EACH ROW EXECUTE FUNCTION "public"."update_course_lesson_data"();


CREATE POLICY "Anyone can upload an avatar." ON "storage"."objects" FOR INSERT WITH CHECK (("bucket_id" = 'avatars'::"text"));

CREATE POLICY "Avatar images are publicly accessible." ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'avatars'::"text"));

CREATE POLICY "Only authenticated users can upload web assets" ON "storage"."objects" FOR INSERT TO "authenticated" WITH CHECK (("bucket_id" = 'web'::"text"));

CREATE POLICY "Public bookmarks can be created by authenticated users." ON "public"."bookmarks" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Public bookmarks can be updated by authenticated users." ON "public"."bookmarks" FOR UPDATE TO "authenticated" USING (true);

CREATE POLICY "Public courses are viewable by everyone." ON "public"."courses" FOR SELECT USING (true);

CREATE POLICY "Public courses can be created by authenticated users." ON "public"."courses" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Public courses can be updated by authenticated users." ON "public"."courses" FOR UPDATE TO "authenticated" USING (true);

CREATE POLICY "Public lesson blocks can be created by authenticated users." ON "public"."lesson_blocks" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Public lesson blocks can be deleted by authenticated users." ON "public"."lesson_blocks" FOR DELETE TO "authenticated" USING (true);

CREATE POLICY "Public lesson blocks can be updated by authenticated users." ON "public"."lesson_blocks" FOR UPDATE TO "authenticated" USING (true);

CREATE POLICY "Public lesson_blocks are viewable by everyone." ON "public"."lesson_blocks" FOR SELECT USING (true);

CREATE POLICY "Public lessons are viewable by everyone." ON "public"."lessons" FOR SELECT USING (true);

CREATE POLICY "Public lessons can be created by authenticated users." ON "public"."lessons" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Public lessons can be updated by authenticated users." ON "public"."lessons" FOR UPDATE TO "authenticated" USING (true);

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));

create extension if not exists moddatetime schema extensions;

create trigger handle_lessons_updated_at before update on "public"."lessons" for each row execute procedure moddatetime(updated_at);
create trigger handle_courses_updated_at before update on "public"."courses" for each row execute procedure moddatetime(updated_at);
create trigger handle_bookmarks_updated_at before update on "public"."bookmarks" for each row execute procedure moddatetime(updated_at);
create trigger handle_lesson_blocks_updated_at before update on "public"."lesson_blocks" for each row execute procedure moddatetime(updated_at);

