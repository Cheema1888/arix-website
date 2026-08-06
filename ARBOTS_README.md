# Arbots X Subsite

## Routes

- `/arbots` — product landing page
- `/arbots/team` — team and parent-brand page

## Architecture

The Arbots experience is a nested Next.js subsite inside the existing ARIX application. Its layout supplies dedicated Arbots navigation, footer, metadata, and a fully isolated dark visual system. Existing ARIX pages keep their own navigation and theme.

Reusable components:

- `ArbotsChrome.tsx` — product navigation and footer
- `ArbotsRobot.tsx` — animated expression-driven robot
- `ArbotsReveal.tsx` — Framer Motion scroll reveals
- `arbots.css` — isolated responsive design system

The product and team pages keep editable content arrays close to the page that renders them. Team placeholders can be replaced without changing the card component structure.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000/arbots`.

## Validation

```bash
npm run build
npm run vercel-build
```

## Deployment

The repository is connected to Vercel. Pushing `main` publishes changes automatically. The current public route is available under the existing deployment at `/arbots`. To use `arix.pk/arbots`, add `arix.pk` to the same Vercel project and point the domain DNS records to Vercel.

## Assets

No external product imagery is required for the current build. The hero robot, expressions, grids, lighting, and product-detail illustrations are code-native. Optional render and video prompts are in `ASSET_PROMPTS.md`.
