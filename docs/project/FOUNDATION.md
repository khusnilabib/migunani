# Foundation & Direction — Migunani as a Production SaaS

> **Status:** Draft v1.0 · **Owner:** khusnilabib · **Created:** 2026-08-02
> **Scope:** Defines what this project *is*, what it is *for*, and the path from
> "23 scaffolded tools" to "one commercially viable SaaS tool" — starting with
> **Remove Background**.

---

## 0. Why this document exists

The repository currently contains 23 tools, 54 governance documents, and a
complete architectural skeleton — but no answer to the only question that
matters commercially: **who pays, for what, and why here instead of elsewhere.**

The existing `docs/` corpus (BRD, SAD, DDD, Product Constitution…) describes
*how to build correctly*. This document describes *what to build and why*, and
it takes precedence over the aspirational scope in those documents wherever
they conflict. Where the older docs assume "hundreds to thousands of tools",
**this document reduces the active scope to exactly one tool** until that tool
is proven.

---

## 1. Product identity

### 1.1 One-sentence definition

> **Migunani is a privacy-first image utility SaaS. It removes image backgrounds
> in the user's own browser — no upload, no account, no queue — and sells
> volume, resolution, and batch convenience to the people who do it all day.**

### 1.2 What changed from the original premise

| | Original premise | This foundation |
|---|---|---|
| Scope | Hundreds of tools across 4 categories | **One tool**, deepened until profitable |
| Differentiator | "Many free tools in one place" | **Privacy + zero marginal cost per image** |
| Revenue | Ads (AdSense hooks already in code) | **Freemium subscription**, ads secondary |
| Success metric | Tool count | **Paid conversion rate & retention** |

The 22 other tools stay in the repo, stay working, and keep earning SEO
traffic. They are **not** the product. They are the funnel and the moat.

### 1.3 Positioning statement

For **e-commerce sellers, designers, and marketplace listers** who process
image backgrounds repeatedly, Migunani is a **background remover that runs
locally in the browser**. Unlike remove.bg, Photoroom, and Clipdrop — which
upload every image to a server and bill per image — Migunani processes images
on the user's own device, which means **confidential photos never leave the
machine** and **our cost per image is zero**.

That last point is the entire business. Competitors charge roughly
$0.10–0.15 per image at remove.bg's rates and $0.015–0.02 at the cheaper
end. Browser-side inference makes our marginal cost effectively zero, so we
can price a flat subscription that undercuts everyone at volume while
maintaining near-100% gross margin.

---

## 2. Strategic constraints (non-negotiable)

These extend the existing LOCK constraints in `docs/11_ProductConstitution.md`.

| ID | Constraint | Rationale |
|---|---|---|
| **F-01** | Default execution is **browser** (`execution: 'browser'`). Server fallback is opt-in and must be disclosed in the UI. | This is the differentiator *and* the margin. |
| **F-02** | Model weights must carry a **license permitting commercial use**. | See §4.1 — this has already almost gone wrong. |
| **F-03** | A guest can remove a background and download a usable result **without an account**. | Existing LOCK-07. Conversion happens after value, never before. |
| **F-04** | No image bytes are transmitted to our servers in browser mode — not for analytics, not for "quality improvement". | Privacy claim must be literally true and auditable. |
| **F-05** | Ship only what one person can operate. No Kubernetes, no self-hosted GPU fleet, no microservices. | Solo maintainer reality. |
| **F-06** | Scope stays at one tool until the Phase 3 exit criteria in §6 are met. | Prevents the sprawl that produced the current state. |

---

## 3. The single-tool focus: `image-remove-background`

### 3.1 Where it lives

It is a normal tool in the existing engine, not a special case:

```
src/tools/image/remove-background/
├── manifest.ts                 # ToolManifest — the contract
├── index.ts
├── components/
│   ├── InputForm.tsx           # dropzone + model/quality controls
│   ├── ModelLoader.tsx         # first-run weight download + progress
│   └── ResultCanvas.tsx        # checkerboard transparency preview
├── stages/
│   ├── input.ts
│   ├── validation.ts           # reuse ACCEPTED_IMAGE_TYPES / MAX_IMAGE_SIZE
│   ├── processing.ts           # inference orchestration
│   ├── preview.tsx
│   └── download.ts             # PNG / WebP, alpha preserved
└── lib/
    ├── segmenter.ts            # runtime-agnostic inference facade
    ├── backends/
    │   ├── webgpu.ts
    │   ├── wasm.ts             # fallback
    │   └── server.ts           # Phase 2, premium/unsupported devices
    ├── model-cache.ts          # Cache Storage, versioned keys
    └── matting.ts              # alpha refinement, edge feathering
```

