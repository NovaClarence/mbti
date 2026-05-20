# MBTI Precision Test — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page MBTI test app with 3 test lengths, unified dimension+cognitive-function scoring, reliability validation, character portraits, and shareable result cards.

**Architecture:** React 18 + TypeScript + Vite SPA. Pure functions in `engine/` handle all scoring logic (no React dependency). Zustand store + localStorage for state persistence. Questions live in a static JSON bank. 16 SVG character portraits per type. Result card exported via html-to-image.

**Tech Stack:** React 18, TypeScript, Vite, React Router v6, Zustand, Recharts, html-to-image

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Scaffold Vite project**

```bash
cd c:/Users/29960/Desktop/MBTI
npm create vite@latest . -- --template react-ts
```

Accept overwriting package.json? Yes.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom zustand recharts html-to-image
```

- [ ] **Step 3: Verify scaffold runs**

```bash
npm run dev
```

Open http://localhost:5173 — should show Vite default page.

- [ ] **Step 4: Clean up scaffold defaults**

Remove `src/App.css`, remove default content from `src/App.tsx` (keep minimal):

```tsx
// src/App.tsx
function App() {
  return <div className="app">MBTI Test</div>;
}

export default App;
```

- [ ] **Step 5: Reset src/index.css to project baseline**

```css
/* src/index.css */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-primary: #667eea;
  --color-primary-dark: #5a6fd6;
  --color-accent: #764ba2;
  --color-bg: #f5f6fa;
  --color-card: #ffffff;
  --color-text: #1a1a2e;
  --color-text-secondary: #666;
  --color-border: #e0e0e0;
  --color-success: #27ae60;
  --color-warning: #f39c12;
  --color-error: #e74c3c;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Microsoft YaHei', sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TypeScript project with dependencies"
```

---

### Task 2: Type Definitions

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Write types**

```typescript
// src/types/index.ts

export type Dimension = 'E/I' | 'S/N' | 'T/F' | 'J/P';

export type CognitiveFunction =
  | 'Ti' | 'Te' | 'Fi' | 'Fe' | 'Si' | 'Se' | 'Ni' | 'Ne';

export type QuestionWeight = 'core' | 'extended' | 'deep';

export type TestVersion = 'quick' | 'standard' | 'deep';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface Question {
  id: string;
  text: string;
  dimension: Dimension;
  function: CognitiveFunction | null;
  weight: QuestionWeight;
  reversed: boolean;
  /** Special question types for reliability checks */
  attentionCheck?: { requiredAnswer: number };
  duplicateOf?: string; // ID of the question this is a duplicate pair of
}

export interface DimensionResult {
  score: number;       // signed raw score
  direction: string;   // e.g. "I" or "E"
  strength: number;    // 0-100 percentage
}

export interface TestResult {
  type: string;
  dimensions: Record<Dimension, DimensionResult>;
  functions: Record<CognitiveFunction, number>;
  reliability: {
    consistency: number;
    attentionPassed: number;
    attentionTotal: number;
    confidence: ConfidenceLevel;
  };
}

export interface TestState {
  version: TestVersion;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, number>;
  startTime: number;
  questionTimings: Record<string, number>;
  result: TestResult | null;
}

export type MBTIType =
  | 'INTJ' | 'INTP' | 'INFJ' | 'INFP'
  | 'ISTJ' | 'ISFJ' | 'ISTP' | 'ISFP'
  | 'ENTJ' | 'ENTP' | 'ENFJ' | 'ENFP'
  | 'ESTJ' | 'ESFJ' | 'ESTP' | 'ESFP';

