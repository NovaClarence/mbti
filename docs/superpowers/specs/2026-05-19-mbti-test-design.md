# MBTI Precision Test — Design Spec

## Overview

A single-page web application that measures MBTI personality type with high accuracy by combining four-dichotomy measurement, cognitive function stack analysis, and built-in reliability checks. Users can choose from three test lengths (50/80/120 questions).

## Goals

- **Scientific precision**: Questions map to both MBTI dimensions and Jungian cognitive functions via a unified scoring engine
- **Reliability validation**: Attention checks, duplicate question pairs, and consistency scoring built into every test version
- **Engaging UX**: One-question-per-page centered card layout keeps users focused and reduces abandonment

## Tech Stack

- React 18 + TypeScript + Vite
- Zustand for test state management
- Recharts for result visualizations (bar charts, radar chart)
- html-to-image for share card PNG export
- React Router v6 for page navigation
- Pure frontend — no backend, no database
- Deployable to Vercel / GitHub Pages

## Architecture

```
src/
├── components/       # UI components
│   ├── ProgressBar.tsx
│   ├── QuestionCard.tsx
│   ├── DimensionBar.tsx
│   ├── RadarChart.tsx
│   ├── TypeBadge.tsx
│   ├── CharacterPortrait.tsx
│   ├── ShareCard.tsx
│   └── ConfidenceTag.tsx
├── engine/           # Pure functions, no React dependency
│   ├── scoring.ts    # Dimension + function scoring
│   ├── questions.ts  # Question selection & ordering
│   └── reliability.ts # Consistency & attention validation
├── data/
│   └── questions.json # Question bank with metadata
├── store/
│   └── testStore.ts  # Zustand store + localStorage
├── pages/
│   ├── HomePage.tsx  # Version selection + intro
│   ├── TestPage.tsx  # Question flow
│   └── ResultPage.tsx # Full report
└── types/
    └── index.ts      # TypeScript types
```

### Data Flow

`questions.json` → Question Engine filters by version → User answers collected → Scoring Engine calculates `{type, dimensions, functions, reliability}` → Result Page renders report

## Test Versions

| Version | Questions | Composition |
|---------|-----------|-------------|
| Quick (~50) | ~50 core | ~8 per dimension, ~3-4 per cognitive function |
| Standard (~80) | ~50 core + ~30 extended | Balanced coverage, includes all reliability checks |
| Deep (~120) | ~50 core + ~30 extended + ~40 deep | Maximum precision, full function stack resolution |

## Question System

Each question carries metadata linking it to scoring targets:

```typescript
interface Question {
  id: string;
  text: string;                    // Chinese question text
  dimension: 'E/I' | 'S/N' | 'T/F' | 'J/P';
  function: CognitiveFunction | null;  // Ti|Te|Fi|Fe|Si|Se|Ni|Ne|null
  weight: 'core' | 'extended' | 'deep';
  reversed: boolean;               // true = agreement maps to the second pole
}
```

- Scored on a 5-point Likert scale: 非常不同意(1) to 非常同意(5)
- Version selection controls which weight tiers are included
- Question order is shuffled per session
- Attention-check questions are inserted at fixed intervals (every ~20 questions)

## Scoring Engine

### Dimension Scoring

For each dimension (e.g., E/I):
- Sum all answers for questions tagged with that dimension
- Apply reversal for `reversed: true` questions
- Result: signed score. Positive = first pole dominant (e.g., E), negative = second pole (e.g., I)
- Strength = absolute score as percentage of max possible score

### Cognitive Function Scoring

- Sum all answers for questions tagged with each of the 8 functions
- Normalize to 0-100 scale
- Rank to determine function stack order (dominant → auxiliary → tertiary → inferior)

### Final Type Determination

Take the dominant direction across all four dimensions to produce the 4-letter type. Strength values indicate certainty.

```typescript
interface TestResult {
  type: string;           // e.g. "INTJ"
  dimensions: Record<Dimension, { score: number; direction: string; strength: number }>;
  functions: Record<CognitiveFunction, number>;
  reliability: {
    consistency: number;  // 0-1, correlation of duplicate answers
    attentionPassed: number; // e.g. 3/3
    confidence: 'high' | 'medium' | 'low';
  };
}
```

