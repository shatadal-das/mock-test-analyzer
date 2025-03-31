import {
  BookA,
  Brain,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Radical,
} from "lucide-react";
import { useEffect, useState } from "react";
import useQuestion from "../zustand/use-question";
import useQuestionNumber from "../zustand/use-question-number";
import { CorrectBtn, UnattemptedBtn, WrongBtn } from "./quiz-button";

function QuestionBox() {
  const {
    currentQuestionNumber,
    currentSection,
    nextQuestion,
    previousQuestion,
  } = useQuestionNumber();
  const { questions, setQuestionStatus } = useQuestion();
  const [hasResponded, setHasResponded] = useState(false);
  const filteredQuestions = questions.filter(
    (q) => q.subject === currentSection,
  );
  const question = filteredQuestions[currentQuestionNumber - 1];

  useEffect(() => {
    const abrt = new AbortController();
    if (hasResponded) {
      setTimeout(
        () => {
          nextQuestion();
          setHasResponded(false);
        },
        500,
        { signal: abrt.signal },
      );
    }
    return () => abrt.abort();
  }, [
    hasResponded,
    nextQuestion,
    question.number,
    question.subject,
    setQuestionStatus,
  ]);

  return (
    <div className="mx-auto flex max-w-[30rem] flex-col justify-between gap-4 rounded-md border border-gray-700 p-4">
      <div className="flex justify-between">
        <p className="text-2xl font-medium">Q{question.number}.</p>
        {currentSection === "mathematics" ? (
          <Radical className="opacity-40" />
        ) : currentSection === "logicalReasoning" ? (
          <Brain className="opacity-40" />
        ) : currentSection === "computerScience" ? (
          <Cpu className="opacity-40" />
        ) : (
          <BookA className="opacity-40" />
        )}
      </div>

      <div className="flex w-max gap-6">
        <CorrectBtn
          onClick={() => {
            setHasResponded(true);
            setQuestionStatus({
              number: question.number,
              performance: "correct",
              subject: currentSection,
            });
          }}
          className={
            question.performance === "correct" ? "bg-green-900/40" : undefined
          }
        />
        <WrongBtn
          onClick={() => {
            setHasResponded(true);
            setQuestionStatus({
              number: question.number,
              performance: "wrong",
              subject: currentSection,
            });
          }}
          className={
            question.performance === "wrong" ? "bg-red-900/40" : undefined
          }
        />
        <UnattemptedBtn
          onClick={() => {
            setHasResponded(true);
            setQuestionStatus({
              number: question.number,
              performance: "unattempted",
              subject: currentSection,
            });
          }}
          className={
            question.performance === "unattempted"
              ? "bg-orange-400/20"
              : undefined
          }
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-700 px-3 py-1.5 text-[0.8em] hover:brightness-150"
        >
          <ChevronLeft className="size-[1.2em]" />
          Back
        </button>
        <button
          onClick={nextQuestion}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-700 px-3 py-1.5 text-[0.8em] hover:brightness-150"
        >
          Next
          <ChevronRight className="size-[1.2em]" />
        </button>
      </div>
    </div>
  );
}
export default QuestionBox;