The five-stage pipeline, the Zod input/output schemas, the SEO block, and the
analytics funnel all follow `src/tools/image/image-compress/manifest.ts`
verbatim. **Do not invent a new pattern for this tool.**

### 3.2 Manifest deltas from a normal tool

```ts
execution: 'browser',
limits: {
  maxInputSize: 25 * 1024 * 1024,   // matches MAX_IMAGE_SIZE
  maxOutputSize: 50 * 1024 * 1024,
  maxProcessingTime: 120_000,       // model download on cold start
  requiresAuth: false,
  premiumOnly: false,
},
```

Two things the other 22 tools never had to handle, which must be first-class
in the manifest and the UI:

1. **Cold start.** A ~40–170 MB model download before the first result. This
   is the single biggest bounce risk. It needs a real progress UI, a
   "why is this downloading?" explanation, and Cache Storage persistence so it
   happens exactly once per browser.
2. **Capability detection.** WebGPU is unavailable on iOS Safari and older
   browsers. The tool must detect, degrade to WASM, and — if that is also
   unviable — offer the server path with an explicit consent prompt.

### 3.3 Why this tool and not another

- **Proven willingness to pay.** An entire competitive market already exists
  at $9–20/month entry pricing; demand does not need to be validated.
- **Highest privacy salience.** Product photos before launch, ID documents,
  personal photos — "never leaves your device" is a *purchase reason* here,
  unlike for a UUID generator.
- **Structural cost advantage.** Competitors' per-image server cost is our
  zero. No other tool in the repo has this asymmetry.
- **Natural upsell chain.** Remove background → compress → convert to WebP →
  resize for marketplace. Those tools **already exist in this repo**, which
  turns the existing 22 into a genuine bundle rather than filler.

---

## 4. Technical foundation

### 4.1 Model selection — read this before writing any code

This is the highest-risk decision in the project.

| Model | Size (quantised) | License | Commercial SaaS? |
|---|---|---|---|
| BRIA **RMBG-1.4** | ~45 MB | Non-commercial / paid license required | **No — do not ship** |
| BRIA **RMBG-2.0** | larger | Commercial license required | **No** (without paid agreement) |
| **BiRefNet-lite** | ~90–180 MB (512px export) | MIT | **Yes** |
| **ISNet** (imgly weights) | ~40–90 MB | Apache-2.0 / open | **Yes** |
| **MODNet** | ~7 MB | Apache-2.0 (portrait-only) | Yes, narrow use case |

RMBG-1.4 is the model in nearly every tutorial and demo, including the
"just clone the HF space" path. It is **not licensed for a paid product.**
Several public "free alternatives" are quietly built on it.

**Decision: start with ISNet or a BiRefNet-lite export.** Accept slightly
weaker hair/fur edges in v1; that is a quality gap to close, not a legal
liability. Record the final choice, the license text, and the weight file
hash in an ADR before the first commit of inference code.

Practical note from the ecosystem: BiRefNet-lite at 1024×1024 tends to
exhaust WebGPU storage buffers and OOM under WASM; a 512×512 export is the
pragmatic target, with tiling or server-side handling for larger outputs.

### 4.2 Runtime stack

- **Inference:** `onnxruntime-web` (WebGPU primary, WASM SIMD fallback), or
  `transformers.js` if the chosen weights are packaged for it.
- **Threading:** inference in a **Web Worker**. Blocking the main thread for
  several seconds is an instant-abandon experience and will wreck the
  Lighthouse budgets already configured in `.lighthouserc.cjs`.
- **Weight hosting:** serve from **our own domain/CDN**, not a third-party CDN.
  Availability, COEP/COOP headers, and cache control must be under our
  control, and `next.config.ts` already sets a strict CSP that must be
  extended deliberately rather than loosened.
