import { create } from "zustand";
import { persist } from "zustand/middleware";
import createSessionStorage from "../utils/session-storage";

interface QuestionNumberState {
  currentQuestionNumber: number;
  setQuestionNumber: (questionNumber: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

const useQuestionNumber = create<QuestionNumberState>()(
  persist(
    (set) => ({
      currentQuestionNumber: 1,
      setQuestionNumber: (questionNumber: number) =>
        set({ currentQuestionNumber: questionNumber }),
      nextQuestion: () =>
        set((state) => ({
          currentQuestionNumber:
            state.currentQuestionNumber + 1 > 75
              ? 1
              : state.currentQuestionNumber + 1,
        })),
      previousQuestion: () =>
        set((state) => ({
          currentQuestionNumber:
            state.currentQuestionNumber - 1 < 1
              ? 75
              : state.currentQuestionNumber - 1,
        })),
    }),
    {
      name: "questionNumber",
      storage: createSessionStorage,
    },
  ),
);

export default useQuestionNumber;
