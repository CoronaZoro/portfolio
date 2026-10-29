# Randy Dawn Tai — Portfolio

Personal portfolio and case studies. Next.js (App Router) on Vercel, with a small password-protected admin for editing profile and project cards and uploading media to Vercel Blob.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Environment variables live in `.env.local` (`vercel env pull`). Project conventions, design tokens and the database schema are documented in [CLAUDE.md](CLAUDE.md).

`node scripts/migrate.js` creates the Postgres tables and seeds any missing project rows.
