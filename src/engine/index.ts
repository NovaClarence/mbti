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
