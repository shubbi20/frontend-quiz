import { Button, Input, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AddQuesCard from "../component/AddCard";
import {
  createQuizApi,
  getQuizByPermalink,
  updateQuizApi,
} from "../utils/apiUtil/quizApi";
import { Ques } from "../utils/interface/interface";
import { quizSchema } from "../utils/joi-schema/quiz-schema";
import { UserAuthContext } from "../utils/user-auth-context";

export const AddQuiz = () => {
  const [questions, setQuestion] = useState<Ques[]>([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const token = useContext(UserAuthContext);
  const { permalink } = useParams();
  const fetchData = async () => {
    if (token) {
      const [data, error] = await getQuizByPermalink({
        token,
        permalink: permalink as string,
      });
      console.log(data);
      if (data && data.questions.length > 0) {
        setQuestion(data.questions);
        setTitle(data.title);
        setId(data.id);
        setIsEdit(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQuestion = (questionNo: number, value: string) => {
    setQuestion((prevState) =>
      prevState.map((curr) =>
        curr.questionNo === questionNo ? { ...curr, ques: value } : curr
      )
    );
  };

  const updateAnswer = (questionNo: number, value: string[]) => {
    setQuestion((prevState) =>
      prevState.map((curr) =>
        curr.questionNo === questionNo ? { ...curr, answer: value } : curr
      )
    );
  };

  const updateOption = (
    questionNo: number,
    value: string,
    optionIndex: number
  ) => {
    setQuestion((prevState) =>
      prevState.map((curr) =>
        curr.questionNo === questionNo
          ? {
              ...curr,
              options: curr.options.map((ele, index) =>
                index === optionIndex ? value : ele
              ),
            }
          : curr
      )
    );
  };

  const addOrDelete = (questionNo: number, action: string) => {
    switch (action) {
      case "Add-Option":
        setQuestion((prevState) =>
          prevState.map((curr) =>
            curr.questionNo === questionNo
              ? { ...curr, options: [...curr.options, ""] }
              : curr
          )
        );
        break;
      case "Delete-Option":
        setQuestion((prevState) =>
          prevState.map((curr) =>
            curr.questionNo === questionNo
              ? { ...curr, options: curr.options.slice(0, -1) }
              : curr
          )
        );
        break;
      case "Add-Question":
        setQuestion([
          ...questions,
          {
            questionNo: questions.length + 1,
            ques: "",
            answer: [],
            options: ["", ""],
          },
        ]);
        break;
      case "Delete-Question":
        setQuestion(questions.slice(0, -1));
        break;
    }
  };

  const updateQuiz = async () => {
    const { value, error } = quizSchema.validate({ title, questions });
    if (error) {
      message.error(error.message);
      console.log(error);
    } else {
      if (token) {
        const [data, error] = await updateQuizApi({
          title,
          questions,
          token,
          id,
        });
        if (data) {
          message.success("quiz updated successfully");
          navigate("/draft");
        } else {
          message.error(error);
        }
      }
    }
  };

  const saveQuiz = async () => {
    const { value, error } = quizSchema.validate({ title, questions });
    if (error) {
      message.error(error.message);
      console.log(error);
    } else {
      if (token) {
        const [data, error] = await createQuizApi({ title, questions, token });
        if (data) {
          message.success("quiz created successfully");
          navigate("/draft");
        } else {
          message.error(error);
        }
      }
    }
  };
  return (
    <Wrapper>
      <Input
        placeholder="Add Quiz-Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      {questions &&
        questions.map((current, index) => {
          return (
            <AddQuesCard
              Question={current.ques}
              option={current.options}
              answer={current.answer}
              questionNo={current.questionNo}
              updateQuestion={updateQuestion}
              key={current.questionNo}
              updateAnswer={updateAnswer}
              updateOption={updateOption}
              addOrDeleteOptions={addOrDelete}
            />
          );
        })}

      <QuestionButton>
        {questions.length < 10 ? (
          <Button
            type="ghost"
            size="small"
            onClick={() => addOrDelete(1, "Add-Question")}
          >
            add Question
          </Button>
        ) : null}
        {questions.length > 0 ? (
          <Button
            type="ghost"
            size="small"
            onClick={() => addOrDelete(1, "Delete-Question")}
          >
            Delete Question
          </Button>
        ) : null}
      </QuestionButton>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          isEdit ? updateQuiz() : saveQuiz();
        }}
      >
        Save
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
`;

const QuestionButton = styled.div`
  display: flex;
  gap: 2%;
  margintop: 1rem;
`;
