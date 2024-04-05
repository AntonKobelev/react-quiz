import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import FirstScreen from "./FirstScreen.js";
import Error from "./Error.js";
import Question from "./Question.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  time: 600000,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved": {
      return { ...state, questions: action.payload, status: "loaded" };
    }
    case "dataFailed": {
      return { ...state, status: "error" };
    }
    case "start": {
      return { ...state, status: "active" };
    }
    case "answer": {
      if (action.payload === state.questions[state.index].correctOption) {
        return {
          ...state,
          answer: action.payload,
          points: state.points + state.questions[state.index].points,
        };
      }
      return { ...state, answer: action.payload };
    }
    case "nextAnswer": {
      return { ...state, index: state.index + 1, answer: null };
    }
    case "finished": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "timeDecr": {
      const newTime = state.time > 1000 ? state.time - 1000 : state.time;
      const newStatus = state.time === 100 ? "finished" : state.status;

      return {
        ...state,
        time: newTime,
        status: newStatus,
      };
    }

    case "reset": {
      return {
        ...initialState,
        questions: state.questions,
        status: "loaded",
        highscore: state.highscore,
      };
    }
    default:
      throw new Error("Unknow action type");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, time },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "loaded" && (
          <FirstScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              answer={answer}
              points={points}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              time={time}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
