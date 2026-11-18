# Demo acceptance verification

Validated with headless Chromium against the running development server. Browser-clock checks advance the actual application interval; they do not replace reducer state. A separate real-time run also completed the full 10.4-second qualification and Reset from Qualified. Screenshots were inspected at 1440, 1024 and 390px. Additional layout checks cover the 820/1240px boundaries.

- [x] Desktop sidebar + three columns; tablet icon rail; mobile tabs default to Chat. No page horizontal overflow at tested widths.
- [x] Initial New lead / Unassigned state, Run AI card, disabled composer, three uncaptured facts.
- [x] All seven messages reveal one per 1300ms tick, alternating typing indicators; facts capture at 2/4/6. The following tick marks Qualified and shows the summary.
- [x] Details assignment and mobile inline assignment produce Human · Alex Morgan, the handoff event, activity entry and enabled composer.
- [x] Enter and Send both work; whitespace is trimmed; empty drafts are ignored; input clears; timestamps start at 9:52 and increment.
- [x] Sarah's inbox preview, time and status update live, including AI and human prefixes.
- [x] Reset after handoff and mid-script restores the initial state. Advancing another 13 seconds produces no stray messages or captured facts. Mobile Reset restores Chat.
- [x] Customer grey/left, AI teal/right and human black/right messages have distinct labels and styling.
- [x] Simulation labels are visible. The flow has no external AI or persistence.
- [x] Mobile Details notification and Sarah-to-Chat selection; tabs support arrow, Home and End keys.
- [x] Reduced motion disables typing/skeleton pulse and slows the spinner. Thread, ownership and status use live regions; composer has a hidden label.
- [x] No browser console errors or uncaught exceptions during the interaction checks.
- [x] `npm run lint` passes with no warnings.
- [x] `npm run typecheck` passes.
- [x] `npm run build` passes after the published network settings enabled Google Fonts. The production server was checked at 1440, 1024 and 390px with Geist and Geist Mono loaded; qualification, handoff, sending and Reset pass without browser errors.

The application retains the requested `next/font/google` integration. Production build and final Geist typography validation are complete. No font mocks or TLS bypasses were used.
