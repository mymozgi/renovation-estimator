# ACCESSIBILITY WIDGET

Goal:

Add a persistent accessibility control widget that lets users adjust font size, contrast, and font family — without page reload, without an account, persisted across sessions.

---

## What it does

Three independent controls:

| Control        | Options                                              | Default  |
|----------------|------------------------------------------------------|----------|
| Font size      | Small (14px) · Normal (16px) · Large (19px) · XL (22px) | Normal   |
| Contrast       | Normal · High contrast · Inverted                    | Normal   |
| Font family    | System sans · Readable (Georgia) · Dyslexia-friendly (OpenDyslexic) | System   |

Each control is independent. Preferences saved to `localStorage` and applied on page load via a `<script>` in `<head>` (no flash of unstyled content).

---

## No external plugin needed

Do not use third-party accessibility overlays (AccessiBe, UserWay, EqualWeb, etc.).
Reasons: they are slow (~200 KB+), privacy-invasive, and legally controversial.

Build it natively using:

* CSS custom properties (`--a11y-font-size`, `--a11y-contrast`, `--a11y-font-family`)
* Tailwind CSS variable overrides via `data-a11y-*` attributes on `<html>`
* `localStorage` for persistence
* One lightweight React component (~80 lines)

---

## Placement

### Mobile (< 768px)

* Floating round button — bottom-right corner, 56×56px, thumb-reachable zone
* Icon: `Accessibility` (lucide-react) or `Aa`
* Tap opens a **bottom sheet** that slides up from the bottom edge
* Bottom sheet height: auto, max 60vh, rounded top corners
* Sheet has a drag handle and closes on outside tap or swipe down
* Controls stack vertically in the sheet

```
┌──────────────────────────┐
│  [drag handle]           │
│                          │
│  Font size               │
│  [S] [M●] [L] [XL]       │
│                          │
│  Contrast                │
│  [Normal●] [High] [Inv]  │
│                          │
│  Font                    │
│  [System●] [Read] [Dys]  │
│                          │
│  [Reset to defaults]     │
└──────────────────────────┘
         ▲ slides up
```

### Desktop (≥ 768px)

* Same floating button — bottom-right corner
* Click opens a **side panel** that slides in from the right edge
* Panel width: 280px, full viewport height
* Panel has a close button (×) at top-right
* Controls stack vertically with more breathing room

```
                     ┌──────────────┐
                     │ Accessibility│×
                     │──────────────│
                     │ Font size    │
                     │ ○ S ● M ○ L  │
                     │              │
                     │ Contrast     │
                     │ ● Norm ○ Hi  │
                     │              │
                     │ Font family  │
                     │ ● Sys ○ Read │
                     │              │
                     │ [Reset]      │
                     └──────────────┘
```

---

## Implementation plan

### Step 1 — CSS foundation

Add to `globals.css`:

```css
/* Accessibility overrides applied via data attributes on <html> */
[data-a11y-size="large"]  { font-size: 119% !important; }
[data-a11y-size="xl"]     { font-size: 137% !important; }
[data-a11y-size="small"]  { font-size: 87% !important; }

[data-a11y-contrast="high"] {
  --background: #FFFEF5;
  --foreground: #000000;
  --muted: #444444;
  --border: #888888;
  filter: contrast(1.15);
}
[data-a11y-contrast="inverted"] {
  filter: invert(1) hue-rotate(180deg);
}

[data-a11y-font="readable"]  { font-family: Georgia, serif !important; }
[data-a11y-font="dyslexic"]  { font-family: 'OpenDyslexic', sans-serif !important; }
```

### Step 2 — Anti-FOUC script

In `[locale]/layout.tsx`, inject before `<body>`:

```html
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    var s = localStorage.getItem('a11y') || '{}'
    var p = JSON.parse(s)
    var h = document.documentElement
    if (p.size)     h.setAttribute('data-a11y-size', p.size)
    if (p.contrast) h.setAttribute('data-a11y-contrast', p.contrast)
    if (p.font)     h.setAttribute('data-a11y-font', p.font)
  })()
`}} />
```

### Step 3 — React widget component

`src/components/AccessibilityWidget.tsx`

* reads/writes `localStorage` key `a11y`
* applies `data-a11y-*` attributes to `document.documentElement`
* uses `useState` for open/closed state
* uses `useEffect` to load saved preferences on mount
* no external dependencies beyond lucide-react

### Step 4 — Font loading

For OpenDyslexic (dyslexia-friendly font):

* Add to `layout.tsx`: `<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/opendyslexic" />`
* Font is loaded lazily — only renders when user selects it
* No performance impact on default users

### Step 5 — Integration

* Add `<AccessibilityWidget />` to `[locale]/layout.tsx` — renders globally on every page
* Position: `fixed bottom-5 right-5 z-40`
* Widget must not cover the bottom footer CTA — offset if needed

### Step 6 — i18n

Add to all `messages/*.json`:

```json
"a11y": {
  "open": "Accessibility",
  "fontSize": "Font size",
  "contrast": "Contrast",
  "font": "Font",
  "reset": "Reset to defaults",
  "sizes": { "small": "S", "normal": "M", "large": "L", "xl": "XL" },
  "contrasts": { "normal": "Normal", "high": "High contrast", "inverted": "Inverted" },
  "fonts": { "system": "System", "readable": "Readable", "dyslexic": "Dyslexia-friendly" }
}
```

---

## What NOT to use

* ❌ AccessiBe, UserWay, EqualWeb — slow, privacy issues, legally risky
* ❌ `filter: grayscale()` as a contrast option — reduces readability
* ❌ Overlay libraries over 50 KB
* ❌ Requiring a user account to save preferences

---

## Mobile UX rules

* Button must stay in the safe area (above iOS home indicator) — use `pb-safe` or `bottom-6`
* Bottom sheet must not conflict with the wizard sticky footer CTA
* On wizard pages: raise the floating button above the footer (use `bottom-24` when footer is visible)
* Drag-to-dismiss on the bottom sheet (touch event on drag handle)
* Sheet backdrop: semi-transparent overlay that closes the sheet on tap

---

Output:

AccessibilityWidget component, CSS foundation in globals.css, anti-FOUC script, OpenDyslexic font, i18n keys in all 5 locales

Validation:

* font size changes apply immediately without page reload
* contrast mode renders correctly on landing, wizard, and report
* OpenDyslexic loads and applies only when selected
* preferences survive page reload
* widget does not overlap the sticky CTA on mobile
* widget closes on outside tap (mobile) and × button (desktop)
