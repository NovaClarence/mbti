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
  attentionCheck?: { requiredAnswer: number };
  duplicateOf?: string;
}

export interface DimensionResult {
  score: number;
  direction: string;
  strength: number;
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
