# Deployment notes

This repository is a Next.js app (app router). Below are quick instructions to get a stable public preview and how to swap the Clippy asset.

## Quick CI

- A GitHub Actions workflow `CI` runs on pushes to `main` and PRs and will execute `npm ci` and `npm run build`.

## Stable deployment options

- Vercel: recommended for Next.js. Connect the repo to Vercel and set `NODE_ENV=production`. Vercel will automatically detect Next and build.
- Netlify: supported via static export or adapter; provide a build command `npm run build` and a publish directory of `.next` (or use Vercel for simplest integration).

## Setting up deploy via GitHub Actions (optional)

You can add an additional workflow to build and deploy to a provider using secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID) or NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID. I can scaffold that workflow if you'd like.

## Clippy asset canonicalization

- The code now prefers `/images/clippy-1.png` as the primary Clippy asset (fallbacks: `/images/clippy.png`, `/brand/clippy.png`, `/images/icons/clippy-1.png`).
- To replace Clippy with your final transparent PNG, upload the file to `public/images/clippy-1.png` (keep the same filename). That will be used automatically.
- If you prefer a different canonical path, tell me and I will update the code to point to your chosen path.

## Notes

- The CI workflow is non-blocking for lint errors by default (lint step returns success even if failing). Adjust `ci.yml` if you want strict lint gating.
