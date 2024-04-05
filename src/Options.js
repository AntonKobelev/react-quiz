function Options({ question, dispatch, answer, correctOption }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            answer !== null && (index === correctOption ? "correct" : "wrong")
          }`}
          key={option}
          onClick={() => dispatch({ type: "answer", payload: index })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
