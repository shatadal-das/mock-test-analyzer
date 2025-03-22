import { twMerge } from "tailwind-merge";
import useQuestion from "../zustand/use-question";
import useQuestionNumber from "../zustand/use-question-number";

function QuestionNumberGrid() {
  const { questions } = useQuestion();
  const { currentQuestionNumber } = useQuestionNumber();

  return (
    <div className="mx-auto grid w-max grid-cols-15 gap-2">
      {Array.from({ length: questions.length }, (_, i) => (
        <QuestionNumberGridItem
          key={i}
          num={i + 1}
          active={i + 1 === currentQuestionNumber}
        />
      ))}
    </div>
  );
}
export default QuestionNumberGrid;

function QuestionNumberGridItem({
  num,
  active,
}: {
  num: number;
  active: boolean;
}) {
  const { setQuestionNumber } = useQuestionNumber();
  const { questions } = useQuestion();

  return (
    <button
      onClick={() => setQuestionNumber(num)}
      className={twMerge(
        "size-6 cursor-pointer rounded-md border-[1.5px] border-gray-500 text-[0.65rem] text-gray-400 hover:brightness-150",
        questions[num - 1].subject && questions[num - 1].performance === "correct" && "bg-green-900 text-green-300",
        questions[num - 1].subject && questions[num - 1].performance === "wrong" && "bg-red-800 text-red-200",
        questions[num - 1].subject && questions[num - 1].performance === "unattempted" && "bg-orange-800 text-orange-200",
        active && "border-dotted text-white",
      )}
    >
      {num}
    </button>
  );
}