- **Caching:** Cache Storage keyed by `model-id@version`, with explicit
  eviction on version bump.

### 4.3 Server fallback (Phase 2 only)

A single stateless route, `POST /api/tools/remove-background`, running the
same model. Rules: authenticated or rate-limited by IP; image held in memory
only, never written to disk or object storage; response streamed back;
zero retention, stated in the privacy policy. This exists for iOS Safari and
for premium batch jobs — **not** as the default path.

### 4.4 Quality bar for v1

| Dimension | Target |
|---|---|
| Cold start (first ever use, broadband) | < 15 s to first result |
| Warm start (model cached) | < 3 s for a 2 MP image on mid-range laptop |
| Output | PNG with true alpha; WebP alternative; original resolution preserved |
| Edge quality | Clean on product shots and plain-background portraits |
| Known gaps (documented, not hidden) | Fine hair on busy backgrounds; semi-transparent objects |
| Failure behaviour | Explicit message + server-fallback offer, never a blank canvas |

---

## 5. Business foundation

### 5.1 Pricing hypothesis

| Tier | Price | Includes |
|---|---|---|
| **Guest** | Free, no account | Unlimited single images, browser-side, full resolution, no watermark |
| **Free account** | $0 | History, presets, cross-device settings |
| **Pro** | ~$7–9/mo | Batch queue (drag 50 files), background replace (solid/colour/image), API key, priority server fallback |
| **Team** *(later)* | ~$25/mo | Shared presets, seats, higher API quota |

The deliberately generous free tier is the marketing. Because browser
inference costs us nothing, giving away single-image use is free customer
acquisition — the exact opposite of competitors, for whom every free image is
a real server bill. **We sell workflow, not access.** Batch, automation, and
replacement backgrounds are what a professional pays for.

Do not put a watermark on free output. It converts worse than a batch
paywall and destroys the privacy/goodwill positioning.

### 5.2 Target user, ranked

1. **Marketplace / e-commerce sellers** (Shopee, Tokopedia, Etsy, Amazon) —
   highest volume, clearest pain, already paying someone.
2. **Freelance designers & social media managers** — value privacy and speed.
3. **Everyone else** — SEO traffic, free tier, occasional conversion.

### 5.3 Acquisition

SEO is the only channel a solo maintainer can afford, and the repo is already
built for it: per-tool canonical URLs, JSON-LD, OG images, sitemap, RSS,
FAQ blocks. Target long-tail transactional intent — *"remove background
without uploading"*, *"free background remover no signup"*, *"hapus background
foto produk online"* — rather than the head term, which is owned by
remove.bg and Canva.

The 22 existing tools are the SEO surface area that makes the domain
credible. Keep them alive; do not invest new features in them.

### 5.4 Unit economics

Browser mode: **$0 marginal cost.** Costs are hosting (Vercel), the CDN
bandwidth for model weights (one download per user per version), and Supabase.
Server fallback is the only variable cost and must be metered per user and
capped. A Pro subscriber must never be able to run an unbounded server bill.

---

## 6. Roadmap — phase gates, not dates

Each phase has an **exit criterion**. Do not start the next phase until it is
met. This is the mechanism that prevents a repeat of the current sprawl.

### Phase 0 — Foundation cleanup *(mostly done)*
Remove artefacts, untrack secrets, add root README, decide Prisma vs Drizzle,
add CI running `bun run verify`, and fix the tool-runtime input-stage bug
recorded in `worklog.md` — the pipeline this tool depends on must be sound.

**Exit:** green CI on every push; `bun run verify` passes locally.

### Phase 1 — Remove Background, browser-only MVP
Model chosen and licensed (§4.1, ADR written). Worker-based inference,
WebGPU + WASM, cached weights, progress UI, PNG/WebP alpha download,
capability detection with honest messaging. Integration + E2E tests matching
the coverage of the existing 23 tools.

**Exit:** a stranger on a mid-range laptop removes a background and downloads
a usable PNG in under 15 s cold / 3 s warm, with no console errors, on
Chrome, Edge, Firefox, and Safari desktop.

