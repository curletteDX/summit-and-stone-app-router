# Summit & Stone (Uniform + Next.js App Router)

A teaching project for connecting a Next.js 16 App Router site to Uniform with the `@uniformdev/next-app-router` SDK. The site is a fictional outdoor-gear shop.

## Where to start

- [docs/architecture.md](docs/architecture.md) - five short diagrams of how Uniform and Next.js fit together.
- [docs/uniform-app-router-guide.md](docs/uniform-app-router-guide.md) - the step-by-step build, including the `HeroSection` exercise.

## Steps (git tags)

| Tag | What it contains |
|---|---|
| `step-1-hardcoded-site` | The finished hardcoded site, with no Uniform. |
| `step-2-uniform-plumbing` | Uniform connected: middleware routing, preview, playground. `page` is mapped; `heroSection` is left as the exercise. |

The hardcoded reference site stays available at `/static` in step 2.

## Run it

Requires Node.js 22 or newer and `pnpm`.

```bash
pnpm install
pnpm dev
```

Create a `.env` file (it is gitignored):

```bash
UNIFORM_API_KEY=...            # needs "Read Published Compositions" permission
UNIFORM_PROJECT_ID=...
UNIFORM_PREVIEW_SECRET=hello-world
```

Then open [http://localhost:3000/static](http://localhost:3000/static) for the reference site. `/` shows the Uniform home page once you have published one (see Step 4 of the guide).
