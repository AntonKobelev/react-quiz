function FinishButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  if (index < numQuestions - 1) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finished" })}
    >
      Finish
    </button>
  );
}

export default FinishButton;
