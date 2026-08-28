import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// `neon(...)` from @neondatabase/serverless gives us a connection that talks
// to Neon over plain HTTP instead of a persistent TCP connection — this is
// what makes it work in Vercel's serverless functions without connection
// pooling setup. `drizzle(sql, { schema })` wraps that connection with the
// typed query builder that reads our table definitions from schema.ts.
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
