import { roundOff } from "../utils/function";
import useQuestion from "../zustand/use-question";
import useTestCode from "../zustand/use-test-code";

type Subject = "maths" | "computer" | "reasoning";
type Performances = "correct" | "wrong" | "unattempted";

function DownloadBtn() {
  const { testCode } = useTestCode();
  const { questions } = useQuestion();

  const getQuestionsByPerformance = (
    subject: Subject,
    performance: Performances,
  ) =>
    questions
      .filter((q) => q.subject === subject && q.performance === performance)
      .map((q) => q.number)
      .join(", ") || "None";

  const getStats = (subject: Subject) => {
    const total = questions.filter((q) => q.subject === subject).length;
    const correct = questions.filter(
      (q) => q.subject === subject && q.performance === "correct",
    ).length;
    const wrong = questions.filter(
      (q) => q.subject === subject && q.performance === "wrong",
    ).length;
    const unattempted = questions.filter(
      (q) => q.subject === subject && q.performance === "unattempted",
    ).length;
    const accuracy =
      correct + wrong > 0 ? roundOff((correct / (correct + wrong)) * 100) : 0;
    return { total, correct, wrong, unattempted, accuracy };
  };

  const totalStats = questions.reduce(
    (acc, q) => {
      acc.total++;
      if (q.performance in acc) {
        acc[q.performance as keyof typeof acc]++;
      }
      return acc;
    },
    { total: 0, correct: 0, wrong: 0, unattempted: 0 },
  );

  const marksObtained = totalStats.correct * 4 - totalStats.wrong;
  const overallAccuracy =
    totalStats.correct + totalStats.wrong > 0
      ? roundOff(
          (totalStats.correct / (totalStats.correct + totalStats.wrong)) * 100,
        )
      : 0;

  const formattedContent = `# Test Report: ${testCode}

## 📌 Question Breakdown

### ✅ Correct Question Numbers
- **Maths:** ${getQuestionsByPerformance("maths", "correct")}
- **Computer:** ${getQuestionsByPerformance("computer", "correct")}
- **Reasoning:** ${getQuestionsByPerformance("reasoning", "correct")}

### ❌ Incorrect Question Numbers
- **Maths:** ${getQuestionsByPerformance("maths", "wrong")}
- **Computer:** ${getQuestionsByPerformance("computer", "wrong")}
- **Reasoning:** ${getQuestionsByPerformance("reasoning", "wrong")}

### ❓ Unattempted Question Numbers
- **Maths:** ${getQuestionsByPerformance("maths", "unattempted")}
- **Computer:** ${getQuestionsByPerformance("computer", "unattempted")}
- **Reasoning:** ${getQuestionsByPerformance("reasoning", "unattempted")}

---

## 📊 Subject-wise Performance

### 📘 Maths
- **Total Questions:** ${getStats("maths").total}
- **Correct:** ${getStats("maths").correct}
- **Incorrect:** ${getStats("maths").wrong}
- **Unattempted:** ${getStats("maths").unattempted}
- **Accuracy:** ${getStats("maths").accuracy}%

### 💻 Computer
- **Total Questions:** ${getStats("computer").total}
- **Correct:** ${getStats("computer").correct}
- **Incorrect:** ${getStats("computer").wrong}
- **Unattempted:** ${getStats("computer").unattempted}
- **Accuracy:** ${getStats("computer").accuracy}%

### 🧠 Reasoning
- **Total Questions:** ${getStats("reasoning").total}
- **Correct:** ${getStats("reasoning").correct}
- **Incorrect:** ${getStats("reasoning").wrong}
- **Unattempted:** ${getStats("reasoning").unattempted}
- **Accuracy:** ${getStats("reasoning").accuracy}%

---

## 🎯 Final Result
- **Marks Obtained:** ${marksObtained}
- **Total Questions:** ${totalStats.total}
- **Correct:** ${totalStats.correct}
- **Incorrect:** ${totalStats.wrong}
- **Unattempted:** ${totalStats.unattempted}
- **Overall Accuracy:** ${overallAccuracy}%
`;

  return (
    <button
      onClick={() => downloadMdFile(testCode, formattedContent)}
      className="cursor-pointer rounded-md bg-gray-700 px-4 py-2 hover:brightness-125"
    >
      Download
    </button>
  );
}

export default DownloadBtn;

function downloadMdFile(testCode: string, md: string) {
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `test-${testCode}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
