locallicont.com
# Localli
 
**A social media content guidance tool for restaurants.** Localli helps restaurant owners who don't have the time or skills to create good social media content. Based on their goals, brand tone, and cuisine, it generates tailored content suggestions — including written guidance, a format-based example image, and a step-by-step editing guide for the Instagram Edits app.
 
## About
 
I built Localli after reaching out to local restaurants for a previous project and noticing a recurring problem: owners knew social media mattered, but lacked the time to learn content creation. Their posts often showed effort but not skill — low-quality content that didn't do the business justice.
 
Localli is an attempt to close that gap. Instead of teaching restaurant owners to become marketers, it tells them exactly what to post and how, in a few minutes a week.
 
This is my first end-to-end MVP, currently in the validation stage with real restaurants.
 
## Features
 
- **User accounts** — sign up and log in (Clerk)
- **Business profile** — the user sets their goals, brand tone, and cuisine so suggestions are personalized to their restaurant
- **Content guidance** — LLM-generated (Claude API) content suggestions, each including:
  - A recommended content **format**
  - **Written guidance** on what to shoot and post
  - A **format-based example image**
  - A **step-by-step editing guide** for the Instagram Edits app
- **Subscriptions** — payment and plan handling via Stripe
## Tech Stack
 
| Layer | Technology |
| --- | --- |
| Framework | Next.js, React |
| Styling | Tailwind CSS |
| Database | Neon (Postgres) + Drizzle ORM |
| Authentication | Clerk |
| Payments | Stripe |
| AI | Claude API (content generation) |
| Testing | Vitest |
| Hosting | Vercel |
| Types | Zod
 
## Getting Started
 
### Prerequisites
 
- Next.js
- A [Neon](https://neon.tech) Postgres database
- Accounts/keys for Clerk, Stripe, and the Anthropic (Claude) API
### Installation
 
```bash
# Clone the repository
git clone <your-repo-url>
cd localli
 
# Install dependencies
pnpm install
 
# Set up environment variables
cp .env.example .env.local
# then fill in the values (see below)
 
# Run the development server
pnpm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) to view the app locally.
 
### Environment Variables
 
Create a `.env.local` file with the following:
 
```dotenv
# ── Database (Neon / Postgres) ────────────────────────────────
# Recommended for most uses
DATABASE_URL=
 
# For uses requiring a connection without pgbouncer
DATABASE_URL_UNPOOLED=
 
# Parameters for constructing your own connection string
PGHOST=
PGHOST_UNPOOLED=
PGUSER=
PGDATABASE=
PGPASSWORD=
 
# Parameters for Vercel Postgres templates
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_URL_NO_SSL=
POSTGRES_PRISMA_URL=
 
# ── Authentication (Clerk) ────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SIGNING_SECRET=
 
# ── AI (Claude) ───────────────────────────────────────────────
ANTHROPIC_API_KEY=
 
# ── Vercel ────────────────────────────────────────────────────
CRON_SECRET=
 
# ── App ───────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=
 
# ── Payments (Stripe) ─────────────────────────────────────────
STRIPE_PRICE_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```
 
### Scripts
 
```bash
pnpm run dev     # Start the development server
pnpm run build   # Build for production
pnpm run start   # Run the production build
pnpm run test    # Run unit tests (Vitest)
```
 
## Status
 
**Current stage:** MVP built and in active validation with real restaurants. I'm gathering direct feedback to decide whether and how to expand it.
 
## What I Learned
 
- Applying an **LLM (Claude API)** in a real product — designing prompts and generating structured, usable output rather than freeform text
- Deepened my understanding of **unit testing** with Vitest
- Gained real fluency across my stack (Next.js, Drizzle, Clerk, Stripe) by shipping a complete, end-to-end product for the first time
## Roadmap
 
- Expand beyond restaurants to other local business categories
- Add automated content assembly and scheduling to save users even more time
---
 
*Localli is a personal project and my first full MVP, built to learn the end-to-end process of shipping and validating a product.*


## LLM Depth Track learnings and explanation

First time implementing an LLM API into a project. I implemented it in the simplest way possible, actually the second simples as with create instead of parse we can get pure raw respnse without it being structured, though we can later transform it to JSON it could fail. So I implemented it via structured output using the parse method from anthropic messages API.
Basically that works by receving the usual parameters a call to the messages api on create would (system, messages, model, etc) but we add another parameter, one that gives the shape for the output. That is the output_config property, which receives an object of output config with just the format for the output, which is an output format created with Zod, via the zodOutputFormat function receiving creativeBrief object function (I dont know how to explain it, but basically z.object({})).

So then, the call to the main function driving the generation would contact with the messages API passing the content in the parse function and then we would receive a JSON in the shape of creative brief.
This is done so that I can easily, after receiving the JSON, get each of the properties of creativeBrief and use them for later logic in the code, from displaying the information correctly on the UI to certain logic based on whether we received a propery empty or with text.
Also, it is much easier to do all that logic and implementation as well as troubleshooting if we get a consistent shape on the replies, which would probably fail if we instead told the llm to give it on a certain shape via prompt instead of enforcing it with the dedicated function.
