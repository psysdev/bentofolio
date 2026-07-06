# BentoFolio

A terminal‑themed, bento‑grid portfolio generator. Point it at your GitHub profile and get a beautiful developer portfolio in seconds.

```bash
npx bentofolio init my-portfolio --github your-username
cd my-portfolio
npm run dev
```

---

## What it looks like

A dark‑mode, hacker‑terminal aesthetic with:

- **Bento grid** — Responsive 3‑column layout → single column on mobile
- **Typing effect** — Terminal typewriter on the hero section
- **Liquid bubble hover** — Cursor‑tracking glow that scales cards
- **Build log feed** — Tabbed "all / shipped / log" with animated transitions
- **Project cards** — Auto‑imported from your GitHub repos
- **Status widget** — Clickable status cycler with spring physics

## Commands

| Command | What it does |
|---|---|
| `npx bentofolio init <dir>` | Scaffold a new portfolio with placeholder content |
| `npx bentofolio init <dir> --github <handle>` | Scaffold and auto‑fill from a GitHub profile |
| `cd <dir> && npm run dev` | Start the dev server |

## GitHub import

When you use `--github`, BentoFolio fetches:

- **Profile** — name, avatar, bio, location, social links
- **Top repos** — sorted by stars, excluding forks
- **Metadata** — languages, topics, descriptions

Everything goes into `src/config/profile.ts`. Edit it anytime.

## Customization

The whole layout is driven by `src/config/profile.ts`:

- **`profile`** — Your name, bio, links, projects, feed entries
- **`navCards`** — The three navigation cards (Thoughts / Projects / Resume)
- **`layoutConfig`** — Grid positions and sizes of each widget

Add a widget: drop it in `src/components/widgets/`, add it to `widgetMap` in `BentoGrid.tsx`, and reference it from `layoutConfig`.

## Architecture

```
src/
├── config/profile.ts       ← Single source of truth
├── components/
│   ├── grid/BentoGrid.tsx  ← CSS grid engine
│   ├── widgets/            ← HeroWidget, FeedWidget, ProjectCard, StatusWidget
│   └── ui/                 ← CardHover, LiquidBubble, TypingEffect, GlowEffect, TextReveal
└── app/                    ← Next.js App Router pages
```

## Tech

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

## License

MIT © 2026 BentoFolio