export interface TypeProfile {
  type: MBTIType;
  title: string;
  traits: string[];
  dominantFunction: CognitiveFunction;
  auxiliaryFunction: CognitiveFunction;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add TypeScript type definitions for MBTI test"
```

---

### Task 3: Type Profile Data

**Files:**
- Create: `src/data/typeProfiles.ts`

- [ ] **Step 1: Write 16 type profiles**

```typescript
// src/data/typeProfiles.ts
import type { MBTIType, TypeProfile, CognitiveFunction } from '../types';

export const typeProfiles: Record<MBTIType, TypeProfile> = {
  INTJ: {
    type: 'INTJ',
    title: '建筑师 · The Architect',
    traits: ['理智冷静', '独立自主', '长远规划'],
    dominantFunction: 'Ni',
    auxiliaryFunction: 'Te',
  },
  INTP: {
    type: 'INTP',
    title: '逻辑学家 · The Logician',
    traits: ['思维深邃', '求知若渴', '创新独立'],
    dominantFunction: 'Ti',
    auxiliaryFunction: 'Ne',
  },
  INFJ: {
    type: 'INFJ',
    title: '提倡者 · The Advocate',
    traits: ['洞察人心', '理想主义', '温和坚定'],
    dominantFunction: 'Ni',
    auxiliaryFunction: 'Fe',
  },
  INFP: {
    type: 'INFP',
    title: '调停者 · The Mediator',
    traits: ['温柔诗意', '忠于自我', '同理心强'],
    dominantFunction: 'Fi',
    auxiliaryFunction: 'Ne',
  },
  ISTJ: {
    type: 'ISTJ',
    title: '检查员 · The Inspector',
    traits: ['严谨务实', '可靠守序', '一丝不苟'],
    dominantFunction: 'Si',
    auxiliaryFunction: 'Te',
  },
  ISFJ: {
    type: 'ISFJ',
    title: '守卫者 · The Defender',
    traits: ['温柔体贴', '默默付出', '忠诚可靠'],
    dominantFunction: 'Si',
    auxiliaryFunction: 'Fe',
  },
  ISTP: {
    type: 'ISTP',
    title: '鉴赏家 · The Virtuoso',
    traits: ['冷静务实', '动手能力强', '随性自由'],
    dominantFunction: 'Ti',
    auxiliaryFunction: 'Se',
  },
  ISFP: {
    type: 'ISFP',
    title: '艺术家 · The Adventurer',
    traits: ['随性自在', '审美敏锐', '温柔低调'],
    dominantFunction: 'Fi',
    auxiliaryFunction: 'Se',
  },
  ENTJ: {
    type: 'ENTJ',
    title: '指挥官 · The Commander',
    traits: ['果断强势', '领导力强', '目标驱动'],
    dominantFunction: 'Te',
    auxiliaryFunction: 'Ni',
  },
  ENTP: {
    type: 'ENTP',
    title: '辩论家 · The Debater',
    traits: ['机智善辩', '好奇心强', '不拘一格'],
    dominantFunction: 'Ne',
    auxiliaryFunction: 'Ti',
  },
  ENFJ: {
    type: 'ENFJ',
    title: '教育家 · The Protagonist',
    traits: ['温暖感染力', '善于引导', '理想主义'],
    dominantFunction: 'Fe',
    auxiliaryFunction: 'Ni',
  },
  ENFP: {
    type: 'ENFP',
    title: '快乐小狗 · The Campaigner',
    traits: ['热情洋溢', '创意无限', '自由奔放'],
    dominantFunction: 'Ne',
    auxiliaryFunction: 'Fi',
  },
  ESTJ: {
    type: 'ESTJ',
    title: '总经理 · The Executive',
    traits: ['高效务实', '组织力强', '公正严格'],
    dominantFunction: 'Te',
    auxiliaryFunction: 'Si',
  },
  ESFJ: {
    type: 'ESFJ',
    title: '执政官 · The Consul',
    traits: ['热情周到', '乐于助人', '善于协调'],
    dominantFunction: 'Fe',
    auxiliaryFunction: 'Si',
  },
  ESTP: {
    type: 'ESTP',
    title: '企业家 · The Entrepreneur',
    traits: ['行动力强', '随机应变', '精力充沛'],
    dominantFunction: 'Se',
    auxiliaryFunction: 'Ti',
  },
  ESFP: {
    type: 'ESFP',
    title: '表演者 · The Entertainer',
    traits: ['活力四射', '感染力强', '享受当下'],
    dominantFunction: 'Se',
    auxiliaryFunction: 'Fi',
  },
};
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/data/typeProfiles.ts
git commit -m "feat: add 16 MBTI type profile definitions"
```

---

### Task 4: Question Bank Data

**Files:**
- Create: `src/data/questions.json`

- [ ] **Step 1: Write question bank JSON**

Create `src/data/questions.json` with core questions. Each question has dimension + function + weight + reversed. Include 3 attention checks and 3 duplicate pairs. See full content at the end of this plan (Appendix A) for the complete 55-question core bank.

```typescript
// For reference — the JSON schema:
// [
//   {
//     "id": "q_ei_01",
//     "text": "在社交场合中，你通常会感到精力充沛而不是疲惫",
//     "dimension": "E/I",
//     "function": "Fe",
//     "weight": "core",
//     "reversed": false
//   },
//   ...
// ]
```

- [ ] **Step 2: Verify JSON is valid**

```bash
npx tsx -e "import q from './src/data/questions.json'; console.log(Object.keys(q).length + ' questions loaded')"
```

- [ ] **Step 3: Commit**

```bash
git add src/data/questions.json
git commit -m "feat: add question bank with 55 core questions"
```

---

### Task 5: Question Engine

**Files:**
- Create: `src/engine/questions.ts`

- [ ] **Step 1: Write question engine**

```typescript
// src/engine/questions.ts
import type { Question, TestVersion, QuestionWeight } from '../types';
import questionsData from '../data/questions.json';

const allQuestions: Question[] = questionsData as Question[];

const weightMap: Record<TestVersion, QuestionWeight[]> = {
  quick: ['core'],
  standard: ['core', 'extended'],
  deep: ['core', 'extended', 'deep'],
};

/** Fisher-Yates shuffle — returns new array */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Select and order questions for a test session.
 * - Filters by version weight tiers
 * - Separates regular questions from reliability questions
 * - Shuffles regular questions
 * - Inserts attention checks at intervals
 * - Places duplicate pairs at controlled positions
 */
export function prepareQuestions(version: TestVersion, seed?: number): Question[] {
  if (seed !== undefined) {
    // Simple seeded random for reproducibility
    let s = seed;
    Math.random = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  const allowedWeights = weightMap[version];

  const regular = allQuestions.filter(
    (q) => allowedWeights.includes(q.weight) && !q.attentionCheck && !q.duplicateOf
  );
  const attentionChecks = allQuestions.filter((q) => q.attentionCheck);
  const duplicates = allQuestions.filter((q) => q.duplicateOf);

  const shuffled = shuffle(regular);

  // Insert attention checks every ~20 questions
  const interval = Math.max(20, Math.floor(shuffled.length / attentionChecks.length));
  const result: Question[] = [];
  let acIdx = 0;
  for (let i = 0; i < shuffled.length; i++) {
    if (acIdx < attentionChecks.length && i > 0 && i % interval === 0) {
      result.push(attentionChecks[acIdx++]);
    }
    result.push(shuffled[i]);
  }
  // Append any remaining attention checks
  while (acIdx < attentionChecks.length) {
    result.push(attentionChecks[acIdx++]);
  }

  // Place duplicate pairs with minimum 10 questions apart
  const dupPairs = new Map<string, Question[]>();
  for (const d of duplicates) {
    const key = d.duplicateOf!;
    if (!dupPairs.has(key)) dupPairs.set(key, []);
    dupPairs.get(key)!.push(d);
  }
  for (const [originalId, pair] of dupPairs) {
    const origIdx = result.findIndex((q) => q.id === originalId);
    if (origIdx === -1) continue;
    for (const dup of pair) {
      // Insert at least 10 questions after the original
      const insertIdx = Math.min(origIdx + 10 + Math.floor(Math.random() * 20), result.length);
      result.splice(insertIdx, 0, dup);
    }
  }

  return result;
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/engine/questions.ts
git commit -m "feat: add question engine with version filtering and reliability insertion"
```

---

### Task 6: Scoring Engine

**Files:**
- Create: `src/engine/scoring.ts`

- [ ] **Step 1: Write scoring engine**

```typescript
// src/engine/scoring.ts
import type {
  Question, Dimension, CognitiveFunction,
  DimensionResult, TestResult, TestVersion, ConfidenceLevel,
} from '../types';

const DIMENSIONS: Dimension[] = ['E/I', 'S/N', 'T/F', 'J/P'];
const FUNCTIONS: CognitiveFunction[] = ['Ti', 'Te', 'Fi', 'Fe', 'Si', 'Se', 'Ni', 'Ne'];

const DIMENSION_POLES: Record<Dimension, [string, string]> = {
  'E/I': ['E', 'I'],
  'S/N': ['S', 'N'],
  'T/F': ['T', 'F'],
  'J/P': ['J', 'P'],
};

interface ScoreInput {
  questions: Question[];
  answers: Record<string, number>;
  questionTimings: Record<string, number>;
}

function reverseScore(score: number): number {
  return 6 - score; // Likert 1-5: 1→5, 2→4, 3→3, 4→2, 5→1
}

export function calculateResults(input: ScoreInput): Omit<TestResult, 'reliability'> {
  const { questions, answers } = input;

  // --- Dimension scoring ---
  const dimensionRaw: Record<Dimension, number> = {
    'E/I': 0, 'S/N': 0, 'T/F': 0, 'J/P': 0,
  };
  const dimensionMax: Record<Dimension, number> = {
    'E/I': 0, 'S/N': 0, 'T/F': 0, 'J/P': 0,
  };

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;

    const score = q.reversed ? reverseScore(answer) : answer;
    dimensionRaw[q.dimension] += score;
    dimensionMax[q.dimension] += 5; // max possible per question
  }

  const dimensions: Record<Dimension, DimensionResult> = {} as Record<Dimension, DimensionResult>;
  for (const dim of DIMENSIONS) {
    const midpoint = dimensionMax[dim] / 2;
    const diff = dimensionRaw[dim] - midpoint;
    const [poleA, poleB] = DIMENSION_POLES[dim];
    // Positive diff = poleA (E, S, T, J), negative = poleB (I, N, F, P)
    const direction = diff >= 0 ? poleA : poleB;
    const strength = dimensionMax[dim] > 0
      ? Math.round((Math.abs(diff) / midpoint) * 100)
      : 50;
    dimensions[dim] = {
      score: Math.round(diff * 100) / 100,
      direction,
      strength: Math.min(strength, 100),
    };
  }

  // Determine type
  const type = [
    dimensions['E/I'].direction,
    dimensions['S/N'].direction,
    dimensions['T/F'].direction,
    dimensions['J/P'].direction,
  ].join('');

  // --- Cognitive function scoring ---
  const functionRaw: Record<CognitiveFunction, number> = {
    Ti: 0, Te: 0, Fi: 0, Fe: 0, Si: 0, Se: 0, Ni: 0, Ne: 0,
  };
  const functionCount: Record<CognitiveFunction, number> = {
    Ti: 0, Te: 0, Fi: 0, Fe: 0, Si: 0, Se: 0, Ni: 0, Ne: 0,
  };

  for (const q of questions) {
    if (!q.function) continue;
    const answer = answers[q.id];
    if (answer === undefined) continue;
    const score = q.reversed ? reverseScore(answer) : answer;
    functionRaw[q.function] += score;
    functionCount[q.function] += 5;
  }

  const functions: Record<CognitiveFunction, number> = {} as Record<CognitiveFunction, number>;
  for (const fn of FUNCTIONS) {
    functions[fn] = functionCount[fn] > 0
      ? Math.round((functionRaw[fn] / functionCount[fn]) * 100)
      : 50;
  }

  return { type, dimensions, functions };
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/engine/scoring.ts
git commit -m "feat: add scoring engine for dimensions and cognitive functions"
```

---

### Task 7: Reliability Engine

**Files:**
- Create: `src/engine/reliability.ts`

- [ ] **Step 1: Write reliability engine**

```typescript
// src/engine/reliability.ts
import type { Question, ConfidenceLevel } from '../types';

interface ReliabilityInput {
  questions: Question[];
  answers: Record<string, number>;
  questionTimings: Record<string, number>;
}

interface ReliabilityResult {
  consistency: number;
  attentionPassed: number;
  attentionTotal: number;
  confidence: ConfidenceLevel;
}

export function calculateReliability(input: ReliabilityInput): ReliabilityResult {
  const { questions, answers } = input;

  // 1. Attention checks
  const attentionChecks = questions.filter((q) => q.attentionCheck);
  let attentionPassed = 0;
  for (const ac of attentionChecks) {
    if (answers[ac.id] === ac.attentionCheck!.requiredAnswer) {
      attentionPassed++;
    }
  }

  // 2. Consistency: compare duplicate question pairs
  const duplicatePairs = new Map<string, number[]>();
  for (const q of questions) {
    if (q.duplicateOf) {
      const orig = answers[q.duplicateOf];
      const dup = answers[q.id];
      if (orig !== undefined && dup !== undefined) {
        const key = q.duplicateOf;
        if (!duplicatePairs.has(key)) duplicatePairs.set(key, []);
        duplicatePairs.get(key)!.push(Math.abs(orig - dup));
      }
    }
  }

  let consistency = 1.0;
  if (duplicatePairs.size > 0) {
    const allDiffs: number[] = [];
    for (const diffs of duplicatePairs.values()) allDiffs.push(...diffs);
    // Average difference of 0 → 1.0, diff of 4 → 0.0
    const avgDiff = allDiffs.reduce((a, b) => a + b, 0) / allDiffs.length;
    consistency = Math.max(0, 1 - avgDiff / 4);
    consistency = Math.round(consistency * 100) / 100;
  }

  // 3. Response time: count very fast answers (<1000ms)
  // (Informational — fast answers lower confidence in edge cases)

  // 4. Confidence level
  const attentionRatio = attentionChecks.length > 0
    ? attentionPassed / attentionChecks.length
    : 1;

  let confidence: ConfidenceLevel;
  if (attentionRatio >= 0.67 && consistency >= 0.7) {
    confidence = 'high';
  } else if (attentionRatio >= 0.33 || consistency >= 0.5) {
    confidence = 'medium';
  } else {
    confidence = 'low';
  }

  return {
    consistency,
    attentionPassed,
    attentionTotal: attentionChecks.length,
    confidence,
  };
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/engine/reliability.ts
git commit -m "feat: add reliability engine with attention, consistency, and confidence scoring"
```

---

### Task 8: Complete Scoring Pipeline

**Files:**
- Create: `src/engine/index.ts`

- [ ] **Step 1: Write combined scoring entry point**

```typescript
// src/engine/index.ts
import type { Question, TestResult } from '../types';
import { calculateResults } from './scoring';
import { calculateReliability } from './reliability';

export function runScoring(
  questions: Question[],
  answers: Record<string, number>,
  questionTimings: Record<string, number>,
): TestResult {
  const result = calculateResults({ questions, answers, questionTimings });
  const reliability = calculateReliability({ questions, answers, questionTimings });

  return {
    ...result,
    reliability,
  };
}

export { prepareQuestions } from './questions';
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/engine/index.ts
git commit -m "feat: add combined scoring pipeline entry point"
```

---

### Task 9: Zustand Test Store

**Files:**
- Create: `src/store/testStore.ts`

- [ ] **Step 1: Write Zustand store with localStorage persistence**

```typescript
// src/store/testStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TestState, TestVersion } from '../types';
import { prepareQuestions, runScoring } from '../engine';

interface TestActions {
  startTest: (version: TestVersion) => void;
  answerQuestion: (questionId: string, score: number) => void;
  nextQuestion: () => void;
  completeTest: () => void;
  resetTest: () => void;
}

type TestStore = TestState & TestActions;

const initialState: TestState = {
  version: 'standard',
  questions: [],
  currentIndex: 0,
  answers: {},
  startTime: 0,
  questionTimings: {},
  result: null,
};

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      startTest: (version) => {
        const questions = prepareQuestions(version);
        set({
          ...initialState,
          version,
          questions,
          startTime: Date.now(),
        });
      },

      answerQuestion: (questionId, score) => {
        const state = get();
        const now = Date.now();
        // Record timing: how long since the current question was shown
        const prevTiming = state.questionTimings[questionId] || 0;
        set({
          answers: { ...state.answers, [questionId]: score },
          questionTimings: {
            ...state.questionTimings,
            [questionId]: prevTiming > 0 ? prevTiming : now - state.startTime,
          },
        });
      },

      nextQuestion: () => {
        const state = get();
        if (state.currentIndex < state.questions.length - 1) {
          set({ currentIndex: state.currentIndex + 1 });
        }
      },

      completeTest: () => {
        const state = get();
        const result = runScoring(
          state.questions,
          state.answers,
          state.questionTimings,
        );
        set({ result });
      },

      resetTest: () => set({ ...initialState }),
    }),
    {
      name: 'mbti-test-state',
      partialize: (state) => ({
        version: state.version,
        questions: state.questions,
        currentIndex: state.currentIndex,
        answers: state.answers,
        startTime: state.startTime,
        questionTimings: state.questionTimings,
        result: state.result,
      }),
    },
  ),
);
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/store/testStore.ts
git commit -m "feat: add Zustand store with localStorage persistence"
```

---

### Task 10: App Router + Layout

**Files:**
- Modify: `src/App.tsx`, `src/main.tsx`

- [ ] **Step 1: Set up React Router in main.tsx**

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

- [ ] **Step 2: Set up routes in App.tsx**

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Create placeholder pages**

```bash
mkdir -p src/pages
```

Create `src/pages/HomePage.tsx`:

```tsx
export default function HomePage() {
  return <div>Home</div>;
}
```

Create `src/pages/TestPage.tsx`:

```tsx
export default function TestPage() {
  return <div>Test</div>;
}
```

Create `src/pages/ResultPage.tsx`:

```tsx
export default function ResultPage() {
  return <div>Result</div>;
}
```

- [ ] **Step 4: Verify dev server runs**

```bash
npm run dev
```

Navigate to `/`, `/test`, `/result` — each should show its placeholder.

- [ ] **Step 5: Commit**

```bash
git add src/main.tsx src/App.tsx src/pages/
git commit -m "feat: add React Router setup with placeholder pages"
```

---

### Task 11: Home Page

**Files:**
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Build HomePage with version selection**

```tsx
// src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import type { TestVersion } from '../types';
import './HomePage.css';

