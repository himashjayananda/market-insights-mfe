## Market Insights MFE (Module Federation Monorepo)

A Vite + React micro‑frontend system using Module Federation. The `host-app` composes multiple remote MFEs: `overview-remote`, `financials-remote`, and `news-remote`. A shared UI library lives under `packages/ui`.

### Repository layout

- **apps/**
  - **host-app/**: Shell application that routes and loads remote MFEs.
  - **overview-remote/**: Company overview and daily time‑series charts.
  - **financials-remote/**: Income statement, balance sheet, and cash‑flow tables.
  - **news-remote/**: News and sentiment feed.
- **packages/**
  - **ui/**: Internal design system (MUI‑based) packaged as `@market-insights/ui`.

### Tech stack

- React 19, React Router
- Vite 7 with `@originjs/vite-plugin-federation`
- TanStack Query 5 for data fetching/caching
- MUI + Emotion in `@market-insights/ui`
- TypeScript 5

### Prerequisites

- Node 20+ recommended
- pnpm 9+ (`npm i -g pnpm`)

### Installing dependencies

This repo does not define a root workspace manifest. Install per app/package:

```bash
cd apps/host-app && pnpm i
cd ../overview-remote && pnpm i
cd ../financials-remote && pnpm i
cd ../news-remote && pnpm i
cd ../../../packages/ui && pnpm i && pnpm build && pnpm pack
```

Notes:

- Apps consume `@market-insights/ui` via a prebuilt tarball: `packages/ui/market-insights-ui-1.0.0.tgz`.
- If you modify `packages/ui`, rebuild and repack to refresh the tarball, then reinstall in each app if needed.

### Running locally

Each app exposes the standard Vite scripts:

- **Dev**: `pnpm dev`
- **Build**: `pnpm build`
- **Preview** (serve built assets): `pnpm preview`
- **Lint**: `pnpm lint`

Typical workflow in separate terminals:

```bash
# UI library (only when developing the library)
cd packages/ui && pnpm i && pnpm build

# Remotes
cd apps/overview-remote && pnpm i && pnpm dev
cd apps/financials-remote && pnpm i && pnpm dev
cd apps/news-remote && pnpm i && pnpm dev

# Host (last, after remotes are available)
cd apps/host-app && pnpm i && pnpm dev
```

Then open the host URL printed by Vite (typically `http://localhost:5173`).

### Module Federation overview

- The host uses Vite Module Federation to dynamically load remote components at runtime.
- Each remote publishes a `remoteEntry.js` (see each app’s `dist/assets/remoteEntry.js`).
- Shared dependencies are configured so React, React DOM, TanStack Query, and the UI kit are singletons across MFEs.

High‑level responsibilities:

- **host-app**: routing, composition, and cross‑app state/providers.
- **overview-remote**: company profile, price/time‑series charts.
- **financials-remote**: financial statement views (mocked JSON under `src/mocks/`).
- **news-remote**: news and sentiment UI (mocked JSON under `src/mocks/`).
- **@market-insights/ui**: shared theming, components, icons, and charts.

### Building for production

Build each remote and then the host:

```bash
cd apps/overview-remote && pnpm build
cd apps/financials-remote && pnpm build
cd apps/news-remote && pnpm build

cd apps/host-app && pnpm build && pnpm preview
```

The `dist/` folders in each app will contain production assets. The host references each remote’s `remoteEntry.js` per its federation config.

### Troubleshooting

- If the host cannot load a remote, ensure the remote’s dev server is running or that you built the remote before running the host preview.
- After changing `packages/ui`, run `pnpm build && pnpm pack` inside `packages/ui` to regenerate the tarball, then reinstall in apps if necessary.
- Version or port conflicts: stop other Vite servers and retry; confirm ports in each app’s `vite.config.ts`.

### License

MIT (or project‑specific). Update as needed.
