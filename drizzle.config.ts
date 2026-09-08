import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js loads .env.local automatically for the app itself, but the
// drizzle-kit CLI runs outside of Next.js, so we load it manually here.
config({ path: ".env.local" });

// Config for the drizzle-kit CLI (the `db:*` scripts in package.json) — this
// is separate from lib/db/index.ts, which is the runtime connection the app
// itself uses. This one is only used when you run drizzle-kit commands.
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle", // generated SQL migration files land here
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.LOCALLI_STORAGE_DATABASE_URL!,
  },
});
