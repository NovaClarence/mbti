// src/engine/scoring.ts
import type {
  Question, Dimension, CognitiveFunction,
  DimensionResult, TestResult,
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
    dimensionMax[q.dimension] += 5;
  }

  const dimensions: Record<Dimension, DimensionResult> = {} as Record<Dimension, DimensionResult>;
  for (const dim of DIMENSIONS) {
    const midpoint = dimensionMax[dim] / 2;
    const diff = dimensionRaw[dim] - midpoint;
    const [poleA, poleB] = DIMENSION_POLES[dim];
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
