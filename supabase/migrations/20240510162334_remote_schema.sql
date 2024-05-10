create table "auth"."sso_sessions" (
    "id" uuid not null,
    "session_id" uuid not null,
    "sso_provider_id" uuid,
    "not_before" timestamp with time zone,
    "not_after" timestamp with time zone,
    "idp_initiated" boolean default false,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


CREATE INDEX refresh_tokens_token_idx ON auth.refresh_tokens USING btree (token);

CREATE UNIQUE INDEX sso_sessions_pkey ON auth.sso_sessions USING btree (id);

CREATE INDEX sso_sessions_session_id_idx ON auth.sso_sessions USING btree (session_id);

CREATE INDEX sso_sessions_sso_provider_id_idx ON auth.sso_sessions USING btree (sso_provider_id);

alter table "auth"."sso_sessions" add constraint "sso_sessions_pkey" PRIMARY KEY using index "sso_sessions_pkey";

alter table "auth"."sso_sessions" add constraint "sso_sessions_session_id_fkey" FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE not valid;

alter table "auth"."sso_sessions" validate constraint "sso_sessions_session_id_fkey";

alter table "auth"."sso_sessions" add constraint "sso_sessions_sso_provider_id_fkey" FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE not valid;

alter table "auth"."sso_sessions" validate constraint "sso_sessions_sso_provider_id_fkey";

grant delete on table "auth"."sso_sessions" to "dashboard_user";

grant insert on table "auth"."sso_sessions" to "dashboard_user";

grant references on table "auth"."sso_sessions" to "dashboard_user";

grant select on table "auth"."sso_sessions" to "dashboard_user";

grant trigger on table "auth"."sso_sessions" to "dashboard_user";

grant truncate on table "auth"."sso_sessions" to "dashboard_user";

grant update on table "auth"."sso_sessions" to "dashboard_user";

grant delete on table "auth"."sso_sessions" to "postgres";

grant insert on table "auth"."sso_sessions" to "postgres";

grant references on table "auth"."sso_sessions" to "postgres";

grant select on table "auth"."sso_sessions" to "postgres";

grant trigger on table "auth"."sso_sessions" to "postgres";

grant truncate on table "auth"."sso_sessions" to "postgres";

grant update on table "auth"."sso_sessions" to "postgres";


