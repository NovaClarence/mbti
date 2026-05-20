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
        set({
          answers: { ...state.answers, [questionId]: score },
          questionTimings: {
            ...state.questionTimings,
            [questionId]: now - state.startTime,
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
