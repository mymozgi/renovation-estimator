# /PRD.md

# Renovation Estimator

## Overview

Responsive web application that helps homeowners estimate renovation budgets.

Users configure rooms, select renovation quality and receive a realistic renovation budget estimate.

The system calculates:

* materials
* preparation work
* labor work
* supporting materials
* regional pricing adjustments
* total renovation estimate range

Users receive:

* renovation estimate preview
* room-by-room breakdown
* downloadable PDF report

Primary output:

Renovation budget confidence.

---

# Core Value Proposition

Estimate renovation costs in under 10 minutes.

Help users understand approximately how much renovation may cost before starting.

Target estimate precision:

±10–15%

---

# Target Audience

Primary:

* apartment owners
* homeowners
* first-time renovators
* users planning renovation

Secondary:

* DIY renovation users

Excluded from MVP:

* contractors
* construction companies
* architects

---

# User Flow

Landing

→ Property Setup

→ Add Rooms

→ Configure Geometry

→ Configure Surface Preparation

→ Select Finish Types

→ Generate Estimate

→ Preview Estimate

→ Generate PDF

→ Download Report

---

# MVP Features

## Property Setup

User selects:

* apartment / house
* city
* renovation type

Purpose:

Apply regional labor pricing.

---

## Room Configuration

User inputs:

* room count
* width
* length
* ceiling height
* windows
* doors

System calculates:

* wall area
* floor area
* ceiling area

---

## Surface Preparation

Wall condition:

* ready
* primer needed
* putty needed
* full preparation

Floor condition:

* ready
* leveling needed

System estimates:

* preparation materials
* preparation labor

---

## Finish Selection

Walls:

* paint
* wallpaper
* decorative plaster

Floor:

* laminate
* tile
* vinyl

Ceiling:

* paint
* stretch ceiling
* drywall

Quality level:

* Economy
* Standard
* Premium

---

## Estimation Engine

Estimate includes:

* materials
* preparation
* labor
* supporting materials
* regional multiplier

Output:

* minimum estimate
* maximum estimate

---

## Estimate Preview

Display:

* total estimate
* materials
* labor
* preparation
* room breakdown

---

## PDF Report

Generate:

* renovation summary
* estimate ranges
* room estimates
* labor estimate
* finish summary

---

# Tech Stack

Frontend:

* Next.js
* TypeScript
* Tailwind
* shadcn/ui

Backend:

* Next.js Server Actions

State:

* Zustand

Validation:

* React Hook Form
* Zod

PDF:

* React PDF

Email delivery:

* Resend

---

# Business Model

Guest flow.

User:

Estimate

→ Preview

→ Download PDF

Pricing:

Free. The full PDF estimate is delivered at no charge, with no
registration. Monetisation, if introduced later, comes from contractor
lead generation rather than from gating the estimate.

No:

* accounts
* saved projects
* project storage

---

# Success Metrics

Primary:

* estimate completion rate
* PDF download rate
* PDF generation

Secondary:

* estimate completion time
* report downloads

---

# Constraints

Must:

* stay simple
* stay fast
* remain responsive

Avoid:

* scraping
* accounts
* dashboards
* project storage
* contractor workflows
* unnecessary backend

Never:

* generate exact procurement prices
* promise exact renovation cost

Target:

Provide realistic renovation budget ranges.
