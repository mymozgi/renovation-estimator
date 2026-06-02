````md id="t8v2nr"
# /USER_FLOW.md

# User Flow

## Step 1 — Landing Page

User opens website.

Main CTA:
“Paste your website URL”

---

## Step 2 — URL Submission

User pastes:

```txt id="x7u3mz"
https://example.com
````

Clicks:
Analyze Website

---

## Step 3 — Analysis Pipeline

Backend:

* loads website
* captures screenshots
* extracts metadata
* analyzes structure
* sends structured context to AI

---

## Step 4 — AI Audit Generation

AI generates:

* UX issues
* conversion issues
* accessibility observations
* trust analysis
* quick wins

---

## Step 5 — Audit Presentation

User receives:

* responsive web report
* categorized findings
* severity indicators
* recommendations
* screenshots

---

## Step 6 — Export

User downloads:

* PDF audit report

Optional:

* shareable link

---

# Mobile Flow

Mobile experience must:

* remain single-column
* prioritize readability
* support touch-friendly actions
* support sticky CTA
* support responsive audit cards

---

# Edge Cases

## Website blocked

Show graceful fallback.

## Broken screenshots

Retry capture.

## Empty pages

Show informative error state.

## JS-heavy websites

Use Playwright rendering.

## Contradicting AI output

Validate structured AI responses.

## Slow websites

Use timeout fallback.

```
```

