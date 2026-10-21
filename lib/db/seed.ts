import { config } from "dotenv";
config({ path: ".env.local" });
import { formats } from "./formats";


// The starting content format library for the restaurant category.
// `goalTags: []` means "suits every goal" (no restriction).
const FORMATS = formats;

async function main() {
  // Loaded dynamically (not at the top of the file) so `config()` above has
  // already set process.env.DATABASE_URL before lib/db/index.ts reads it —
  // otherwise, since JS loads all top-level imports before running any
  // code, it would try to connect before the env var was even set.
  const { db } = await import("./index");
  const { contentFormats } = await import("./schema");

  for (const format of FORMATS) {
    // db.insert(table).values(row) -> the Drizzle equivalent of
    // `INSERT INTO content_formats (...) VALUES (...)`.
    // .onConflictDoUpdate(...) makes this safe to run more than once: if a
    // row with this id already exists (conflict on the primary key), update
    // its fields instead of erroring out — so re-running the seed script
    // just refreshes the data rather than failing on duplicates.
    await db
      .insert(contentFormats)
      .values(format)
      .onConflictDoUpdate({ target: contentFormats.id, set: format });
  }

  console.log(`Seeded ${FORMATS.length} content formats.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
