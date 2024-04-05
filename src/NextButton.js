function NextButton({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return null;
  if (index === numQuestions - 1) {
    return null;
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextAnswer" })}
    >
      Next
    </button>
  );
}

export default NextButton;
