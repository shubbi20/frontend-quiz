import { Button, Drawer, Input, message, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddQuesCard from "../component/AddCard";
import { PublishSection } from "../component/PublishSection";
import { createQuizApi, getPublishQuizApi } from "../utils/apiUtil/quizApi";
import { Ques } from "../utils/interface/interface";
import { quizSchema } from "../utils/joi-schema/quiz-schema";
import { UserAuthContext } from "../utils/user-auth-context";

export const Home = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [questions, setQuestion] = useState<Ques[]>([]);
  const [title, setTitle] = useState("");
  const token = useContext(UserAuthContext);
  const [publishQuiz, setPublishQuiz] = useState<any[]>([]);

  const fetchData = async () => {
    if (token) {
      const [data, error] = await getPublishQuizApi(token);
      if (data) {
        setPublishQuiz(data.data);
      } else {
        console.log(error);
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
            answer: [""],
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
        const [data, error] = await createQuizApi({ title, questions, token });
        if (data) {
          message.success("quiz created successfully");
          setOpen(false);
          setQuestion([]);
          setTitle("");
        } else {
          message.error(error);
        }
      }
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        style={{ marginTop: "3rem" }}
        onClick={() => navigate("/AddQuiz/0")}
      >
        Add Quiz
      </Button>
      {publishQuiz.length > 0 &&
        publishQuiz.map((quiz) => {
          return (
            <PublishSection
              permalink={quiz.permalink}
              quizTitle={quiz.title}
              quizId={quiz.id}
              key={quiz.id}
              fetchData={fetchData}
            />
          );
        })}

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

export default Home;
