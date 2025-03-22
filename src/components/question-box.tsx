import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import useQuestion from "../zustand/use-question";
import useQuestionNumber from "../zustand/use-question-number";
import {
  ComputerBtn,
  CorrectBtn,
  MathsBtn,
  ReasoningBtn,
  UnattemptedBtn,
  WrongBtn,
} from "./quiz-button";

function QuestionBox() {
  const { currentQuestionNumber, nextQuestion, previousQuestion } = useQuestionNumber();
  const { questions, setQuestionStatus } = useQuestion();
  const [hasSubChanged, setHasSubChanged] = useState(false);
  const question = questions[currentQuestionNumber - 1];

  useEffect(() => {
    const abrt = new AbortController();
    if (question.subject !== undefined && hasSubChanged) {
      console.log(hasSubChanged);
      setTimeout(
        () => {
          nextQuestion();
          setHasSubChanged(false);
        },
        500,
        { signal: abrt.signal },
      );
    }
    return () => abrt.abort();
  }, [
    hasSubChanged,
    nextQuestion,
    question.number,
    question.subject,
    setQuestionStatus,
  ]);

  return (
    <div className="mx-auto grid max-w-[30rem] gap-4 border rounded-md border-gray-700 p-4">
      <p className="text-2xl font-medium">Q{question.number}.</p>

      <div className="mx-auto grid w-max grid-cols-2 gap-10 p-5">
        <div className="grid w-max gap-6">
          <CorrectBtn
            onClick={() => {
              setQuestionStatus({
                number: question.number,
                performance: "correct",
              });
            }}
            className={
              question.performance === "correct" ? "bg-green-900/40" : undefined
            }
          />
          <WrongBtn
            onClick={() => {
              setQuestionStatus({
                number: question.number,
                performance: "wrong",
              });
            }}
            className={
              question.performance === "wrong" ? "bg-red-900/40" : undefined
            }
          />
          <UnattemptedBtn
            onClick={() => {
              setQuestionStatus({
                number: question.number,
                performance: "unattempted",
              });
            }}
            className={
              question.performance === "unattempted"
                ? "bg-orange-400/20"
                : undefined
            }
          />
        </div>
        <div className="grid gap-6">
          <MathsBtn
            onClick={() => {
              setHasSubChanged(question.subject !== "maths");
              setQuestionStatus({
                number: question.number,
                subject: "maths",
              });
            }}
            className={
              question.subject === "maths"
                ? "border-blue-600 bg-blue-900/40"
                : undefined
            }
            iconClr={question.subject === "maths" ? "text-blue-300" : undefined}
          />
          <ComputerBtn
            onClick={() => {
              setHasSubChanged(question.subject !== "computer");
              setQuestionStatus({
                number: question.number,
                subject: "computer",
              });
            }}
            className={
              question.subject === "computer"
                ? "border-blue-600 bg-blue-900/40"
                : undefined
            }
            iconClr={
              question.subject === "computer" ? "text-blue-300" : undefined
            }
          />
          <ReasoningBtn
            onClick={() => {
              setHasSubChanged(question.subject !== "reasoning");
              setQuestionStatus({
                number: question.number,
                subject: "reasoning",
              });
            }}
            className={
              question.subject === "reasoning"
                ? "border-blue-600 bg-blue-900/40"
                : undefined
            }
            iconClr={
              question.subject === "reasoning" ? "text-blue-300" : undefined
            }
          />
        </div>
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
