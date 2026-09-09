// ============================================================================
// DATABASE SCHEMA
//
// Docs:
//   - Column types (text/integer/boolean/jsonb/timestamp/uuid/date):
//     https://orm.drizzle.team/docs/column-types/pg
//   - Primary keys, unique constraints, foreign keys (.references()):
//     https://orm.drizzle.team/docs/indexes-constraints
// ============================================================================

import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import type { Goal } from "@/lib/content/goals";

import Stripe from "stripe";

// Plain TS unions (not DB types) — used with `.$type<...>()` below to
// restrict what a text column is allowed to hold, at the TypeScript level.
export type ComfortLevel = "photo_only" | "simple_video" | "confident_video";
export type MediaType = "photo" | "video";
export type SubStatus = 
  Stripe.Subscription.Status;
// ----------------------------------------------------------------------------
// TABLE 1: businesses — one row per restaurant owner's onboarding profile
// ----------------------------------------------------------------------------
export const businesses = pgTable("businesses", {
  id: uuid("id").primaryKey().defaultRandom(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  subscriptionStatus: text("subscription_status").$type<SubStatus>(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  category: text("category").notNull().default("restaurant"),
  name: text("name"),
  cuisine: text("cuisine"),
  goal: text("goal").$type<Goal>(),

  // Column name fixed to snake_case ("signature_dishes"), matching the rest
  // of the table, and `.default([])` added per the field spec.
  signatureDishes: jsonb("signature_dishes").$type<string[]>().default([]),

  specials: jsonb("specials")
    .$type<{ label: string; description?: string }[]>()
    .default([]),
  targetAudience: text("target_audience"),
  brandTone: text("brand_tone"),
  contentComfortLevel: text("content_comfort_level").$type<ComfortLevel>(),
  postingFrequency: integer("posting_frequency"),
  socialHandles: jsonb("social_handles")
    .$type<{ instagram?: string; tiktok?: string; facebook?: string }>()
    .default({}),
  address: text("address"),
  phone: text("phone"),
  onboardingCompletedAt: timestamp("onboarding_completed_at", {
    withTimezone: true,
  }),

  // Regeneration rate-limit (3/week, shared across all of that week's
  // cards). Suggestion rows get deleted on regeneration, so a running count
  // on the business itself is what survives — reset whenever a regeneration
  // is requested for a different weekStartDate than the one stored here.
  regenerationsUsed: integer("regenerations_used").notNull().default(0),
  regenerationsWeekStartDate: date("regenerations_week_start_date"),

  // `.notNull()` added — createdAt/updatedAt should always have a value.
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ----------------------------------------------------------------------------
// TABLE 2: contentFormats — the library of content "types" we can suggest
// (seeded with real rows later — this table's rows don't change at runtime)
// ----------------------------------------------------------------------------
export const contentFormats = pgTable("content_formats", {
  // text, not uuid, as the primary key — we want readable ids we write by
  // hand in the seed file later, e.g. "signature_dish_spotlight_video".
  id: text("id").primaryKey(),
  category: text("category").notNull().default("restaurant"),
  name: text("name").notNull(), // Spanish display name
  mediaType: text("media_type").$type<MediaType>().notNull(),
  description: text("description").notNull(), // internal notes, not shown to users
  goalTags: jsonb("goal_tags").$type<Goal[]>().notNull().default([]), // [] = suits every goal
  requiresComfortLevel: text("requires_comfort_level")
    .$type<ComfortLevel>()
    .notNull(),
  promptGuidance: text("prompt_guidance").notNull(), // extra context fed to Claude
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ----------------------------------------------------------------------------
// TABLE 3: suggestions — one row per generated weekly card a business sees
// ----------------------------------------------------------------------------
export const suggestions = pgTable(
  "suggestions",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // FOREIGN KEY — new pattern. `.references(() => businesses.id)` tells
    // Postgres this column must match an existing businesses.id, so you
    // can never insert a suggestion pointing at a business that doesn't
    // exist. `{ onDelete: "cascade" }` means: if that business row is ever
    // deleted, all its suggestions get deleted automatically too, instead
    // of being left behind as orphaned rows.
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),

    // Same idea, pointing at contentFormats.id instead — no onDelete here,
    // since we don't expect format rows to ever be deleted (just retired
    // via the `active` flag).
    formatId: text("format_id")
      .notNull()
      .references(() => contentFormats.id),

    weekStartDate: date("week_start_date").notNull(), // the Monday this card belongs to
    position: integer("position").notNull(), // 1, 2, or 3 — "Video 1 de 3"
    mediaType: text("media_type").$type<MediaType>().notNull(), // copied from the format at generation time
    targetDurationSeconds: integer("target_duration_seconds"), // video only

    shotList: jsonb("shot_list")
      .$type<{ order: number; description: string; durationSeconds?: number }[]>()
      .notNull(),
    editingNotes: jsonb("editing_notes").$type<{
      cuts?: string;
      music?: string;
      textOverlays?: { atSecond: number; text: string }[];
    } | null>(), // null for photo formats, which don't need editing/montage notes
    caption: text("caption").notNull(),

    status: text("status")
      .$type<"pending" | "ready" | "failed">()
      .notNull()
      .default("pending"),
    generationError: text("generation_error"), // set only if Claude generation fails

    isRegeneration: boolean("is_regeneration").notNull().default(false),
    regeneratedFromSuggestionId: uuid("regenerated_from_suggestion_id"), // points back to the card this replaced, if any
    rejectedFormatIds: jsonb("rejected_format_ids")
      .$type<string[]>()
      .notNull()
      .default([]),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  // Table-level constraint: one business can't have two cards in the same
  // "slot" (same week + same position). unique().on(...) takes multiple
  // columns — the combination of all three must be unique, not each one
  // individually.
  (t) => [unique().on(t.businessId, t.weekStartDate, t.position)],
);