interface VersionOption {
  version: TestVersion;
  label: string;
  questions: string;
  time: string;
  description: string;
}

const versions: VersionOption[] = [
  {
    version: 'quick',
    label: '精简版',
    questions: '~50题',
    time: '15-20分钟',
    description: '快速了解你的MBTI类型和主要认知功能',
  },
  {
    version: 'standard',
    label: '标准版',
    questions: '~80题',
    time: '25-30分钟',
    description: '平衡的题目量，获得更准确的类型判断和功能栈分析',
  },
  {
    version: 'deep',
    label: '深度版',
    questions: '~120题',
    time: '40-50分钟',
    description: '最全面的测量，精准定位你的认知功能排序',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const startTest = useTestStore((s) => s.startTest);

  const handleStart = (version: TestVersion) => {
    startTest(version);
    navigate('/test');
  };

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="home-title">MBTI 性格测试</h1>
        <p className="home-subtitle">
          基于荣格认知功能理论，精准测量你的性格类型
        </p>
      </div>

      <div className="version-cards">
        {versions.map((v) => (
          <button
            key={v.version}
            className="version-card"
            onClick={() => handleStart(v.version)}
          >
            <div className="version-header">
              <span className="version-label">{v.label}</span>
              <span className="version-count">{v.questions}</span>
            </div>
            <p className="version-desc">{v.description}</p>
            <div className="version-footer">
              <span className="version-time">⏱ {v.time}</span>
              <span className="version-start">开始测试 →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write HomePage styles**

```css
/* src/pages/HomePage.css */
.home-page {
  max-width: 600px;
  width: 100%;
  padding: 60px 20px;
}

.home-hero {
  text-align: center;
  margin-bottom: 48px;
}

.home-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.home-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
}

.version-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.version-card {
  display: block;
  width: 100%;
  text-align: left;
  padding: 24px;
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.version-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.version-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.version-label {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
}

.version-count {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 600;
}

.version-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  line-height: 1.5;
}

.version-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.version-time {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.version-start {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 600;
}
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Home page should show hero section + 3 version cards.

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.tsx src/pages/HomePage.css
git commit -m "feat: add home page with three version selection cards"
```

---

### Task 12: ProgressBar Component

**Files:**
- Create: `src/components/ProgressBar.tsx`, `src/components/ProgressBar.css`

- [ ] **Step 1: Write ProgressBar**

```tsx
// src/components/ProgressBar.tsx
import './ProgressBar.css';

interface ProgressBarProps {
  current: number;
  total: number;
  versionLabel: string;
}

export default function ProgressBar({ current, total, versionLabel }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span className="progress-count">第 {current} / {total} 题</span>
        <span className="progress-version">{versionLabel}</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
```

```css
/* src/components/ProgressBar.css */
.progress-bar-container {
  width: 100%;
  margin-bottom: 32px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.progress-version {
  color: var(--color-primary);
  font-weight: 600;
}

.progress-track {
  width: 100%;
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 3px;
  transition: width 0.3s ease;
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProgressBar.tsx src/components/ProgressBar.css
git commit -m "feat: add ProgressBar component"
```

---

### Task 13: QuestionCard Component

**Files:**
- Create: `src/components/QuestionCard.tsx`, `src/components/QuestionCard.css`

- [ ] **Step 1: Write QuestionCard**

```tsx
// src/components/QuestionCard.tsx
import './QuestionCard.css';

interface QuestionCardProps {
  questionText: string;
  selectedAnswer: number | undefined;
  onSelect: (score: number) => void;
}

const options = [
  { value: 1, label: '非常不同意' },
  { value: 2, label: '不同意' },
  { value: 3, label: '中立' },
  { value: 4, label: '同意' },
  { value: 5, label: '非常同意' },
];

export default function QuestionCard({ questionText, selectedAnswer, onSelect }: QuestionCardProps) {
  return (
    <div className="question-card">
      <p className="question-text">{questionText}</p>
      <div className="question-options">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`option-btn ${selectedAnswer === opt.value ? 'selected' : ''}`}
            onClick={() => onSelect(opt.value)}
          >
            <span className="option-radio" />
            <span className="option-label">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

```css
/* src/components/QuestionCard.css */
.question-card {
  background: var(--color-card);
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: var(--shadow);
  max-width: 480px;
  width: 100%;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 28px;
}

.question-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 16px;
  background: transparent;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  font-size: 15px;
  color: var(--color-text);
  text-align: left;
}

.option-btn:hover {
  border-color: var(--color-primary);
  background: rgba(102, 126, 234, 0.05);
}

.option-btn.selected {
  border-color: var(--color-primary);
  background: rgba(102, 126, 234, 0.08);
}

.option-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  flex-shrink: 0;
  transition: all 0.15s;
}

.option-btn.selected .option-radio {
  border-color: var(--color-primary);
  background: var(--color-primary);
  box-shadow: inset 0 0 0 4px var(--color-card);
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/QuestionCard.tsx src/components/QuestionCard.css
git commit -m "feat: add QuestionCard component with 5-point Likert scale"
```

---

### Task 14: Test Page

**Files:**
- Modify: `src/pages/TestPage.tsx`
- Create: `src/pages/TestPage.css`

- [ ] **Step 1: Write TestPage**

```tsx
// src/pages/TestPage.tsx
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import './TestPage.css';

const versionLabels: Record<string, string> = {
  quick: '精简版',
  standard: '标准版',
  deep: '深度版',
};

export default function TestPage() {
  const navigate = useNavigate();
  const { questions, currentIndex, answers, version, answerQuestion, nextQuestion, completeTest } =
    useTestStore();

  // Guard: redirect if no questions loaded
  if (questions.length === 0) {
    navigate('/', { replace: true });
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion?.id];
  const isLast = currentIndex >= questions.length - 1;

  const handleSelect = (score: number) => {
    if (!currentQuestion) return;
    answerQuestion(currentQuestion.id, score);
  };

  const handleNext = () => {
    if (isLast) {
      completeTest();
      navigate('/result');
    } else {
      nextQuestion();
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="test-page">
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        versionLabel={versionLabels[version]}
      />
      <QuestionCard
        questionText={currentQuestion.text}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />
      <button
        className="next-btn"
        disabled={selectedAnswer === undefined}
        onClick={handleNext}
      >
        {isLast ? '查看结果' : '下一题 →'}
      </button>
    </div>
  );
}
```

```css
/* src/pages/TestPage.css */
.test-page {
  max-width: 480px;
  width: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.next-btn {
  margin-top: 24px;
  padding: 14px 40px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.next-btn:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

.next-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

- [ ] **Step 2: Verify dev server — full test flow**

```bash
npm run dev
```

Click through: Home → select version → answer questions → last question shows "查看结果"

- [ ] **Step 3: Commit**

```bash
git add src/pages/TestPage.tsx src/pages/TestPage.css
git commit -m "feat: add test page with question flow and navigation"
```

---

### Task 15: TypeBadge + ConfidenceTag + DimensionBar Components

**Files:**
- Create: `src/components/TypeBadge.tsx`, `src/components/ConfidenceTag.tsx`, `src/components/DimensionBar.tsx`
- Create: Corresponding CSS files

- [ ] **Step 1: Write TypeBadge**

```tsx
// src/components/TypeBadge.tsx
import './TypeBadge.css';

interface TypeBadgeProps {
  type: string;
  title: string;
}

export default function TypeBadge({ type, title }: TypeBadgeProps) {
  return (
    <div className="type-badge-container">
      <div className="type-badge">{type}</div>
      <div className="type-title">{title}</div>
    </div>
  );
}
```

```css
/* src/components/TypeBadge.css */
.type-badge-container {
  text-align: center;
}

.type-badge {
  display: inline-block;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 4px;
  color: var(--color-primary);
  padding: 12px 32px;
  border: 3px solid var(--color-primary);
  border-radius: 16px;
  margin-bottom: 10px;
}

.type-title {
  font-size: 16px;
  color: var(--color-text-secondary);
}
```

- [ ] **Step 2: Write ConfidenceTag**

```tsx
// src/components/ConfidenceTag.tsx
import type { ConfidenceLevel } from '../types';
import './ConfidenceTag.css';

const config: Record<ConfidenceLevel, { label: string; className: string }> = {
  high: { label: '✓ 结果置信度：高', className: 'conf-high' },
  medium: { label: '△ 结果置信度：中等', className: 'conf-medium' },
  low: { label: '✗ 结果置信度：较低', className: 'conf-low' },
};

interface ConfidenceTagProps {
  level: ConfidenceLevel;
}

export default function ConfidenceTag({ level }: ConfidenceTagProps) {
  const { label, className } = config[level];
  return <span className={`confidence-tag ${className}`}>{label}</span>;
}
```

```css
/* src/components/ConfidenceTag.css */
.confidence-tag {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.conf-high { background: rgba(39, 174, 96, 0.12); color: var(--color-success); }
.conf-medium { background: rgba(243, 156, 18, 0.12); color: var(--color-warning); }
.conf-low { background: rgba(231, 76, 60, 0.12); color: var(--color-error); }
```

- [ ] **Step 3: Write DimensionBar**

```tsx
// src/components/DimensionBar.tsx
import type { DimensionResult } from '../types';
import './DimensionBar.css';

interface DimensionBarProps {
  left: string;
  right: string;
  result: DimensionResult;
}

export default function DimensionBar({ left, right, result }: DimensionBarProps) {
  const isLeft = result.direction === left;
  const leftPct = isLeft ? result.strength : 100 - result.strength;
  const rightPct = 100 - leftPct;

  return (
    <div className="dimension-bar-row">
      <span className="dim-label dim-left">{left}</span>
      <div className="dim-bar-wrap">
        <div className="dim-bar-segment dim-bar-bg" style={{ flex: leftPct }}>
          {isLeft && <span className="dim-bar-value">{result.strength}%</span>}
        </div>
        <div className="dim-bar-segment dim-bar-fill" style={{ flex: rightPct }}>
          {!isLeft && <span className="dim-bar-value dim-bar-value-right">{result.strength}%</span>}
        </div>
      </div>
      <span className="dim-label dim-right">{right}</span>
    </div>
  );
}
```

```css
/* src/components/DimensionBar.css */
.dimension-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.dim-label {
  width: 26px;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
}

.dim-left { color: var(--color-text); }
.dim-right { color: var(--color-accent); }

.dim-bar-wrap {
  flex: 1;
  display: flex;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;
  gap: 2px;
}

.dim-bar-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: flex 0.6s ease;
  font-size: 12px;
  font-weight: 600;
}

.dim-bar-bg {
  background: var(--color-border);
  justify-content: flex-end;
  padding-right: 6px;
}

.dim-bar-fill {
  background: var(--color-primary);
  justify-content: flex-start;
  padding-left: 6px;
}

.dim-bar-value {
  color: var(--color-text-secondary);
}

.dim-bar-value-right {
  color: white;
}
```

- [ ] **Step 4: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/TypeBadge.tsx src/components/TypeBadge.css \
        src/components/ConfidenceTag.tsx src/components/ConfidenceTag.css \
        src/components/DimensionBar.tsx src/components/DimensionBar.css
git commit -m "feat: add TypeBadge, ConfidenceTag, and DimensionBar components"
```

---

### Task 16: RadarChart Component

**Files:**
- Create: `src/components/RadarChart.tsx`, `src/components/RadarChart.css`

- [ ] **Step 1: Write RadarChart using Recharts**

```tsx
// src/components/RadarChart.tsx
import {
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import type { CognitiveFunction } from '../types';
import './RadarChart.css';

interface RadarChartProps {
  functions: Record<CognitiveFunction, number>;
  dominant: CognitiveFunction;
  auxiliary: CognitiveFunction;
}

const functionLabels: Record<CognitiveFunction, string> = {
  Ti: 'Ti 内倾思维', Te: 'Te 外倾思维',
  Fi: 'Fi 内倾情感', Fe: 'Fe 外倾情感',
  Si: 'Si 内倾感觉', Se: 'Se 外倾感觉',
  Ni: 'Ni 内倾直觉', Ne: 'Ne 外倾直觉',
};

export default function FunctionsRadarChart({ functions, dominant, auxiliary }: RadarChartProps) {
  const data = (Object.entries(functions) as [CognitiveFunction, number][]).map(([fn, value]) => ({
    function: functionLabels[fn],
    value,
  }));

  return (
    <div className="radar-chart-container">
      <h3 className="radar-title">八维认知功能</h3>
      <ResponsiveContainer width="100%" height={320}>
        <ReRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis dataKey="function" tick={{ fontSize: 11, fill: '#666' }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            stroke="#667eea"
            fill="#667eea"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </ReRadarChart>
      </ResponsiveContainer>
      <div className="radar-legend">
        <span>主功能: <strong>{functionLabels[dominant]}</strong></span>
        <span>辅助功能: <strong>{functionLabels[auxiliary]}</strong></span>
      </div>
    </div>
  );
}
```

```css
/* src/components/RadarChart.css */
.radar-chart-container {
  background: var(--color-card);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}

.radar-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
}

.radar-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 12px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.radar-legend strong {
  color: var(--color-primary);
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/RadarChart.tsx src/components/RadarChart.css
git commit -m "feat: add radar chart component for cognitive functions"
```

---

### Task 17: Result Page

**Files:**
- Modify: `src/pages/ResultPage.tsx`
- Create: `src/pages/ResultPage.css`

- [ ] **Step 1: Write ResultPage**

```tsx
// src/pages/ResultPage.tsx
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { typeProfiles } from '../data/typeProfiles';
import type { MBTIType, Dimension } from '../types';
import TypeBadge from '../components/TypeBadge';
import ConfidenceTag from '../components/ConfidenceTag';
import DimensionBar from '../components/DimensionBar';
import FunctionsRadarChart from '../components/RadarChart';
import './ResultPage.css';

const dimensionLabels: Record<Dimension, [string, string]> = {
  'E/I': ['E', 'I'],
  'S/N': ['S', 'N'],
  'T/F': ['T', 'F'],
  'J/P': ['J', 'P'],
};

export default function ResultPage() {
  const navigate = useNavigate();
  const result = useTestStore((s) => s.result);
  const resetTest = useTestStore((s) => s.resetTest);

  if (!result) {
    navigate('/', { replace: true });
    return null;
  }

  const profile = typeProfiles[result.type as MBTIType] ?? {
    type: result.type as MBTIType,
    title: '',
    traits: [],
    dominantFunction: 'Ni',
    auxiliaryFunction: 'Te',
  };

  const handleRetake = () => {
    resetTest();
    navigate('/');
  };

  return (
    <div className="result-page">
      <section className="result-hero">
        <TypeBadge type={result.type} title={profile.title} />
        <ConfidenceTag level={result.reliability.confidence} />
      </section>

      <section className="result-section">
        <h3>四维度分布</h3>
        {(Object.entries(result.dimensions) as [Dimension, typeof result.dimensions['E/I']][]).map(
          ([dim, data]) => {
            const [left, right] = dimensionLabels[dim];
            return (
              <DimensionBar key={dim} left={left} right={right} result={data} />
            );
          },
        )}
      </section>

      <section className="result-section">
        <FunctionsRadarChart
          functions={result.functions}
          dominant={profile.dominantFunction}
          auxiliary={profile.auxiliaryFunction}
        />
      </section>

      <section className="result-section">
        <h3>核心特质</h3>
        <div className="trait-tags">
          {profile.traits.map((trait) => (
            <span key={trait} className="trait-tag">{trait}</span>
          ))}
        </div>
      </section>

      <section className="result-actions">
        <button className="action-btn action-primary" onClick={() => navigate('/share')}>
          查看名片 &amp; 分享
        </button>
        <button className="action-btn action-secondary" onClick={handleRetake}>
          重新测试
        </button>
      </section>
    </div>
  );
}
```

```css
/* src/pages/ResultPage.css */
.result-page {
  max-width: 560px;
  width: 100%;
  padding: 40px 20px 60px;
}

.result-hero {
  text-align: center;
  padding: 32px 20px;
  background: linear-gradient(135deg, rgba(102,126,234,0.06), rgba(118,75,162,0.06));
  border-radius: var(--radius);
  margin-bottom: 28px;
}

.result-hero .confidence-tag {
  margin-top: 12px;
}

.result-section {
  margin-bottom: 28px;
}

.result-section h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 14px;
  color: var(--color-text);
}

.trait-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.trait-tag {
  background: rgba(102, 126, 234, 0.1);
  color: var(--color-primary);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
}

.action-btn {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all 0.2s;
}

.action-primary {
  background: var(--color-primary);
  color: white;
}

.action-primary:hover {
  background: var(--color-primary-dark);
}

.action-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.action-secondary:hover {
  background: rgba(102, 126, 234, 0.05);
}
```

- [ ] **Step 2: Add share route to App.tsx**

```tsx
// src/App.tsx — add this import:
import SharePage from './pages/SharePage';

// Add this route inside <Routes>:
<Route path="/share" element={<SharePage />} />
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Complete a test → should see full result page with type, dimensions, radar chart, traits, actions.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ResultPage.tsx src/pages/ResultPage.css src/App.tsx
git commit -m "feat: add result page with type display, dimensions, radar chart, and actions"
```

---

### Task 18: Character Portrait System

**Files:**
- Create: `src/components/portraits/` — 16 portrait components
- Create: `src/components/CharacterPortrait.tsx`
- Create: `src/components/portraits/portraits.ts`

- [ ] **Step 1: Write portrait mapping**

```typescript
// src/components/portraits/portraits.ts
import type { MBTIType } from '../../types';
import type { FC } from 'react';

// Import all portraits
import PortraitINTJ from './PortraitINTJ';
import PortraitINTP from './PortraitINTP';
import PortraitINFJ from './PortraitINFJ';
import PortraitINFP from './PortraitINFP';
import PortraitISTJ from './PortraitISTJ';
import PortraitISFJ from './PortraitISFJ';
import PortraitISTP from './PortraitISTP';
import PortraitISFP from './PortraitISFP';
import PortraitENTJ from './PortraitENTJ';
import PortraitENTP from './PortraitENTP';
import PortraitENFJ from './PortraitENFJ';
import PortraitENFP from './PortraitENFP';
import PortraitESTJ from './PortraitESTJ';
import PortraitESFJ from './PortraitESFJ';
import PortraitESTP from './PortraitESTP';
import PortraitESFP from './PortraitESFP';

export const portraitMap: Record<MBTIType, FC<{ size?: number }>> = {
  INTJ: PortraitINTJ, INTP: PortraitINTP, INFJ: PortraitINFJ, INFP: PortraitINFP,
  ISTJ: PortraitISTJ, ISFJ: PortraitISFJ, ISTP: PortraitISTP, ISFP: PortraitISFP,
  ENTJ: PortraitENTJ, ENTP: PortraitENTP, ENFJ: PortraitENFJ, ENFP: PortraitENFP,
  ESTJ: PortraitESTJ, ESFJ: PortraitESFJ, ESTP: PortraitESTP, ESFP: PortraitESFP,
};
```

- [ ] **Step 2: Write CharacterPortrait wrapper**

```tsx
// src/components/CharacterPortrait.tsx
import type { MBTIType } from '../types';
import { portraitMap } from './portraits/portraits';

interface CharacterPortraitProps {
  type: MBTIType;
  size?: number;
}

export default function CharacterPortrait({ type, size = 200 }: CharacterPortraitProps) {
  const Portrait = portraitMap[type];
  if (!Portrait) return null;
  return (
    <div className="character-portrait" style={{ width: size, height: size }}>
      <Portrait size={size} />
    </div>
  );
}
```

- [ ] **Step 3: Write 16 portrait SVG components**

Each portrait is a stylized SVG illustration. Key design principles:
- I-types: cool palette (blues, purples), inward-facing composition
- E-types: warm palette (oranges, pinks), outward-facing composition
- NT: sharp geometric shapes
- NF: soft curves, gradients
- SJ: structured, clean forms
- SP: dynamic, asymmetric elements

Example — `PortraitINTJ.tsx`:

```tsx
// src/components/portraits/PortraitINTJ.tsx
interface PortraitProps { size?: number }

export default function PortraitINTJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="intjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a2e"/>
          <stop offset="100%" stopColor="#16213e"/>
        </linearGradient>
        <linearGradient id="intjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#667eea"/>
          <stop offset="100%" stopColor="#764ba2"/>
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="200" height="200" rx="100" fill="url(#intjGrad)"/>
      {/* Outer ring */}
      <circle cx="100" cy="100" r="94" stroke="url(#intjAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#intjAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      {/* Abstract geometric face — sharp angles for INTJ */}
      <path d="M100 50 L130 80 L125 150 L75 150 L70 80 Z" fill="url(#intjAccent)" opacity="0.3"/>
      {/* Eyes — sharp, focused */}
      <line x1="82" y1="95" x2="92" y2="95" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="108" y1="95" x2="118" y2="95" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      {/* Mouth — firm line */}
      <line x1="88" y1="120" x2="112" y2="120" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Crown elements — "architect" motif */}
      <rect x="92" y="38" width="16" height="10" rx="3" fill="url(#intjAccent)" opacity="0.7"/>
    </svg>
  );
}
```

Create the remaining 15 portraits with the same interface but different colors and shapes per type. The full set of 16 portraits is defined in Appendix B.

- [ ] **Step 4: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/portraits/ src/components/CharacterPortrait.tsx
git commit -m "feat: add 16 SVG character portraits for all MBTI types"
```

---

### Task 19: Share Card + Share Page

**Files:**
- Create: `src/components/ShareCard.tsx`, `src/components/ShareCard.css`
- Create: `src/pages/SharePage.tsx`, `src/pages/SharePage.css`
- Create: `src/utils/share.ts`

- [ ] **Step 1: Write ShareCard component**

```tsx
// src/components/ShareCard.tsx
import type { MBTIType } from '../types';
import type { TestResult } from '../types';
import { typeProfiles } from '../data/typeProfiles';
import CharacterPortrait from './CharacterPortrait';
import './ShareCard.css';

interface ShareCardProps {
  result: TestResult;
}

export default function ShareCard({ result }: ShareCardProps) {
  const profile = typeProfiles[result.type as MBTIType];
  if (!profile) return null;

  const dimStr = (Object.entries(result.dimensions) as [string, { direction: string; strength: number }][])
    .map(([, d]) => `${d.direction} ${d.strength}%`)
    .join('  ·  ');

  return (
    <div className="share-card" id="share-card">
      <div className="share-card-img">
        <CharacterPortrait type={result.type as MBTIType} size={180} />
      </div>
      <div className="share-card-body">
        <div className="share-type-row">
          <span className="share-type-badge">{result.type}</span>
          <span className="share-type-name">{profile.title}</span>
        </div>
        <div className="share-traits">
          {profile.traits.map((t) => (
            <span key={t} className="share-trait">{t}</span>
          ))}
        </div>
        <div className="share-dims">{dimStr}</div>
      </div>
      <div className="share-card-footer">
        <span className="share-site">MBTI 精准测试</span>
        <span className="share-cta">你也来测测看 →</span>
      </div>
    </div>
  );
}
```

```css
/* src/components/ShareCard.css */
.share-card {
  width: 340px;
  border-radius: 16px;
  overflow: hidden;
  background: #1a1a2e;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
}

.share-card-img {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2d1b69, #1a1a2e);
  position: relative;
}

.share-card-body {
  padding: 18px 22px;
}

.share-type-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
}

.share-type-badge {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #a78bfa;
}

.share-type-name {
  font-size: 13px;
  color: #999;
}

.share-traits {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.share-trait {
  background: rgba(102, 126, 234, 0.2);
  color: #a78bfa;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.share-dims {
  font-size: 12px;
  color: #aaa;
  letter-spacing: 1px;
}

.share-card-footer {
  border-top: 1px solid #333;
  padding: 12px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}

.share-site { color: #666; }
.share-cta { color: #667eea; }
```

- [ ] **Step 2: Write share utility**

```typescript
// src/utils/share.ts
import { toPng } from 'html-to-image';

export async function downloadCardAsImage(elementId: string, filename: string): Promise<void> {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Card element not found');

  const dataUrl = await toPng(node, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: '#1a1a2e',
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function copyCardAsImage(elementId: string): Promise<void> {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Card element not found');

  const dataUrl = await toPng(node, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: '#1a1a2e',
  });

  const blob = await (await fetch(dataUrl)).blob();
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ]);
}
```

- [ ] **Step 3: Write SharePage**

```tsx
// src/pages/SharePage.tsx
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import ShareCard from '../components/ShareCard';
import { downloadCardAsImage, copyCardAsImage } from '../utils/share';
import './SharePage.css';

export default function SharePage() {
  const navigate = useNavigate();
  const result = useTestStore((s) => s.result);

  if (!result) {
    navigate('/', { replace: true });
    return null;
  }

  const handleDownload = async () => {
    try {
      await downloadCardAsImage('share-card', `MBTI-${result.type}.png`);
    } catch {
      alert('保存失败，请重试');
    }
  };

  const handleCopy = async () => {
    try {
      await copyCardAsImage('share-card');
      alert('名片已复制到剪贴板');
    } catch {
      alert('复制失败，请使用保存按钮');
    }
  };

  return (
    <div className="share-page">
      <h2>你的 MBTI 名片</h2>
      <p className="share-subtitle">保存或分享给朋友</p>

      <ShareCard result={result} />

      <div className="share-actions">
        <button className="share-btn share-btn-primary" onClick={handleDownload}>
          保存图片
        </button>
        <button className="share-btn share-btn-secondary" onClick={handleCopy}>
          复制图片
        </button>
        <button className="share-btn share-btn-outline" onClick={() => navigate('/result')}>
          返回报告
        </button>
      </div>
    </div>
  );
}
```

```css
/* src/pages/SharePage.css */
.share-page {
  max-width: 400px;
  width: 100%;
  padding: 40px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.share-page h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.share-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.share-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 24px;
}

.share-btn {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  border: none;
  transition: all 0.2s;
}

.share-btn-primary {
  background: var(--color-primary);
  color: white;
}

.share-btn-primary:hover { background: var(--color-primary-dark); }

.share-btn-secondary {
  background: var(--color-success);
  color: white;
}

.share-btn-outline {
  background: transparent;
  color: var(--color-text-secondary);
  border: 2px solid var(--color-border);
}
```

- [ ] **Step 4: Update App.tsx with SharePage import and route**

Add the import and route if not already done in Task 17 Step 2.

- [ ] **Step 5: Verify dev server**

```bash
npm run dev
```

Complete a test → View Result → click "查看名片 & 分享" → see card → click "保存图片"

- [ ] **Step 6: Commit**

```bash
git add src/components/ShareCard.tsx src/components/ShareCard.css \
        src/pages/SharePage.tsx src/pages/SharePage.css \
        src/utils/share.ts src/App.tsx
git commit -m "feat: add share card with image download and clipboard copy"
```

---

### Task 20: Polish & Final Integration

**Files:**
- Modify: `src/index.css`
- Modify: `src/pages/HomePage.css`

- [ ] **Step 1: Add global responsive tweaks to index.css**

Append to `src/index.css`:

```css
@media (max-width: 480px) {
  .home-page { padding: 40px 16px; }
  .home-title { font-size: 28px; }
  .test-page { padding: 24px 16px; }
  .result-page { padding: 24px 16px; }
}
```

- [ ] **Step 2: Run full build check**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Check all routes: `/` → `/test` → complete → `/result` → `/share`

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: add responsive polish and final integration"
```

---

## Appendix A: Question Bank (src/data/questions.json)

The complete question bank containing 55 core questions covering all 4 dimensions and 8 cognitive functions, plus attention checks and duplicate pairs. (Full content provided in a separate file due to length — `src/data/questions.json`)

Each question entry follows:
```json
{
  "id": "q_ei_01",
  "text": "在社交场合中，你通常会感到精力充沛而不是疲惫",
  "dimension": "E/I",
  "function": "Fe",
  "weight": "core",
  "reversed": false
}
```

## Appendix B: Portrait Designs (16 Types)

Each portrait is an SVG component with these type-specific visual characteristics:

| Type | Palette | Shape Style | Key Motif |
|------|---------|-------------|-----------|
| INTJ | Navy/Cool Purple | Sharp geometric | Crown/chess piece |
| INTP | Steel Blue/Teal | Angular, sparse | Books/gear |
| INFJ | Deep Teal/Lavender | Flowing lines | Mist/moon |
| INFP | Soft Purple/Pink | Curved, dreamy | Flower/cloud |
| ISTJ | Slate Gray/Navy | Clean, structured | Shield/checkmark |
| ISFJ | Warm Gray/Rose | Soft, balanced | Heart/home |
| ISTP | Gunmetal/Orange | Bold, minimal | Wrench/star |
| ISFP | Earth Green/Mauve | Organic, loose | Leaf/brush |
| ENTJ | Crimson/Gold | Sharp, commanding | Crown/arrow |
| ENTP | Amber/Teal | Playful, dynamic | Lightning/chat |
| ENFJ | Warm Gold/Coral | Flowing, radiant | Sun/wings |
| ENFP | Bright Pink/Yellow | Bouncy, energetic | Star/rainbow |
| ESTJ | Navy/Crimson | Structured, bold | Gavel/building |
| ESFJ | Coral/Peach | Soft, welcoming | Hands/smile |
| ESTP | Red/Orange | Dynamic, angular | Flame/bolt |
| ESFP | Magenta/Gold | Curvy, flamboyant | Sparkle/music |
