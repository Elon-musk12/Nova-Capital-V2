# Nova Capital

A Next.js starter matching the supplied Nova Capital landing-page design, with user dashboard and an admin transaction-review workflow.

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Create a Supabase project and put its URL/key values in `.env.local`.
4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. `npm install`
6. `npm run dev`

## Before accepting real money

This starter intentionally does not pretend that a production financial service is ready merely because the UI works. Before launch, add:

- Real authentication and MFA.
- Strict Supabase RLS policies.
- Server-side authorization for every admin action.
- A real payment/banking provider and verified webhook handling.
- Double-entry ledgering rather than editable balances.
- KYC/AML, sanctions screening, record retention, disclosures, and jurisdiction-specific licensing/compliance.
- Idempotency keys and webhook signature verification.
- Immutable audit logging and monitoring.
- Secrets stored only in server-side environment variables.
- Independent security review and production backups.

Never let a browser directly change a user's balance or mark a transaction completed.


## Design system upgrade

- Base theme: `#0B132B`
- Gold accent: `#D4AF37`
- Serif display typography + Inter/Plus Jakarta Sans dashboard typography
- Responsive asset cards and split hero device mockups
- Chart.js portfolio performance chart
- `portfolio_snapshots` persistence for historical valuation data

The dashboard example currently contains a small seed dataset so the chart renders during development. Replace that seed with the `portfolio_snapshots` API/database query before production. Do not accept client-supplied valuation snapshots.

## Authentication setup

The `/login` and `/register` routes use Supabase Auth in the browser. Set these Vercel environment variables for the deployed app:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If email confirmation is enabled in Supabase Auth, add the deployed Vercel URL (and `/auth/callback`) to Supabase Auth URL configuration / redirect URLs. Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
