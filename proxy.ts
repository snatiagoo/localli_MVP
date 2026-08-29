import { clerkMiddleware } from "@clerk/nextjs/server";

// This is Next.js 16's renamed middleware.ts — same mechanism, new file
// name. It intentionally does NOT decide who's allowed where — that used
// to be done here via path-matching (createRouteMatcher), but Clerk now
// recommends against that: middleware path-matching can drift out of sync
// with how Next.js actually resolves routes, and Server Actions in
// particular are called by an ID, not a URL, so middleware can't see them
// at all. Real protection now happens at each resource (layout, page,
// route handler, Server Action) via auth.protect() called directly there.
//
// This file still exists — just running clerkMiddleware() with no logic —
// because Clerk needs it present for its internals (session syncing, etc.)
// to work correctly.
export default clerkMiddleware();
