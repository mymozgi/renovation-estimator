````md id="f4r8wm"
# /TESTING.md

# Testing Specification

## Testing Philosophy

The product must prioritize:
- reliability
- predictable AI output
- responsive UX
- stable rendering
- resilient integrations

Testing should cover:
- frontend
- backend
- AI pipeline
- screenshot generation
- PDF generation
- responsive layouts
- edge cases

---

# Testing Stack

Frontend:
- Vitest
- React Testing Library
- Playwright

Backend:
- Pytest

E2E:
- Playwright

---

# Frontend Tests

## Components

Test:
- rendering
- responsive behavior
- loading states
- error states
- accessibility

---

# Required Component Tests

## Button
- variants render correctly
- disabled state works
- loading state works

---

## URL Input
- validation works
- invalid URL rejected
- empty state handled

---

## Audit Cards
- severity labels render
- expandable content works
- mobile responsiveness works

---

## Loading Skeletons
- render during async states
- removed after completion

---

# Responsive Tests

Test:
- mobile layouts
- tablet layouts
- desktop layouts

Breakpoints:

```txt id="y8u5pl"
320px
640px
768px
1024px
1280px
1536px
````

Verify:

* no horizontal scrolling
* readable typography
* responsive spacing
* stacked layouts on mobile

---

# Backend Tests

## URL Validation

Test:

* valid URLs accepted
* invalid URLs rejected
* malformed domains rejected

---

## Screenshot Pipeline

Test:

* screenshot generation
* mobile screenshots
* timeout handling
* broken website handling

---

## Metadata Extraction

Verify:

* title extraction
* description extraction
* HTML parsing

---

# AI Pipeline Tests

## Structured Output Validation

Verify AI returns:

```json
{
  "summary": "",
  "ux_issues": [],
  "conversion_issues": [],
  "accessibility_issues": [],
  "trust_issues": [],
  "quick_wins": [],
  "priority_recommendations": []
}
```

---

# AI Quality Rules

AI must NOT:

* hallucinate traffic metrics
* invent conversion data
* fabricate analytics
* generate generic filler advice

---

# AI Consistency Tests

Verify:

* actionable recommendations
* concise language
* severity classification
* observable critique only

---

# PDF Export Tests

Verify:

* PDF generates successfully
* typography preserved
* screenshots rendered
* sections ordered correctly
* page breaks handled properly

---

# PDF Layout Tests

Test:

* multi-page reports
* mobile findings section
* recommendation cards
* large screenshots

Avoid:

* broken layouts
* overflow issues
* cut-off text

---

# Accessibility Tests

Verify:

* keyboard navigation
* focus states
* semantic HTML
* proper contrast
* aria labels where needed

Use:

* axe-core

---

# End-to-End Tests

## Full Audit Flow

Test:

1. User opens app
2. User submits URL
3. Screenshot generation completes
4. AI report generated
5. Report renders correctly
6. PDF export works

---

# Error Handling Tests

## Website unavailable

Show graceful error.

---

## Slow website

Show timeout fallback.

---

## Screenshot failure

Retry capture.

---

## AI timeout

Show retry state.

---

## Invalid AI response

Fallback to safe parser.

---

# Performance Tests

Verify:

* fast initial load
* optimized screenshots
* acceptable AI response times
* smooth report rendering

Targets:

```txt id="u9d3ca"
Landing page < 2s
Audit generation < 60s
PDF export < 10s
```

---

# Security Tests

Verify:

* input sanitization
* URL validation
* rate limiting
* safe file handling
* API key protection

---

# Browser Testing

Test:

* Chrome
* Safari
* Firefox
* Edge

---

# Mobile Device Testing

Test:

* iPhone
* Android
* tablet layouts

---

# Regression Tests

Critical flows:

* URL submission
* report generation
* PDF export
* responsive layouts

Must remain stable after updates.

---

# QA Checklist

## Frontend

* [ ] Responsive layouts work
* [ ] Components render correctly
* [ ] Error states handled
* [ ] Loading states smooth
* [ ] Accessibility passes

---

## Backend

* [ ] URL validation works
* [ ] Screenshot pipeline stable
* [ ] AI responses validated
* [ ] APIs return structured data

---

## AI

* [ ] No hallucinated metrics
* [ ] Recommendations actionable
* [ ] Severity labels correct
* [ ] Output concise

---

## PDF

* [ ] Export works
* [ ] Layout clean
* [ ] Typography preserved
* [ ] Screenshots visible

---

## E2E

* [ ] Full audit flow works
* [ ] Mobile flow works
* [ ] Error handling works
* [ ] Performance acceptable

```
```

