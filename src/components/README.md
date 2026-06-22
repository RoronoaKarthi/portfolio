# Interactivity pass — setup

**1. Add one new file:** drop `hooks/useInteractive.jsx` into `src/hooks/useInteractive.jsx`
(create the `hooks` folder if it doesn't exist).

**2. Replace your existing files:** drop everything in `components/` into your
`src/components/` folder, overwriting the originals.

No new npm packages needed — everything builds on `gsap` and `@gsap/react`,
which your project already uses.

## What's new in `useInteractive.jsx`
- `useMagnetic` / `<MagneticButton>` — element drifts toward the cursor, snaps back on leave.
- `useTilt` / `<TiltCard>` — 3D perspective tilt + a spotlight glow that tracks the cursor.
- `<CursorAura>` — a soft ambient glow blob that follows the cursor through a section.
- `revealOnScroll` — small scroll-trigger helper (most sections use inline GSAP instead, for finer control).
- Every hook checks `prefers-reduced-motion` and no-ops if it's set.

## What changed per section
- **Navbar** — magnetic logo & hamburger, click-punch on every link and CTA.
- **Hero** — magnetic CTAs and social links, click-punch on the scroll indicator (the cinematic frame-scrub and cursor-reveal were already there).
- **About** — full scroll-reveal added (header, bio, cards, tools, education, CTA), tilt + spotlight on the info cards, magnetic résumé button, bouncier tool-icon hover.
- **Services** — tilt + spotlight on service cards, magnetic résumé link, click-punch on "Learn More."
- **Work** — subtle tilt on project images and certification cards, magnetic "View Code" link.
- **Contact** — full scroll-reveal added, ambient cursor-follow aura, focus micro-interactions on form labels/inputs, magnetic submit button + contact rows, animated success banner.
- **Footer** — scroll-reveal on each column, magnetic social icons & CTA, hover-lift on tech tags, click-punch on nav links.