## Reliability System

Three mechanisms:

1. **Attention checks** — Explicit instruction questions (e.g., "Please select 'Strongly Agree' for this item"). 1 per 20 questions.
2. **Duplicate pairs** — 3-4 pairs of semantically equivalent questions with different wording. Compare answers for consistency.
3. **Response time tracking** — Flag unusually fast answers (<1s) as potential random responses.

Confidence level thresholds:
- High: ≥2/3 attention passed AND consistency ≥0.7
- Medium: 1/3 attention passed OR consistency 0.5-0.7
- Low: otherwise

## UI/UX

### Home Page
- Brief introduction to the test
- Three version cards (Quick / Standard / Deep) with estimated times
- "Start Test" button per version

### Test Page
- One question at a time, centered card layout (max 480px)
- Progress bar at top with question count and version label
- 5 Likert options displayed as vertical radio list
- "Next" button appears after selection
- No back button (prevents second-guessing)

### Result Page
- **Hero section**: Large type badge (e.g., "INTJ") + type name + confidence tag
- **Dimension section**: Four horizontal bars showing E←→I, S←→N, T←→F, J←→P splits with percentages
- **Functions section**: Radar chart of 8 cognitive functions with dominant/auxiliary highlighted
- **Actions**: Save result (local), share (copy link/screenshot), retake test

## State Management

Zustand store persisted to localStorage:

```typescript
interface TestState {
  version: 'quick' | 'standard' | 'deep';
  questions: Question[];      // Filtered & shuffled question set
  currentIndex: number;
  answers: Record<string, number>;  // questionId → 1-5 score
  startTime: number;
  questionTimings: Record<string, number>; // questionId → ms spent
  result: TestResult | null;
}
```

## Character Portrait System

Each of the 16 MBTI types has a unique CSS/SVG character portrait that reflects the type's personality through visual style:

- **I-types (Introverted)**: Cool color palette, restrained composition, contemplative atmosphere
- **E-types (Extraverted)**: Warm color palette, open composition, energetic atmosphere
- **NT types**: Sharp lines, geometric precision, cool tones
- **NF types**: Soft curves, dreamy gradients, warm tones
- **SJ types**: Structured forms, clean lines, grounded colors
- **SP types**: Dynamic shapes, bold accents, vibrant colors

Portraits are rendered as inline SVG components — zero external dependencies, instant load.

```
src/
├── components/
│   └── portraits/
│       ├── PortraitINTJ.tsx
│       ├── PortraitINTP.tsx
│       ├── ... (16 total)
│       └── portraits.ts          # Type → portrait component mapping
```

## Share Card

After completing the test, users can view and share a character card featuring:

- **Character portrait** — Type-specific SVG illustration
- **Type badge** — Large 4-letter code (e.g., "INTJ")
- **Type title** — e.g., "建筑师 · The Architect"
- **Key traits** — 3-4 personality trait tags
- **Dimension scores** — E↔I, S↔N, T↔F, J↔P percentages
- **Function stack** — Dominant and auxiliary functions
- **Source attribution** — Site name for resharing

Card is rendered as an HTML element that can be:
- Screenshot via html-to-image or html2canvas for image export
- Copied as a shareable link with result params in URL

```
src/
├── components/
│   ├── ShareCard.tsx       # Card layout component
│   └── ShareModal.tsx      # Share/save modal with preview
└── utils/
    └── share.ts            # Image generation + clipboard helpers
```

Dependencies (lightweight):
- `html-to-image` — Renders card DOM → PNG for download/share (~5KB gzipped)

## Out of Scope (v2)

- User accounts / login
- Server-side result storage
- Multi-language support
- Social sharing with generated images
- Admin dashboard / analytics

## Question Content

All questions are in Chinese. The question bank needs ~120 unique questions covering:
- E/I traits (~12 questions at core level)
- S/N traits (~12 questions at core level)  
- T/F traits (~12 questions at core level)
- J/P traits (~12 questions at core level)
- Each cognitive function (Ti/Te/Fi/Fe/Si/Se/Ni/Ne) (~6-7 questions each)
- 4 attention-check questions
- 4 duplicate pairs (8 questions)

Each question is tagged with both `dimension` and optional `function` to enable unified scoring.
