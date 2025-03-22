import ActionButtons from "./components/action-buttons";
import QuestionBox from "./components/question-box";
import QuestionNumberGrid from "./components/question-number-grid";
import ResultBox from "./components/result-box";
import TestCodeInput from "./components/test-code-input";
import useShowResult from "./zustand/use-show-result";

function App() {
  const { showResult } = useShowResult();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto_auto] gap-3 p-3">
      <TestCodeInput />
      {showResult ? <ResultBox /> : <QuestionBox />}
      <QuestionNumberGrid />
      <ActionButtons />
    </div>
  );
}
export default App;