### Phase 2 — Make it real
iOS/Safari server fallback with consent. Accounts + history (Supabase, already
scaffolded). Analytics on the real funnel: `tool_viewed → model_loaded →
processing_completed → download_completed`. Public launch, SEO pages,
comparison content.

**Exit:** 1,000 completed background removals by people you did not
personally contact, and a measured cold-start abandonment rate below 40%.

### Phase 3 — Monetise
Batch queue. Background replacement (solid, colour, image). Stripe, Pro tier,
paywall placed strictly *after* first value. API keys for the Pro tier.

**Exit — and the gate for touching any second tool:**
**25 paying subscribers retained past month two.**

### Phase 4 — Expand deliberately
Only after Phase 3. The next tool is chosen by *what Pro subscribers ask for*
— most likely image upscaling or a marketplace-preset resizer — not by what
is easy to build.

---

## 7. Metrics that matter

Track four numbers. Ignore the rest.

| Metric | Why | Phase 2 target |
|---|---|---|
| **Model-load completion rate** | The cold-start cliff; the #1 killer of this product | > 60% |
| **Tool completion rate** (viewed → downloaded) | Does it actually work for real users? | > 35% |
| **Week-4 return rate** | Utility vs. novelty | > 15% |
| **Free → Pro conversion** | The business | > 1.5% (Phase 3) |

Tool count, test count, and documentation count are **not** success metrics.
The repo already maximised all three and it did not produce a product.

---

## 8. Explicit non-goals

- A general-purpose image editor.
- A mobile app.
- Self-hosted GPU inference.
- Training or fine-tuning our own segmentation model.
- Any new tool before the Phase 3 gate.
- Enterprise/SSO/on-prem.

---

## 9. Open decisions

| # | Decision | Needed by |
|---|---|---|
| D-1 | Final model + license (ISNet vs BiRefNet-lite) — write the ADR | Phase 1 start |
| D-2 | `onnxruntime-web` directly vs `transformers.js` | Phase 1 start |
| D-3 | Prisma or Drizzle — pick one, delete the other's deps | Phase 0 |
| D-4 | Keep AdSense hooks, or remove ads entirely to protect positioning | Phase 2 |
| ~~D-5~~ | ~~Primary market~~ → **RESOLVED 2026-08-02: Indonesia-first.** See §11 and `MARKET_INDONESIA.md`. | — |
| D-6 | Slug: `remove-background` vs `image-background-remover` (SEO) | Phase 1 start |

---

## 10. Market decision: Indonesia-first

**Decided 2026-08-02.** The primary market is **Indonesia**, in Bahasa
Indonesia, aimed at marketplace sellers (Shopee, Tokopedia, TikTok Shop,
Lazada). Global-English is a later expansion, not a parallel effort.

This is not only a translation decision — it changes pricing, SEO, payments,
and the device performance floor. Details and the execution plan are in
**`docs/project/MARKET_INDONESIA.md`**. The three consequences that bind
other sections of this document:

- **§5.1 pricing is void for this market.** A $7–9/mo card subscription does
  not convert in Indonesia. Replaced by IDR pricing with local payment rails
  (see `MARKET_INDONESIA.md` §3).
- **§4.4 quality bar gets a harder device floor.** The target user is on a
  mid-range Android phone, not a laptop. WASM — not WebGPU — is the realistic
  primary path, which makes model size a conversion metric, not a detail.
- **§3.1 `execution: 'browser'` becomes a stronger selling point,** because it
  also means *works on slow connections after first load* and *no data quota
  burned per image* — arguments that matter more here than in the US.

---

## 11. Relationship to existing documentation

- **Supersedes** the scope and tool-count ambitions in `docs/00_Project_Charter.md`,
  `docs/01_BRD.md`, `docs/37_MVPImplementationPlan.md`, and the sprint/backlog docs.
- **Inherits and respects** the LOCK constraints of `docs/11_ProductConstitution.md`,
  the manifest contract in `docs/12_ToolManifestSpecification.md`, the coding
  standards, the testing strategy, and the design system.
- The 54 documents in `docs/` remain the *how*. This document is the *what* and
  the *why*. On conflict, this document wins on scope and priority; they win on
  implementation convention.
