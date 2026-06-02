# /DESIGN_SYSTEM.md

# Wild Content Engine — Design System Specification

## Design Principles

The UI should feel:

* modern
* calm
* premium
* minimal
* AI-native
* browser-native
* editorial

Reference quality:

* Linear
* Notion
* Arc
* Vercel
* Perplexity
* Raycast

Avoid:

* enterprise dashboards
* social media creator tools
* noisy interfaces
* heavy visual hierarchy

---

# Product Principles

The product should feel:

Observe
→ Generate
→ Edit
→ Publish

Not:

Configure
→ Configure
→ Configure
→ Generate

Prioritize:

* speed
* readability
* context
* low friction

Avoid:

* long forms
* multi-step wizards
* complex settings

---

# Responsive Breakpoints

```css
xs: 320px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Extension Rules:

* compact layouts
* adaptive side panels
* preserve host page visibility

---

# Token System

## Colors

Use semantic tokens.

```css
--background

--surface

--foreground

--card

--muted

--primary

--secondary

--success

--warning

--destructive

--border

--overlay

--selection

--ai-accent
```

Rules:

* support light mode
* support dark mode
* avoid brand-colored UI

---

# Typography Scale

```txt
12
14
16
18
20
24
32
40
48
```

Rules:

* short reading blocks
* editorial hierarchy
* content-first typography

Prefer:

* 60–75 characters width
* comfortable reading rhythm

Avoid:

* tiny labels
* oversized hero text

---

# Spacing Scale

```txt
4
8
12
16
24
32
48
64
80
```

Rules:

Extension:
compact

Workspace:
comfortable

Generation:
focused

---

# Radius Scale

```txt
sm
md
lg
xl
2xl
full
```

Rules:

Prefer:

* soft radius
* modern containers

Avoid:

* aggressive rounding

---

# Motion System

Motion should feel:

* subtle
* immediate
* intentional

Durations:

```txt
100ms
150ms
200ms
300ms
```

Allowed:

* fade
* scale
* slide

Avoid:

* bounce
* long transitions
* decorative motion

---

# Reusable Components

Required primitives:

Core:

* Button
* Input
* Textarea
* Select
* Card
* Badge
* Tooltip

Containers:

* Container
* Section
* Drawer
* Sheet
* Modal

AI:

* PromptCard
* ContentCard
* SuggestionCard
* InsightCard
* RewriteCard
* ContentPreview

States:

* Skeleton
* LoadingState
* EmptyState
* Alert

Navigation:

* Tabs
* Dropdown
* CommandBar
* ContextMenu

---

# Extension Components

Required:

* Floating Action
* Context Overlay
* Capture Panel
* Browser Drawer
* Inline Toolbar

Rules:

* preserve page context
* avoid blocking interactions

Avoid:

* fullscreen takeovers
* popup chains

---

# Layout Rules

Desktop:

* editorial layouts
* split content panels
* narrow readable columns

Tablet:

* adaptive grids
* collapsible controls

Mobile:

* stacked cards
* bottom sheets
* compressed controls

Extension:

* max width:
  360–420px

---

# Content Presentation

Generated content should:

* remain editable
* preserve source meaning
* support comparison

Prefer:

Before
↓

After

Avoid:

large generated walls of text

---

# Accessibility

Requirements:

* proper contrast
* keyboard navigation
* semantic HTML
* responsive typography
* focus states
* reduced motion support

Extension:

must work without mouse

---

# Scalability

Architecture must support:

* dark mode
* multiple platforms
* browser expansion
* AI workflows
* future dashboard
* collaboration

Avoid:

* hardcoded values
* duplicated styles
* inline styling
* page-specific components

---

# Performance

Prioritize:

* instant interactions
* optimistic UI
* lazy loading

Targets:

Initial load:
<2s

Interaction:
<100ms

AI response:
visible immediately

Avoid:

* unnecessary loaders
* blocking rendering

---

# Empty States

Empty states should:

* educate
* inspire
* guide

Prefer:

* examples
* quick actions
* templates

Avoid:

* blank states

---

# Visual Language

Keywords:

clean

focused

editorial

intelligent

quiet

precise

Not:

playful

gamified

retro

overdecorated

