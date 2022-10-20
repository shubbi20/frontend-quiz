import { Button, message } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteQuizApi, publishQuizApi } from "../utils/apiUtil/quizApi";
import { Ques } from "../utils/interface/interface";
import { UserAuthContext } from "../utils/user-auth-context";

interface props {
  quizQuestions: Ques[];
  quizTitle: string;
  id: number;
  fetchData: () => Promise<void>;
  permalink: string;
}

export const DraftCard: React.FC<props> = ({
  quizTitle,
  id,
  fetchData,
  permalink,
}) => {
  const token = useContext(UserAuthContext);
  const navigate = useNavigate();

  const publishQuiz = async () => {
    if (token) {
      const [data, error] = await publishQuizApi({
        token,
        id,
      });
      if (data) {
        message.success("quiz published");
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
        fetchData();
      } else {
        message.error(error);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <DraftQuizBox>
        <h2>{quizTitle}</h2>
        <Button type="dashed" onClick={() => publishQuiz()}>
          Publish
        </Button>
        <Button type="dashed" onClick={() => navigate(`/AddQuiz/${permalink}`)}>
          Edit
        </Button>
        <Button type="dashed" onClick={() => deleteQuiz()}>
          Delete
        </Button>
      </DraftQuizBox>
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

  h3 {
    color: blue;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }

  button {
    width: 5rem;
    &:hover {
      cursor: pointer;
      background-color: #afeeee;
    }
  }
`;
