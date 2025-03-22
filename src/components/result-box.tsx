import {
  Brain,
  CircleCheck,
  CircleX,
  Cpu,
  Info,
  Radical,
  Target,
} from "lucide-react";
import type { Subjects } from "../zustand/use-question";
import useQuestion from "../zustand/use-question";

export function roundOff(num: number) {
  return Number(num.toFixed(2));
}

function ResultBox() {
  const { questions } = useQuestion();

  const totalCorrect = questions.filter(
    (q) => q.performance === "correct",
  ).length;
  const totalIncorrect = questions.filter(
    (q) => q.performance === "wrong",
  ).length;
  const totalUnattempted = questions.filter(
    (q) => q.performance === "unattempted",
  ).length;
  const accuracy = (totalCorrect * 100) / (totalCorrect + totalIncorrect);
  const marksObtained = totalCorrect * 4 + totalIncorrect * -1;

  return (
    <div className="mx-auto grid w-full max-w-[50rem] grid-rows-[auto_1fr]">
      <div className="grid h-max grid-cols-3 gap-4">
        <Box
          type="maths"
          correctQuestions={
            questions.filter(
              (q) => q.subject === "maths" && q.performance === "correct",
            ).length
          }
          incorrectQuestions={
            questions.filter(
              (q) => q.subject === "maths" && q.performance === "wrong",
            ).length
          }
          unattemptedQuestions={
            questions.filter(
              (q) => q.subject === "maths" && q.performance === "unattempted",
            ).length
          }
        />
        <Box
          type="computer"
          correctQuestions={
            questions.filter(
              (q) => q.subject === "computer" && q.performance === "correct",
            ).length
          }
          incorrectQuestions={
            questions.filter(
              (q) => q.subject === "computer" && q.performance === "wrong",
            ).length
          }
          unattemptedQuestions={
            questions.filter(
              (q) =>
                q.subject === "computer" && q.performance === "unattempted",
            ).length
          }
        />
        <Box
          type="reasoning"
          correctQuestions={
            questions.filter(
              (q) => q.subject === "reasoning" && q.performance === "correct",
            ).length
          }
          incorrectQuestions={
            questions.filter(
              (q) => q.subject === "reasoning" && q.performance === "wrong",
            ).length
          }
          unattemptedQuestions={
            questions.filter(
              (q) =>
                q.subject === "reasoning" && q.performance === "unattempted",
            ).length
          }
        />
      </div>

      <div className="m-auto grid w-[16rem] place-content-center gap-6 rounded-xl border border-gray-600 bg-gray-900 p-4">
        <p className="mx-auto flex w-max items-end gap-1 italic">
          <span className="text-4xl font-semibold">{marksObtained}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">300</span>
        </p>

        <div className="mx-auto flex w-max items-center gap-2">
          <Target className="size-6 text-gray-400" />
          <p className="text-2xl">
            {Number.isNaN(accuracy) ? "__" : roundOff(accuracy)}
            <span className="text-xs italic">%</span>
          </p>
        </div>

        <div className="flex gap-4 *:flex *:items-center *:gap-1">
          <div>
            <CircleCheck className="size-4 text-green-400" />
            <p className="text-sm">{totalCorrect}</p>
          </div>
          <div>
            <CircleX className="size-4 text-red-500" />
            <p className="text-sm">{totalIncorrect}</p>
          </div>
          <div>
            <Info className="size-4 text-orange-400" />
            <p className="text-sm">{totalUnattempted}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResultBox;

function Box({
  type,
  correctQuestions,
  incorrectQuestions,
  unattemptedQuestions,
}: {
  type: Subjects;
  unattemptedQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
}) {
  const accuracy =
    (correctQuestions * 100) / (correctQuestions + incorrectQuestions);
  const totalQuestions =
    correctQuestions + incorrectQuestions + unattemptedQuestions;

  return (
    <div className="relative h-max rounded-md bg-gray-900 p-4">
      <div className="absolute top-2 right-2 size-12 opacity-10">
        {type === "maths" ? (
          <Radical className="size-full" />
        ) : type === "computer" ? (
          <Cpu className="size-full" />
        ) : (
          <Brain className="size-full" />
        )}
      </div>

      <div className="grid gap-2 *:flex *:items-center *:gap-2">
        <div>
          <CircleCheck className="size-4 text-green-400" />
          <p className="text-sm">{correctQuestions}</p>
        </div>
        <div>
          <CircleX className="size-4 text-red-500" />
          <p className="text-sm">{incorrectQuestions}</p>
        </div>
        <div>
          <Info className="size-4 text-orange-400" />
          <p className="text-sm">{unattemptedQuestions}</p>
        </div>

        <div>
          <Target className="size-4" />
          <p className="">
            {Number.isNaN(accuracy) ? "__" : roundOff(accuracy)}
            <span className="text-xs italic">%</span>
          </p>
        </div>
      </div>

      <p className="absolute right-3 bottom-2 text-sm italic">
        {totalQuestions}
      </p>
    </div>
  );
}
