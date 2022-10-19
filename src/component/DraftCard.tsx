import { Button, Drawer, Input, message, Space } from "antd";
import { useContext, useState } from "react";
import styled from "styled-components";
import {
  deleteQuizApi,
  publishQuizApi,
  updateQuizApi,
} from "../utils/apiUtil/quizApi";
import { Ques } from "../utils/interface/interface";
import { quizSchema } from "../utils/joi-schema/quiz-schema";
import { UserAuthContext } from "../utils/user-auth-context";
import AddQuesCard from "./AddCard";
interface props {
  quizQuestions: Ques[];
  quizTitle: string;
  id: number;
  fetchData: () => Promise<void>;
}

export const DraftCard: React.FC<props> = ({
  quizQuestions,
  quizTitle,
  id,
  fetchData,
}) => {
  const [title, setTitle] = useState(quizTitle);
  const [questions, setQuestion] = useState(quizQuestions);
  const [open, setOpen] = useState(false);
  const token = useContext(UserAuthContext);

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

  const showDrawer = () => {
    setOpen(true);
  };

  const saveQuiz = async () => {
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
          setOpen(false);
          fetchData();
        } else {
          message.error(error);
        }
      }
    }
  };

  const publishQuiz = async () => {
    if (token) {
      const [data, error] = await publishQuizApi({
        token,
        id,
      });
      if (data) {
        message.success("quiz published");
        setOpen(false);
        fetchData();
      } else {
        message.error(error);
      }
    }
  };

  const deleteQuiz = async () => {
    if (token) {
      const [data, error] = await deleteQuizApi({
        token,
        id,
      });
      if (data) {
        message.success("quiz deleted successfully");
        setOpen(false);
        fetchData();
      } else {
        message.error(error);
        console.log(error);
      }
    }
  };

  const onClose = () => {
    setOpen(false);
    setTitle(quizTitle);
    setQuestion(quizQuestions);
  };

  return (
    <div>
      <DraftQuizBox>
        <h2>{quizTitle}</h2>
        <Button type="dashed" onClick={() => publishQuiz()}>
          Publish
        </Button>
        <Button type="dashed" onClick={() => showDrawer()}>
          Edit
        </Button>
        <Button type="dashed" onClick={() => deleteQuiz()}>
          Delete
        </Button>
      </DraftQuizBox>

      <Drawer
        title="Add a quiz"
        placement={"right"}
        width={window.innerWidth > 900 ? 600 : window.innerWidth - 100}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={saveQuiz}>
              Save
            </Button>
          </Space>
        }
      >
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

        <div style={{ display: "flex", gap: "2%", marginTop: "1rem" }}>
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
        </div>
      </Drawer>
    </div>
  );
};

export const DraftQuizBox = styled.div`
  background-color: #afe4ee;
  border: 2px solid #237b7b;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  width: 80%;
  margin: 2rem auto;
  border-radius: 10px;
  h2 {
    width: 250px;
  }

  button {
    width: 5rem;
    &:hover {
      cursor: pointer;
      background-color: #afeeee;
    }
  }
`;
