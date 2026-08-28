CREATE TABLE "businesses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"category" text DEFAULT 'restaurant' NOT NULL,
	"name" text,
	"cuisine" text,
	"goal" text,
	"signature_dishes" jsonb DEFAULT '[]'::jsonb,
	"specials" jsonb DEFAULT '[]'::jsonb,
	"target_audience" text,
	"brand_tone" text,
	"content_comfort_level" text,
	"posting_frequency" integer,
	"social_handles" jsonb DEFAULT '{}'::jsonb,
	"address" text,
	"phone" text,
	"onboarding_completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "businesses_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
CREATE TABLE "content_formats" (
	"id" text PRIMARY KEY NOT NULL,
	"category" text DEFAULT 'restaurant' NOT NULL,
	"name" text NOT NULL,
	"media_type" text NOT NULL,
	"description" text NOT NULL,
	"goal_tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"requires_comfort_level" text NOT NULL,
	"prompt_guidance" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suggestions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid NOT NULL,
	"format_id" text NOT NULL,
	"week_start_date" date NOT NULL,
	"position" integer NOT NULL,
	"media_type" text NOT NULL,
	"target_duration_seconds" integer,
	"shot_list" jsonb NOT NULL,
	"editing_notes" jsonb,
	"caption" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"generation_error" text,
	"is_regeneration" boolean DEFAULT false NOT NULL,
	"regenerated_from_suggestion_id" uuid,
	"rejected_format_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "suggestions_business_id_week_start_date_position_unique" UNIQUE("business_id","week_start_date","position")
);
--> statement-breakpoint
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_format_id_content_formats_id_fk" FOREIGN KEY ("format_id") REFERENCES "public"."content_formats"("id") ON DELETE no action ON UPDATE no action;