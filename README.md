# Studio Starter

The golden template every Tawjeeh Studio project is cloned from. It is a working,
deployable Next.js + Supabase app with the **Masar feedback widget pre-wired**, so
the moment a project is provisioned the manager already has a live app whose users
can send feedback.

The agent extends this template in response to the manager's prompts. It never
scaffolds from an empty directory — this template is the floor, which is what keeps
non-technical users from ending up with a broken base.

## What's baked in

| Path | Purpose |
|---|---|
| `src/lib/masar.ts` | Mints the Masar widget token server-side (issuer-secret flow) |
| `src/components/MasarWidget.tsx` | Renders the widget `<script>` for the signed-in employee |
| `src/lib/auth.ts` | Resolves the current employee's email (Supabase session) |
| `src/app/layout.tsx` | Mounts `<MasarWidget />` on every page |
| `CLAUDE.md` | Guardrails the agent must follow (don't break Masar; keep it buildable) |
| `npm run verify` | typecheck + build — the publish gate |

## Provisioning injects (see `.env.example`)

`MASAR_DASHBOARD_URL`, `MASAR_ISSUER_SECRET`, `MASAR_ORG_DOMAIN`, `MASAR_SPACE_ID`,
`MASAR_SPACE_NAME`, plus the project's own `NEXT_PUBLIC_SUPABASE_*`.

## Local check

```bash
npm install
npm run verify   # typecheck + build; must pass before publish
npm run dev      # http://localhost:3000
```
