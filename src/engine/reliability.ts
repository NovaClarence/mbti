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
    const avgDiff = allDiffs.reduce((a, b) => a + b, 0) / allDiffs.length;
    consistency = Math.max(0, 1 - avgDiff / 4);
    consistency = Math.round(consistency * 100) / 100;
  }

  // 3. Confidence level
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
