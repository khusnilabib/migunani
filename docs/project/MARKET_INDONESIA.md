# Market Strategy — Indonesia-First

> **Status:** Draft v1.0 · **Decided:** 2026-08-02 (resolves D-5)
> **Parent:** `docs/project/FOUNDATION.md`
> **Scope:** How "Indonesia-first" changes the product, not just the language.

---

## 1. The decision

The primary market is **Indonesia**, in **Bahasa Indonesia**, targeting
**marketplace sellers** on Shopee, Tokopedia, TikTok Shop, and Lazada.

Global-English is deferred. It is an expansion after the Phase 3 gate — not a
second track run in parallel. One market, one language, one buyer persona.

### Why this is the right call

- **The seller pain is concrete and repetitive.** A seller uploading 50 SKUs
  needs 50 white-background product photos. Marketplaces reward clean white
  backgrounds with better listing quality. This is a chore, done weekly.
- **Competitors are priced out of this market.** remove.bg's entry tier costs
  more per month than many small sellers' *daily* margin. There is a wide
  price gap between "free with watermark" and "$9/month card subscription"
  that nobody serves well in IDR.
- **You are here.** You understand the marketplace ecosystem, the language,
  the payment habits, and the seller communities. For a solo maintainer this
  is the only defensible distribution advantage available.
- **Browser-side processing is a stronger argument here.** No upload means no
  data quota burned per image and no waiting on a slow uplink — a real,
  felt benefit on Indonesian mobile connections, not an abstract privacy claim.

### What we give up

Lower ARPU per user and a smaller total market than global-English. Accepted
deliberately: a small market you can actually reach beats a large one you
cannot.

---

## 2. Buyer persona

**"Penjual marketplace"** — small to mid-size online seller.

| | |
|---|---|
| Volume | 20–200 product photos per month, bursty (new collection = 50 at once) |
| Device | **Mid-range Android phone**, often the primary work device. Laptop is secondary or absent. |
| Connection | Mobile data, metered. Wi-Fi inconsistent. |
| Current solution | Free tools with watermarks, manual Photoshop/Canva, or paying a freelance editor per batch |
| Price sensitivity | **Very high.** Monthly card subscriptions are culturally unusual for this segment. |
| Trigger to pay | Batch. Doing 50 images one at a time is the pain that opens the wallet. |

The single most important consequence: **this user is on a phone.** Every
technical decision in `FOUNDATION.md` §4 must be re-validated against a
mid-range Android device, not a MacBook.

---

## 3. Pricing — replaces FOUNDATION §5.1

USD subscription pricing is void for this market.

| Tier | Price | Includes |
|---|---|---|
| **Gratis** (guest) | Rp 0, no account | Unlimited single images, full resolution, **no watermark**, browser-side |
| **Akun gratis** | Rp 0 | History, presets, saved settings |
| **Pro bulanan** | **Rp 29.000–49.000/bln** | Batch (drag 50 files), ganti background (putih/warna/gambar), priority server fallback |
| **Paket sekali bayar** | **Rp 15.000–25.000** | e.g. 200 batch images, valid 30 days — **no recurring commitment** |

Two things that matter more than the exact number:

1. **Offer a non-recurring option.** Prepaid/one-off purchases convert far
   better than subscriptions in this segment. A seller preparing one
   collection wants to pay once, not sign up for a monthly charge.
2. **Never watermark free output.** Watermarks are exactly what this user is
   already escaping from. Free single-image use costs us nothing (browser
   inference) and is our entire acquisition channel. **Sell batch, not access.**

### Payments

Card-only checkout will fail here. Required rails, in priority order:

1. **QRIS** — universal, works with every local wallet and bank app
2. **E-wallets** — GoPay, OVO, DANA, ShopeePay
3. **Bank transfer / virtual account** — BCA, Mandiri, BNI, BRI

Practical implication: **Stripe alone is not viable for Phase 3.** Use a local
aggregator (Midtrans, Xendit, or Duitku) as the primary gateway. This is a new
integration item that `FOUNDATION.md` §6 Phase 3 did not account for — budget
for it explicitly.

---

## 4. Technical consequences

Indonesia-first tightens the engineering constraints. These override the
softer targets in `FOUNDATION.md` §4.

### 4.1 Device floor: mid-range Android

