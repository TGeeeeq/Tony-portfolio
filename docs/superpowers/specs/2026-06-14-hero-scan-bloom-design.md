# Hero portrait: scan-driven nature bloom

**Date:** 2026-06-14
**Status:** Approved

## Problem

The hero portrait's current reveal animation looks amateurish: a continuous
scan bar loops independently of a single vine + 7 leaves that grow on
hover. The scanner and the "nature" effect are unrelated, and the botanical
art is too sparse to read as intentional.

## Vision

User clicks the portrait → a horizontal scanner line sweeps top→bottom →
**behind the line** the photo warms from cold grayscale to colour, the gold
"code" HUD dissolves, and the figure is progressively clothed in a lush,
blooming natural mask (vines, leaves, gold-green flowers). A second click
sends the scanner back up and the growth recedes in reverse.

Decisions (confirmed with user):
- **Behaviour:** click toggles; second click reverses smoothly.
- **Density:** lush — covers much of the figure incl. a hint over the face.
- **Code vs nature:** nature overtakes the code HUD behind the line.
- **Flower palette:** brand gold `#d4a45a` + green `#7fb069`.

## Architecture

### Single driver: `--reveal` (0 → 1)

One registered, animatable custom property drives **every** visual, so the
whole effect is perfectly synchronised and reverses for free.

```css
@property --reveal { syntax: '<number>'; inherits: true; initial-value: 0; }
```

`.is-active` transitions `--reveal` 0→1 over ~2.4s with an ease that slows
mid-sweep (over the face). Each visual is a pure function of `--reveal`:

- **Scan line:** `top: calc(var(--reveal) * 100%)`.
- **Colour wipe:** two stacked photos — base (cold grayscale) and a live
  (saturated) copy on top, revealed by `clip-path: inset(0 0 calc((1 - var(--reveal)) * 100%) 0)`.
- **Code → nature frontier:** gold HUD grid clipped to the region *below* the
  line; green growth clipped/faded to the region *above*.
- **Leaves/flowers:** each element carries an inline `--at` (the reveal value
  at which the line crosses it). Its opacity/scale = `clamp()` of
  `(var(--reveal) - var(--at))`, so it blooms exactly as the line passes and
  wilts in reverse.

**Fallback:** browsers without `@property` skip the smooth tween and snap to
the end state on toggle — degraded but not broken.

### Botanical mask as data

A `BOTANICALS` array of `{ x, y, rot, scale, at, type }` (leaf | flower | bud)
is mapped to SVG. ~24 leaves, 6–7 flowers, a few buds, 3–4 vine stems rising
from the bottom/sides, distributed across the whole frame including shoulders
and a hint over the face. Idle `sway` only; disabled under reduced motion.

### Components

- **`HeroPortrait.jsx`** (new): the photo + scanner + botanical mask widget,
  extracted from `Hero.jsx` to keep both focused.
- **`Hero.jsx`**: renders text column + `<HeroPortrait />`.
- **`mock.js`**: add `bloomHint` string per language (cs/en/ru/es).
- **`index.css`**: replace the hover-reveal rules with the `--reveal`-driven
  system; register `@property`.

## UX

- `cursor: pointer` + a small mono `bloomHint` ("CLICK TO SCAN") that fades on
  activation.
- Touch: tap toggles; one-time auto-play when scrolled into view (kept).
- `prefers-reduced-motion`: no sway, no tween — clean state switch only.

## Out of scope

- Changing the photo asset, layout, or the text column.
- Backend / i18n beyond the one new `bloomHint` string.
