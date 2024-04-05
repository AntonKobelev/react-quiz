import { useEffect } from "react";

function Timer({ time, dispatch }) {
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "timeDecr" });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);
  return <div className="timer">{formatTime(time)}</div>;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default Timer;