| Constraint | Implication |
|---|---|
| **WebGPU is unreliable on Android**, absent on iOS Safari | **WASM SIMD is the primary path, not the fallback.** WebGPU is an opportunistic speedup for desktop users. |
| Limited RAM, aggressive tab eviction | 512×512 model export is mandatory, not a compromise. Tiling for larger images. Free memory aggressively between runs. |
| Thermal throttling on batch | Batch must be sequential with progress and be resumable, not a parallel blast. |

### 4.2 Model size becomes a business metric

Cold-start download over metered mobile data is **the** conversion risk.
A 170 MB download on mobile data is not a slow experience — it is an
abandoned session and a user who resents the data cost.

- **Target: under 50 MB.** This actively favours **ISNet** over the larger
  BiRefNet exports, and re-opens **MODNet (~7 MB)** as a serious candidate for
  a phone-optimised path, given how much of the target volume is product shots
  rather than complex hair.
- Show the download size in MB **before** it starts, in Bahasa, with a plain
  explanation that it happens once.
- Warn on metered connections (`navigator.connection`) before downloading.
- Cache Storage persistence is not an optimisation here; it is the product.

**This sharpens open decision D-1:** model choice is now weighted toward the
smallest acceptable model, not the highest-quality one.

### 4.3 Server fallback is more important than assumed

Some phones will not run inference acceptably at all. The server path
(`FOUNDATION.md` §4.3) moves from "iOS Safari edge case" to **a real segment
of the target market**, and needs metering and abuse limits from day one.

### 4.4 Localisation is not wired yet

`next-intl` is listed in `package.json` but **not configured anywhere** — no
i18n config, no message catalogues, no locale middleware. `src/app/layout.tsx`
hardcodes `<html lang="en">` and `siteConfig.locale` is `'en_US'`.

Phase 1 work item:

- Set `lang="id"`, `siteConfig.locale = 'id_ID'`, and `og:locale`.
- Wire `next-intl` with `id` as the **default** locale.
- Structure routing so `en` can be added later **without changing existing
  URLs** — Indonesian must not sit under an `/id/` prefix if it is the
  default, or the SEO built in Phase 2 will have to be thrown away.
- Translate the remove-background tool UI, its SEO block, and its FAQ.
  The other 22 tools can stay English initially.

---

## 5. SEO and acquisition

Target Indonesian long-tail transactional intent. The head terms are owned by
remove.bg and Canva; the Indonesian long tail is comparatively open.

Priority keywords:

- `hapus background foto online gratis`
- `hapus background foto produk`
- `remove background tanpa watermark`
- `edit foto produk shopee` / `foto produk background putih`
- `hapus background online tanpa upload`

Content that matches the buyer, not the technology:

- *"Cara bikin foto produk background putih untuk Shopee"*
- *"Foto produk yang bikin listing kamu naik"*
- Marketplace-specific size presets — which is a natural bridge to the
  existing `image-resize` and `image-compress` tools already in the repo.

Distribution beyond SEO: seller communities (Facebook Groups, WhatsApp/Telegram
groups, TikTok seller content). These reward a genuinely free tool with no
watermark, which is exactly what §3 provides.

---

## 6. Revised Phase 3 exit gate

`FOUNDATION.md` §6 sets the gate at **25 paying subscribers retained past
month two**. Restated for this market:

> **25 paying customers in a month, retained or repurchased** — counting both
> Pro subscriptions and prepaid packs, at IDR pricing, via local payment rails.

Roughly Rp 750.000–1.200.000/month. The number is small on purpose: it is a
proof of willingness to pay, not a revenue target.

---

## 7. Added open decisions

| # | Decision | Needed by |
|---|---|---|
| ID-1 | Payment aggregator: Midtrans vs Xendit vs Duitku | Phase 3 |
| ID-2 | Prepaid pack, subscription, or both at launch | Phase 3 |
| ID-3 | Domain/brand: Indonesian-language brand or keep neutral English name | Phase 2 |
| ID-4 | Locale routing: `id` at root with `/en/` later, vs `/id/` + `/en/` from the start | **Phase 1 — blocks SEO work** |
| ID-5 | Does MODNet quality suffice for product photos? (would cut model to ~7 MB) | Phase 1 |

ID-4 is the urgent one: getting locale routing wrong means rewriting every
canonical URL after Phase 2 SEO is already indexed.
