import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { storage } from '../utils/mmkvstore';
import { Quiz, QuizAttempt, SavedQuiz } from '../utils/types';
import type { Language } from '../i18n';

const STORAGE_KEY = 'quizkr-app-state';
const STARTING_CREDITS = 20;

type PersistedState = {
  credits: number;
  plan: 'free' | 'pro';
  savedQuizzes: SavedQuiz[];
  secondsStudied: number;
  language: Language;
};

const EMPTY_STATE: PersistedState = {
  credits: STARTING_CREDITS,
  plan: 'free',
  savedQuizzes: [],
  secondsStudied: 0,
  language: 'en',
};

const readState = (): PersistedState => {
  try {
    const raw = storage.getString(STORAGE_KEY);
    return raw ? { ...EMPTY_STATE, ...JSON.parse(raw) } : EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
};

type AppStoreValue = PersistedState & {
  completedQuizzes: SavedQuiz[];
  toAttemptQuizzes: SavedQuiz[];
  quizzesTaken: number;
  averageScore: number;
  spendCredit: () => boolean;
  addCredits: (amount: number) => void;
  goPro: () => void;
  saveQuiz: (quiz: Quiz) => void;
  removeQuiz: (quizId: string) => void;
  recordAttempt: (attempt: QuizAttempt) => void;
  resetProgress: () => void;
  setLanguage: (language: Language) => void;
};

const AppStoreContext = createContext<AppStoreValue | null>(null);

export const useAppStore = () => {
  const value = useContext(AppStoreContext);
  if (!value) throw new Error('useAppStore must be used inside AppStoreProvider');
  return value;
};

export const AppStoreProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setStateRaw] = useState<PersistedState>(readState);

  const setState = useCallback((update: (previous: PersistedState) => PersistedState) => {
    setStateRaw(previous => {
      const next = update(previous);
      storage.set(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const spendCredit = useCallback(() => {
    if (state.plan === 'pro') return true;
    if (state.credits <= 0) return false;
    setState(previous => ({ ...previous, credits: Math.max(0, previous.credits - 1) }));
    return true;
  }, [state.credits, state.plan, setState]);

  const addCredits = useCallback(
    (amount: number) => setState(previous => ({ ...previous, credits: previous.credits + amount })),
    [setState],
  );

  const goPro = useCallback(() => setState(previous => ({ ...previous, plan: 'pro' })), [setState]);

  const saveQuiz = useCallback(
    (quiz: Quiz) =>
      setState(previous => {
        if (previous.savedQuizzes.some(entry => entry.quiz.id === quiz.id)) return previous;
        return {
          ...previous,
          savedQuizzes: [{ quiz, status: 'toAttempt' }, ...previous.savedQuizzes],
        };
      }),
    [setState],
  );

  const removeQuiz = useCallback(
    (quizId: string) =>
      setState(previous => ({
        ...previous,
        savedQuizzes: previous.savedQuizzes.filter(entry => entry.quiz.id !== quizId),
      })),
    [setState],
  );

  const recordAttempt = useCallback(
    (attempt: QuizAttempt) =>
      setState(previous => {
        const scorePercent = attempt.quiz.questions.length
          ? Math.round((attempt.correctCount / attempt.quiz.questions.length) * 100)
          : 0;
        const completed: SavedQuiz = {
          quiz: attempt.quiz,
          status: 'completed',
          scorePercent,
          completedAt: Date.now(),
        };
        const rest = previous.savedQuizzes.filter(entry => entry.quiz.id !== attempt.quiz.id);
        return {
          ...previous,
          savedQuizzes: [completed, ...rest],
          secondsStudied: previous.secondsStudied + attempt.secondsTaken,
        };
      }),
    [setState],
  );

  const resetProgress = useCallback(() => {
    storage.delete(STORAGE_KEY);
    setStateRaw(EMPTY_STATE);
  }, []);

  const setLanguage = useCallback(
    (language: Language) => setState(previous => ({ ...previous, language })),
    [setState],
  );

  const value = useMemo<AppStoreValue>(() => {
    const completedQuizzes = state.savedQuizzes.filter(entry => entry.status === 'completed');
    const toAttemptQuizzes = state.savedQuizzes.filter(entry => entry.status === 'toAttempt');
    const averageScore = completedQuizzes.length
      ? Math.round(
          completedQuizzes.reduce((total, entry) => total + (entry.scorePercent ?? 0), 0) /
            completedQuizzes.length,
        )
      : 0;

    return {
      ...state,
      completedQuizzes,
      toAttemptQuizzes,
      quizzesTaken: completedQuizzes.length,
      averageScore,
      spendCredit,
      addCredits,
      goPro,
      saveQuiz,
      removeQuiz,
      recordAttempt,
      resetProgress,
      setLanguage,
    };
  }, [state, spendCredit, addCredits, goPro, saveQuiz, removeQuiz, recordAttempt, resetProgress, setLanguage]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};
