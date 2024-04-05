function FinishScreen({ points, totalPoints, dispatch, highscore }) {
  const percent = Math.ceil((100 * points) / totalPoints);
  let emodji = "";
  if (percent >= 90) {
  }
  emodji = "🥇";
  if (percent >= 75 && percent < 90) {
    emodji = "🥈";
  }
  if (percent >= 60 && percent < 75) {
    emodji = "🥉";
  }
  if (percent < 60) {
    emodji = "😭";
  }
  return (
    <>
      <div className="result">
        <p>
          <span>{emodji}</span>You scored <strong>{points}</strong> out of{" "}
          {totalPoints} points ({percent})%
        </p>
      </div>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
