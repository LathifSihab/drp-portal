# DRP Portal

The start page for DRP BuildLab's internal tools: after one Microsoft sign-in it shows a tile per app (DRP Operational, CMS, Client zone admin) and a Log out button.

| Environment | Address |
|---|---|
| Local | `npm run dev` (http://localhost:5173) |
| Staging | https://drp-portal-staging.goosebumpsevents.workers.dev |
| Production | https://drp-portal.goosebumpsevents.workers.dev |

## How the shared login works

The portal is a **self-hosted Cloudflare Access application**, like DRP Operational: Access asks for Microsoft before the request reaches the Worker, and `src/hooks.server.ts` verifies the `Cf-Access-Jwt-Assertion` token itself (`src/lib/server/access.ts`, same code as Operational), because the workers.dev address could otherwise be reached directly.

The CMS and client zone stay on Netlify under `drpbuildlab.com`, which is not on Cloudflare. They use Cloudflare Access as an **OIDC login provider** ("Access for SaaS"). One Access sign-in serves all of them: the second app redirects through Access and back without asking again. They keep their own session cookie for 8 hours.

**Log out** goes to `/cdn-cgi/access/logout`, which revokes the Access session for every app. Operational and the portal lock at once. The CMS and client zone cookies remain until they expire (at most 8 hours) unless their own Sign out is used, which also ends the Access session.

Setup steps and decisions: `../drp-ops/drp-operational/docs/INTERNAL_GATEWAY.md`.

## Configuration

- Secrets per environment: `npx wrangler secret put CF_ACCESS_TEAM_DOMAIN --env staging`, and the same for `CF_ACCESS_AUD` (the portal's own Access application) and for `--env production`.
- Tile addresses: `OPERATIONAL_URL`, `CMS_URL`, `CLIENTZONE_ADMIN_URL` in `wrangler.jsonc` per environment. An empty address shows the tile as "Address not set yet".
- Local: copy `.env.example` to `.env` and set `DEV_USER_EMAIL` (used only by `vite dev`, when there is no Access header) and the addresses.

To add an app: add it to `APPS` in `src/lib/apps.ts`, an icon in `src/routes/+page.svelte`, its address variable in `src/env.ts`, `.env.example` and `wrangler.jsonc`, then `npm run gen`.

## Commands

```bash
npm install
npm run dev
npm run check && npm run lint && npm test && npm run build
npx wrangler deploy --env staging      # after npm run build
npx wrangler deploy --env production
```
