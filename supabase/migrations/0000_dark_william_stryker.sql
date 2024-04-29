CREATE TABLE IF NOT EXISTS "bookmark" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"course_id" uuid,
	"lesson_id" uuid,
	"completed" text,
	"progress" text,
	"started_at" text,
	"completed_at" text,
	"updated_at" time with time zone,
	"created_at" time with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"active_lessons" integer,
	"archived_lessons" integer,
	"draft_lessons" integer,
	"cover_photo_url" text,
	"created_at" time with time zone DEFAULT 'now()',
	"updated_at" time with time zone DEFAULT 'now()',
	"created_by" uuid,
	"last_updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"course_id" uuid,
	"order" integer,
	"tags" json,
	"author" uuid,
	"blocks" json,
	"created_at" time with time zone DEFAULT 'now()',
	"updated_at" time with time zone DEFAULT 'now()',
	"created_by" uuid,
	"last_updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"organization" text,
	"email" text,
	"phone" text,
	"avatar_url" text,
	"created_at" time with time zone DEFAULT 'now()',
	"updated_at" time with time zone DEFAULT 'now()',
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_last_updated_by_user_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson" ADD CONSTRAINT "lesson_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson" ADD CONSTRAINT "lesson_last_updated_by_user_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
