import { create } from "zustand";

interface QuestionNumberState {
  currentQuestionNumber: number;
  setQuestionNumber: (questionNumber: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

const useQuestionNumber = create<QuestionNumberState>((set) => ({
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
}));

export default useQuestionNumber;
