import FinishButton from "./FinishButton";
import NextButton from "./NextButton";
import Options from "./Options";
import Timer from "./Timer";

function Question({ question, dispatch, answer, index, numQuestions, time }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />
      <NextButton
        answer={answer}
        dispatch={dispatch}
        index={index}
        numQuestions={numQuestions}
      />
      <FinishButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestions={numQuestions}
      />
      <Timer time={time} dispatch={dispatch} />
    </div>
  );
}

export default Question;
