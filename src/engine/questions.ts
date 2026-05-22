// src/engine/questions.ts
import type { Question, TestVersion, QuestionWeight } from '../types';
import questionsData from '../data/questions.json';

const allQuestions: Question[] = questionsData as Question[];

const weightMap: Record<TestVersion, QuestionWeight[]> = {
  quick: ['core'],
  standard: ['core', 'extended'],
  deep: ['core', 'extended', 'deep'],
};

/** Fisher-Yates shuffle -- returns new array */
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
  const attentionChecks = allQuestions.filter(
    (q) => q.attentionCheck && allowedWeights.includes(q.weight)
  );
  const duplicates = allQuestions.filter(
    (q) => q.duplicateOf && allowedWeights.includes(q.weight)
  );

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
      const insertIdx = Math.min(origIdx + 10 + Math.floor(Math.random() * 20), result.length);
      result.splice(insertIdx, 0, dup);
    }
  }

  return result;
}
