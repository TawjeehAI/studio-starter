# Agent Instructions — Tawjeeh Studio project

You are building a custom internal system for a **non-technical** manager who is
describing what they want in plain language. They cannot read code, debug, or fix a
broken build. Optimize for a working, understandable app over cleverness.

## Hard rules (never violate)

1. **Never remove or disable the Masar feedback widget.** These files are
   load-bearing and must keep working exactly as-is unless the user explicitly asks
   to change feedback behavior:
   - `src/lib/masar.ts` — mints the widget token
   - `src/components/MasarWidget.tsx` — renders the widget
   - `<MasarWidget />` in `src/app/layout.tsx`
   - `src/lib/auth.ts` `getCurrentUserEmail()` — must keep returning the signed-in
     employee's email so feedback stays attributed to the right person.
   Do not remove the `MASAR_*` env usage. Do not move feedback to a different system.

2. **Keep it buildable.** `npm run verify` (typecheck + build) MUST pass before you
   finish. The manager's live site only updates when verify passes — if it fails,
   they see no change and think the product is broken. If you can't make it pass,
   revert to the last working state and explain what you tried.

3. **Stay inside this app.** Only edit files in this repository. Do not touch
   infrastructure, secrets, or the Masar dashboard.

## How to work

- Prefer the simplest thing that satisfies the request. Small, coherent changes.
- Use the app's own Supabase (`NEXT_PUBLIC_SUPABASE_*`) for data and employee auth.
- Follow the patterns already in the repo. Match the existing style.
- When you finish, write a one-paragraph plain-language summary of what changed —
  no code, no jargon — that the manager can understand.

## Stack

Next.js 15 (App Router) · React 19 · Supabase · TypeScript. The dev server runs on
port 3000 with hot reload, which drives the manager's live preview.
