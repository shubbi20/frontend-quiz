import { Button, message } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteQuizApi } from "../utils/apiUtil/quizApi";
import { UserAuthContext } from "../utils/user-auth-context";
import { DraftQuizBox } from "./DraftCard";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

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
  const onCopy = () => {
    message.success("Copied");
  };

  return (
    <div>
      <DraftQuizBox>
        <h2>{quizTitle}</h2>
        <h3>
          <CopyToClipboard
            text={`http://localhost:3000/TakeQuiz/${permalink}`}
            onCopy={() => onCopy()}
          >
            <CopyOutlined />
          </CopyToClipboard>
          <a
            href={`http://localhost:3000/TakeQuiz/${permalink}`}
            style={{ marginLeft: "10px" }}
          >
            {" "}
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
