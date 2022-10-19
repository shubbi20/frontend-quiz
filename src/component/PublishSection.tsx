import { Button, message } from "antd";
import { useContext } from "react";
import { deleteQuizApi } from "../utils/apiUtil/quizApi";
import { UserAuthContext } from "../utils/user-auth-context";
import { DraftQuizBox } from "./DraftCard";

interface props {
  permalink: string;
  quizTitle: string;
  quizId: number;
  fetchData: () => Promise<void>;
}

export const PublishSection: React.FC<props> = ({
  quizTitle,
  permalink,
  quizId,
  fetchData,
}) => {
  const token = useContext(UserAuthContext);
  const deleteQuiz = async () => {
    if (token) {
      const [data, error] = await deleteQuizApi({
        token,
        id: quizId,
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
        <h3>
          <a href={`http://localhost:3001/quiz/take-quiz/${permalink}`}>
            {permalink}
          </a>
        </h3>
        <Button type="dashed" onClick={() => deleteQuiz()}>
          Delete
        </Button>
      </DraftQuizBox>
    </div>
  );
};
