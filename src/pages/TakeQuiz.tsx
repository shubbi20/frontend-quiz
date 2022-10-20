import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TakeQuizSection } from "../component/TakeQuizSection";
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

  useEffect(() => {
    fetchData();
  }, []);

  const finishQuiz = async () => {
    const { value, error } = quizSchema.validate({ title, questions });
    if (error) {
      message.error(error.message);
    } else {
      const [data, error] = await evaluateQuizApi({
        permalink: permalink as string,
        questions,
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
