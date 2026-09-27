import { config } from "dotenv";

// Runs before every test file. Vitest doesn't load .env.local the way
// Next's dev server does, so anything imported by a test that indirectly
// touches lib/db/index.ts (which reads process.env.DATABASE_URL at import
// time) needs this — same dotenv pattern already used in drizzle.config.ts
// and lib/db/seed.ts.
config({ path: ".env.local" });
