import { create } from "zustand";
import { persist } from "zustand/middleware";
import createSessionStorage from "../utils/session-storage";

export type Performances = "correct" | "wrong" | "unattempted";
export type Subjects = "maths" | "computer" | "reasoning";

type Question = {
  number: number;
  performance: Performances;
  subject?: Subjects;
};

type QuestionStore = {
  questions: Question[];
  setQuestionStatus: (arg: {
    number: number;
    performance?: Performances;
    subject?: Subjects;
  }) => void;
  resetQuestions: () => void;
  getCorrectCount: () => number;
};

const defaultQuestionsData = Array.from({ length: 75 }, (_, index) => ({
  number: index + 1,
  performance: "correct",
  isAttempted: false,
})) satisfies Question[];

const useQuestion = create<QuestionStore>()(
  persist(
    (set, get) => ({
      questions: defaultQuestionsData,
      setQuestionStatus: (arg) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.number === arg.number
              ? {
                  ...q,
                  ...arg,
                }
              : q,
          ),
        }));
      },
      resetQuestions: () => set({ questions: defaultQuestionsData }),
      getCorrectCount: () =>
        get().questions.filter((q) => q.performance === "correct").length,
    }),
    {
      name: "question",
      storage: createSessionStorage,
    },
  ),
);

export default useQuestion;
