import { Alert, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { TakeQuizSection } from "../component/TakeQuizSection";
import { getAttemptApi } from "../utils/apiUtil/attemptApi";
import { evaluateQuizApi, getTestQuizApi } from "../utils/apiUtil/quizApi";
import { quizSchema } from "../utils/joi-schema/quiz-schema";

export interface TypeQues {
  questionNo: number;
  ques: string;
  answer: string[];
  options: string[];
  type: string;
}
export const TakeQuiz = () => {
  const { permalink } = useParams();
  const [questions, setQuestion] = useState<TypeQues[]>([]);
  const [title, setTitle] = useState<string>("");
  const [score, setScore] = useState("");
  const [user, setUser] = useState("non-user");
  const [attempt, setAttempt] = useState<any>();
  // const [email, setEmail] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["quizCookie"]);
  const fetchData = async () => {
    const [data, error] = await getTestQuizApi({
      permalink: permalink as string,
    });
    if (data && data.questions.length > 0) {
      setQuestion(data.questions);
      setTitle(data.title);
    } else {
      message.error(error);
    }
  };

  const updateAnswer = (questionNo: number, value: string[]) => {
    setQuestion((prevState) =>
      prevState.map((curr) =>
        curr.questionNo === questionNo ? { ...curr, answer: value } : curr
      )
    );
  };

  const getAttemptData = async (token: string) => {
    const [data, error] = await getAttemptApi({
      token,
      permalink: permalink as string,
    });
    if (data) {
      setAttempt(data.data);
    }
    console.log(data);
  };

  useEffect(() => {
    if (cookies.quizCookie) {
      setUser("user");
      console.log("dddddd", cookies.quizCookie.token);
      getAttemptData(cookies.quizCookie.token);
    }
    fetchData();
  }, []);

  const finishQuiz = async () => {
    const { value, error } = quizSchema.validate({ title, questions });
    if (error) {
      message.error(error.message);
    } else {
      console.log("sssss", user);
      const [data, error] = await evaluateQuizApi({
        permalink: permalink as string,
        questions,
        role: user,
        email: cookies.quizCookie?.email,
      });
      if (data) {
        setScore(`${data.correct}/${data.total}`);
      } else {
        message.error(error);
      }
    }
  };

  return (
    <div>
      {score.length < 2 ? (
        <div>
          {attempt && (
            <Alert
              message={`You have attempted this quiz ${attempt.attemptCount} times. Your last score was: ${attempt.lastScore} and your highest score: ${attempt.highestScore} `}
              type="info"
            />
          )}
          {questions &&
            questions.map((ele) => {
              return (
                <TakeQuizSection
                  question={ele}
                  updateAnswer={updateAnswer}
                  key={ele.questionNo}
                />
              );
            })}
          <Button type="primary" onClick={() => finishQuiz()}>
            Finish
          </Button>
        </div>
      ) : (
        <h2>Thanks for taking the quiz. Your score: {score}</h2>
      )}
    </div>
  );
};
