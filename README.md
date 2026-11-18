# Relay CRM

Single-screen concept demo built with Next.js App Router, TypeScript, Tailwind CSS v4, and React `useReducer`. All data and messages are local; the AI is a labelled simulation.

## Develop

Requires Node.js 20.9+ (validated with Node 24) and npm.

```sh
npm ci
npm run dev
```

The only application route is `/`. No credentials or environment variables are needed. `next/font/google` downloads Geist and Geist Mono during compilation, so the build machine must allow HTTPS to `fonts.googleapis.com` and `fonts.gstatic.com`. Fonts are subsequently self-hosted by Next.js.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Implementation

- `app/globals.css`: exact brief tokens, Tailwind theme, responsive layouts, animation and reduced motion.
- `components/relay/demo-data.ts`: scripted messages, leads, qualification facts, and stage-driven copy maps.
- `components/relay/state.ts`: guarded transitions, trimmed sends, demo timestamps, and initial state.
- `components/relay/RelayDemo.tsx`: reducer and 1300ms timer lifecycle; reset clears the timer immediately.
- Panel components and `ui/`: navigation, inbox, conversation, details, and shared primitives.

Desktop uses a 224px sidebar, 320px inbox and 340px details panel. At tablet widths these become 64/288/300px. Below 820px the panels use keyboard-accessible tabs with Chat selected initially. Narrow conversation headers wrap ownership onto a second line to prevent collisions. Other navigation items and background leads are display-only. Search is intentionally read-only, as specified by the brief.

## Verification

See [QA.md](QA.md) for the acceptance checklist and the current environment limitation.
