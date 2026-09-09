ALTER TABLE "businesses" ADD COLUMN "regenerations_used" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "regenerations_week_start_date" date;